/** 
 * @param {number} p1 stop index | start index if p2 is defined
 * @param {number} [p2] stop index
 */
export function Range( p1, p2 ) {
    const start = p2 === undefined ? 0 : +p1
    const stop = p2 === undefined ? +p1 : +p2
    return Array.from( { length: stop - start }, ( _, i ) => start + i )
}


/** @param {string} string @param {number} [indent] */
export function forceIndent( string, indent = 0 ) {
    return string.trim().replace( /^\s*/gm, " ".repeat( indent ) )
}
/** @param {string} string @param {number} [indent] */
export function setIndent( string, indent = 0 ) {
    string = string.replace( /(?<=\r?\n|^)\s*(\r?\n)|\s*$/g, "" )
    const minIndent = Math.min(
        ...string.split( /\r?\n/g ).map( line => line.search( /\S/ ) ) )
    string = string.split( /\r?\n/g )
        .map( line => " ".repeat( indent ) + line.slice( minIndent ) ).join( "\n" )
    return string
}