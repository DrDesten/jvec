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
    function bodyResult( statements ) {
        return [`const result = new ${TYPE}`, ...statements, "return result"]
    }

    /** @typedef {[RegExp, string]|[RegExp, string][]} StringReplacer */
    /** @param {string} string @param {StringReplacer} replacer  */
    function applyReplacer( string, replacer ) {
        if ( replacer.length === 0 ) return string
        if ( !( replacer[0] instanceof Array ) ) return string.replace( replacer[0], replacer[1] )
        return replacer.reduce( ( str, [regex, replacement] ) => str.replace( regex, replacement ), string )
    }
    /** @param {string} name @param {[FnParam|FnParam[],FnParam|FnParam[]]} params @param {string[]} statements @param {import("./codegen.js").FnOpts} opts @param {StringReplacer} replacer */
    function fnAutoStatic( name, [params, paramsStatic], statements, opts, replacer ) {
        const wrappers = opts.type === TYPE ? [bodyThis, bodyResult] : [x => x, x => x]
        const bodyNonstatic = wrappers[0]( statements )
        const bodyStatic = wrappers[1]( statements.map( statement => applyReplacer( statement, replacer ) ) )
        const fnNonstatic = new Fn( name, params, bodyNonstatic, opts )
        const fnStatic = new Fn( name, paramsStatic, bodyStatic, { ...opts, prefix: "static" } )
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
                new Fn( "toString", [], `return  \`(${DMAP( i => `\${this[${i}]}` )})\``, { type: "string", compact: true } ),
                new Fn( "toArray", [], `return  ${arrayExpr}`, { type: "number[]", compact: true } ),
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
            const body = bodyThis( DRANGE.map( i => `this[${i}] = v[${i}] - this[${i}]` ) )
            return new Fn( `pointTo`, Param_v, body, { type: TYPE } )
        }
        function staticPointTo() {
            const params = [new Fn.Param( "from", TYPELIKE ), new Fn.Param( "to", TYPELIKE )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = to[${i}] - from[${i}]` ) )
            return new Fn( `pointTo`, params, body, { prefix: "static", type: TYPE } )
        }

        function normalize() {
            const body = bodyThis( [
                `const factor = 1 / Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `this[${i}] *= factor` )
            ] )
            return new Fn( `normalize`, [], body, { type: TYPE } )
        }
        function staticNormalize() {
            const body = bodyResult( [
                `const factor = 1 / Math.sqrt( ${DMAP( i => `v[${i}] * v[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `result[${i}] = v[${i}] * factor` )
            ] )
            return new Fn( `normalize`, Param_v, body, { prefix: "static", type: TYPE } )
        }

        function setLength() {
            const body = bodyThis( [
                `const factor = s / Math.sqrt( ${DMAP( i => `this[${i}] * this[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `this[${i}] *= factor` )
            ] )
            return new Fn( `setLength`, Param_s, body, { type: TYPE } )
        }
        function staticSetLength() {
            const body = bodyResult( [
                `const factor = s / Math.sqrt( ${DMAP( i => `v[${i}] * v[${i}]`, " + " )} )`,
                ...DRANGE.map( i => `result[${i}] = v[${i}] * factor` )
            ] )
            return new Fn( `setLength`, [Param_v, Param_s], body, { prefix: "static", type: TYPE } )
        }

        function dot() {
            const body = `return ${DMAP( i => `this[${i}] * v[${i}]`, " + " )}`
            return new Fn( `dot`, Param_v, body, { type: "number" } )
        }
        function staticDot() {
            const body = `return ${DMAP( i => `v1[${i}] * v2[${i}]`, " + " )}`
            return new Fn( `dot`, Params_v1v2, body, { prefix: "static", type: "number" } )
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
            pointTo(),
            staticPointTo(),
            normalize(),
            staticNormalize(),
            setLength(),
            staticSetLength(),
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
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.min( ...values.map( x => typeof x === "number" ? x : x[${i}] ) )` ) )
            return new Fn( `min`, param, body, { prefix: "static", type: TYPE } )
        }
        function max() {
            const param = new Fn.Param( "values", `...(${TYPELIKE_OR_NUM})`, { rest: true } )
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.max( ...values.map( x => typeof x === "number" ? x : x[${i}] ) )` ) )
            return new Fn( `max`, param, body, { prefix: "static", type: TYPE } )
        }
        function clamp() {
            const params = [Param_v, new Fn.Param( "min", "number" ), new Fn.Param( "max", "number" )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.min( Math.max( v[${i}], min ), max  )` ) )
            return new Fn( `clamp`, params, body, { prefix: "static", type: TYPE } )
        }
        function saturate() {
            const body = bodyResult( DRANGE.map( i => `result[${i}] = Math.min( Math.max( v[${i}], 0 ), 1 )` ) )
            return new Fn( `saturate`, Param_v, body, { prefix: "static", type: TYPE } )
        }
        function mix() {
            const params = [Param_v1, Param_v2, new Fn.Param( "t", "number" )]
            const body = bodyResult( DRANGE.map( i => `result[${i}] = v1[${i}] * ( 1 - t ) + v2[${i}] * t` ) )
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
            let body = [
                defcomps( "m" ),
                `const det = 1 / (${id( 0, 0, "m" )} * ${id( 1, 1, "m" )} - ${id( 1, 0, "m" )} * ${id( 0, 1, "m" )})`,
                `this[0] = ${id( 1, 1, "m" )} * det`,
                `this[1] = -${id( 0, 1, "m" )} * det`,
                `this[2] = -${id( 1, 0, "m" )} * det`,
                `this[3] = ${id( 0, 0, "m" )} * det`,
                `return this`,
            ]
            return fnDeclaration( "inverse", [], body, { type: TYPE } )
        }
        function inverse3() {
            let body = [
                defcomps( "m" ),
                `const x = ${id( 1, 1, "m" )} * ${id( 2, 2, "m" )} - ${id( 1, 2, "m" )} * ${id( 2, 1, "m" )}`,
                `const y = ${id( 2, 1, "m" )} * ${id( 0, 2, "m" )} - ${id( 0, 1, "m" )} * ${id( 2, 2, "m" )}`,
                `const z = ${id( 0, 1, "m" )} * ${id( 2, 2, "m" )} - ${id( 1, 2, "m" )} * ${id( 2, 1, "m" )}`,
            ]
            return fnDeclaration( "inverse", [], body, { type: TYPE } )
        }
        function inverse4() {
            let body = [
                defcomps( "m" ),
                `const det = 1 / (${id( 0, 0, "m" )} * ${id( 1, 1, "m" )} - ${id( 1, 0, "m" )} * ${id( 0, 1, "m" )})`,
                `this[0] = ${id( 1, 1, "m" )} * det`,
                `this[1] = -${id( 0, 1, "m" )} * det`,
                `this[2] = -${id( 1, 0, "m" )} * det`,
                `this[3] = ${id( 0, 0, "m" )} * det`,
            ]
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