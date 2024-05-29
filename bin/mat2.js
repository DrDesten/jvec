import { vec2 } from "./vec2.js"
/** @typedef {import("./vec2.js").vec2Like} vec2Like */
import { vec3 } from "./vec3.js"
/** @typedef {import("./vec3.js").vec3Like} vec3Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */

// ###############################################
//      mat2
// ###############################################

/** @typedef {ArrayLike<number>} mat2Like */

export class mat2 {

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /** @param {mat2Like} [array] */
    constructor( array ) {
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
    }

    /** @param {vec2Like} v @returns {mat2} */
    static scale( v ) {
        return new mat2( [
            v[0] ?? 1, 0, 
            0, v[1] ?? 1, 
        ] )
    }

}