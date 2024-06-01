// Node includes
import path from "path"
import url from "url"
import { writeFileSync } from "fs"
import { join } from "path"
const __dirname = path.dirname( url.fileURLToPath( import.meta.url ) )

// Custom includes
import { setIndent, forceIndent, fnParameter, fnDeclaration, Fn } from "./codegen.js"
import { JSDoc } from "./docgen.js"
/** @typedef {import("./docgen.js").JSDocStatement} JSDocStatement @typedef {import("./docgen.js").JSDocOptions} JSDocOptions */
import { Range } from "./genlib.js"

const MIN_DIMENSION = 2
const MAX_DIMENSION = 4
const OUTPUT_DIR = "../bin"

for ( let dim = MIN_DIMENSION; dim <= MAX_DIMENSION; dim++ ) {
    const file = generateVector( dim )
    writeFileSync( join( __dirname, OUTPUT_DIR, `vec${dim}.js` ), file, { encoding: "utf8" } )
}
for ( let dim = MIN_DIMENSION; dim <= MAX_DIMENSION; dim++ ) {
    const file = generateMatrix( dim )
    writeFileSync( join( __dirname, OUTPUT_DIR, `mat${dim}.js` ), file, { encoding: "utf8" } )
}

const vec = Range( MIN_DIMENSION, MAX_DIMENSION + 1 )
    .map( dim => `export { vec${dim} } from "./vec${dim}.js"` )
    .join( "\n" )
const mat = Range( MIN_DIMENSION, MAX_DIMENSION + 1 )
    .map( dim => `export { mat${dim} } from "./mat${dim}.js"` )
    .join( "\n" )
writeFileSync( join( __dirname, OUTPUT_DIR, `vec.js` ), vec, { encoding: "utf8" } )
writeFileSync( join( __dirname, OUTPUT_DIR, `mat.js` ), mat, { encoding: "utf8" } )

// ------------------------------
// generate()
// ------------------------------

