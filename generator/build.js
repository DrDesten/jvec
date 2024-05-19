// Node includes
import path from "path"
import url from "url"
import { writeFileSync } from "fs"
import { join } from "path"
const __dirname = path.dirname( url.fileURLToPath( import.meta.url ) )

// Custom includes
import { setIndent, forceIndent, fnParameter, fnDeclaration } from "./codegen.js"
import { JSDoc } from "./docgen.js"
/** @typedef {import("./docgen.js").JSDocStatement} JSDocStatement @typedef {import("./docgen.js").JSDocOptions} JSDocOptions */
import { Range } from "./genlib.js"

const MIN_DIMENSION = 2
const MAX_DIMENSION = 4
const OUTPUT_DIR = "../bin"

for ( let dim = MIN_DIMENSION; dim <= MAX_DIMENSION; dim++ ) {
    const file = generate( dim )
    writeFileSync( join( __dirname, OUTPUT_DIR, `vec${dim}.js` ), file, { encoding: "utf8" } )
}

const vec = Range( MIN_DIMENSION, MAX_DIMENSION + 1 )
    .map( dim => `export { vec${dim} } from "./vec${dim}.js"` )
    .join( "\n" )
writeFileSync( join( __dirname, OUTPUT_DIR, `vec.js` ), vec, { encoding: "utf8" } )

// ------------------------------
// generate()
// ------------------------------

