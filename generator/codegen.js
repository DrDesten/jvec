import { JSDoc } from "./docgen.js"
/** @typedef {import("./docgen.js").JSDocStatement} JSDocStatement @typedef {import("./docgen.js").JSDocOptions} JSDocOptions */


/** 
 * @typedef {{default?: string, optional?: boolean, rest?: boolean}} ParameterOptions
 * @typedef {{name: string, type: string, expr?: string, optional: boolean, string: string, jsdoc: JSDocStatement}} Parameter 
 * @typedef {{prefix?: string, type?: string, description?: string, compact?: boolean, indentFn?: (text:string, indent:number) => string, jsdocOpts?: JSDocOptions}} FunctionOptions
 * @typedef {string|(x: any) => boolean} TypeCheckFunction
 * @typedef {{[check: string]: TypeCheckFunction}} TypeChecks
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
     * @param {TypeCheckFunction|TypeChecks} [check]
     * @param {TypeChecks} [checks]
     */
    constructor( name, check, checks ) {
        if ( typeof name === "string" ) {
            this.name = name
            this.check = check
            this.checks = checks ?? {}
        } else {
            this.name = name.map( t => /[^\w\s]/.test( t.name ) ? `(${t.name})` : t.name ).join( "|" )
            this.subtypes = name
            this.checks = check ?? {}
        }
        /** @type {Type[]=} */
        this.subtypes
        /** @type {string} */
        this.name
        /** @type {string=} */
        this.check
        /** @type {TypeChecks} */
        this.checks

        this._optional = null
        this._generatedChecks = null
    }

    toOptional() {
        this._optional ??= new Type( [this, Type.undefined] )
        this._optional.name = this.name
        this._optional._optional = this._optional
        return this._optional
    }
    toArray() {
        return Type.any
    }

    generateTypeError() {
        return `new TypeError( \`Expected Type '${this.name}', got [\${x?.constructor.name||typeof x}]: \${x}\` )`
    }
    generateCheckError( name ) {
        return `new Error( \`Failed optional check '${name}'. Got [\${x?.constructor.name||typeof x}]: \${x}\` )`
    }
    /** @returns {{type: [string, string], [check: string]: [string, string]}} */
    generateChecks() {
        if ( this._generatedChecks ) return this._generatedChecks
        if ( this.check ) {
            const checks = {}
            checks.type = [`(${this.check})(x)`, this.generateTypeError()]
            for ( const key in this.checks ) {
                checks[key] = [`(${this.checks[key]})(x)`, this.generateCheckError( key )]
            }
            return this._generatedChecks = checks
        } else if ( this.subtypes ) {
            const checks = {}
            const typeCheck = `(${this.subtypes.map( t => t.generateChecks().type[0] ).join( " || " )})(x)`
            checks.type = [typeCheck, this.generateTypeError()]
            return this._generatedChecks = checks
        }
    }
    /** @param {string[]} injections  @returns {string} */
    generateTypeCheckFunction( injections ) {
        const checks = this.generateChecks()
        return [
            `function ${this.name.replace( /\W+/g, "" )}( x ) {`,
            ...injections.map( injection => "    " + injection ),
            `    const result = ${checks.type[0]}`,
            `    if ( !result ) throw ${checks.type[1]}`,
            `}`,
        ].join( "\n" )
    }
    /** @returns {{[check: string]: string}} */
    generateCheckFunctions() {
        const functions = {}
        const checks = this.generateChecks()
        for ( const name in checks ) {
            if ( name === "type" ) continue
            const [check, errorMessage] = checks[name]
            functions[name] = [
                `function( x ) {`,
                `    const result = ${check}`,
                `    if ( !result ) throw ${errorMessage}`,
                `}`,
            ].join( "\n" )
        }
        return functions
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

    /** @param {FileBuilder} builder */
    tc( builder ) {
        this.tcInject = []
        this.tcInjectReturn = []

        const { body, params } = this
        for ( const param of params ) {
            if ( typeof param.type === "string" ) continue
            const tc_type = param.type.generateCheckFunctions()
            const tc_type_name = "tc_" + param.type.toString().replace( /\W+/g, "" )

            // generate optional checks
            const tc_function_injections = []
            for ( const [checkName, checkFunction] of Object.entries( tc_type ) ) {
                const tcid = builder.requestDeclaration( checkFunction, "tc_" + checkName, checkFunction )
                tc_function_injections.push( `${tcid}( x )` )
            }

            // Generate final check
            const tc_function = builder.requestDeclaration(
                param.type, tc_type_name,
                param.type.generateTypeCheckFunction( tc_function_injections )
            )
            this.tcInject.push( `${tc_function}( ${param.name} )` )
        }
        const type = this.opts.type
        if ( type instanceof Type ) {
            const tc_type = type.generateCheckFunctions()
            const tc_type_name = "tc_" + type.toString().replace( /\W+/g, "" )

            // generate optional checks
            const tc_function_injections = []
            for ( const [checkName, checkFunction] of Object.entries( tc_type ) ) {
                const tcid = builder.requestDeclaration( checkFunction, "tc_" + checkName, checkFunction )
                tc_function_injections.push( `${tcid}( x )` )
            }

            // Generate final check
            const tc_function = builder.requestDeclaration(
                type, tc_type_name,
                type.generateTypeCheckFunction( tc_function_injections )
            )
            this.tcInjectReturn.push( `${tc_function}( tc_return )` )
        }
    }

    /** @returns {string} */
    string() {
        const { name, params, body, opts: { prefix, compact, indentFn } } = this
        if ( this.tcInject || this.tcInjectReturn ) {
            body.unshift( "let tc_return", ...this.tcInject )
            body.forEach( ( stmt, i ) => body[i] = stmt.replace( /\breturn\b(?=[^\S\n]*\S)/g, "tc_return =" ) )
            body.push( ...this.tcInjectReturn, "return tc_return" )
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
}

export class FileBuilder {
    constructor() {
        /** @type {Set<string>} */
        this.identifiers = new Set
        /** @type {Map<any, string>} */
        this.identifierMap = new Map
        /** @type {string[]} */
        this.declarations = []

        this.appendix = 0
    }


    /** @param {any} key @param {string} proposedIdentifier @returns {{identifier: string, used: boolean}} */
    _requestIdentifier( key, proposedIdentifier ) {
        if ( this.identifierMap.has( key ) ) return {
            identifier: this.identifierMap.get( key ),
            used: true,
        }
        let identifier = proposedIdentifier
        if ( this.identifiers.has( identifier ) ) {
            identifier = proposedIdentifier + this.appendix.toString( 36 )
        }
        while ( this.identifiers.has( identifier ) ) {
            this.appendix++
            identifier = proposedIdentifier + this.appendix.toString( 36 )
        }
        this.identifiers.add( identifier )
        this.identifierMap.set( key, identifier )
        return {
            identifier,
            used: false,
        }
    }

    /** @param {any} key @param {string} proposedIdentifier */
    requestIdentifier( key, proposedIdentifier ) {
        return this._requestIdentifier( key, proposedIdentifier ).identifier
    }

    /** @param {any} key @param {string} proposedIdentifier @param {string} expression */
    requestDeclaration( key, proposedIdentifier, expression ) {
        const request = this._requestIdentifier( key, proposedIdentifier )
        if ( request.used ) return request.identifier
        this.declarations.push( `const ${request.identifier} = ${expression}` )
        return request.identifier
    }

    /** @param {(string|Fn)[]} elements @param {boolean} [typecheck=false] */
    buildFile( elements, typecheck = false ) {
        elements = elements.flat( Infinity )
        let file = ""

        if ( typecheck ) {
            for ( const element of elements ) {
                if ( element instanceof Fn ) {
                    element.tc( this )
                }
            }
            file += this.declarations.join( "\n" ) + "\n\n"
        }

        for ( const [i, element] of elements.entries() ) {
            if ( element instanceof Fn ) {
                file += element.decl()
                element.opts.compact && elements[i + 1]?.opts?.compact
                    ? file += "\n" : file += "\n\n"
            } else {
                file += element + "\n\n"
            }
        }

        return file.trimEnd()
    }
}