/** @param {number} dimension vector dimension */
function generateVector( dimension ) {

    const TYPE = `vec${dimension}`
    const TYPELIKE = `${TYPE}Like`
    const TYPELIKE_OR_NUM = `number|${TYPELIKE}`
    const IFNUM = ( isnum, notnum, varname = "x" ) => `typeof ${varname} === "number" ? ${isnum} : ${notnum}`
    const iMapXYZW = "xyzw"
    const iMapRGBA = "rgba"

    const DRANGE = Range( dimension )
    /** @param {(component: number) => any} callback @param {string} [join] */
    const DMAP = function ( callback, join = ", " ) {
        return DRANGE.map( callback ).join( join )
    }

    const Param_s = new Fn.Param( "s", "number" )
    const Param_v = new Fn.Param( "v", TYPELIKE )
    const Param_x = new Fn.Param( "x", TYPELIKE_OR_NUM )
    const Param_v1 = new Fn.Param( "v1", TYPELIKE )
    const Param_v2 = new Fn.Param( "v2", TYPELIKE )
    const Params_v1v2 = [Param_v1, Param_v2]
    const Param_target = new Fn.Param( "target", TYPE, { expr: `new ${TYPE}` } )

    function bodyThis( statements ) {
        return [...statements, "return this"]
    }
    function bodyTarget( statements ) {
        return [...statements, "return target"]
    }

    function title( text, indent = 0 ) {
        return forceIndent( `
            // ${"#".repeat( 47 )}
            //      ${text}
            // ${"#".repeat( 47 )}
        `, indent )
    }
    function subtitle( text, indent = 4 ) {
        return forceIndent( `
            // ${"-".repeat( 27 )}
            //      ${text}
            // ${"-".repeat( 27 )}
        `, indent )
    }

    function constructors() {
        function constructor() {
            const objectParamType = `${TYPELIKE_OR_NUM}|{${DMAP( i => `${iMapXYZW[i]}: number` )}}|{${DMAP( i => `${iMapRGBA[i]}: number` )}}`
            const params = [
                new Fn.Param( "object", objectParamType, { expr: "0" } ),
                ...DRANGE.slice( 1 ).map( i => new Fn.Param( iMapXYZW[i], "number", { optional: true } ) ),
            ]
            const body = `
if ( typeof object === "number" )
    y === undefined
        ? ( ${DMAP( i => `this[${i}] = object` )} )
        : ( this[0] = object, this[1] = +y${DRANGE.slice( 2 ).map( i => `, this[${i}] = +( ${iMapXYZW[i]} ?? 0 )` ).join( "" )} )
else
${DMAP( i => `    this[${i}] = +( object[${i}] ?? object.${iMapXYZW[i]} ?? object.${iMapRGBA[i]} ?? 0 )`, ",\n" )}
${DMAP( i => `/** @type {number} ${iMapXYZW[i]}-coordinate of the vector */\nthis[${i}]`, "\n" )}
            `
            return new Fn( "constructor", params, body, { indentFn: setIndent, jsdocOpts: { multiline: true } } )
        }
        function fromArray() {
            const params = [new Fn.Param( "array", "ArrayLike<number>" ), new Fn.Param( "index", "number", { expr: "0" } ), new Fn.Param( "stride", "number", { expr: "1" } )]
            const body = `return new ${TYPE}( ${DMAP( i => `array[${i} * stride + index]` )} )`
            return new Fn( `fromArray`, params, body, { prefix: "static", type: TYPE } )
        }
        function fromFunction() {
            const params = new Fn.Param( "fn", "(index: number) => number" )
            const body = `return new ${TYPE}( ${DMAP( i => `fn( ${i} )` )} )`
            return new Fn( `fromFunction`, params, body, { prefix: "static", type: TYPE } )
        }
        function fromAngle2() {
            const params = new Fn.Param( "angle", "number" )
            const body = `return new vec2( Math.cos( angle ), Math.sin( angle ) )`
            return new Fn( `fromAngle`, params, body, { prefix: "static", type: TYPE } )
        }
        function random() {
            const body = `return new ${TYPE}( ${DMAP( _ => `Math.random()` )} )`
            return new Fn( `random`, [], body, { prefix: "static", type: TYPE } )
        }
        function randomNorm() {
            const body = `return new ${TYPE}( ${DMAP( _ => `randomNorm()` )} )`
            return new Fn( `randomNorm`, [], body, { prefix: "static", type: TYPE } )
        }
        function randomDir() {
            const body = `return new ${TYPE}( ${DMAP( _ => `randomNorm()` )} ).normalize()`
            return new Fn( `randomDir`, [], body, { prefix: "static", type: TYPE } )
        }
        function randomSphere() {
            const body = `return new ${TYPE}( ${DMAP( _ => `randomNorm()` )} ).setLength( Math.random() ** (1/${dimension}) )`
            return new Fn( `randomSphere`, [], body, { prefix: "static", type: TYPE } )
        }

        const functions = [constructor(), fromArray(), fromFunction()]
        if ( dimension === 2 ) functions.push( fromAngle2() )
        functions.push( random(), randomNorm(), randomDir(), randomSphere() )
        return functions.join( "\n\n" )
    }

    function fields() {
        const permutations = [DRANGE.map( i => [i] )]
        for ( let i = 1; i < MAX_DIMENSION; i++ ) {
            const lastPermutation = permutations.at( -1 )
            const nextPermutations = []
            for ( const permutation of lastPermutation ) {
                for ( const j of DRANGE ) {
                    nextPermutations.push( [...permutation, j] )
                }
            }
            permutations.push( nextPermutations )
        }
        const getset = permutations.flat().map( perm => {
            const name1 = perm.map( i => iMapXYZW[i] ).join( "" )
            const name2 = perm.map( i => iMapRGBA[i] ).join( "" )
            const dim = perm.length

            if ( dim === 1 ) {
                const getterBody = `return this[${perm[0]}]`
                const getter1 = new Fn( name1, [], getterBody, { prefix: "get", type: "number", compact: true } )
                const getter2 = new Fn( name2, [], getterBody, { prefix: "get", type: "number", compact: true } )
                const setterBody = `this[${perm[0]}] = s`
                const setter1 = new Fn( name1, Param_s, setterBody, { prefix: "set", compact: true } )
                const setter2 = new Fn( name2, Param_s, setterBody, { prefix: "set", compact: true } )
                return [getter1, setter1, getter2, setter2]
            }

            const type = `vec${dim}`
            const getterBody = `return new ${type}( ${Range( dim ).map( i => `this[${perm[i]}]` ).join( ", " )} )`
            const getter1 = new Fn( name1, [], getterBody, { prefix: "get", type: type, compact: true } )
            const getter2 = new Fn( name2, [], getterBody, { prefix: "get", type: type, compact: true } )
            const out = [getter1, getter2]

            if ( new Set( perm ).size === dim ) {
                const setterParam = new Fn.Param( "v", `vec${dim}Like` )
                const setterBody = Range( dim ).map( i => `this[${perm[i]}] = v[${i}]` ).join( ", " )
                const setter1 = new Fn( name1, setterParam, setterBody, { prefix: "set", compact: true } )
                const setter2 = new Fn( name2, setterParam, setterBody, { prefix: "set", compact: true } )
                out.push( setter1, setter2 )
            }

            return out
        } )

        return getset.flat().join( "\n" )
    }

    function set() {
        const params = [
            new Fn.Param( "x", TYPELIKE_OR_NUM ),
            ...DRANGE.slice( 1 ).map( i => new Fn.Param( iMapXYZW[i], "number", { optional: true } ) )
        ]
        const body = [
            `typeof x === "number"`,
            `    ? ( ${DMAP( i => `this[${i}] = ${iMapXYZW[i]}` )} )`,
            `    : ( ${DMAP( i => `this[${i}] = x[${i}]` )} )`,
            `return this`
        ]
        return new Fn( "set", params, body, { type: TYPE, indentFn: setIndent } )
    }

    function clone() {
        return new Fn( "clone", [], `return new ${TYPE}( this )`, { type: TYPE } )
    }

    function iterator() {
        return setIndent( `
            *[Symbol.iterator]() {
${DMAP( i => `                yield this[${i}]`, "\n" )}
            }`, 4 )
    }

    function conversion() {
        const arrayExpr = `[${DMAP( i => `this[${i}]` )}]`
        const conversions = [
            [
                new Fn( "toString", [], `return \`(${DMAP( i => `\${this[${i}]}` )})\``, { type: "string", compact: true } ),
                new Fn( "toArray", [], `return ${arrayExpr}`, { type: "number[]", compact: true } ),
                new Fn( "toInt8Array", [], `return new Int8Array( ${arrayExpr} )`, { type: "Int8Array", compact: true } ),
                new Fn( "toUint8Array", [], `return new Uint8Array( ${arrayExpr} )`, { type: "Uint8Array", compact: true } ),
                new Fn( "toUint8ClampedArray", [], `return new Uint8ClampedArray( ${arrayExpr} )`, { type: "Uint8ClampedArray", compact: true } ),
                new Fn( "toInt16Array", [], `return new Int16Array( ${arrayExpr} )`, { type: "Int16Array", compact: true } ),
                new Fn( "toUint16Array", [], `return new Uint16Array( ${arrayExpr} )`, { type: "Uint16Array", compact: true } ),
                new Fn( "toInt32Array", [], `return new Int32Array( ${arrayExpr} )`, { type: "Int32Array", compact: true } ),
                new Fn( "toUint32Array", [], `return new Uint32Array( ${arrayExpr} )`, { type: "Uint32Array", compact: true } ),
                new Fn( "toFloat32Array", [], `return new Float32Array( ${arrayExpr} )`, { type: "Float32Array", compact: true } ),
                new Fn( "toFloat64Array", [], `return new Float64Array( ${arrayExpr} )`, { type: "Float64Array", compact: true } ),
            ].join( "\n" )
        ]

        function cssColor() {
            const params = new Fn.Param( "options", "{hex?: boolean}", { expr: "{}" } )
            const body = `
if ( options.hex ) {
${DMAP( i => `    const ${iMapRGBA[i]} = Math.round( Math.min( Math.max( this[${i}] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )`, "\n" )}
    return \`#${DMAP( i => `\${${iMapRGBA[i]}}`, "" )}\`
} else {
${DMAP( i => `    const ${iMapRGBA[i]} = Math.min( Math.max( this[${i}] * 100, 0 ), 100 )`, "\n" )}
    return \`${iMapRGBA.slice( 0, dimension )}(${DMAP( i => `\${${iMapRGBA[i]}}%` )})\`
}`
            return new Fn( "toCSSColor", params, body, { type: "string", indentFn: setIndent } )
        }
        if ( dimension >= 3 ) conversions.push( cssColor() )
        return conversions.join( "\n\n" )
    }

    function boolean() {
        function eq() {
            const body = [`return ${DMAP( i => `this[${i}] === v[${i}]`, " && " )}`]
            return Fn.autoStatic( "eq", [Param_v, Params_v1v2], body, { type: "boolean" }, [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] )
        }
        function neq() {
            const body = [`return ${DMAP( i => `this[${i}] !== v[${i}]`, " || " )}`]
            return Fn.autoStatic( "neq", [Param_v, Params_v1v2], body, { type: "boolean" }, [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] )
        }

        function all() {
            const body = [`return ${DMAP( i => `!!this[${i}]`, " && " )}`]
            return Fn.autoStatic( "all", [[], Param_v], body, { type: "boolean" }, [/\bthis\b/g, "v"] )
        }
        function any() {
            const body = [`return ${DMAP( i => `!!this[${i}]`, " || " )}`]
            return Fn.autoStatic( "any", [[], Param_v], body, { type: "boolean" }, [/\bthis\b/g, "v"] )
        }

        const operations = [
            ["greaterThan", ">"],
            ["greaterThanEqual", ">="],
            ["lessThan", "<"],
            ["lessThanEqual", "<="],
            ["equal", "==="],
            ["notEqual", "!=="]
        ]

        function operation( name, op ) {
            const body = DRANGE.map( i => `this[${i}] = +( this[${i}] ${op} v[${i}] )` )
            return Fn.autoStatic( name, [Param_v, Params_v1v2], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] )
        }

        function not() {
            const body = DRANGE.map( i => `this[${i}] = +!this[${i}]` )
            return Fn.autoStatic( "not", [[], Param_v], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] )
        }

        const functions = [
            eq(), neq(),
            all(), any(),
            ...operations.flatMap( ( [name, op] ) => operation( name, op ) ),
            not(),
        ].flat( 1 )
        return functions.join( "\n\n" )
    }

    function arithmetic() {
        const operations = [
            ["add", "+"],
            ["sub", "-"],
            ["mul", "*"],
            ["div", "/"],
            ["rem", "%"],
            ["pow", "**"],
        ]

        function general( name ) {
            return [
                new Fn( name, [Param_x], `return ${IFNUM( `this.s${name}( x )`, `this.v${name}( x )` )}`, { type: TYPE } ),
                new Fn( name, [Param_v, Param_x, Param_target], `return ${IFNUM( `${TYPE}.s${name}( v, x, target )`, `${TYPE}.v${name}( v, x, target )` )}`, { prefix: "static", type: TYPE } ),
            ]
        }
        function scalar( name, operation ) {
            const body = DRANGE.map( i => `this[${i}] = this[${i}] ${operation} s` )
            return Fn.autoStatic( `s${name}`, [Param_s, [Param_v, Param_s]], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] )
        }
        function vector( name, operation ) {
            const body = DRANGE.map( i => `this[${i}] = this[${i}] ${operation} v[${i}]` )
            return Fn.autoStatic( `v${name}`, [Param_v, Params_v1v2], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] )
        }

        function apply() {
            const param = new Fn.Param( "fn", `(value: number, index: number) => number` )
            const body = DRANGE.map( i => `this[${i}] = fn( this[${i}], ${i} )` )
            return Fn.autoStatic( "apply", [param, [Param_v, param]], body, { type: TYPE }, ["this", "target"], [/\bthis\b/, "v"] )
        }
        function builtinMath( name ) {
            const body = bodyThis( DRANGE.map( i => `this[${i}] = Math.${name}( this[${i}] )` ) )
            return new Fn( name, [], body, { type: TYPE } )
        }
        function staticBuiltinMath( name ) {
            const body = bodyTarget( DRANGE.map( i => `target[${i}] = Math.${name}( v[${i}] )` ) )
            return new Fn( name, [Param_v, Param_target], body, { prefix: "static", type: TYPE } )
        }
        const mathFunctions = Object.getOwnPropertyNames( Math ).filter( name => typeof Math[name] === "function" && Math[name].length === 1 )
        const mathCandidates = ["abs", "trunc", "round", "floor", "ceil"]
        const staticMathCandidates = mathFunctions.filter( name => !/fround|clz32/.test( name ) ) // filter misc

        const functions = operations.map( ( [name, op] ) => [
            general( name, op ),
            scalar( name, op ),
            vector( name, op ),
        ] ).flat( 2 )
        functions.push(
            ...apply(),
            ...mathCandidates.map( name => builtinMath( name ) ),
            ...staticMathCandidates.map( name => staticBuiltinMath( name ) )
        )
        return functions.join( "\n\n" )
    }

    function properties() {
        function length() {
            const body = `return Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`
            return Fn.autoStatic( `length`, [[], Param_v], body, { type: "number" }, [/\bthis\b/g, "v"] )
        }
        function lengthSq() {
            const body = `return ${DMAP( i => `this[${i}] * this[${i}]`, " + " )}`
            return Fn.autoStatic( `lengthSq`, [[], Param_v], body, { type: "number" }, [/\bthis\b/g, "v"] )
        }
        return [...length(), ...lengthSq()].join( "\n\n" )
    }

    function vectorOperations() {
        function pointTo() {
            const params = [new Fn.Param( "from", TYPELIKE ), new Fn.Param( "to", TYPELIKE )]
            const body = DRANGE.map( i => `this[${i}] = v[${i}] - this[${i}]` )
            return Fn.autoStatic( `pointTo`, [Param_v, params], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "from"], [/\bv\b/g, "to"] )
        }
        function normalize() {
            const body = [
                `const factor = 1 / Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `this[${i}] = this[${i}] * factor` )
            ]
            return Fn.autoStatic( `normalize`, [[], Param_v], body, { type: TYPE }, [/\bthis\b(?=.*=)/, "target"], [/\bthis\b/g, "v"] )
        }
        function setLength() {
            const body = [
                `const factor = s / Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `this[${i}] = this[${i}] * factor` )
            ]
            return Fn.autoStatic( `setLength`, [Param_s, [Param_v, Param_s]], body, { type: TYPE }, [/\bthis\b(?=.*=)/, "target"], [/\bthis\b/g, "v"] )
        }

        function dot() {
            const body = `return ${DMAP( i => `this[${i}] * v[${i}]`, " + " )}`
            return Fn.autoStatic( `dot`, [Param_v, Params_v1v2], body, { type: "number" }, [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] )
        }
        function cross3() {
            const body = `
                const t0 = this[1] * v[2] - this[2] * v[1]
                const t1 = this[2] * v[0] - this[0] * v[2]
                const t2 = this[0] * v[1] - this[1] * v[0]
                this[0] = t0
                this[1] = t1
                this[2] = t2
                return this
            `
            return new Fn( `cross`, Param_v, body, { type: TYPE } )
        }
        function staticCross3() {
            const body = `
                const result = new ${TYPE}
                result[0] = v1[1] * v2[2] - v1[2] * v2[1]
                result[1] = v1[2] * v2[0] - v1[0] * v2[2]
                result[2] = v1[0] * v2[1] - v1[1] * v2[0]
                return result
            `
            return new Fn( `cross`, Params_v1v2, body, { prefix: "static", type: TYPE } )
        }

        const functions = [
            ...pointTo(),
            ...normalize(),
            ...setLength(),
            ...dot(),
        ]
        if ( dimension === 3 ) functions.push( cross3(), staticCross3(), )
        return functions.join( "\n\n" )
    }

    function utilityFunctions() {
        function distance() {
            const body = `
                ${DMAP( i => `const d${i} = v1[${i}] - v2[${i}]`, "\n" )}
                return Math.sqrt( ${DMAP( i => `d${i} * d${i}`, " + " )} )
            `
            return new Fn( `distance`, Params_v1v2, body, { prefix: "static", type: "number" } )
        }
        function distanceSq() {
            const body = `
                ${DMAP( i => `const d${i} = v1[${i}] - v2[${i}]`, "\n" )}
                return ${DMAP( i => `d${i} * d${i}`, " + " )}
            `
            return new Fn( `distanceSq`, Params_v1v2, body, { prefix: "static", type: "number" } )
        }

        function min() {
            const param = new Fn.Param( "values", `...(${TYPELIKE_OR_NUM})`, { rest: true } )
            const body = bodyTarget( [
                `const target = new ${TYPE}`,
                ...DRANGE.map( i => `target[${i}] = Math.min( ...values.map( x => typeof x === "number" ? x : x[${i}] ) )` )
            ] )
            return new Fn( `min`, param, body, { prefix: "static", type: TYPE } )
        }
        function max() {
            const param = new Fn.Param( "values", `...(${TYPELIKE_OR_NUM})`, { rest: true } )
            const body = bodyTarget( [
                `const target = new ${TYPE}`,
                ...DRANGE.map( i => `target[${i}] = Math.max( ...values.map( x => typeof x === "number" ? x : x[${i}] ) )` )
            ] )
            return new Fn( `max`, param, body, { prefix: "static", type: TYPE } )
        }
        function clamp() {
            const params = [Param_v, new Fn.Param( "min", "number" ), new Fn.Param( "max", "number" ), Param_target]
            const body = bodyTarget( DRANGE.map( i => `target[${i}] = Math.min( Math.max( v[${i}], min ), max  )` ) )
            return new Fn( `clamp`, params, body, { prefix: "static", type: TYPE } )
        }
        function saturate() {
            const body = bodyTarget( DRANGE.map( i => `target[${i}] = Math.min( Math.max( v[${i}], 0 ), 1 )` ) )
            return new Fn( `saturate`, [Param_v, Param_target], body, { prefix: "static", type: TYPE } )
        }
        function mix() {
            const params = [Param_v1, Param_v2, new Fn.Param( "t", "number" ), Param_target]
            const body = bodyTarget( DRANGE.map( i => `target[${i}] = v1[${i}] * ( 1 - t ) + v2[${i}] * t` ) )
            return new Fn( `mix`, params, body, { prefix: "static", type: TYPE } )
        }

        const functions = [
            distance(),
            distanceSq(),
            min(),
            max(),
            clamp(),
            saturate(),
            mix(),
        ]
        return functions.join( "\n\n" )
    }

    const segments = [
        [
            `import { randomNorm } from "./vechelper.js"`,
            ...Range( MIN_DIMENSION, MAX_DIMENSION + 1 ).filter( i => i !== dimension )
                .map( i => `import { vec${i} } from "./vec${i}.js"\n/** @typedef {import("./vec${i}.js").vec${i}Like} vec${i}Like */` )
        ].join( "\n" ),
        title( TYPE ),
        JSDoc( [
            ["typedef", `${TYPE}|ArrayLike<number>`, `${TYPE}Like`],
        ] ),
        `export class ${TYPE} {`,
        `    static get NaN() { return new ${TYPE}( ${DMAP( () => "NaN" )} ) }`,
        subtitle( "CONSTRUCTORS" ),
        constructors(),
        subtitle( "FIELDS" ),
        fields(),
        set(),
        clone(),
        iterator(),
        subtitle( "CONVERSION" ),
        conversion(),
        subtitle( "BOOLEAN" ),
        boolean(),
        subtitle( "ARITHMETIC" ),
        arithmetic(),
        subtitle( "PROPERTIES" ),
        properties(),
        subtitle( "VECTOR OPS" ),
        vectorOperations(),
        subtitle( "VECTOR UTILS" ),
        utilityFunctions(),
        `}`
    ]
    return segments.join( "\n\n" )
}

