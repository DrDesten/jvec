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

    /** @param {mat3Like} [object] */
    constructor( object ) {
        /** @type {number} */
        this[0] = +( object?.[0] ?? 1 )
        /** @type {number} */
        this[1] = +( object?.[1] ?? 0 )
        /** @type {number} */
        this[2] = +( object?.[2] ?? 0 )
        /** @type {number} */
        this[3] = +( object?.[3] ?? 0 )
        /** @type {number} */
        this[4] = +( object?.[4] ?? 1 )
        /** @type {number} */
        this[5] = +( object?.[5] ?? 0 )
        /** @type {number} */
        this[6] = +( object?.[6] ?? 0 )
        /** @type {number} */
        this[7] = +( object?.[7] ?? 0 )
        /** @type {number} */
        this[8] = +( object?.[8] ?? 1 )
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

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @returns {mat3} */
    clone() {
        return new mat3( this )
    }

    *[Symbol.iterator]() {
        yield this[0]
        yield this[1]
        yield this[2]
        yield this[3]
        yield this[4]
        yield this[5]
        yield this[6]
        yield this[7]
        yield this[8]
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    toString() { return `(${this[0]}, ${this[1]}, ${this[2]}, ${this[3]}, ${this[4]}, ${this[5]}, ${this[6]}, ${this[7]}, ${this[8]})` }
    /** @returns {number[][]} */
    toArray() { return [[this[0],this[1],this[2]],[this[3],this[4],this[5]],[this[6],this[7],this[8]]] }
    /** @returns {number[]} */
    toFlatArray() { return [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] }
    /** @returns {Int8Array} */
    toInt8Array() { return new Int8Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Uint8Array} */
    toUint8Array() { return new Uint8Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { return new Uint8ClampedArray( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Int16Array} */
    toInt16Array() { return new Int16Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Uint16Array} */
    toUint16Array() { return new Uint16Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Int32Array} */
    toInt32Array() { return new Int32Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Uint32Array} */
    toUint32Array() { return new Uint32Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Float32Array} */
    toFloat32Array() { return new Float32Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }
    /** @returns {Float64Array} */
    toFloat64Array() { return new Float64Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] ) }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {mat3Like} m @returns {boolean} */
    eq( m ) {
        return this[0] === m[0] && this[1] === m[1] && this[2] === m[2] && this[3] === m[3] && this[4] === m[4] && this[5] === m[5] && this[6] === m[6] && this[7] === m[7] && this[8] === m[8]
    }

    /** @param {mat3Like} m1 @param {mat3Like} m2 @returns {boolean} */
    static eq( m1, m2 ) {
        return m1[0] === m2[0] && m1[1] === m2[1] && m1[2] === m2[2] && m1[3] === m2[3] && m1[4] === m2[4] && m1[5] === m2[5] && m1[6] === m2[6] && m1[7] === m2[7] && m1[8] === m2[8]
    }

    /** @param {mat3Like} m @returns {boolean} */
    neq( m ) {
        return this[0] !== m[0] || this[1] !== m[1] || this[2] !== m[2] || this[3] !== m[3] || this[4] !== m[4] || this[5] !== m[5] || this[6] !== m[6] || this[7] !== m[7] || this[8] !== m[8]
    }

    /** @param {mat3Like} m1 @param {mat3Like} m2 @returns {boolean} */
    static neq( m1, m2 ) {
        return m1[0] !== m2[0] || m1[1] !== m2[1] || m1[2] !== m2[2] || m1[3] !== m2[3] || m1[4] !== m2[4] || m1[5] !== m2[5] || m1[6] !== m2[6] || m1[7] !== m2[7] || m1[8] !== m2[8]
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {mat3Like} m @returns {mat3} */
    mmul( m ) {
        const a00 = this[0]
        const a10 = this[1]
        const a20 = this[2]
        const a01 = this[3]
        const a11 = this[4]
        const a21 = this[5]
        const a02 = this[6]
        const a12 = this[7]
        const a22 = this[8]
        const b00 = m[0]
        const b10 = m[1]
        const b20 = m[2]
        const b01 = m[3]
        const b11 = m[4]
        const b21 = m[5]
        const b02 = m[6]
        const b12 = m[7]
        const b22 = m[8]
        this[0] = a00 * b00 + a01 * b10 + a02 * b20
        this[1] = a10 * b00 + a11 * b10 + a12 * b20
        this[2] = a20 * b00 + a21 * b10 + a22 * b20
        this[3] = a00 * b01 + a01 * b11 + a02 * b21
        this[4] = a10 * b01 + a11 * b11 + a12 * b21
        this[5] = a20 * b01 + a21 * b11 + a22 * b21
        this[6] = a00 * b02 + a01 * b12 + a02 * b22
        this[7] = a10 * b02 + a11 * b12 + a12 * b22
        this[8] = a20 * b02 + a21 * b12 + a22 * b22
        return this
    }

    /** @returns {mat3} */
    inverse() {
        const m00 = this[0]
        const m10 = this[1]
        const m20 = this[2]
        const m01 = this[3]
        const m11 = this[4]
        const m21 = this[5]
        const m02 = this[6]
        const m12 = this[7]
        const m22 = this[8]
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
    }

}