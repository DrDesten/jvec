/** 
 * @param {number} p1 stop index | start index if p2 is defined
 * @param {number} [p2] stop index
 */
export function Range( p1, p2 ) {
    const start = p2 === undefined ? 0 : +p1
    const stop = p2 === undefined ? +p1 : +p2
    return Array.from( { length: stop - start }, ( _, i ) => start + i )
}