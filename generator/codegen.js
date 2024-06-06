import { JSDoc } from "./docgen.js"
/** @typedef {import("./docgen.js").JSDocStatement} JSDocStatement @typedef {import("./docgen.js").JSDocOptions} JSDocOptions */


/** 
 * @typedef {{default?: string, optional?: boolean, rest?: boolean}} ParameterOptions
 * @typedef {{name: string, type: string, expr?: string, optional: boolean, string: string, jsdoc: JSDocStatement}} Parameter 
 * @typedef {{prefix?: string, type?: string, description?: string, compact?: boolean, indentFn?: (text:string, indent:number) => string, jsdocOpts?: JSDocOptions}} FunctionOptions
 */

export class Type {
    static undefined = new Type( "undefined", x => x === undefined )
    static null = new Type( "null", x => x === null )
    static boolean = new Type( "boolean", x => typeof x === "boolean" )
    static bigint = new Type( "bigint", x => typeof x === "bigint" )
    static number = new Type( "number", x => typeof x === "number" )
    static symbol = new Type( "symbol", x => typeof x === "symbol" )
    static string = new Type( "string", x => typeof x === "string" )
    static function = new Type( "function", x => typeof x === "function" )
    static object = new Type( "object", x => typeof x === "object" )
    static any = new Type( "any", () => true )

    /**
     * @param {string|Type[]} name 
     * @param {string|(x: any) => boolean} check
     */
    constructor( name, check ) {
        if ( typeof name === "string" ) {
            this.name = name
            this.check = `( ${check} )(x)`
        } else {
            this.name = name.map( t => /[^\w\s]/.test( t.name ) ? `(${t.name})` : t.name ).join( "|" )
            this.check = `( x => ${name.map( t => t.check ).join( "||" )} )(x)`
        }
        /** @type {string} */
        this.name
        /** @type {string} */
        this.check

        this._optional = null
    }

    toOptional() {
        this._optional ??= new Type( [this, Type.undefined] )
        this._optional._optional = this._optional
        return this._optional
    }
    toArray() {
        return Type.any
    }

    toString() {
        return this.name
    }
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

/**
 * @typedef {{expr?: string, optional?: boolean, rest?: boolean}} FnParamOpts
 * @typedef {{prefix?: string, type?: string|Type, description?: string, compact?: boolean, indentFn?: (text:string, indent:number) => string, jsdocOpts?: JSDocOptions}} FnOpts
 */

class FnParam {
    /** @type {FnParamOpts} */
    static DefaultOpts = { expr: undefined, optional: false, rest: false }
    /** @param {string} name @param {Type|string} type @param {FnParamOpts} [opts] */
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
        return ["param", type.toString(), name, { optional: optional, default: expr }]
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

        this.params.forEach( param => {
            if ( param.type instanceof Type ) {
                param.opts.optional && ( param.type = param.type.toOptional() )
                param.opts.rest && ( param.type = param.type.toArray() )
            }
        } )
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

    /** @param {string} identifier @param {Type} type */
    #tcGenerateCheck( identifier, type ) {
        return [
            `function ${identifier}( x ) {`,
            `    const result = ${type.check}`,
            `    if ( !result ) throw new TypeError( \`Expected Type '${type}', got [\${x?.constructor?.name||typeof x}]: \${x}\` )`,
            `}`
        ].join( "\n" )
    }
    /** @param {Type} type @param {Set<string>} usedIdentifiers @param {Map<Type,string>} identifierMap @param {string[]} declarations */
    #tcResolveId( type, usedIdentifiers, identifierMap, declarations ) {
        if ( identifierMap.has( type ) ) return identifierMap.get( type )
        let tcid = `tc_${type.toString().replace( /\W/g, "" )}`
        while ( usedIdentifiers.has( tcid ) ) {
            tcid += Math.floor( Math.random() * 36 ).toString( 36 )
        }
        usedIdentifiers.add( tcid )
        identifierMap.set( type, tcid )
        declarations.push( this.#tcGenerateCheck( tcid, type ) )
        return tcid
    }
    /** @param {Set<string>} usedIdentifiers @param {Map<Type,string>} identifierMap @param {string[]} declarations */
    tc( usedIdentifiers, identifierMap, declarations ) {
        this.tcMap = identifierMap
        this.tcInject = []
        this.tcInjectEnd = []

        const { body, params, opts: { type } } = this
        for ( const { name, type } of params ) {
            if ( typeof type === "string" ) continue
            const tcid = this.#tcResolveId( type, usedIdentifiers, identifierMap, declarations )
            this.tcInject.push( `${tcid}( ${name} )` )
        }
        if ( type instanceof Type && body.some( s => /return\s+this/g.test( s ) ) ) {
            const tcid = this.#tcResolveId( type, usedIdentifiers, identifierMap, declarations )
            this.tcInjectEnd.push( `${tcid}( this )` )
        }
    }

    /** @returns {string} */
    string() {
        const { name, params, body, opts: { prefix, compact, indentFn } } = this
        if ( this.tcInject || this.tcInjectEnd ) {
            body.unshift( ...this.tcInject )
            if ( body.length > this.tcInject.length + 1 )
                body.splice( -1, 0, ...this.tcInject )
            body.splice( -1, 0, ...this.tcInjectEnd )
        }
        const fnParams = params.map( p => p.string() ).join( ", " )
        const fnBody = body.map( stmt =>
            stmt.split( "\n" ).map( l => l.trimEnd() ).filter( x => x ).join( "\n" ) )
            .join( compact ? "; " : "\n" )
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
            type ? [["returns", type + ""]] : [],
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

    /** @param {(string|Fn)[]} elements @param {boolean} [typecheck=false] */
    static buildClass( elements, typecheck = false ) {
        elements = elements.flat( Infinity )
        let classDecl = ""

        if ( typecheck ) {
            const tcUsedIdentifiers = new Set
            const tcIdentifiers = new Map
            const tcDeclarations = []

            for ( const element of elements ) {
                if ( element instanceof Fn ) {
                    element.tc( tcUsedIdentifiers, tcIdentifiers, tcDeclarations )
                }
            }
            classDecl += tcDeclarations.join( "\n" ) + "\n\n"
        }

        for ( const [i, element] of elements.entries() ) {
            if ( element instanceof Fn ) {
                classDecl += element.decl()
                element.opts.compact && elements[i + 1]?.opts?.compact
                    ? classDecl += "\n" : classDecl += "\n\n"
            } else {
                classDecl += element + "\n\n"
            }
        }

        return classDecl.trimEnd()
    }
}