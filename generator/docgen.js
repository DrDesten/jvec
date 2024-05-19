/**
 * @typedef {[string, string?, string?, string?]} JSDocStatement [ tag, type?, name?, description? ]
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