/** @param {number} dimension vector dimension */
function generate( dimension ) {

    const TYPE = `vec${dimension}`
    const TYPELIKE = `vec${dimension}Like`
    const TYPELIKE_OR_NUM = `number|${TYPELIKE}`
    const IFNUM = ( isnum, notnum, varname = "x" ) => `typeof ${varname} === "number" ? ${isnum} : ${notnum}`
    const iMapXYZW = ["x", "y", "z", "w"]
    const iMapRGBA = ["r", "g", "b", "a"]

    const DRANGE = Range( dimension )
    /** @param {(component: number) => any} callback @param {string} [join] */
    const DMAP = function ( callback, join = ", " ) {
        return DRANGE.map( callback ).join( join )
    }

    const Param_s = fnParameter( "s", "number" )
    const Param_v = fnParameter( "v", TYPELIKE )
    const Param_x = fnParameter( "x", TYPELIKE_OR_NUM )
    const Param_v1 = fnParameter( "v1", TYPELIKE )
    const Param_v2 = fnParameter( "v2", TYPELIKE )
    const Params_v1v2 = [Param_v1, Param_v2]

    function bodyThis( statements ) {
        return [...statements, "return this"]
    }
    function bodyResult( statements ) {
        return [`const result = new ${TYPE}`, ...statements, "return result"]
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
            const params = [
                fnParameter( "object", `number|${TYPELIKE}|{${DMAP( i => `${iMapXYZW[i]}: number`, ", " )}}|{${DMAP( i => `${iMapRGBA[i]}: number`, ", " )}}`, "0" ),
                ...DRANGE.slice( 1 ).map( i => fnParameter( iMapXYZW[i], "number", undefined, true ) ),
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
            return fnDeclaration( "constructor", params, body, { indentFn: setIndent, jsdocOpts: { multiline: true } } )
        }
        function fromArray() {
            const params = [fnParameter( "array", "ArrayLike<number>" ), fnParameter( "index", "number", "0" ), fnParameter( "stride", "number", "1" )]
            const body = `return new ${TYPE}( ${DMAP( i => `array[${i} * stride + index]` )} )`
            return fnDeclaration( `fromArray`, params, body, { prefix: "static", type: TYPE } )
        }
        function fromFunction() {
            const params = [fnParameter( "fn", "(index: number) => number" )]
            const body = `return new ${TYPE}( ${DMAP( i => `fn( ${i} )` )} )`
            return fnDeclaration( `fromFunction`, params, body, { prefix: "static", type: TYPE } )
        }
        function fromAngle2() {
            const params = [fnParameter( "angle", "number" )]
            const body = `return new vec2( Math.cos( angle ), Math.sin( angle ) )`
            return fnDeclaration( `fromAngle`, params, body, { prefix: "static", type: TYPE } )
        }
        function random() {
            const body = `return new ${TYPE}( ${DMAP( _ => `Math.random()` )} )`
            return fnDeclaration( `random`, [], body, { prefix: "static", type: TYPE } )
        }
        function randomNorm() {
            const body = `return new ${TYPE}( ${DMAP( _ => `randomNorm()` )} )`
            return fnDeclaration( `randomNorm`, [], body, { prefix: "static", type: TYPE } )
        }
        function randomDir() {
            const body = `return new ${TYPE}( ${DMAP( _ => `randomNorm()` )} ).normalize()`
            return fnDeclaration( `randomDir`, [], body, { prefix: "static", type: TYPE } )
        }
        function randomSphere() {
            const body = `return new ${TYPE}( ${DMAP( _ => `randomNorm()` )} ).normalize().mul( Math.random ** ${1 / dimension} )`
            return fnDeclaration( `randomSphere`, [], body, { prefix: "static", type: TYPE } )
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
                const getter1 = fnDeclaration( name1, [], getterBody, { prefix: "get", type: "number", compact: true } )
                const getter2 = fnDeclaration( name2, [], getterBody, { prefix: "get", type: "number", compact: true } )
                const setterBody = `this[${perm[0]}] = s`
                const setter1 = fnDeclaration( name1, [Param_s], setterBody, { prefix: "set", compact: true } )
                const setter2 = fnDeclaration( name2, [Param_s], setterBody, { prefix: "set", compact: true } )
                return [getter1, setter1, getter2, setter2]
            }

            const type = `vec${dim}`
            const getterBody = `return new ${type}( ${Range( dim ).map( i => `this[${perm[i]}]` ).join( ", " )} )`
            const getter1 = fnDeclaration( name1, [], getterBody, { prefix: "get", type: type, compact: true } )
            const getter2 = fnDeclaration( name2, [], getterBody, { prefix: "get", type: type, compact: true } )
            const out = [getter1, getter2]

            if ( new Set( perm ).size === dim ) {
                const setterParam = fnParameter( "v", `vec${dim}Like` )
                const setterBody = Range( dim ).map( i => `this[${perm[i]}] = v[${i}]` ).join( ", " )
                const setter1 = fnDeclaration( name1, [setterParam], setterBody, { prefix: "set", compact: true } )
                const setter2 = fnDeclaration( name2, [setterParam], setterBody, { prefix: "set", compact: true } )
                out.push( setter1, setter2 )
            }

            return out
        } )

        return getset.flat().join( "\n" )
    }

    function clone() {
        return fnDeclaration( "clone", [], `return new ${TYPE}( this )`, { type: TYPE } )
    }

    function iterator() {
        return setIndent( `
            *[Symbol.iterator]() {
${DMAP( i => `                yield this[${i}]`, "\n" )}
            }`, 4 )
    }

    function conversion() {
        return [
            fnDeclaration( "Int8Array", [], `return new Int8Array( [...this] )`, { type: "Int8Array", compact: true } ),
            fnDeclaration( "Uint8Array", [], `return new Uint8Array( [...this] )`, { type: "Uint8Array", compact: true } ),
            fnDeclaration( "Uint8ClampedArray", [], `return new Uint8ClampedArray( [...this] )`, { type: "Uint8ClampedArray", compact: true } ),
            fnDeclaration( "Int16Array", [], `return new Int16Array( [...this] )`, { type: "Int16Array", compact: true } ),
            fnDeclaration( "Uint16Array", [], `return new Uint16Array( [...this] )`, { type: "Uint16Array", compact: true } ),
            fnDeclaration( "Int32Array", [], `return new Int32Array( [...this] )`, { type: "Int32Array", compact: true } ),
            fnDeclaration( "Uint32Array", [], `return new Uint32Array( [...this] )`, { type: "Uint32Array", compact: true } ),
            fnDeclaration( "Float32Array", [], `return new Float32Array( [...this] )`, { type: "Float32Array", compact: true } ),
            fnDeclaration( "Float64Array", [], `return new Float64Array( [...this] )`, { type: "Float64Array", compact: true } ),
        ].join( "\n" )
    }

    function comparison() {
        function equals() {
            const body = `return ${DMAP( i => `this[${i}] === v[${i}]`, " && " )}`
            return fnDeclaration( "equals", [Param_v], body, { type: "boolean" } )
        }
        function nequals() {
            const body = `return ${DMAP( i => `this[${i}] !== v[${i}]`, " || " )}`
            return fnDeclaration( "nequals", [Param_v], body, { type: "boolean" } )
        }
        function staticEquals() {
            const body = `return ${DMAP( i => `v1[${i}] === v2[${i}]`, " && " )}`
            return fnDeclaration( "equals", Params_v1v2, body, { prefix: "static", type: "boolean" } )
        }
        function staticNequals() {
            const body = `return ${DMAP( i => `v1[${i}] !== v2[${i}]`, " || " )}`
            return fnDeclaration( "nequals", Params_v1v2, body, { prefix: "static", type: "boolean" } )
        }
        const functions = [equals(), nequals(), staticEquals(), staticNequals()]
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

        /** @param {string} operation  */
        function general( operation, name ) {
            const body = `return ${IFNUM( `this.s${name}( x )`, `this.v${name}( x )` )}`
            return fnDeclaration( name, [Param_x], body, { type: TYPE } )
        }
        /** @param {string} operation  */
        function scalar( operation, name ) {
            const body = bodyThis( DRANGE.map( i => `this[${i}] ${operation}= s` ) )
            return fnDeclaration( `s${name}`, [Param_s], body, { type: TYPE } )
        }
        /** @param {string} operation  */
        function vector( operation, name ) {
            const body = bodyThis( DRANGE.map( i => `this[${i}] ${operation}= v[${i}]` ) )
            return fnDeclaration( `v${name}`, [Param_v], body, { type: TYPE } )
        }


        /** @param {string} operation  */
        function staticGeneral( operation, name ) {
            const body = `return ${IFNUM( `${TYPE}.s${name}( v, x )`, `${TYPE}.v${name}( v, x )` )}`
            return fnDeclaration( name, [Param_v, Param_x], body, { prefix: "static", type: TYPE } )
        }
        /** @param {string} operation  */
        function staticScalar( operation, name ) {
            const body = bodyResult( DRANGE.map( i => `result[${i}] = v[${i}] ${operation} s` ) )
            return fnDeclaration( `s${name}`, [Param_v, Param_s], body, { prefix: "static", type: TYPE } )
        }
        /** @param {string} operation  */
        function staticVector( operation, name ) {
            const body = bodyResult( DRANGE.map( i => `result[${i}] = v1[${i}] ${operation} v2[${i}]` ) )
            return fnDeclaration( `v${name}`, Params_v1v2, body, { prefix: "static", type: TYPE } )
        }

        function builtinMath( name ) {
            const body = bodyThis( DRANGE.map( i => `this[${i}] = Math.${name}( this[${i}] )` ) )
            return fnDeclaration( name, [], body, { type: TYPE } )
        }
        function staticBuiltinMath( name ) {
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.${name}( v[${i}] )` ) )
            return fnDeclaration( name, [Param_v], body, { prefix: "static", type: TYPE } )
        }
        const mathFunctions = Object.getOwnPropertyNames( Math ).filter( name => typeof Math[name] === "function" && Math[name].length === 1 )
        const mathCandidates = mathFunctions.filter( name => !/sin|cos|tan|log|exp|fround|clz32/.test( name ) ) // filter trig/exp/misc
        const staticMathCandidates = mathFunctions.filter( name => !/fround|clz32/.test( name ) ) // filter misc

        const functions = []
        functions.push(
            ...operations.flatMap( ( [name, op] ) => [
                general( op, name ), scalar( op, name ), vector( op, name ),
                staticGeneral( op, name ), staticScalar( op, name ), staticVector( op, name ),
            ] )
        )
        functions.push(
            ...mathCandidates.map( name => builtinMath( name ) ),
            ...staticMathCandidates.map( name => staticBuiltinMath( name ) )
        )
        return functions.join( "\n\n" )
    }

    function properties() {
        function length() {
            const body = `return Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`
            return fnDeclaration( `length`, [], body, { type: "number" } )
        }
        function staticLength() {
            const body = `return Math.sqrt( ${DMAP( i => `v[${i}] * v[${i}]`, " + " )} )`
            return fnDeclaration( `length`, [Param_v], body, { prefix: "static", type: "number" } )
        }
        function lengthSq() {
            const body = `return ${DMAP( i => `this[${i}] * this[${i}]`, " + " )}`
            return fnDeclaration( `lengthSq`, [], body, { type: "number" } )
        }
        function staticLengthSq() {
            const body = `return ${DMAP( i => `v[${i}] * v[${i}]`, " + " )}`
            return fnDeclaration( `lengthSq`, [Param_v], body, { prefix: "static", type: "number" } )
        }

        return [length(), staticLength(), lengthSq(), staticLengthSq()].join( "\n\n" )
    }

    function vectorOperations() {
        function pointTo() {
            const body = bodyThis( DRANGE.map( i => `this[${i}] = v[${i}] - this[${i}]` ) )
            return fnDeclaration( `pointTo`, [Param_v], body, { type: TYPE } )
        }
        function staticPointTo() {
            const params = [fnParameter( "from", TYPELIKE ), fnParameter( "to", TYPELIKE )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = to[${i}] - from[${i}]` ) )
            return fnDeclaration( `pointTo`, params, body, { prefix: "static", type: TYPE } )
        }

        function normalize() {
            const body = bodyThis( [
                `const factor = 1 / Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `this[${i}] *= factor` )
            ] )
            return fnDeclaration( `normalize`, [], body, { type: TYPE } )
        }
        function staticNormalize() {
            const body = bodyResult( [
                `const factor = 1 / Math.sqrt( ${DMAP( i => `v[${i}] * v[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `result[${i}] = v[${i}] * factor` )
            ] )
            return fnDeclaration( `normalize`, [Param_v], body, { prefix: "static", type: TYPE } )
        }

        function dot() {
            const body = `return ${DMAP( i => `this[${i}] * v[${i}]`, " + " )}`
            return fnDeclaration( `dot`, [Param_v], body, { type: "number" } )
        }
        function staticDot() {
            const body = `return ${DMAP( i => `v1[${i}] * v2[${i}]`, " + " )}`
            return fnDeclaration( `dot`, Params_v1v2, body, { prefix: "static", type: "number" } )
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
            return fnDeclaration( `cross`, [Param_v], body, { type: TYPE } )
        }
        function staticCross3() {
            const body = `
                const result = new ${TYPE}
                result[0] = v1[1] * v2[2] - v1[2] * v2[1]
                result[1] = v1[2] * v2[0] - v1[0] * v2[2]
                result[2] = v1[0] * v2[1] - v1[1] * v2[0]
                return result
            `
            return fnDeclaration( `cross`, Params_v1v2, body, { prefix: "static", type: TYPE } )
        }

        const functions = [
            pointTo(),
            staticPointTo(),
            normalize(),
            staticNormalize(),
            dot(),
            staticDot(),
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
            return fnDeclaration( `distance`, Params_v1v2, body, { prefix: "static", type: "number" } )
        }
        function distanceSq() {
            const body = `
                ${DMAP( i => `const d${i} = v1[${i}] - v2[${i}]`, "\n" )}
                return ${DMAP( i => `d${i} * d${i}`, " + " )}
            `
            return fnDeclaration( `distanceSq`, Params_v1v2, body, { prefix: "static", type: "number" } )
        }

        function min() {
            const params = [Param_v, fnParameter( "min", "number" )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.min( v[${i}], min )` ) )
            return fnDeclaration( `min`, params, body, { prefix: "static", type: TYPE } )
        }
        function max() {
            const params = [Param_v, fnParameter( "max", "number" )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.max( v[${i}], max )` ) )
            return fnDeclaration( `max`, params, body, { prefix: "static", type: TYPE } )
        }
        function clamp() {
            const params = [Param_v, fnParameter( "min", "number" ), fnParameter( "max", "number" )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.min( Math.max( v[${i}], min ), max  )` ) )
            return fnDeclaration( `clamp`, params, body, { prefix: "static", type: TYPE } )
        }
        function saturate() {
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.min( Math.max( v[${i}], 0 ), 1 )` ) )
            return fnDeclaration( `saturate`, [Param_v], body, { prefix: "static", type: TYPE } )
        }
        function mix() {
            const params = [Param_v1, Param_v2, fnParameter( "t", "number" )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = v1[${i}] * ( 1 - t ) + v2[${i}] * t` ) )
            return fnDeclaration( `mix`, params, body, { prefix: "static", type: TYPE } )
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
            ["typedef", `ArrayLike<number>`, `${TYPE}Like`],
        ] ),
        `export class ${TYPE} {`,
        `    static get NaN() { return new ${TYPE}( ${DMAP( () => "NaN" )} ) }`,
        subtitle( "CONSTRUCTORS" ),
        constructors(),
        subtitle( "FIELDS" ),
        fields(),
        clone(),
        iterator(),
        conversion(),
        subtitle( "COMPARISON" ),
        comparison(),
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