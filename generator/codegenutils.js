/**
 * @typedef {string|symbol|number|bigint|boolean|null|undefined} Primitive
 */
/**
 * @template T
 * @typedef {{[key: string]: T}} ObjectMap
 */
/**
 * @template T 
 * @typedef {(...args) => T} TargetFunction
 */
/**
 * @template T
 * @typedef {(...args) => T | CurriedFunction<T>} CurriedFunction
 */
/**
 * @template T
 * @typedef {(...args) => T | ResolvingFunction<T>} ResolvingFunction
 */
/**
 * @template T
 * @typedef {T|CurriedFunction<T|ResolvingFunction<T>>} CodegenFunction
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

/** @template T @param {TargetFunction<T>} fn @returns {T|CurriedFunction<T>} */
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
/** @template T @param {TargetFunction<T>} fn @returns {T|ResolvingFunction<T>} */
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

/** @returns {CodegenFunction<string>} */
export function prepend( ...args ) {
    function prepend( prefix, expression ) {
        if ( primitive( prefix, expression ) )
            return `${prefix}${expression}`
        return resolve( prepend, prefix, expression )
    }
    return curry( prepend, ...args )
}
/** @returns {CodegenFunction<string>} */
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

/** @returns {CodegenFunction<string>} */
export function index( target, ...exprs ) {
    function index( expression ) {
        if ( primitive( expression ) )
            return `${target}[${expression}]`
        return resolve( index, expression )
    }
    return curry( index, ...exprs )
}
/** @returns {CodegenFunction<string>} */
export function property( ...exprs ) {
    function property( target, expression ) {
        if ( primitive( target, expression ) )
            return `${target}.${expression}`
        return resolve( property, target, expression )
    }
    return curry( property, ...exprs )
}

/** @returns {CodegenFunction<string>} */
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

/** @returns {CodegenFunction<string>} */
export function group( ...args ) {
    function group( expression ) {
        if ( primitive( expression ) )
            return `( ${expression} )`
        return resolve( group, expression )
    }
    return curry( group, ...args )
}


/** @returns {CodegenFunction<string>} */
export function binary( op, ...args ) {
    function binary( left, right ) {
        if ( primitive( left, right ) )
            return `${left} ${op} ${right}`
        return resolve( binary, left, right )
    }
    return curry( binary, ...args )
}
export const assign = binary( "=" )

/** @returns {CodegenFunction<string>} */
export function ternary( condition, ...args ) {
    function ternary( truthy, falsy ) {
        if ( primitive( truthy, falsy ) )
            return `${condition} ? ${truthy} : ${falsy}`
        return resolve( ternary, truthy, falsy )
    }
    return curry( ternary, ...args )
}
/** @returns {CodegenFunction<string>} */
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
/** @returns {CodegenFunction<string>} */
export function select( ...args ) {
    function select( truthy, falsy, condition ) {
        if ( primitive( truthy, falsy, condition ) )
            return condition ? truthy : falsy
        return resolve( select, truthy, falsy, condition )
    }
    return curry( select, ...args )
}
/** @returns {CodegenFunction<string>} */
export function join( ...args ) {
    function join( joiner, ...args ) {
        if ( primitive( joiner, ...args ) )
            return args.join( joiner )
        return resolve( join, joiner, ...args )
    }
    return curry( join, ...args )
}
/** @returns {CodegenFunction<string>} */
export function repeat( ...args ) {
    function repeat( count, expression, joiner ) {
        if ( primitive( count, expression, joiner ) )
            return Array.from( { length: count }, () => expression ).join( joiner )
        return resolve( repeat, count, expression, joiner )
    }
    return curry( repeat, ...args )
}
/** @returns {CodegenFunction<string>} */
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

/** @template T @param {TargetFunction<T>} fn @returns {CodegenFunction<T>} */
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


const objectHelperPrimitives = {
    undefined: undefined,
    null: null,
    false: false,
    true: true,
    NaN: NaN,
}

/** @param {{[trigger: string]: Primitive | {[key: string]: any}}} options  */
export function ObjectHelper( options ) {
    return function ObjectHelperChain( ...properties ) {
        return new Proxy( function ObjectHelperBuilder() {
            /** @type {{[key: string]: any}} */
            const obj = Object.create( null )
            for ( let i = 0; i < properties.length; ) {
                const key = properties[i++]
                if ( key in options ) {
                    const value = options[key]
                    if ( value && typeof value === "object" )
                        Object.assign( obj, value )
                    else
                        obj[key] = value
                    continue
                }

                const value = properties[i++]
                if ( value in objectHelperPrimitives ) {
                    obj[key] = objectHelperPrimitives[value]
                    continue
                }
                if ( value && !isNaN( +value ) ) {
                    obj[key] = +value
                    continue
                }

                obj[key] = value
            }
            return obj
        }, {
            get( _, property ) { return ObjectHelperChain( ...properties, property ) },
            set() { return false },
        } )
    }()
}

export const o = ObjectHelper( {} )