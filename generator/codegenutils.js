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

export function resolve( oldargs, newargs ) {
    const resolved = []
    for ( let i = 0; i < oldargs.length; i++ ) {
        if ( newargs.length === 0 ) {
            resolved.push( ...oldargs.slice( i ) )
            break
        }

        const arg = oldargs[i]
        if ( primitive( arg ) ) {
            resolved.push( arg )
            continue
        }
        
        const length = arg.length
        const args = newargs.slice(0, length)
        resolved.push( arg( ...args ) )
        newargs = newargs.slice( length )
    }
    return resolved
}

// Exported Functions /////////////////////////////////////////////////

// Codegen

export function index( target, ...exprs ) {
    function index( expression ) {
        return `${target}[${expression}]`
    }
    return curry(index, ...exprs)
}
export function field( target, ...exprs ) {
    function field( expression ) {
        return `${target}.${expression}`
    }
    return curry(field, ...exprs)
}
export function call( target, ...exprs ) {
    function call( ...exprs ) {
        return exprs.length ? `${target}( ${exprs.join( ", " )} )` : `${target}()`
    }
    return exprs.length ? call(...exprs) : call
}

/* export function binary( op, ...exprs ) {
    function binary( left, right ) {
        if ( primitive(left, right) ) 
            return `${left} ${op} ${right}` 

        const length = fnlengths(left, right)
        return fnsetlength( function( ...args ) {
            let i = 0
            if (!primitive(left)) left = left(...args.slice(i, i += left.length))
            if (!primitive(right)) right = right(...args.slice(i, i += right.length))
            return `${left} ${op} ${right}`
        }, length )
    }

    return curry(binary, ...exprs)
} */
export function binary( op, ...exprs ) {
    function binary( left, right ) {
        if ( primitive(left, right) ) 
            return `${left} ${op} ${right}` 

        const length = fnlengths( left, right )
        return fnsetlength( function( ...args ) {
            const resolved = resolve( [left, right], args )
            const [rleft, rright] = resolved
            return binary(rleft, rright)
        }, length )
    }

    return curry(binary, ...exprs)
}
export function assign( ...exprs ) {
    return binary("=", ...exprs )
}

// Utils

export function callall( fn ) {
    return function ( x ) {
        return fn( ...Array.from( { length: fn.length }, () => x ) )
    }
}