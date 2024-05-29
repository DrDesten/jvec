import { vec2 } from "./vec2.js"
/** @typedef {import("./vec2.js").vec2Like} vec2Like */
import { vec3 } from "./vec3.js"
/** @typedef {import("./vec3.js").vec3Like} vec3Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */

// ###############################################
//      mat3
// ###############################################

/** @typedef {ArrayLike<number>} mat3Like */

export class mat3 {

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /** @param {mat3Like} [array] */
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
        this[i] = +( array?.[i] ?? 1 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 0 )
        /** @type {number} */
        this[i] = +( array?.[i] ?? 1 )
    }

    /** @param {vec2Like|vec3Like} v @returns {mat3} */
    static scale( v ) {
        return new mat3( [
            v[0] ?? 1, 0, 0, 
            0, v[1] ?? 1, 0, 
            0, 0, v[2] ?? 1, 
        ] )
    }

    /** @param {vec2Like} v @returns {mat3} */
    static translate( v ) {
        return new mat3( [
            1, 0, 0, 
            0, 1, 0, 
            v[0] ?? 0, v[1] ?? 0, 1, 
        ] )
    }

}