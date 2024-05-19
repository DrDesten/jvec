/** 
 * @param {number} p1 stop index | start index if p2 is defined
 * @param {number} [p2] stop index
 */
export function Range( p1, p2 ) {
    const start = p2 === undefined ? 0 : +p1
    const stop = p2 === undefined ? +p1 : +p2
    return Array.from( { length: stop - start }, ( _, i ) => start + i )
}

/**
 * @typedef {[string, string?, string?, string?]} JSDocStatement
 * @typedef {{multiline?: boolean}} JSDocOptions
 */

/** @param {JSDocStatement[]} [statements] @param {JSDocOptions} [options]  */
export function JSDoc( statements = [], options = {} ) {
    // Set defaults
    options = { multiline: false, ...options }

    // Preprocess Statements
    statements = statements.map( ( [tag, type, name, description] ) =>
        `@${tag}${type ? ` {${type}}` : ``}${name ? ` ${name}` : ``}${description ? ` ${description}` : ``}`
    )

    if ( options.multiline ) {
        statements = statements.map( s => " * " + s )
        return `/**\n${statements.join( "\n" )}\n */`
    } else {
        return `/** ${statements.join( " " )} */`
    }
}

/** @param {string} tag @param {string} [type] @param {string} [name] @param {string} [description] */
function JSDocCurryObject( tag, type, name, description ) {

}