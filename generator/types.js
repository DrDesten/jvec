import { RegLexer, TokenMatcher, Token } from "../RegLexer/index.js"

class Node {
    check() {
        return `function ( x ) { return ${this._check_expr()} }`
    }
}

class NUndefined extends Node {
    static _check_expr = "x === undefined"
    _check_expr() { return NUndefined._check_expr }
}
class NNull extends Node {
    static _check_expr = "x === null"
    _check_expr() { return NNull._check_expr }
}
class NBoolean extends Node {
    static _check_expr = "typeof x === 'boolean'"
    _check_expr() { return NBoolean._check_expr }
}
class NNumber extends Node {
    static _check_expr = "typeof x === 'number'"
    _check_expr() { return NNumber._check_expr }
}
class NBigint extends Node {
    static _check_expr = "typeof x === 'bigint'"
    _check_expr() { return NBigint._check_expr }
}
class NSymbol extends Node {
    static _check_expr = "typeof x === 'symbol'"
    _check_expr() { return NSymbol._check_expr }
}
class NString extends Node {
    static _check_expr = "typeof x === 'string'"
    _check_expr() { return NString._check_expr }
}
class NAny extends Node {
    static _check_expr = "true"
    _check_expr() { return NAny._check_expr }
}

class NArray extends Node {
    constructor( node ) { super(); this.child = node }
    _check_expr() { return `x instanceof Array && x.every( x => ( ${this.child._check_expr()} ) )` }
}
class NAnd extends Node {
    constructor( nodes ) { super(); this.children = nodes }
    _check_expr() { return `${this.children.map( node => `( ${node._check_expr()} )` ).join( " && " )}` }
}
class NOr extends Node {
    constructor( nodes ) { super(); this.children = nodes }
    _check_expr() { return `${this.children.map( node => `( ${node._check_expr()} )` ).join( " || " )}` }
}

const Tokens = [
    new TokenMatcher( "Whitespace", /\s+/, { ignore: true } ),

    new TokenMatcher( "undefined", /\bundefined\b/ ),
    new TokenMatcher( "null", /\bnull\b/ ),
    new TokenMatcher( "boolean", /\bboolean\b/ ),
    new TokenMatcher( "number", /\bnumber\b/ ),
    new TokenMatcher( "bigint", /\bbigint\b/ ),
    new TokenMatcher( "symbol", /\bsymbol\b/ ),
    new TokenMatcher( "string", /\bstring\b/ ),
    new TokenMatcher( "any", /\bany\b/ ),

    new TokenMatcher( "Spread", /\.\.\./ ),
    new TokenMatcher( "Array", /\[]/ ),
    new TokenMatcher( "Arrow", /=>/ ),

    new TokenMatcher( "LParen", /\(/ ),
    new TokenMatcher( "RParen", /\)/ ),
    new TokenMatcher( "LBrack", /\[/ ),
    new TokenMatcher( "RBrack", /\]/ ),
    new TokenMatcher( "LBrace", /\{/ ),
    new TokenMatcher( "RBrace", /\}/ ),

    new TokenMatcher( "Colon", /:/ ),
    new TokenMatcher( "Comma", /,/ ),
    new TokenMatcher( "Dot", /\./ ),
    new TokenMatcher( "Or", /\|/ ),
    new TokenMatcher( "And", /&/ ),
]

const Test = [
    "number", "any",
    "number[]", "any[]", "number[][]", "any[][]",
    "boolean|number",
    "(boolean|number)[]",
]

const Lexer = new RegLexer( Tokens )

/* console.log( Lexer.regex )
for ( const test of Test ) {
    console.log( Lexer.lex( test ) )
} */

function ParseType( string ) {
    let index = 0
    const tokens = Lexer.lex( string )
    if ( tokens.some( x => x instanceof Error ) )
        return tokens.filter( x => x instanceof Error )
    return parse()

    function peek() {
        return tokens[index]
    }
    function advance() {
        return tokens[index++]
    }
    function advanceIf( name ) {
        return peek() && peek().name === name ? advance() : false
    }
    function expect( name ) {
        const token = advanceIf( name )
        if ( !token ) throw new Error(`Expected Token "${name}" but got "${token.name}"`)
        return token
    }
    function parse() {
        return parseOr()
    }

    function parseOr() {
        let node = parseAnd()
        if ( advanceIf( "Or" ) ) {
            node = new NOr( [node] )
            do {
                node.children.push( parseAnd() )
            } while ( advanceIf( "Or" ) )
        }
        return node
    }

    function parseAnd() {
        let node = parsePostfix()
        if ( advanceIf( "And" ) ) {
            node = new NAnd( [node] )
            do {
                node.children.push( parsePostfix() )
            } while ( advanceIf( "And" ) )
        }
        return node
    }

    function parsePostfix() {
        let node = parseAtom()
        while ( peek() ) {
            if ( advanceIf( "Array" ) ) {
                node = new NArray( node )
                continue
            }
            break
        }
        return node
    }

    function parseAtom() {
        const token = advance()
        if ( token.name === "LParen" ) {
            const node = parse()
            expect("RParen")
            return node
        }
        return new ( {
            undefined: NUndefined,
            null: NNull,
            boolean: NBoolean,
            number: NNumber,
            bigint: NBigint,
            symbol: NSymbol,
            string: NString,
            any: NAny,
        }[token.name] )
    }
}


for ( const test of Test ) {
    //console.log( ParseType( test ) )
    console.log( ParseType( test ).check() )
}