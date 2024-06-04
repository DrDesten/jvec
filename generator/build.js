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

    const MATTYPE = `mat${dimension}`
    const MATTYPELIKE = `${MATTYPE}Like`
    const MATTYPELIKE_OR_NUM = `number|${MATTYPELIKE}`

    const TYPE = `vec${dimension}`
    const TYPELIKE = `${TYPE}Like`
    const TYPELIKE_OR_NUM = `number|${TYPELIKE}`


    const IFNUM = ( isnum, notnum, varname = "x", indent = false ) => `typeof ${varname} === "number"${indent ? "\n    " : " "}? ${isnum}${indent ? "\n    " : " "}: ${notnum}`
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

    const Param_m = new Fn.Param( "m", MATTYPELIKE )

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

        function isinf() {
            const body = DRANGE.map( i => `this[${i}] = +( this[${i}] === -Infinity || this[${i}] === Infinity )` )
            return Fn.autoStatic( "isinf", [[], Param_v], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] )
        }
        function isnan() {
            const body = DRANGE.map( i => `this[${i}] = +( this[${i}] !== this[${i}] )` )
            return Fn.autoStatic( "isnan", [[], Param_v], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] )
        }

        function not() {
            const body = DRANGE.map( i => `this[${i}] = +!this[${i}]` )
            return Fn.autoStatic( "not", [[], Param_v], body, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] )
        }

        const functions = [
            eq(), neq(),
            all(), any(),
            operations.flatMap( ( [name, op] ) => operation( name, op ) ),
            not(),
            isinf(), isnan()
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
            const bodyNonstatic = `return ${IFNUM( `this.s${name}( x )`, `this.v${name}( x )` )}`
            const bodyStatic = `return ${IFNUM( `${TYPE}.s${name}( v, x, target )`, `${TYPE}.v${name}( v, x, target )` )}`
            return [
                new Fn( name, [Param_x], bodyNonstatic, { type: TYPE } ),
                new Fn( name, [Param_v, Param_x, Param_target], bodyStatic, { prefix: "static", type: TYPE } ),
            ]
        }
        function operation( name, operation ) {
            const bodyScalar = DRANGE.map( i => `this[${i}] = this[${i}] ${operation} s` )
            const bodyVector = DRANGE.map( i => `this[${i}] = this[${i}] ${operation} v[${i}]` )
            return [
                Fn.autoStatic( `s${name}`, [Param_s, [Param_v, Param_s]], bodyScalar, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] ),
                Fn.autoStatic( `v${name}`, [Param_v, Params_v1v2], bodyVector, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] ),
            ]
        }
        function fma() {
            const pM = new Fn.Param( "m", TYPELIKE_OR_NUM )
            const pA = new Fn.Param( "a", TYPELIKE_OR_NUM )
            const bodyNonstatic = `return ${IFNUM(
                `(${IFNUM( `this.sfma( m, a )`, `this.svfma( m, a )`, "a" )})`,
                `(${IFNUM( `this.vsfma( m, a )`, `this.vfma( m, a )`, "a" )})`,
                "m", true
            )}`
            const bodyStatic = `return ${IFNUM(
                `( ${IFNUM( `${TYPE}.sfma( v, m, a, target )`, `${TYPE}.svfma( v, m, a, target )`, "a" )} )`,
                `( ${IFNUM( `${TYPE}.vsfma( v, m, a, target )`, `${TYPE}.vfma( v, m, a, target )`, "a" )} )`,
                "m", true
            )}`

            const pMS = new Fn.Param( "m", "number" )
            const pMV = new Fn.Param( "m", TYPELIKE )
            const pAS = new Fn.Param( "a", "number" )
            const pAV = new Fn.Param( "a", TYPELIKE )
            const bodyS = DRANGE.map( i => `this[${i}] = this[${i}] * m + a` )
            const bodySV = DRANGE.map( i => `this[${i}] = this[${i}] * m + a[${i}]` )
            const bodyVS = DRANGE.map( i => `this[${i}] = this[${i}] * m[${i}] + a` )
            const bodyV = DRANGE.map( i => `this[${i}] = this[${i}] * m[${i}] + a[${i}]` )
            return [
                new Fn( "fma", [pM, pA], bodyNonstatic, { type: TYPE, indentFn: setIndent } ),
                new Fn( "fma", [Param_v, pM, pA, Param_target], bodyStatic, { prefix: "static", type: TYPE, indentFn: setIndent } ),
                Fn.autoStatic( `sfma`, [[pMS, pAS], [Param_v, pMS, pAS]], bodyS, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] ),
                Fn.autoStatic( `svfma`, [[pMS, pAV], [Param_v, pMS, pAV]], bodySV, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] ),
                Fn.autoStatic( `vsfma`, [[pMV, pAS], [Param_v, pMV, pAS]], bodyVS, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] ),
                Fn.autoStatic( `vfma`, [[pMV, pAV], [Param_v, pMV, pAV]], bodyV, { type: TYPE }, ["this", "target"], [/\bthis\b/g, "v"] ),
            ]
        }

        function mmul() {
            const body = [].concat(
                DRANGE.map( i => `const c${i} = this[${i}]` ),
                DRANGE.map( i => `this[${i}] = ${DMAP( c => `c${c} * m[${i + c * dimension}]`, " + " )}` ),
            )
            return Fn.autoStatic( `mmul`, [Param_m, [Param_v, Param_m]], body, { type: TYPE }, [/\bthis\b(?=.*=)/, "target"], [/\bthis\b/g, "v"] )
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
            operation( name, op ),
        ] )
        functions.push(
            fma(),
            mmul(),
            apply(),
            mathCandidates.map( name => builtinMath( name ) ),
            staticMathCandidates.map( name => staticBuiltinMath( name ) )
        )
        return functions.flat( Infinity ).join( "\n\n" )
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
        function rotate2() {
            const Param_angle = new Fn.Param( "angle", "number" )
            const body = [
                `const sin = Math.sin( angle ), cos = Math.cos( angle )`,
                `const t0 = this[0] * cos - this[1] * sin`,
                `const t1 = this[0] * sin + this[1] * cos`,
                `this[0] = t0`,
                `this[1] = t1`,
            ]
            const body90 = [
                `const t0 = this[1]`,
                `const t1 = this[0]`,
                `this[0] = t0`,
                `this[1] = t1`,
            ]
            return [
                ...Fn.autoStatic( `rotate`, [Param_angle, [Param_v, Param_angle]], body, { type: TYPE }, [/\bthis\b(?=.*=)/g, "target"], [/\bthis\b/g, "v"] ),
                ...Fn.autoStatic( `rotate90`, [[], Param_v], body90, { type: TYPE }, [/\bthis\b(?=.*=)/g, "target"], [/\bthis\b/g, "v"] )
            ]
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
            `
            return Fn.autoStatic( `cross`, [Param_v, Params_v1v2], body, { type: TYPE }, [/\bthis\b(?=.*=)/g, "target"], [/\bthis\b/g, "v1"], [/\bv\b/g, "v2"] )
        }

        const functions = [
            ...pointTo(),
            ...normalize(),
            ...setLength(),
            ...dot(),
        ]
        if ( dimension === 2 ) functions.push( ...rotate2() )
        if ( dimension === 3 ) functions.push( ...cross3() )
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
            const pMin = new Fn.Param( "min", TYPELIKE_OR_NUM )
            const pMax = new Fn.Param( "max", TYPELIKE_OR_NUM )
            const pSMin = new Fn.Param( "min", "number" )
            const pSMax = new Fn.Param( "max", "number" )
            const pVMin = new Fn.Param( "min", TYPELIKE )
            const pVMax = new Fn.Param( "max", TYPELIKE )

            const body = `return ${IFNUM(
                `( ${IFNUM( `${TYPE}.sclamp( v, min, max, target )`, `${TYPE}.svclamp( v, min, max, target )`, "max" )} )`,
                `( ${IFNUM( `${TYPE}.vsclamp( v, min, max, target )`, `${TYPE}.vclamp( v, min, max, target )`, "max" )} )`,
                "min", true
            )}`
            const bodyS = bodyTarget( DRANGE.map( i => `target[${i}] = Math.min( Math.max( v[${i}], min ), max  )` ) )
            const bodySV = bodyTarget( DRANGE.map( i => `target[${i}] = Math.min( Math.max( v[${i}], min ), max[${i}]  )` ) )
            const bodyVS = bodyTarget( DRANGE.map( i => `target[${i}] = Math.min( Math.max( v[${i}], min[${i}] ), max  )` ) )
            const bodyV = bodyTarget( DRANGE.map( i => `target[${i}] = Math.min( Math.max( v[${i}], min[${i}] ), max[${i}]  )` ) )

            const opts = { prefix: "static", type: TYPE, indentFn: setIndent }
            return [
                new Fn( `clamp`, [Param_v, pMin, pMax, Param_target], body, opts ),
                new Fn( `sclamp`, [Param_v, pSMin, pSMax, Param_target], bodyS, opts ),
                new Fn( `svclamp`, [Param_v, pSMin, pVMax, Param_target], bodySV, opts ),
                new Fn( `vsclamp`, [Param_v, pVMin, pSMax, Param_target], bodyVS, opts ),
                new Fn( `vclamp`, [Param_v, pVMin, pVMax, Param_target], bodyV, opts ),
            ]
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
        return functions.flat( Infinity ).join( "\n\n" )
    }

    const segments = [
        [
            `import { randomNorm } from "./vechelper.js"`,
            ...Range( MIN_DIMENSION, MAX_DIMENSION + 1 ).filter( i => i !== dimension )
                .map( i => `import { vec${i} } from "./vec${i}.js"\n/** @typedef {import("./vec${i}.js").vec${i}Like} vec${i}Like */` ),
            ...Range( MIN_DIMENSION, MAX_DIMENSION + 1 )
                .map( i => `import { mat${i} } from "./mat${i}.js"\n/** @typedef {import("./mat${i}.js").mat${i}Like} mat${i}Like */` )
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

    const VEC = { "2": `vec2`, "3": `vec3`, "4": `vec4` }
    const VECLIKE = { "2": `vec2Like`, "3": `vec3Like`, "4": `vec4Like` }

    function VECRange( p1 = 4, p2 ) {
        const start = ( p2 === undefined ? 2 : +p1 ) - 2
        const stop = ( p2 === undefined ? +p1 : +p2 ) - 1
        return [`vec2`, `vec3`, `vec4`].slice( start, stop ).join( "|" )
    }
    function VECLIKERange( p1 = 4, p2 ) {
        const start = ( p2 === undefined ? 2 : +p1 ) - 2
        const stop = ( p2 === undefined ? +p1 : +p2 ) - 1
        return [`vec2Like`, `vec3Like`, `vec4Like`].slice( start, stop ).join( "|" )
    }

    const TYPE = `mat${dimension}`
    const TYPELIKE = `${TYPE}Like`
    const TYPELIKE_OR_NUM = `number|${TYPELIKE}`

    const Param_s = new Fn.Param( "s", "number" )
    const Param_m = new Fn.Param( "m", TYPELIKE )
    const Param_x = new Fn.Param( "x", TYPELIKE_OR_NUM )
    const Param_m1 = new Fn.Param( "m1", TYPELIKE )
    const Param_m2 = new Fn.Param( "m2", TYPELIKE )
    const Params_m1m2 = [Param_m1, Param_m2]
    const Param_target = new Fn.Param( "target", TYPELIKE )

    /** @param {number} x @param {number} y @param {string} [prefix=""]  */
    function id( x, y, prefix = "" ) {
        return prefix + x + y
    }

    const DRANGE = Range( dimension )
    const DMAP = DRANGE.map.bind( DRANGE )
    const DJOIN = (/** @type {(i:number)=>any} */ fn, join = ", " ) => DMAP( fn ).join( join )

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
            const param = new Fn.Param( "object", TYPELIKE, { optional: true } )
            const body = `
                ${CJOIN( ( { x, y }, i ) => `/** @type {number} */\nthis[${i}] = +( object?.[${i}] ?? ${+( x === y )} )`, "\n" )}
            `
            return new Fn( "constructor", param, body, {} )
        }
        function fromMatrix() {
            function general() {
                const param = new Fn.Param( "m", "mat2Like|mat3Like|mat4Like" )
                const body = `
                    switch ( m.constructor ) {
                        case mat2: return ${TYPE}.fromMat2( m )
                        case mat3: return ${TYPE}.fromMat3( m )
                        case mat4: return ${TYPE}.fromMat4( m )
                    }
                    switch ( m.length ) {
                        case 4: return ${TYPE}.fromMat2( m )
                        case 9: return ${TYPE}.fromMat3( m )
                        case 16: return ${TYPE}.fromMat4( m )
                    }
                    throw new Error( "not a matrix" )
                `
                return new Fn( "fromMatrix", param, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
            }
            function matrix( d ) {
                const param = new Fn.Param( "m", `mat${d}Like` )
                const body = `return new ${TYPE}( ${array( ( { x, y } ) => {
                    return x < d && y < d ? `m[${x + y * d}]` : `${+( x === y )}`
                } )} )`
                return new Fn( `fromMat${d}`, param, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
            }
            return [general(), ...[2, 3, 4].map( matrix )]
        }

        function scale() {
            const param = new Fn.Param( "v", VECLIKERange( dimension ) )
            const body = `
return new ${TYPE}( ${array( ( { x, y } ) => x === y ? `v[${x}] ?? 1` : `0` )} )
            `
            return new Fn( "scale", param, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
        }
        function translate() {
            const param = new Fn.Param( "v", VECLIKERange( dimension - 1 ) )
            const body = `
return new ${TYPE}( ${array( ( { x, y } ) => y === dimension - 1 && x < dimension - 1 ? `v[${x}] ?? 0` : `${+( x === y )}` )
                } )
            `
            return new Fn( "translate", param, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
        }
        function scaleTranslate() {
            const params = [
                new Fn.Param( "scale", VECLIKERange( dimension - 1 ) ),
                new Fn.Param( "translation", VECLIKERange( dimension - 1 ) ),
            ]
            const body = `
return new ${TYPE}( ${array( ( { x, y } ) => {
                if ( x === y && x < dimension - 1 ) return `scale[${x}] ?? 1`
                if ( y === dimension - 1 && x < dimension - 1 ) return `translation[${x}] ?? 0`
                return `${+( x === y )}`
            } )} )
            `
            return new Fn( "scaleTranslate", params, body, { prefix: "static", type: TYPE, indentFn: setIndent } )
        }

        const functions = [
            constructor(),
            ...fromMatrix(),
            scale(),
        ]
        if ( dimension >= 3 ) functions.push( translate(), scaleTranslate() )
        return functions.join( "\n\n" )
    }

    function fields() {
        function col() {
            const param = new Fn.Param( "column", "number" )
            const body = `return new ${VEC[dimension]}( ${DJOIN( d => `this[column * ${dimension}${d !== 0 ? ` + ${d}` : ""}]` )} )`
            return Fn.autoStatic( "col", [param, [Param_m, param]], body, { type: VEC[dimension] }, [/\bthis\b/g, "m"] )
        }
        function row() {
            const param = new Fn.Param( "row", "number" )
            const body = `return new ${VEC[dimension]}( ${DJOIN( d => `this[row${d !== 0 ? ` + ${dimension * d}` : ""}]` )} )`
            return Fn.autoStatic( "row", [param, [Param_m, param]], body, { type: VEC[dimension] }, [/\bthis\b/g, "m"] )
        }
        return [col(), row()].flat().join( "\n\n" )
    }

    function clone() {
        return new Fn( "clone", [], `return new ${TYPE}( this )`, { type: TYPE } )
    }

    function iterator() {
        return setIndent( `
            *[Symbol.iterator]() {
${CJOIN( ( _, i ) => `                yield this[${i}]`, "\n" )}
            }`, 4 )
    }

    function conversion() {
        const stringExpr = `\`(${DJOIN( y => `(${DJOIN( x => `\${this[${x + y * dimension}]}` )})` )})\``
        const nestedArrayExpr = `[${DJOIN( y => `[${DJOIN( x => `this[${x + y * dimension}]` )}]` )}]`
        const arrayExpr = `[${CJOIN( ( _, i ) => `this[${i}]` )}]`
        const conversions = [
            new Fn( "toString", [], `return ${stringExpr}`, { type: "string", compact: true } ),
            new Fn( "toArray", [], `return ${arrayExpr}`, { type: "number[]", compact: true } ),
            new Fn( "toArray2D", [], `return ${nestedArrayExpr}`, { type: "number[][]", compact: true } ),
            new Fn( "toInt8Array", [], `return new Int8Array( ${arrayExpr} )`, { type: "Int8Array", compact: true } ),
            new Fn( "toUint8Array", [], `return new Uint8Array( ${arrayExpr} )`, { type: "Uint8Array", compact: true } ),
            new Fn( "toUint8ClampedArray", [], `return new Uint8ClampedArray( ${arrayExpr} )`, { type: "Uint8ClampedArray", compact: true } ),
            new Fn( "toInt16Array", [], `return new Int16Array( ${arrayExpr} )`, { type: "Int16Array", compact: true } ),
            new Fn( "toUint16Array", [], `return new Uint16Array( ${arrayExpr} )`, { type: "Uint16Array", compact: true } ),
            new Fn( "toInt32Array", [], `return new Int32Array( ${arrayExpr} )`, { type: "Int32Array", compact: true } ),
            new Fn( "toUint32Array", [], `return new Uint32Array( ${arrayExpr} )`, { type: "Uint32Array", compact: true } ),
            new Fn( "toFloat32Array", [], `return new Float32Array( ${arrayExpr} )`, { type: "Float32Array", compact: true } ),
            new Fn( "toFloat64Array", [], `return new Float64Array( ${arrayExpr} )`, { type: "Float64Array", compact: true } ),
        ]
        return conversions.join( "\n" )
    }

    function boolean() {
        function eq() {
            const body = `return ${CJOIN( ( _, i ) => `this[${i}] === m[${i}]`, "\n    && " )}`
            return Fn.autoStatic( "eq", [Param_m, Params_m1m2], body, { type: "boolean", indentFn: setIndent }, [/\bthis\b/g, "m1"], [/\bm\b/g, "m2"] )
        }
        function neq() {
            const body = `return ${CJOIN( ( _, i ) => `this[${i}] !== m[${i}]`, "\n    || " )}`
            return Fn.autoStatic( "neq", [Param_m, Params_m1m2], body, { type: "boolean", indentFn: setIndent }, [/\bthis\b/g, "m1"], [/\bm\b/g, "m2"] )
        }
        const functions = [
            eq(), neq(),
        ].flat( 1 )
        return functions.join( "\n\n" )
    }

    function arithmetic() {
        function mmul() {
            const body = [
                defcomps( "a" ),
                defcomps( "b", "m" ),
                ...CMAP( ( { x, y }, i ) =>
                    `this[${i}] = ${Range( dimension )
                        .map( i => `${id( x, i, "a" )} * ${id( i, y, "b" )}` )
                        .join( " + " )
                    }` )
            ]
            return Fn.autoStatic( "mmul", [Param_m, Params_m1m2], body, { type: TYPE }, [/(?<==\s*)this\b/g, "m1"], [/\bm\b/g, "m2"], [/\bthis\b/g, "target"] )
        }
        function transpose() {
            const body = [
                defcomps( "m" ),
                ...CMAP( ( { x, y }, i ) => `this[${i}] = ${id( y, x, "m" )}` )
            ]
            return Fn.autoStatic( "transpose", [[], Param_m], body, { type: TYPE }, [/(?<==\s*)this\b/g, "m"], [/\bthis\b/g, "target"] )
        }
        function inverse2() {
            let body = `
                ${defcomps( "m" )}
                const det = 1 / ( m00 * m11 - m10 * m01 )
                this[0] = det * m11
                this[1] = det * -m01
                this[2] = det * -m10
                this[3] = det * m00
            `
            return Fn.autoStatic( "inverse", [[], Param_m], body, { type: TYPE }, [/(?<==\s*)this\b/g, "m"], [/\bthis\b/g, "target"] )
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
            `
            return Fn.autoStatic( "inverse", [[], Param_m], body, { type: TYPE }, [/(?<==\s*)this\b/g, "m"], [/\bthis\b/g, "target"] )
        }
        function inverse4() {
            let body = `
                ${defcomps( "m" )}             
                const tmp00 = m22 * m33
                const tmp10 = m23 * m32
                const tmp20 = m21 * m33
                const tmp30 = m23 * m31
                const tmp40 = m21 * m32
                const tmp50 = m22 * m31
                const tmp60 = m20 * m33
                const tmp70 = m23 * m30
                const tmp80 = m20 * m32
                const tmp90 = m22 * m30
                const tmp01 = m20 * m31
                const tmp11 = m21 * m30
                const tmp21 = m02 * m13
                const tmp31 = m03 * m12
                const tmp41 = m01 * m13
                const tmp51 = m03 * m11
                const tmp61 = m01 * m12
                const tmp71 = m02 * m11
                const tmp81 = m00 * m13
                const tmp91 = m03 * m10
                const tmp02 = m00 * m12
                const tmp12 = m02 * m10
                const tmp22 = m00 * m11
                const tmp32 = m01 * m10

                const t00 = ( tmp00 * m11 + tmp30 * m12 + tmp40 * m13 )
                    - ( tmp10 * m11 + tmp20 * m12 + tmp50 * m13 )
                const t10 = ( tmp10 * m10 + tmp60 * m12 + tmp90 * m13 )
                    - ( tmp00 * m10 + tmp70 * m12 + tmp80 * m13 )
                const t20 = ( tmp20 * m10 + tmp70 * m11 + tmp01 * m13 )
                    - ( tmp30 * m10 + tmp60 * m11 + tmp11 * m13 )
                const t30 = ( tmp50 * m10 + tmp80 * m11 + tmp11 * m12 )
                    - ( tmp40 * m10 + tmp90 * m11 + tmp01 * m12 )
                const t01 = ( tmp10 * m01 + tmp20 * m02 + tmp50 * m03 )
                    - ( tmp00 * m01 + tmp30 * m02 + tmp40 * m03 )
                const t11 = ( tmp00 * m00 + tmp70 * m02 + tmp80 * m03 )
                    - ( tmp10 * m00 + tmp60 * m02 + tmp90 * m03 )
                const t21 = ( tmp30 * m00 + tmp60 * m01 + tmp11 * m03 )
                    - ( tmp20 * m00 + tmp70 * m01 + tmp01 * m03 )
                const t31 = ( tmp40 * m00 + tmp90 * m01 + tmp01 * m02 )
                    - ( tmp50 * m00 + tmp80 * m01 + tmp11 * m02 )
                const t02 = ( tmp21 * m31 + tmp51 * m32 + tmp61 * m33 )
                    - ( tmp31 * m31 + tmp41 * m32 + tmp71 * m33 )
                const t12 = ( tmp31 * m30 + tmp81 * m32 + tmp12 * m33 )
                    - ( tmp21 * m30 + tmp91 * m32 + tmp02 * m33 )
                const t22 = ( tmp41 * m30 + tmp91 * m31 + tmp22 * m33 )
                    - ( tmp51 * m30 + tmp81 * m31 + tmp32 * m33 )
                const t32 = ( tmp71 * m30 + tmp02 * m31 + tmp32 * m32 )
                    - ( tmp61 * m30 + tmp12 * m31 + tmp22 * m32 )
                const t03 = ( tmp41 * m22 + tmp71 * m23 + tmp31 * m21 )
                    - ( tmp61 * m23 + tmp21 * m21 + tmp51 * m22 )
                const t13 = ( tmp02 * m23 + tmp21 * m20 + tmp91 * m22 )
                    - ( tmp81 * m22 + tmp12 * m23 + tmp31 * m20 )
                const t23 = ( tmp81 * m21 + tmp32 * m23 + tmp51 * m20 )
                    - ( tmp22 * m23 + tmp41 * m20 + tmp91 * m21 )
                const t33 = ( tmp22 * m22 + tmp61 * m20 + tmp12 * m21 )
                    - ( tmp02 * m21 + tmp32 * m22 + tmp71 * m20 )

                const det = 1 / ( m00 * t00 + m01 * t10 + m02 * t20 + m03 * t30 )

                this[0] = t00 * det
                this[1] = t10 * det
                this[2] = t20 * det
                this[3] = t30 * det
                this[4] = t01 * det
                this[5] = t11 * det
                this[6] = t21 * det
                this[7] = t31 * det
                this[8] = t02 * det
                this[9] = t12 * det
                this[10] = t22 * det
                this[11] = t32 * det
                this[12] = t03 * det
                this[13] = t13 * det
                this[14] = t23 * det
                this[15] = t33 * det
            `
            return Fn.autoStatic( "inverse", [[], Param_m], body, { type: TYPE }, [/(?<==\s*)this\b/g, "m"], [/\bthis\b/g, "target"] )
        }

        const functions = [
            mmul(),
            transpose(),
        ]
        functions.push( [, , inverse2, inverse3, inverse4][dimension]() )
        return functions.flat( 1 ).join( "\n\n" )
    }

    const segments = [
        [
            ...Range( MIN_DIMENSION, MAX_DIMENSION + 1 ).filter( d => d !== dimension )
                .map( i => `import { mat${i} } from "./mat${i}.js"\n/** @typedef {import("./mat${i}.js").mat${i}Like} mat${i}Like */` ),
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
        fields(),
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