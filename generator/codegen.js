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

/**
 * @typedef {{expr?: string, optional?: boolean, rest?: boolean}} FnParamOpts
 * @typedef {{prefix?: string, type?: string, description?: string, compact?: boolean, indentFn?: (text:string, indent:number) => string, jsdocOpts?: JSDocOptions}} FnOpts
 */

class FnParam {
    /** @type {FnParamOpts} */
    static DefaultOpts = { expr: undefined, optional: false, rest: false }
    /** @param {string} name @param {string} type @param {FnParamOpts} [opts] */
    constructor( name, type, opts = {} ) {
        this.name = name
        this.type = type

        opts.optional ||= !!opts.expr
        this.opts = { ...FnParam.DefaultOpts, ...opts }
    }
    /** @returns {string} */
    string() {
        const { expr, rest } = this.opts
        return ( rest ? "..." : "" ) + this.name + ( expr ? " = " + expr : "" )
    }
    /** @returns {JSDocStatement} */
    jsdoc() {
        const { type, name, opts: { optional, expr } } = this
        return ["param", type, name, { optional: optional, default: expr }]
    }
}

export class Fn {
    static Param = FnParam
    /** @type {FnOpts} */
    static DefaultOpts = { prefix: '', type: '', description: '', compact: false, indentFn: forceIndent, jsdocOpts: {} }
    /** @param {string} name @param {FnParam|FnParam[]} params @param {string|string[]} body @param {FnOpts} [opts] */
    constructor( name, params, body, opts = {} ) {
        this.name = name
        this.params = params instanceof Array ? params : [params]
        this.body = body instanceof Array ? body : [body]

        this.opts = { ...Fn.DefaultOpts, ...opts }
    }
    /** @returns {Fn} */
    clone() {
        return structuredClone( this )
    }

    /** @param {RegExp} regex @param {string} replacer */
    replace( regex, replacer ) {
        this.body = this.body.map( statement => statement.replace( regex, replacer ) )
    }
    /** @param {string} current @param {string} replacement */
    replaceVariable( current, replacement ) {
        this.replace( new RegExp( `\\b${current}\\b`, "g" ), replacement )
    }

    /** @returns {string} */
    string() {
        const { name, params, body, opts: { prefix, compact, indentFn } } = this
        const fnParams = params.map( p => p.string() ).join( ", " )
        const fnBody = body.map( stmt => stmt.split( "\n" ).map( l => l.trimEnd() ).join( "\n" ) ).join( compact ? "; " : "\n" )
        const fnHead = `${prefix ? `${prefix} ` : ""}${name}(${fnParams ? ` ${fnParams} ` : ""})`
        const fnDecl = compact ? `${fnHead} { ${fnBody} }` : `${fnHead} {\n${indentFn( fnBody, 4 )}\n}`
        return fnDecl
    }
    /** @returns {string} */
    jsdoc() {
        const { params, opts: { type, description, jsdocOpts } } = this
        return JSDoc( [].concat(
            description ? [description] : [],
            params.map( p => p.jsdoc() ),
            type ? [["returns", type]] : [],
        ), jsdocOpts )
    }
    /** @returns {string} */
    decl() {
        const fnDecl = this.jsdoc() + "\n" + this.string()
        return setIndent( fnDecl, 4 )
    }

    /** @returns {string} */
    toString() {
        return this.decl()
    }

    // Statics

    /** @param {string} name @param {[FnParam|FnParam[],FnParam|FnParam[]]} params @param {string|string[]} body @param {FnOpts} [opts] @param {...[RegExp|string,string]} variableReplacers */
    static autoStatic( name, [paramsNonstatic, paramsStatic], body, opts, ...variableReplacers ) {
        body = body instanceof Array ? body : [body]
        paramsStatic = paramsStatic instanceof Array ? [...paramsStatic] : [paramsStatic]

        const returns = body.some( stmt => /\breturn\b/.test( stmt ) )
        const bodyNonstatic = returns ? body : [...body, "return this"]
        const bodyStatic = returns ? body : [...body, "return target"]
        returns || paramsStatic.push( new FnParam( "target", opts.type, { expr: `new ${opts.type}` } ) )

        const fnNonstatic = new Fn( name, paramsNonstatic, bodyNonstatic, opts )
        const fnStatic = new Fn( name, paramsStatic, bodyStatic, { ...opts, prefix: "static" } )

        fnNonstatic.replace( /([a-zA-Z_$][a-zA-Z_$0-9]*(?:\[\d+\])*)\s*=\s*\1\s*([+\-*/%]|\*\*)(?=\s*[a-zA-Z_$][a-zA-Z_$0-9]*(?:\[\d+\])*\s*$)/, "$1 $2=" )
        variableReplacers.forEach( ( [regex, replacement] ) => fnStatic.replace( regex, replacement ) )

        return [fnNonstatic, fnStatic]
    }
}