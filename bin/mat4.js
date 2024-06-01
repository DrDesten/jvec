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
        this[0] = +( array?.[0] ?? 1 )
        /** @type {number} */
        this[1] = +( array?.[1] ?? 0 )
        /** @type {number} */
        this[2] = +( array?.[2] ?? 0 )
        /** @type {number} */
        this[3] = +( array?.[3] ?? 0 )
        /** @type {number} */
        this[4] = +( array?.[4] ?? 0 )
        /** @type {number} */
        this[5] = +( array?.[5] ?? 1 )
        /** @type {number} */
        this[6] = +( array?.[6] ?? 0 )
        /** @type {number} */
        this[7] = +( array?.[7] ?? 0 )
        /** @type {number} */
        this[8] = +( array?.[8] ?? 0 )
        /** @type {number} */
        this[9] = +( array?.[9] ?? 0 )
        /** @type {number} */
        this[10] = +( array?.[10] ?? 1 )
        /** @type {number} */
        this[11] = +( array?.[11] ?? 0 )
        /** @type {number} */
        this[12] = +( array?.[12] ?? 0 )
        /** @type {number} */
        this[13] = +( array?.[13] ?? 0 )
        /** @type {number} */
        this[14] = +( array?.[14] ?? 0 )
        /** @type {number} */
        this[15] = +( array?.[15] ?? 1 )
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

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @returns {mat4} */
    clone() {
        return new mat4( this )
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
        yield this[9]
        yield this[10]
        yield this[11]
        yield this[12]
        yield this[13]
        yield this[14]
        yield this[15]
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    toString() { return `(${this[0]}, ${this[1]}, ${this[2]}, ${this[3]}, ${this[4]}, ${this[5]}, ${this[6]}, ${this[7]}, ${this[8]}, ${this[9]}, ${this[10]}, ${this[11]}, ${this[12]}, ${this[13]}, ${this[14]}, ${this[15]})` }
    /** @returns {number[][]} */
    toArray() { return [[this[0],this[1],this[2],this[3]],[this[4],this[5],this[6],this[7]],[this[8],this[9],this[10],this[11]],[this[12],this[13],this[14],this[15]]] }
    /** @returns {number[]} */
    toFlatArray() { return [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] }
    /** @returns {Int8Array} */
    toInt8Array() { return new Int8Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Uint8Array} */
    toUint8Array() { return new Uint8Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { return new Uint8ClampedArray( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Int16Array} */
    toInt16Array() { return new Int16Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Uint16Array} */
    toUint16Array() { return new Uint16Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Int32Array} */
    toInt32Array() { return new Int32Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Uint32Array} */
    toUint32Array() { return new Uint32Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Float32Array} */
    toFloat32Array() { return new Float32Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }
    /** @returns {Float64Array} */
    toFloat64Array() { return new Float64Array( [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8], this[9], this[10], this[11], this[12], this[13], this[14], this[15]] ) }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {mat4Like} m @returns {boolean} */
    eq( m ) {
        return this[0] === m[0] && this[1] === m[1] && this[2] === m[2] && this[3] === m[3] && this[4] === m[4] && this[5] === m[5] && this[6] === m[6] && this[7] === m[7] && this[8] === m[8] && this[9] === m[9] && this[10] === m[10] && this[11] === m[11] && this[12] === m[12] && this[13] === m[13] && this[14] === m[14] && this[15] === m[15]
    }

    /** @param {mat4Like} m1 @param {mat4Like} m2 @returns {boolean} */
    static eq( m1, m2 ) {
        return m1[0] === m2[0] && m1[1] === m2[1] && m1[2] === m2[2] && m1[3] === m2[3] && m1[4] === m2[4] && m1[5] === m2[5] && m1[6] === m2[6] && m1[7] === m2[7] && m1[8] === m2[8] && m1[9] === m2[9] && m1[10] === m2[10] && m1[11] === m2[11] && m1[12] === m2[12] && m1[13] === m2[13] && m1[14] === m2[14] && m1[15] === m2[15]
    }

    /** @param {mat4Like} m @returns {boolean} */
    neq( m ) {
        return this[0] !== m[0] || this[1] !== m[1] || this[2] !== m[2] || this[3] !== m[3] || this[4] !== m[4] || this[5] !== m[5] || this[6] !== m[6] || this[7] !== m[7] || this[8] !== m[8] || this[9] !== m[9] || this[10] !== m[10] || this[11] !== m[11] || this[12] !== m[12] || this[13] !== m[13] || this[14] !== m[14] || this[15] !== m[15]
    }

    /** @param {mat4Like} m1 @param {mat4Like} m2 @returns {boolean} */
    static neq( m1, m2 ) {
        return m1[0] !== m2[0] || m1[1] !== m2[1] || m1[2] !== m2[2] || m1[3] !== m2[3] || m1[4] !== m2[4] || m1[5] !== m2[5] || m1[6] !== m2[6] || m1[7] !== m2[7] || m1[8] !== m2[8] || m1[9] !== m2[9] || m1[10] !== m2[10] || m1[11] !== m2[11] || m1[12] !== m2[12] || m1[13] !== m2[13] || m1[14] !== m2[14] || m1[15] !== m2[15]
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {mat4Like} m @returns {mat4} */
    mmul( m ) {
        const a00 = this[0]
        const a10 = this[1]
        const a20 = this[2]
        const a30 = this[3]
        const a01 = this[4]
        const a11 = this[5]
        const a21 = this[6]
        const a31 = this[7]
        const a02 = this[8]
        const a12 = this[9]
        const a22 = this[10]
        const a32 = this[11]
        const a03 = this[12]
        const a13 = this[13]
        const a23 = this[14]
        const a33 = this[15]
        const b00 = m[0]
        const b10 = m[1]
        const b20 = m[2]
        const b30 = m[3]
        const b01 = m[4]
        const b11 = m[5]
        const b21 = m[6]
        const b31 = m[7]
        const b02 = m[8]
        const b12 = m[9]
        const b22 = m[10]
        const b32 = m[11]
        const b03 = m[12]
        const b13 = m[13]
        const b23 = m[14]
        const b33 = m[15]
        this[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30
        this[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30
        this[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30
        this[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30
        this[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31
        this[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31
        this[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31
        this[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31
        this[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32
        this[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32
        this[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32
        this[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32
        this[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33
        this[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33
        this[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33
        this[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33
        return this
    }

    /** @returns {mat4} */
    inverse() {
        const m00 = this[0]
        const m10 = this[1]
        const m20 = this[2]
        const m30 = this[3]
        const m01 = this[4]
        const m11 = this[5]
        const m21 = this[6]
        const m31 = this[7]
        const m02 = this[8]
        const m12 = this[9]
        const m22 = this[10]
        const m32 = this[11]
        const m03 = this[12]
        const m13 = this[13]
        const m23 = this[14]
        const m33 = this[15]             
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
        const d = 1.0 / ( m00 * t00 + m01 * t10 + m02 * t20 + m03 * t30 )
        this[0] = t00 * d
        this[1] = t10 * d
        this[2] = t20 * d
        this[3] = t30 * d
        this[4] = t01 * d
        this[5] = t11 * d
        this[6] = t21 * d
        this[7] = t31 * d
        this[8] = t02 * d
        this[9] = t12 * d
        this[10] = t22 * d
        this[11] = t32 * d
        this[12] = t03 * d
        this[13] = t13 * d
        this[14] = t23 * d
        this[15] = t33 * d
        return this
    }

}