/**
 * @template T
 * @typedef {{[key: string]: T}} ObjectMap
 */
/**
 * @typedef {(...args) => string} CodegenFunction
 * @typedef {(...args) => CurriedFunction} CurriedFunction
 */

function primitive( ...args ) {
    return args.every( x => typeof x !== "function" )
}
/** @template T @param {T} fn @param {number} length @returns {T} */
function fnsetlength( fn, length ) {
    return Object.defineProperty( fn, "length", { value: length } )
}
/** @returns {number} */
function fnlengths( ...args ) {
    return args.reduce( ( count, x ) => count + ( primitive( x ) ? 0 : x.length ), 0 )
}

/** @param {CodegenFunction} fn @returns {CurriedFunction} */
function curry( fn, ...args ) {
    if ( fn.length <= args.length ) return fn( ...args )
    return fnsetlength( function curried( ...next ) {
        return curry( fn, ...args, ...next )
    }, fn.length - args.length )
}

function resolveArguments( unresolved, args ) {
    const resolved = [...unresolved]
    let p = 0
    for ( const [i, arg] of resolved.entries() ) {
        if ( p >= args.length ) break
        if ( primitive( arg ) ) continue
        resolved[i] = arg( ...args.slice( p, p += arg.length ) )
    }
    return resolved
}
function resolve( fn, ...args ) {
    if ( primitive( ...args ) ) return fn( ...args )
    const length = fnlengths( ...args )
    return fnsetlength( function ( ...next ) {
        const resolved = resolveArguments( args, next )
        return resolve( fn, ...resolved )
    }, length )
}

// Exported Functions /////////////////////////////////////////////////

// Codegen

export function prepend( ...args ) {
    function prepend( prefix, expression ) {
        if ( primitive( prefix, expression ) )
            return `${prefix}${expression}`
        return resolve( prepend, prefix, expression )
    }
    return curry( prepend, ...args )
}
export function append( ...args ) {
    function append( postfix, expression ) {
        if ( primitive( postfix, expression ) )
            return `${expression}${postfix}`
        return resolve( append, postfix, expression )
    }
    return curry( append, ...args )
}

export const returnexpr = prepend( "return " )
export const yieldexpr = prepend( "yield " )

export function index( target, ...exprs ) {
    function index( expression ) {
        if ( primitive( expression ) )
            return `${target}[${expression}]`
        return resolve( index, expression )
    }
    return curry( index, ...exprs )
}
export function property( ...exprs ) {
    function property( target, expression ) {
        if ( primitive( target, expression ) )
            return `${target}.${expression}`
        return resolve( property, target, expression )
    }
    return curry( property, ...exprs )
}

export function call( ...args ) {
    function call( target, expression ) {
        if ( primitive( target, expression ) )
            return expression !== undefined
                ? `${target}( ${expression instanceof Array ? expression.join( ", " ) : expression} )`
                : `${target}()`
        return resolve( call, target, expression )
    }
    return curry( call, ...args )
}

export function group( ...args ) {
    function group( expression ) {
        if ( primitive( expression ) )
            return `( ${expression} )`
        return resolve( group, expression )
    }
    return curry( group, ...args )
}


export function binary( op, ...args ) {
    function binary( left, right ) {
        if ( primitive( left, right ) )
            return `${left} ${op} ${right}`
        return resolve( binary, left, right )
    }
    return curry( binary, ...args )
}
export const assign = binary( "=" )

export function ternary( condition, ...args ) {
    function ternary( truthy, falsy ) {
        if ( primitive( truthy, falsy ) )
            return `${condition} ? ${truthy} : ${falsy}`
        return resolve( ternary, truthy, falsy )
    }
    return curry( ternary, ...args )
}
export function ternarymap( condition, ...args ) {
    function ternarymap( truthy, falsy ) {
        if ( !primitive( truthy ) ) truthy = truthy( true )
        if ( !primitive( falsy ) ) falsy = falsy( false )

        function ternary( truthy, falsy ) {
            if ( primitive( truthy, falsy ) )
                return `${condition} ? ${truthy} : ${falsy}`
            return resolve( ternary, truthy, falsy )
        }
        return ternary( truthy, falsy )
    }
    return curry( ternarymap, ...args )
}

// Utils

export function callall( fn ) {
    return function ( x ) {
        return !primitive( fn )
            ? fn( ...Array.from( { length: fn.length }, () => x ) )
            : fn
    }
}
export function select( ...args ) {
    function select( truthy, falsy, condition ) {
        if ( primitive( truthy, falsy, condition ) )
            return condition ? truthy : falsy
        return resolve( select, truthy, falsy, condition )
    }
    return curry( select, ...args )
}
export function join( ...args ) {
    function join( joiner, ...args ) {
        if ( primitive( joiner, ...args ) )
            return args.join( joiner )
        return resolve( join, joiner, ...args )
    }
    return curry( join, ...args )
}
export function repeat( ...args ) {
    function repeat( count, expression, joiner ) {
        if ( primitive( count, expression, joiner ) )
            return Array.from( { length: count }, () => expression ).join( joiner )
        return resolve( repeat, count, expression, joiner )
    }
    return curry( repeat, ...args )
}
export function repeatmap( ...args ) {
    function repeatmap( count, joiner, expression ) {
        const elements = Array.from( { length: count }, ( _, i ) => !primitive( expression ) ? expression( i ) : expression )
        return join( joiner, ...elements )
    }
    return curry( repeatmap, ...args )
}

/** @template T @param {T} x  */
export function identity( x ) {
    return x
}
export function defer( _ ) {
    return identity
}

// Meta

/** @param {CodegenFunction} fn */
export function custom( fn ) {
    return function custom( ...args ) {
        function wrapper( ...args ) {
            if ( primitive( ...args ) )
                return fn( ...args )
            return resolve( wrapper, ...args )
        }
        fnsetlength( wrapper, fn.length )
        return curry( wrapper, ...args )
    }()
}

// JS Utils

// o.prefix.static()
// { prefix: "static" }

const objHelperPrimitives = {
    undefined: undefined,
    null: null,
    false: false,
    true: true,
    NaN: NaN,
}

/** 
 * @typedef {() => ObjectMap<string|number|boolean|null|undefined>} ObjectHelper
 * 
 * @param {...string} properties  
 * @returns {ObjectMap<ObjectHelper>}
 */
function objHelper( ...properties ) {
    return new Proxy( function () {}, {
        get( _, property ) { return objHelper( ...properties, property ) },
        set() { return false },
        apply() {
            const obj = Object.create( null )
            for ( let i = 0; i < properties.length; i += 2 ) {
                let key = properties[i], value = properties[i + 1]
                if ( value in objHelperPrimitives ) {
                    obj[key] = objHelperPrimitives[value]
                    continue
                }
                if ( value && !isNaN( +value ) ) {
                    obj[key] = +value
                    continue
                }
                obj[key] = value
            }
            return obj
        }
    } )
}
export const o = objHelper()