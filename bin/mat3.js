import { mat2 } from "./mat2.js"
/** @typedef {import("./mat2.js").mat2Like} mat2Like */
import { mat4 } from "./mat4.js"
/** @typedef {import("./mat4.js").mat4Like} mat4Like */
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

    /** @param {mat2Like|mat3Like|mat4Like} m @returns {mat3} */
    static fromMatrix( m ) {
        switch ( m.constructor ) {
            case mat2: return mat3.fromMat2( m )
            case mat3: return mat3.fromMat3( m )
            case mat4: return mat3.fromMat4( m )
        }
        switch ( m.length ) {
            case 4: return mat3.fromMat2( m )
            case 9: return mat3.fromMat3( m )
            case 16: return mat3.fromMat4( m )
        }
        throw new Error( "not a matrix" )
    }

    /** @param {mat2Like} m @returns {mat3} */
    static fromMat2( m ) {
        return new mat3( [
            m[0], m[1], 0,
            m[2], m[3], 0,
            0, 0, 1,
        ] )
    }

    /** @param {mat3Like} m @returns {mat3} */
    static fromMat3( m ) {
        return new mat3( [
            m[0], m[1], m[2],
            m[3], m[4], m[5],
            m[6], m[7], m[8],
        ] )
    }

    /** @param {mat4Like} m @returns {mat3} */
    static fromMat4( m ) {
        return new mat3( [
            m[0], m[1], m[2],
            m[4], m[5], m[6],
            m[8], m[9], m[10],
        ] )
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

    /** @param {vec2Like} scale @param {vec2Like} translation @returns {mat3} */
    static scaleTranslate( scale, translation ) {
        return new mat3( [
            scale[0] ?? 1, 0, 0,
            0, scale[1] ?? 1, 0,
            translation[0] ?? 0, translation[1] ?? 0, 1,
        ] )
    }

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @param {number} column @returns {vec3} */
    col( column ) {
        return new vec3( this[column * 3], this[column * 3 + 1], this[column * 3 + 2] )
    }

    /** @param {mat3Like} m @param {number} column @returns {vec3} */
    static col( m, column ) {
        return new vec3( m[column * 3], m[column * 3 + 1], m[column * 3 + 2] )
    }

    /** @param {number} row @returns {vec3} */
    row( row ) {
        return new vec3( this[row], this[row + 3], this[row + 6] )
    }

    /** @param {mat3Like} m @param {number} row @returns {vec3} */
    static row( m, row ) {
        return new vec3( m[row], m[row + 3], m[row + 6] )
    }

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
    toString() { return `((${this[0]}, ${this[1]}, ${this[2]}), (${this[3]}, ${this[4]}, ${this[5]}), (${this[6]}, ${this[7]}, ${this[8]}))` }
    /** @returns {number[]} */
    toArray() { return [this[0], this[1], this[2], this[3], this[4], this[5], this[6], this[7], this[8]] }
    /** @returns {number[][]} */
    toArray2D() { return [[this[0], this[1], this[2]], [this[3], this[4], this[5]], [this[6], this[7], this[8]]] }
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
        return this[0] === m[0]
            && this[1] === m[1]
            && this[2] === m[2]
            && this[3] === m[3]
            && this[4] === m[4]
            && this[5] === m[5]
            && this[6] === m[6]
            && this[7] === m[7]
            && this[8] === m[8]
    }

    /** @param {mat3Like} m1 @param {mat3Like} m2 @returns {boolean} */
    static eq( m1, m2 ) {
        return m1[0] === m2[0]
            && m1[1] === m2[1]
            && m1[2] === m2[2]
            && m1[3] === m2[3]
            && m1[4] === m2[4]
            && m1[5] === m2[5]
            && m1[6] === m2[6]
            && m1[7] === m2[7]
            && m1[8] === m2[8]
    }

    /** @param {mat3Like} m @returns {boolean} */
    neq( m ) {
        return this[0] !== m[0]
            || this[1] !== m[1]
            || this[2] !== m[2]
            || this[3] !== m[3]
            || this[4] !== m[4]
            || this[5] !== m[5]
            || this[6] !== m[6]
            || this[7] !== m[7]
            || this[8] !== m[8]
    }

    /** @param {mat3Like} m1 @param {mat3Like} m2 @returns {boolean} */
    static neq( m1, m2 ) {
        return m1[0] !== m2[0]
            || m1[1] !== m2[1]
            || m1[2] !== m2[2]
            || m1[3] !== m2[3]
            || m1[4] !== m2[4]
            || m1[5] !== m2[5]
            || m1[6] !== m2[6]
            || m1[7] !== m2[7]
            || m1[8] !== m2[8]
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

    /** @param {mat3Like} m1 @param {mat3Like} m2 @param {mat3} [target=new mat3] @returns {mat3} */
    static mmul( m1, m2, target = new mat3 ) {
        const a00 = m1[0]
        const a10 = m1[1]
        const a20 = m1[2]
        const a01 = m1[3]
        const a11 = m1[4]
        const a21 = m1[5]
        const a02 = m1[6]
        const a12 = m1[7]
        const a22 = m1[8]
        const b00 = m2[0]
        const b10 = m2[1]
        const b20 = m2[2]
        const b01 = m2[3]
        const b11 = m2[4]
        const b21 = m2[5]
        const b02 = m2[6]
        const b12 = m2[7]
        const b22 = m2[8]
        target[0] = a00 * b00 + a01 * b10 + a02 * b20
        target[1] = a10 * b00 + a11 * b10 + a12 * b20
        target[2] = a20 * b00 + a21 * b10 + a22 * b20
        target[3] = a00 * b01 + a01 * b11 + a02 * b21
        target[4] = a10 * b01 + a11 * b11 + a12 * b21
        target[5] = a20 * b01 + a21 * b11 + a22 * b21
        target[6] = a00 * b02 + a01 * b12 + a02 * b22
        target[7] = a10 * b02 + a11 * b12 + a12 * b22
        target[8] = a20 * b02 + a21 * b12 + a22 * b22
        return target
    }

    /** @returns {mat3} */
    transpose() {
        const m00 = this[0]
        const m10 = this[1]
        const m20 = this[2]
        const m01 = this[3]
        const m11 = this[4]
        const m21 = this[5]
        const m02 = this[6]
        const m12 = this[7]
        const m22 = this[8]
        this[0] = m00
        this[1] = m01
        this[2] = m02
        this[3] = m10
        this[4] = m11
        this[5] = m12
        this[6] = m20
        this[7] = m21
        this[8] = m22
        return this
    }

    /** @param {mat3Like} m @param {mat3} [target=new mat3] @returns {mat3} */
    static transpose( m, target = new mat3 ) {
        const m00 = m[0]
        const m10 = m[1]
        const m20 = m[2]
        const m01 = m[3]
        const m11 = m[4]
        const m21 = m[5]
        const m02 = m[6]
        const m12 = m[7]
        const m22 = m[8]
        target[0] = m00
        target[1] = m01
        target[2] = m02
        target[3] = m10
        target[4] = m11
        target[5] = m12
        target[6] = m20
        target[7] = m21
        target[8] = m22
        return target
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

    /** @param {mat3Like} m @param {mat3} [target=new mat3] @returns {mat3} */
    static inverse( m, target = new mat3 ) {
        const m00 = m[0]
        const m10 = m[1]
        const m20 = m[2]
        const m01 = m[3]
        const m11 = m[4]
        const m21 = m[5]
        const m02 = m[6]
        const m12 = m[7]
        const m22 = m[8]
        const x = m11 * m22 - m12 * m21
        const y = m21 * m02 - m01 * m22
        const z = m01 * m12 - m02 * m11
        const det = 1 / ( m00 * x + m10 * y + m20 * z )
        target[0] = det * x
        target[1] = det * ( m20 * m12 - m10 * m22 )
        target[2] = det * ( m10 * m21 - m20 * m11 )
        target[3] = det * y
        target[4] = det * ( m00 * m22 - m20 * m02 )
        target[5] = det * ( m01 * m20 - m00 * m21 )
        target[6] = det * z
        target[7] = det * ( m02 * m10 - m00 * m12 )
        target[8] = det * ( m00 * m11 - m01 * m10 )
        return target
    }

}