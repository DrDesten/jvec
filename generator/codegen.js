import { JSDoc } from "./docgen.js"
/** @typedef {import("./docgen.js").JSDocStatement} JSDocStatement @typedef {import("./docgen.js").JSDocOptions} JSDocOptions */


/** 
 * @typedef {{default?: string, optional?: boolean, rest?: boolean}} ParameterOptions
 * @typedef {{name: string, type: string, expr?: string, optional: boolean, string: string, jsdoc: JSDocStatement}} Parameter 
 * @typedef {{prefix?: string, type?: string, description?: string, compact?: boolean, indentFn?: (text:string, indent:number) => string, jsdocOpts?: JSDocOptions}} FunctionOptions
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

/** @param {string} name @param {string} type @param {ParameterOptions} [options] @returns {Parameter} */
export function fnParameter( name, type, options = {} ) {
    options = { default: "", optional: !!options.default, rest: false, ...options }
    const { default: expr, optional, rest } = options
    return {
        name, type, expr, optional,
        string: ( rest ? "..." : "" ) + name + ( expr ? " = " + expr : "" ),
        jsdoc: ["param", type, name, { optional, default: expr }]
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
    const fnJsdocStmts = []
    opts.description && fnJsdocStmts.push( [opts.description] )
    fnJsdocStmts.push( ...params.map( p => p.jsdoc ) )
    opts.type && fnJsdocStmts.push( ["returns", opts.type] )
    const fnJsdoc = JSDoc( fnJsdocStmts, opts.jsdocOpts )
    const fnBody = typeof body === "string" ? opts.indentFn( body, opts.compact ? 0 : 4 ) : formatBody( body, opts.compact )
    const fnParams = params.map( p => p.string ).join( ", " )
    const fnHead = `${opts.prefix ? `${opts.prefix} ` : ""}${name}(${fnParams ? ` ${fnParams} ` : ""})`
    const fnDecl = opts.compact ? `${fnHead} { ${fnBody} }` : `${fnHead} {\n${fnBody}\n}`
    return setIndent( `${fnJsdoc}\n${fnDecl}`, 4 )
}