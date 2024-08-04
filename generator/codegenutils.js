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

export function index( target, expression = none ) {
    function index( target, expression ) {
        return `${target}[${expression}]`
    }

    if (expression === none) return expression => index(target, expression)
    return index(target, expression)
}
export function binary( op, left = none, right = none ) {
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

    if ( left === none ) 
        return (left, right = none ) =>
            right === none 
                ? right => binary(left, right)
                : binary(left, right)
    if (right === none)
        return right => binary(left, right)
    return binary(left, right)
}

export function assign( left, right = none ) {
    return binary("=")( left, right )
}