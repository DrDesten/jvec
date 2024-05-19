import { JSDoc } from "./docgen.js"
/** @typedef {import("./docgen.js").JSDocStatement} JSDocStatement @typedef {import("./docgen.js").JSDocOptions} JSDocOptions */


/** 
 * @typedef {{name: string, type: string, expr?: string, optional: boolean, string: string, jsdoc: JSDocStatement}} Parameter 
 * @typedef {{prefix?: string, type?: string, compact?: boolean, indentFn?: (text:string, indent:number) => string, jsdocOpts?: JSDocOptions}} FunctionOptions
 */


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

/** @param {string} name @param {string} type @param {string} [expr] @param {boolean} [optional]  @returns {Parameter} */
export function fnParameter( name, type, expr, optional = !!expr ) {
    return {
        name, type, expr, optional,
        string: expr ? name + " = " + expr : name,
        jsdoc: ["param", type, optional ? `[${name}]` : name]
    }
}

/** @param {string[]} body @param {boolean} [compact]  */
function formatBody( body, compact = false ) {
    return body.map( statement =>
        statement.trim().split( "\n" ).map( line => "    " + line.trim() ).join( compact ? " " : "\n" )
    ).join( compact ? "; " : "\n" )
}

/** @param {string} name @param {Parameter[]} params @param {string|string[]} body  @param {FunctionOptions} [opts] @returns {string} */
export function fnDeclaration( name, params, body, opts = {} ) {
    opts = { compact: false, indentFn: forceIndent, ...opts }
    const fnJsdocStmts = params.map( p => p.jsdoc ).concat( opts.type ? [["returns", opts.type]] : [] )
    const fnJsdoc = JSDoc( fnJsdocStmts, opts.jsdocOpts )
    const fnBody = typeof body === "string" ? opts.indentFn( body, opts.compact ? 0 : 4 ) : formatBody( body, opts.compact )
    const fnParams = params.map( p => p.string ).join( ", " )
    const fnHead = `${opts.prefix ? `${opts.prefix} ` : ""}${name}(${fnParams ? ` ${fnParams} ` : ""})`
    const fnDecl = opts.compact ? `${fnHead} { ${fnBody} }` : `${fnHead} {\n${fnBody}\n}`
    return setIndent( `${fnJsdoc}\n${fnDecl}`, 4 )
}