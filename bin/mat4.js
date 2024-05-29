import { vec2 } from "./vec2.js"
/** @typedef {import("./vec2.js").vec2Like} vec2Like */
import { vec3 } from "./vec3.js"
/** @typedef {import("./vec3.js").vec3Like} vec3Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */

// ###############################################
//      mat4
// ###############################################

/** @typedef {ArrayLike<number>} mat4Like */

export class mat4 {

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /** @param {mat4Like} [array] */
    constructor( array ) {
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
    }

    /** @param {vec2Like|vec3Like|vec4Like} v @returns {mat4} */
    static scale( v ) {
        return new mat4( [
            v[0] ?? 1, 0, 0, 0, 
            0, v[1] ?? 1, 0, 0, 
            0, 0, v[2] ?? 1, 0, 
            0, 0, 0, v[3] ?? 1, 
        ] )
    }

    /** @param {vec2Like|vec3Like} v @returns {mat4} */
    static translate( v ) {
        return new mat4( [
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            0, 0, 1, 0, 
            v[0] ?? 0, v[1] ?? 0, v[2] ?? 0, 1, 
        ] )
    }

}