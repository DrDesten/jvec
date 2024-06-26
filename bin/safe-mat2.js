import { mat3 } from "./mat3.js"
/** @typedef {import("./mat3.js").mat3Like} mat3Like */
import { mat4 } from "./mat4.js"
/** @typedef {import("./mat4.js").mat4Like} mat4Like */
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

    /** @param {mat2Like} [object] */
    constructor( object ) {
        /** @type {number} */
        this[0] = +( object?.[0] ?? 1 )
        /** @type {number} */
        this[1] = +( object?.[1] ?? 0 )
        /** @type {number} */
        this[2] = +( object?.[2] ?? 0 )
        /** @type {number} */
        this[3] = +( object?.[3] ?? 1 )
    }

    /** @param {mat2Like|mat3Like|mat4Like} m @returns {mat2} */
    static fromMatrix( m ) {
        switch ( m.constructor ) {
            case mat2: return mat2.fromMat2( m )
            case mat3: return mat2.fromMat3( m )
            case mat4: return mat2.fromMat4( m )
        }
        switch ( m.length ) {
            case 4: return mat2.fromMat2( m )
            case 9: return mat2.fromMat3( m )
            case 16: return mat2.fromMat4( m )
        }
        throw new Error( "not a matrix" )
    }

    /** @param {mat2Like} m @returns {mat2} */
    static fromMat2( m ) {
        return new mat2( [
            m[0], m[1],
            m[2], m[3],
        ] )
    }

    /** @param {mat3Like} m @returns {mat2} */
    static fromMat3( m ) {
        return new mat2( [
            m[0], m[1],
            m[3], m[4],
        ] )
    }

    /** @param {mat4Like} m @returns {mat2} */
    static fromMat4( m ) {
        return new mat2( [
            m[0], m[1],
            m[4], m[5],
        ] )
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

    /** @param {number} column @returns {vec2} */
    col( column ) {
        return new vec2( this[column * 2], this[column * 2 + 1] )
    }

    /** @param {mat2Like} m @param {number} column @returns {vec2} */
    static col( m, column ) {
        return new vec2( m[column * 2], m[column * 2 + 1] )
    }

    /** @param {number} row @returns {vec2} */
    row( row ) {
        return new vec2( this[row], this[row + 2] )
    }

    /** @param {mat2Like} m @param {number} row @returns {vec2} */
    static row( m, row ) {
        return new vec2( m[row], m[row + 2] )
    }

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
    [Symbol.toStringTag]() { return "mat2" }
    /** @returns {string} */
    toString() { return `((${this[0]}, ${this[1]}), (${this[2]}, ${this[3]}))` }
    /** @returns {number[]} */
    toArray() { return [this[0], this[1], this[2], this[3]] }
    /** @returns {number[][]} */
    toArray2D() { return [[this[0], this[1]], [this[2], this[3]]] }
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
        return this[0] === m[0]
            && this[1] === m[1]
            && this[2] === m[2]
            && this[3] === m[3]
    }

    /** @param {mat2Like} m1 @param {mat2Like} m2 @returns {boolean} */
    static eq( m1, m2 ) {
        return m1[0] === m2[0]
            && m1[1] === m2[1]
            && m1[2] === m2[2]
            && m1[3] === m2[3]
    }

    /** @param {mat2Like} m @returns {boolean} */
    neq( m ) {
        return this[0] !== m[0]
            || this[1] !== m[1]
            || this[2] !== m[2]
            || this[3] !== m[3]
    }

    /** @param {mat2Like} m1 @param {mat2Like} m2 @returns {boolean} */
    static neq( m1, m2 ) {
        return m1[0] !== m2[0]
            || m1[1] !== m2[1]
            || m1[2] !== m2[2]
            || m1[3] !== m2[3]
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

    /** @param {mat2Like} m1 @param {mat2Like} m2 @param {mat2} [target=new mat2] @returns {mat2} */
    static mmul( m1, m2, target = new mat2 ) {
        const a00 = m1[0]
        const a10 = m1[1]
        const a01 = m1[2]
        const a11 = m1[3]
        const b00 = m2[0]
        const b10 = m2[1]
        const b01 = m2[2]
        const b11 = m2[3]
        target[0] = a00 * b00 + a01 * b10
        target[1] = a10 * b00 + a11 * b10
        target[2] = a00 * b01 + a01 * b11
        target[3] = a10 * b01 + a11 * b11
        return target
    }

    /** @returns {mat2} */
    transpose() {
        const m00 = this[0]
        const m10 = this[1]
        const m01 = this[2]
        const m11 = this[3]
        this[0] = m00
        this[1] = m01
        this[2] = m10
        this[3] = m11
        return this
    }

    /** @param {mat2Like} m @param {mat2} [target=new mat2] @returns {mat2} */
    static transpose( m, target = new mat2 ) {
        const m00 = m[0]
        const m10 = m[1]
        const m01 = m[2]
        const m11 = m[3]
        target[0] = m00
        target[1] = m01
        target[2] = m10
        target[3] = m11
        return target
    }

    /** @returns {mat2} */
    inverse() {
        const m00 = this[0]
        const m10 = this[1]
        const m01 = this[2]
        const m11 = this[3]
        const det = 1 / ( m00 * m11 - m10 * m01 )
        this[0] = det * m11
        this[1] = det * -m01
        this[2] = det * -m10
        this[3] = det * m00
        return this
    }

    /** @param {mat2Like} m @param {mat2} [target=new mat2] @returns {mat2} */
    static inverse( m, target = new mat2 ) {
        const m00 = m[0]
        const m10 = m[1]
        const m01 = m[2]
        const m11 = m[3]
        const det = 1 / ( m00 * m11 - m10 * m01 )
        target[0] = det * m11
        target[1] = det * -m01
        target[2] = det * -m10
        target[3] = det * m00
        return target
    }

}