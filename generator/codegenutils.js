const none = Object.create(null)

function primitive( ...args ) {
    return args.every( x => typeof x !== "function" )
}
function fnsetlength( fn, length ) {
    return Object.defineProperty(fn, "length", { value: length })
}
function fnlengths( ...args ) {
    return args.reduce((count, x) => count + (primitive(x) ? 0 : x.length), 0)
}

function curry( fn, ...args ) {
    if (fn.length <= args.length) return fn(...args)
    return fnsetlength( function curried( ...next ) {
        return curry(fn, ...args, ...next)
    }, fn.length - args.length)
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
    if ( primitive(...args) ) return fn( ...args )
    const length = fnlengths( ...args )
    return fnsetlength( function ( ...next ) {
        const resolved = resolveArguments( args, next )
        return resolve(fn, ...resolved)
    }, length)
}

// Exported Functions /////////////////////////////////////////////////

// Codegen

export function index( target, ...exprs ) {
    function index( expression ) {
        return `${target}[${expression}]`
    }
    return curry(index, ...exprs)
}
export function property( target, ...exprs ) {
    function property( expression ) {
        return `${target}.${expression}`
    }
    return curry(property, ...exprs)
}
export function call( ...args ) {
    function call( target, expression ) {
        if ( primitive(target, expression ) )
            return expression
                ? `${target}( ${expression instanceof Array ? expression.join(", ") : expression} )` 
                : `${target}()`
        return resolve(call, target, expression)
    }
    return curry(call, ...args)
}

export function binary( op, ...args ) {
    function binary( left, right ) {
        if ( primitive(left, right) ) 
            return `${left} ${op} ${right}` 
        return resolve(binary, left, right)
    }
    return curry(binary, ...args)
}
export function assign( ...exprs ) {
    return binary("=", ...exprs )
}

export function ternary( condition, ...args ) {
    function ternary( truthy, falsy ) {
        if ( primitive(truthy, falsy) ) 
            return `${condition} ? ${truthy} : ${falsy}` 
        return resolve(ternary, truthy, falsy)
    }
    return curry(ternary, ...args)
}

// Utils

export function callall( fn ) {
    return function ( x ) {
        return fn( ...Array.from( { length: fn.length }, () => x ) )
    }
}
export function select( ...args ) {
    function select( truthy, falsy, condition ) {
        if ( primitive( truthy, falsy, condition ) ) 
            return condition ? truthy : falsy
        return resolve(select, truthy, falsy, condition)
    }
    return curry(select, ...args)
}