/** @param {number} dimension matrix dimension */
function generateMatrix( dimension ) {

    const VEC2 = `vec2`
    const VEC2LIKE = `vec2Like`
    const VEC3 = `vec3`
    const VEC3LIKE = `vec3Like`
    const VEC4 = `vec4`
    const VEC4LIKE = `vec4Like`

    const VEC = [VEC2, VEC3, VEC4]
    const VECLIKE = [VEC2LIKE, VEC3LIKE, VEC4LIKE]
    const VECANY = VEC.join( "|" )
    const VECANYLIKE = VECLIKE.join( "|" )
    const VECSOME = VEC.slice( 0, dimension - 1 ).join( "|" )
    const VECSOMELIKE = VECLIKE.slice( 0, dimension - 1 ).join( "|" )

    const TYPE = `mat${dimension}`
    const TYPELIKE = `${TYPE}Like`
    const TYPELIKE_OR_NUM = `number|${TYPELIKE}`

    const Param_s = fnParameter( "s", "number" )
    const Param_m = fnParameter( "m", TYPELIKE )
    const Param_x = fnParameter( "x", TYPELIKE_OR_NUM )
    const Param_m1 = fnParameter( "m1", TYPELIKE )
    const Param_m2 = fnParameter( "m2", TYPELIKE )

    /** @param {number} x @param {number} y @param {string} [prefix=""]  */
    function id( x, y, prefix = "" ) {
        return prefix + x + y
    }

    const CRANGE = Array.from( { length: dimension ** 2 }, ( _, i ) => ( {
        id( prefix = "" ) { return id( i % dimension, ~~( i / dimension ), prefix ) },
        x: i % dimension,
        y: ~~( i / dimension ),
    } ) )
    const CMAP = CRANGE.map.bind( CRANGE )
    const CJOIN = (/** @type {(v:{id:(prefix:string)=>string,x:number,y:number},i:number)=>any} */ fn, join = ", " ) => CMAP( fn ).join( join )

    /** @param {(v:{id:(prefix:string)=>string,x:number,y:number},i:number)=>any} fn */
    function array( fn ) {
        return `[\n${CRANGE.map( ( v, i ) => ( v.x === 0 ? "    " : "" ) + fn( v, i ) + ", " + ( v.x === dimension - 1 ? "\n" : "" ) ).join( "" )}]`
    }
    /** @param {string} prefix @param {string} [target="this"]  */
    function defcomps( prefix, target = "this" ) {
        return CJOIN( ( { id }, i ) => `const ${id( prefix )} = ${target}[${i}]`, "\n" )
    }

    /** @typedef {[RegExp, string]|[RegExp, string][]} StringReplacer */
    /** @param {string} string @param {StringReplacer} replacer  */
    function applyReplacer( string, replacer ) {
        if ( replacer.length === 0 ) return string
        if ( !( replacer[0] instanceof Array ) ) return string.replace( replacer[0], replacer[1] )
        return replacer.reduce( ( str, [regex, replacement] ) => str.replace( regex, replacement ), string )
    }
    /** @param {string} name @param {[string[], string[]]} params @param {string[]} statements @param {import("./codegen.js").FunctionOptions} opts @param {StringReplacer} replacer */
    function fnAutoStatic( name, [params, paramsStatic], statements, opts, replacer ) {
        const wrappers = opts.type === TYPE ? [bodyThis, bodyResult] : [x => x, x => x]
        const bodyNonstatic = wrappers[0]( statements )
        const bodyStatic = wrappers[1]( statements.map( statement => applyReplacer( statement, replacer ) ) )
        const fnNonstatic = fnDeclaration( name, params, bodyNonstatic, opts )
        const fnStatic = fnDeclaration( name, paramsStatic, bodyStatic, { ...opts, prefix: "static" } )
        return [fnNonstatic, fnStatic]
    }

    function title( text, indent = 0 ) {
        return forceIndent( `
            // ${"#".repeat( 47 )}
            //      ${text}
            // ${"#".repeat( 47 )}
        `, indent )
    }
    function subtitle( text, indent = 4 ) {
        return forceIndent( `
            // ${"-".repeat( 27 )}
            //      ${text}
            // ${"-".repeat( 27 )}
        `, indent )
    }

    function constructors() {
        function constructor() {
            const params = [fnParameter( "array", TYPELIKE, { optional: true } )]
            const body = `
                ${CJOIN( ( { x, y }, i ) => `/** @type {number} */\nthis[${i}] = +( array?.[${i}] ?? ${+( x === y )} )`, "\n" )}
            `
            return fnDeclaration( "constructor", params, body, {} )
        }

        function scale() {
            const params = [fnParameter( "v", VECSOMELIKE )]
            const body = `
return new ${TYPE}( ${array( ( { x, y } ) => x === y ? `v[${x}] ?? 1` : `0` )} )
            `
            return fnDeclaration( "scale", params, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
        }
        function translate() {
            const params = [fnParameter( "v", VECLIKE.slice( 0, dimension - 2 ).join( "|" ) )]
            const body = `
return new ${TYPE}( ${array( ( { x, y } ) => ( y === dimension - 1 && x < dimension - 1 ? `v[${x}] ?? ` : "" ) + `${+( x === y )}` )
                } )
            `
            return fnDeclaration( "translate", params, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
        }

        const functions = [
            constructor(),
            scale(),
        ]
        if ( dimension >= 3 ) functions.push( translate() )
        return functions.join( "\n\n" )
    }


    function clone() {
        return fnDeclaration( "clone", [], `return new ${TYPE}( this )`, { type: TYPE } )
    }

    function iterator() {
        return setIndent( `
            *[Symbol.iterator]() {
${CJOIN( ( _, i ) => `                yield this[${i}]`, "\n" )}
            }`, 4 )
    }

    function conversion() {
        const arrayExpr = `[${CJOIN( ( _, i ) => `this[${i}]` )}]`
        const conversions = [
            fnDeclaration( "toString", [], `return \`(${CJOIN( ( _, i ) => `\${this[${i}]}` )})\``, { type: "string", compact: true } ),
            fnDeclaration( "toArray", [], `return ${arrayExpr}`, { type: "number[]", compact: true } ),
            fnDeclaration( "toInt8Array", [], `return new Int8Array( ${arrayExpr} )`, { type: "Int8Array", compact: true } ),
            fnDeclaration( "toUint8Array", [], `return new Uint8Array( ${arrayExpr} )`, { type: "Uint8Array", compact: true } ),
            fnDeclaration( "toUint8ClampedArray", [], `return new Uint8ClampedArray( ${arrayExpr} )`, { type: "Uint8ClampedArray", compact: true } ),
            fnDeclaration( "toInt16Array", [], `return new Int16Array( ${arrayExpr} )`, { type: "Int16Array", compact: true } ),
            fnDeclaration( "toUint16Array", [], `return new Uint16Array( ${arrayExpr} )`, { type: "Uint16Array", compact: true } ),
            fnDeclaration( "toInt32Array", [], `return new Int32Array( ${arrayExpr} )`, { type: "Int32Array", compact: true } ),
            fnDeclaration( "toUint32Array", [], `return new Uint32Array( ${arrayExpr} )`, { type: "Uint32Array", compact: true } ),
            fnDeclaration( "toFloat32Array", [], `return new Float32Array( ${arrayExpr} )`, { type: "Float32Array", compact: true } ),
            fnDeclaration( "toFloat64Array", [], `return new Float64Array( ${arrayExpr} )`, { type: "Float64Array", compact: true } ),
        ]
        return conversions.join( "\n" )
    }

    function boolean() {
        function eq() {
            const body = [`return ${CJOIN( ( _, i ) => `this[${i}] === m[${i}]`, " && " )}`]
            return fnAutoStatic( "eq", [[Param_m], [Param_m1, Param_m2]], body, { type: "boolean" }, [[/\bthis\b/g, "m1"], [/\bm\b/g, "m2"]] )
        }
        function neq() {
            const body = [`return ${CJOIN( ( _, i ) => `this[${i}] !== m[${i}]`, " || " )}`]
            return fnAutoStatic( "neq", [[Param_m], [Param_m1, Param_m2]], body, { type: "boolean" }, [[/\bthis\b/g, "m1"], [/\bm\b/g, "m2"]] )
        }
        const functions = [
            eq(), neq(),
        ].flat( 1 )
        return functions.join( "\n\n" )
    }

    function arithmetic() {
        function mmul() {
            const params = [fnParameter( "m", TYPELIKE )]
            const body = `
                ${defcomps( "a" )}
                ${defcomps( "b", "m" )}
                ${CJOIN( ( { x, y }, i ) =>
                `this[${i}] = ${Range( dimension )
                    .map( i => `${id( x, i, "a" )} * ${id( i, y, "b" )}` )
                    .join( " + " )
                }`
                , "\n" )}
                return this
            `
            return fnDeclaration( "mmul", params, body, { type: TYPE } )
        }
        function inverse2() {
            let body = `
                ${defcomps( "m" )}
                const det = 1 / ( m00 * m11 - m10 * m01 )
                this[0] = m11 * det
                this[1] = -m01 * det
                this[2] = -m10 * det
                this[3] = m00 * det
                return this
            `
            return fnDeclaration( "inverse", [], body, { type: TYPE } )
        }
        function inverse3() {
            let body = `
                ${defcomps( "m" )}
                const x = m11 * m22 - m12 * m21
                const y = m21 * m02 - m01 * m22
                const z = m01 * m12 - m02 * m11
                const det = 1 / ( m00 * x + m10 * y + m20 * z )
                this[0] = det * x
                this[1] = det * ( m20 * m12 - m10 * m22 )
                this[2] = det * ( m10 * m21 - m20 * m11 )
                this[3] = det * y
                this[4] = det * ( m00 * m22 - m20 * m02 )
                this[5] = det * ( m01 * m20 - m00 * m21 )
                this[6] = det * z
                this[7] = det * ( m02 * m10 - m00 * m12 )
                this[8] = det * ( m00 * m11 - m01 * m10 )
                return this
            `
            return fnDeclaration( "inverse", [], body, { type: TYPE } )
        }
        function inverse4() {
            let body = `
                ${defcomps( "m" )}             
                const tmp00 = m22 * m33
                const tmp01 = m32 * m23
                const tmp02 = m12 * m33
                const tmp03 = m32 * m13
                const tmp04 = m12 * m23
                const tmp05 = m22 * m13
                const tmp06 = m02 * m33
                const tmp07 = m32 * m03
                const tmp08 = m02 * m23
                const tmp09 = m22 * m03
                const tmp10 = m02 * m13
                const tmp11 = m12 * m03
                const tmp12 = m20 * m31
                const tmp13 = m30 * m21
                const tmp14 = m10 * m31
                const tmp15 = m30 * m11
                const tmp16 = m10 * m21
                const tmp17 = m20 * m11
                const tmp18 = m00 * m31
                const tmp19 = m30 * m01
                const tmp20 = m00 * m21
                const tmp21 = m20 * m01
                const tmp22 = m00 * m11
                const tmp23 = m10 * m01

                const t00 = ( tmp00 * m11 + tmp03 * m21 + tmp04 * m31 )
                    - ( tmp01 * m11 + tmp02 * m21 + tmp05 * m31 )
                const t01 = ( tmp01 * m01 + tmp06 * m21 + tmp09 * m31 )
                    - ( tmp00 * m01 + tmp07 * m21 + tmp08 * m31 )
                const t02 = ( tmp02 * m01 + tmp07 * m11 + tmp10 * m31 )
                    - ( tmp03 * m01 + tmp06 * m11 + tmp11 * m31 )
                const t03 = ( tmp05 * m01 + tmp08 * m11 + tmp11 * m21 )
                    - ( tmp04 * m01 + tmp09 * m11 + tmp10 * m21 )
                const t10 = ( tmp01 * m10 + tmp02 * m20 + tmp05 * m30 )
                    - ( tmp00 * m10 + tmp03 * m20 + tmp04 * m30 )
                const t11 = ( tmp00 * m00 + tmp07 * m20 + tmp08 * m30 )
                    - ( tmp01 * m00 + tmp06 * m20 + tmp09 * m30 )
                const t12 = ( tmp03 * m00 + tmp06 * m10 + tmp11 * m30 )
                    - ( tmp02 * m00 + tmp07 * m10 + tmp10 * m30 )
                const t13 = ( tmp04 * m00 + tmp09 * m10 + tmp10 * m20 )
                    - ( tmp05 * m00 + tmp08 * m10 + tmp11 * m20 )
                const t20 = ( tmp12 * m13 + tmp15 * m23 + tmp16 * m33 )
                    - ( tmp13 * m13 + tmp14 * m23 + tmp17 * m33 )
                const t21 = ( tmp13 * m03 + tmp18 * m23 + tmp21 * m33 )
                    - ( tmp12 * m03 + tmp19 * m23 + tmp20 * m33 )
                const t22 = ( tmp14 * m03 + tmp19 * m13 + tmp22 * m33 )
                    - ( tmp15 * m03 + tmp18 * m13 + tmp23 * m33 )
                const t23 = ( tmp17 * m03 + tmp20 * m13 + tmp23 * m23 )
                    - ( tmp16 * m03 + tmp21 * m13 + tmp22 * m23 )
                const t30 = ( tmp14 * m22 + tmp17 * m32 + tmp13 * m12 )
                    - ( tmp16 * m32 + tmp12 * m12 + tmp15 * m22 )
                const t31 = ( tmp20 * m32 + tmp12 * m02 + tmp19 * m22 )
                    - ( tmp18 * m22 + tmp21 * m32 + tmp13 * m02 )
                const t32 = ( tmp18 * m12 + tmp23 * m32 + tmp15 * m02 )
                    - ( tmp22 * m32 + tmp14 * m02 + tmp19 * m12 )
                const t33 = ( tmp22 * m22 + tmp16 * m02 + tmp21 * m12 )
                    - ( tmp20 * m12 + tmp23 * m22 + tmp17 * m02 )

                const d = 1.0 / ( m00 * t00 + m10 * t01 + m20 * t02 + m30 * t03 )

                this[0] = t00 * d
                this[1] = t01 * d
                this[2] = t02 * d
                this[3] = t03 * d
                this[4] = t10 * d
                this[5] = t11 * d
                this[6] = t12 * d
                this[7] = t13 * d
                this[8] = t20 * d
                this[9] = t21 * d
                this[10] = t22 * d
                this[11] = t23 * d
                this[12] = t30 * d
                this[13] = t31 * d
                this[14] = t32 * d
                this[15] = t33 * d

                return this
            `
            return fnDeclaration( "inverse", [], body, { type: TYPE } )
        }

        const functions = [
            mmul(),
        ]
        functions.push( [, , inverse2, inverse3, inverse4][dimension]() )
        return functions.join( "\n\n" )
    }

    const segments = [
        [
            ...Range( MIN_DIMENSION, MAX_DIMENSION + 1 )
                .map( i => `import { vec${i} } from "./vec${i}.js"\n/** @typedef {import("./vec${i}.js").vec${i}Like} vec${i}Like */` )
        ].join( "\n" ),
        title( TYPE ),
        JSDoc( [
            ["typedef", `ArrayLike<number>`, TYPELIKE],
        ] ),
        `export class ${TYPE} {`,
        subtitle( "CONSTRUCTORS" ),
        constructors(),
        subtitle( "FIELDS" ),
        clone(),
        iterator(),
        subtitle( "CONVERSION" ),
        conversion(),
        subtitle( "BOOLEAN" ),
        boolean(),
        subtitle( "ARITHMETIC" ),
        arithmetic(),
        `}`
    ]
    return segments.join( "\n\n" )
}