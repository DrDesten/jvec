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
        this[0] = +( array?.[0] ?? 1 )
        /** @type {number} */
        this[1] = +( array?.[1] ?? 0 )
        /** @type {number} */
        this[2] = +( array?.[2] ?? 0 )
        /** @type {number} */
        this[3] = +( array?.[3] ?? 1 )
    }

    /** @param {vec2Like} v @returns {mat2} */
    static scale( v ) {
        return new mat2( [
            v[0] ?? 1, 0, 
            0, v[1] ?? 1, 
        ] )
    }

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @returns {mat2} */
    clone() {
        return new mat2( this )
    }

    *[Symbol.iterator]() {
        yield this[0]
        yield this[1]
        yield this[2]
        yield this[3]
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    toString() { return `(${this[0]}, ${this[1]}, ${this[2]}, ${this[3]})` }
    /** @returns {number[][]} */
    toArray() { return [[this[0],this[1]],[this[2],this[3]]] }
    /** @returns {number[]} */
    toFlatArray() { return [this[0], this[1], this[2], this[3]] }
    /** @returns {Int8Array} */
    toInt8Array() { return new Int8Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Uint8Array} */
    toUint8Array() { return new Uint8Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { return new Uint8ClampedArray( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Int16Array} */
    toInt16Array() { return new Int16Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Uint16Array} */
    toUint16Array() { return new Uint16Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Int32Array} */
    toInt32Array() { return new Int32Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Uint32Array} */
    toUint32Array() { return new Uint32Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Float32Array} */
    toFloat32Array() { return new Float32Array( [this[0], this[1], this[2], this[3]] ) }
    /** @returns {Float64Array} */
    toFloat64Array() { return new Float64Array( [this[0], this[1], this[2], this[3]] ) }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {mat2Like} m @returns {boolean} */
    eq( m ) {
        return this[0] === m[0] && this[1] === m[1] && this[2] === m[2] && this[3] === m[3]
    }

    /** @param {mat2Like} m1 @param {mat2Like} m2 @returns {boolean} */
    static eq( m1, m2 ) {
        return m1[0] === m2[0] && m1[1] === m2[1] && m1[2] === m2[2] && m1[3] === m2[3]
    }

    /** @param {mat2Like} m @returns {boolean} */
    neq( m ) {
        return this[0] !== m[0] || this[1] !== m[1] || this[2] !== m[2] || this[3] !== m[3]
    }

    /** @param {mat2Like} m1 @param {mat2Like} m2 @returns {boolean} */
    static neq( m1, m2 ) {
        return m1[0] !== m2[0] || m1[1] !== m2[1] || m1[2] !== m2[2] || m1[3] !== m2[3]
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {mat2Like} m @returns {mat2} */
    mmul( m ) {
        const a00 = this[0]
        const a10 = this[1]
        const a01 = this[2]
        const a11 = this[3]
        const b00 = m[0]
        const b10 = m[1]
        const b01 = m[2]
        const b11 = m[3]
        this[0] = a00 * b00 + a01 * b10
        this[1] = a10 * b00 + a11 * b10
        this[2] = a00 * b01 + a01 * b11
        this[3] = a10 * b01 + a11 * b11
        return this
    }

    /** @returns {mat2} */
    inverse() {
        const m00 = this[0]
        const m10 = this[1]
        const m01 = this[2]
        const m11 = this[3]
        const det = 1 / ( m00 * m11 - m10 * m01 )
        this[0] = m11 * det
        this[1] = -m01 * det
        this[2] = -m10 * det
        this[3] = m00 * det
        return this
    }

}