import { randomNorm } from "./vechelper.js"
import { vec3 } from "./vec3.js"
/** @typedef {import("./vec3.js").vec3Like} vec3Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */

// ###############################################
//      vec2
// ###############################################

/** @typedef {ArrayLike<number>} vec2Like */

export class vec2 {

    static get NaN() { return new vec2( NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**
     * @param {number|vec2Like|{x: number, y: number}|{r: number, g: number}} [object]
     * @param {number} [y]
     */
    constructor( object = 0, y = object ) {
        if ( typeof object === "number" ) 
            this[0] = object, this[1] = +y
        else
            this[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            this[1] = +( object[1] ?? object.y ?? object.g ?? 0 )
        /** @type {number} x-coordinate of the vector */
        this[0]
        /** @type {number} y-coordinate of the vector */
        this[1]
    }

    /** @param {ArrayLike<number>} array @param {number} [index] @param {number} [stride] @returns {vec2} */
    static fromArray( array, index = 0, stride = 1 ) {
        return new vec2( array[0 * stride + index], array[1 * stride + index] )
    }

    /** @param {number} angle @returns {vec2} */
    static fromAngle( angle ) {
        return new vec2( Math.cos( angle ), Math.sin( angle ) )
    }

    /** @returns {vec2} */
    static random() {
        return new vec2( Math.random(), Math.random() )
    }

    /** @returns {vec2} */
    static randomDir() {
        return new vec2( randomNorm(), randomNorm() ).normalize()
    }

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @returns {number} */
    get x() { return this[0] }
    /** @param {number} s */
    set x( s ) { this[0] = s }
    /** @returns {number} */
    get r() { return this[0] }
    /** @param {number} s */
    set r( s ) { this[0] = s }
    /** @returns {number} */
    get y() { return this[1] }
    /** @param {number} s */
    set y( s ) { this[1] = s }
    /** @returns {number} */
    get g() { return this[1] }
    /** @param {number} s */
    set g( s ) { this[1] = s }
    /** @returns {vec2} */
    get xx() { return new vec2( this[0], this[0] ) }
    /** @returns {vec2} */
    get rr() { return new vec2( this[0], this[0] ) }
    /** @returns {vec2} */
    get xy() { return new vec2( this[0], this[1] ) }
    /** @returns {vec2} */
    get rg() { return new vec2( this[0], this[1] ) }
    /** @param {vec2Like} v */
    set xy( v ) { this[0] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set rg( v ) { this[0] = v[0], this[1] = v[1] }
    /** @returns {vec2} */
    get yx() { return new vec2( this[1], this[0] ) }
    /** @returns {vec2} */
    get gr() { return new vec2( this[1], this[0] ) }
    /** @param {vec2Like} v */
    set yx( v ) { this[1] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set gr( v ) { this[1] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get yy() { return new vec2( this[1], this[1] ) }
    /** @returns {vec2} */
    get gg() { return new vec2( this[1], this[1] ) }
    /** @returns {vec3} */
    get xxx() { return new vec3( this[0], this[0], this[0] ) }
    /** @returns {vec3} */
    get rrr() { return new vec3( this[0], this[0], this[0] ) }
    /** @returns {vec3} */
    get xxy() { return new vec3( this[0], this[0], this[1] ) }
    /** @returns {vec3} */
    get rrg() { return new vec3( this[0], this[0], this[1] ) }
    /** @returns {vec3} */
    get xyx() { return new vec3( this[0], this[1], this[0] ) }
    /** @returns {vec3} */
    get rgr() { return new vec3( this[0], this[1], this[0] ) }
    /** @returns {vec3} */
    get xyy() { return new vec3( this[0], this[1], this[1] ) }
    /** @returns {vec3} */
    get rgg() { return new vec3( this[0], this[1], this[1] ) }
    /** @returns {vec3} */
    get yxx() { return new vec3( this[1], this[0], this[0] ) }
    /** @returns {vec3} */
    get grr() { return new vec3( this[1], this[0], this[0] ) }
    /** @returns {vec3} */
    get yxy() { return new vec3( this[1], this[0], this[1] ) }
    /** @returns {vec3} */
    get grg() { return new vec3( this[1], this[0], this[1] ) }
    /** @returns {vec3} */
    get yyx() { return new vec3( this[1], this[1], this[0] ) }
    /** @returns {vec3} */
    get ggr() { return new vec3( this[1], this[1], this[0] ) }
    /** @returns {vec3} */
    get yyy() { return new vec3( this[1], this[1], this[1] ) }
    /** @returns {vec3} */
    get ggg() { return new vec3( this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get xxxx() { return new vec4( this[0], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get rrrr() { return new vec4( this[0], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get xxxy() { return new vec4( this[0], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get rrrg() { return new vec4( this[0], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get xxyx() { return new vec4( this[0], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get rrgr() { return new vec4( this[0], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get xxyy() { return new vec4( this[0], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get rrgg() { return new vec4( this[0], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get xyxx() { return new vec4( this[0], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get rgrr() { return new vec4( this[0], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get xyxy() { return new vec4( this[0], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get rgrg() { return new vec4( this[0], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get xyyx() { return new vec4( this[0], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get rggr() { return new vec4( this[0], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get xyyy() { return new vec4( this[0], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get rggg() { return new vec4( this[0], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get yxxx() { return new vec4( this[1], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get grrr() { return new vec4( this[1], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get yxxy() { return new vec4( this[1], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get grrg() { return new vec4( this[1], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get yxyx() { return new vec4( this[1], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get grgr() { return new vec4( this[1], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get yxyy() { return new vec4( this[1], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get grgg() { return new vec4( this[1], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get yyxx() { return new vec4( this[1], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get ggrr() { return new vec4( this[1], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get yyxy() { return new vec4( this[1], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get ggrg() { return new vec4( this[1], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get yyyx() { return new vec4( this[1], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get gggr() { return new vec4( this[1], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get yyyy() { return new vec4( this[1], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get gggg() { return new vec4( this[1], this[1], this[1], this[1] ) }

    /** @returns {vec2} */
    clone() {
        return new vec2( this )
    }

    /** @returns {Int8Array} */
    Int8Array() { return new Int8Array( [...this] ) }
    /** @returns {Uint8Array} */
    Uint8Array() { return new Uint8Array( [...this] ) }
    /** @returns {Uint8ClampedArray} */
    Uint8ClampedArray() { return new Uint8ClampedArray( [...this] ) }
    /** @returns {Int16Array} */
    Int16Array() { return new Int16Array( [...this] ) }
    /** @returns {Uint16Array} */
    Uint16Array() { return new Uint16Array( [...this] ) }
    /** @returns {Int32Array} */
    Int32Array() { return new Int32Array( [...this] ) }
    /** @returns {Uint32Array} */
    Uint32Array() { return new Uint32Array( [...this] ) }
    /** @returns {Float32Array} */
    Float32Array() { return new Float32Array( [...this] ) }
    /** @returns {Float64Array} */
    Float64Array() { return new Float64Array( [...this] ) }

    // ---------------------------
    //      COMPARISON
    // ---------------------------

    /** @param {vec2Like} v @returns {boolean} */
    equals( v ) {
        return this[0] === v[0] && this[1] === v[1]
    }

    /** @param {vec2Like} v @returns {boolean} */
    nequals( v ) {
        return this[0] !== v[0] || this[1] !== v[1]
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {boolean} */
    static equals( v1, v2 ) {
        return v1[0] === v2[0] && v1[1] === v2[1]
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {boolean} */
    static nequals( v1, v2 ) {
        return v1[0] !== v2[0] || v1[1] !== v2[1]
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec2Like} x @returns {vec2} */
    add( x ) {
        return typeof x === "number" ? this.sadd( x ) : this.vadd( x )
    }

    /** @param {number} s @returns {vec2} */
    sadd( s ) {
        this[0] += s
        this[1] += s
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    vadd( v ) {
        this[0] += v[0]
        this[1] += v[1]
        return this
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @returns {vec2} */
    static add( v, x ) {
        return typeof x === "number" ? vec2.sadd( v, x ) : vec2.vadd( v, x )
    }

    /** @param {vec2Like} v @param {number} s @returns {vec2} */
    static sadd( v, s ) {
        const result = new vec2
        result[0] = v[0] + s
        result[1] = v[1] + s
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {vec2} */
    static vadd( v1, v2 ) {
        const result = new vec2
        result[0] = v1[0] + v2[0]
        result[1] = v1[1] + v2[1]
        return result
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    sub( x ) {
        return typeof x === "number" ? this.ssub( x ) : this.vsub( x )
    }

    /** @param {number} s @returns {vec2} */
    ssub( s ) {
        this[0] -= s
        this[1] -= s
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    vsub( v ) {
        this[0] -= v[0]
        this[1] -= v[1]
        return this
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @returns {vec2} */
    static sub( v, x ) {
        return typeof x === "number" ? vec2.ssub( v, x ) : vec2.vsub( v, x )
    }

    /** @param {vec2Like} v @param {number} s @returns {vec2} */
    static ssub( v, s ) {
        const result = new vec2
        result[0] = v[0] - s
        result[1] = v[1] - s
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {vec2} */
    static vsub( v1, v2 ) {
        const result = new vec2
        result[0] = v1[0] - v2[0]
        result[1] = v1[1] - v2[1]
        return result
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    mul( x ) {
        return typeof x === "number" ? this.smul( x ) : this.vmul( x )
    }

    /** @param {number} s @returns {vec2} */
    smul( s ) {
        this[0] *= s
        this[1] *= s
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    vmul( v ) {
        this[0] *= v[0]
        this[1] *= v[1]
        return this
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @returns {vec2} */
    static mul( v, x ) {
        return typeof x === "number" ? vec2.smul( v, x ) : vec2.vmul( v, x )
    }

    /** @param {vec2Like} v @param {number} s @returns {vec2} */
    static smul( v, s ) {
        const result = new vec2
        result[0] = v[0] * s
        result[1] = v[1] * s
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {vec2} */
    static vmul( v1, v2 ) {
        const result = new vec2
        result[0] = v1[0] * v2[0]
        result[1] = v1[1] * v2[1]
        return result
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    div( x ) {
        return typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
    }

    /** @param {number} s @returns {vec2} */
    sdiv( s ) {
        this[0] /= s
        this[1] /= s
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    vdiv( v ) {
        this[0] /= v[0]
        this[1] /= v[1]
        return this
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @returns {vec2} */
    static div( v, x ) {
        return typeof x === "number" ? vec2.sdiv( v, x ) : vec2.vdiv( v, x )
    }

    /** @param {vec2Like} v @param {number} s @returns {vec2} */
    static sdiv( v, s ) {
        const result = new vec2
        result[0] = v[0] / s
        result[1] = v[1] / s
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {vec2} */
    static vdiv( v1, v2 ) {
        const result = new vec2
        result[0] = v1[0] / v2[0]
        result[1] = v1[1] / v2[1]
        return result
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    rem( x ) {
        return typeof x === "number" ? this.srem( x ) : this.vrem( x )
    }

    /** @param {number} s @returns {vec2} */
    srem( s ) {
        this[0] %= s
        this[1] %= s
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    vrem( v ) {
        this[0] %= v[0]
        this[1] %= v[1]
        return this
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @returns {vec2} */
    static rem( v, x ) {
        return typeof x === "number" ? vec2.srem( v, x ) : vec2.vrem( v, x )
    }

    /** @param {vec2Like} v @param {number} s @returns {vec2} */
    static srem( v, s ) {
        const result = new vec2
        result[0] = v[0] % s
        result[1] = v[1] % s
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {vec2} */
    static vrem( v1, v2 ) {
        const result = new vec2
        result[0] = v1[0] % v2[0]
        result[1] = v1[1] % v2[1]
        return result
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    pow( x ) {
        return typeof x === "number" ? this.spow( x ) : this.vpow( x )
    }

    /** @param {number} s @returns {vec2} */
    spow( s ) {
        this[0] **= s
        this[1] **= s
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    vpow( v ) {
        this[0] **= v[0]
        this[1] **= v[1]
        return this
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @returns {vec2} */
    static pow( v, x ) {
        return typeof x === "number" ? vec2.spow( v, x ) : vec2.vpow( v, x )
    }

    /** @param {vec2Like} v @param {number} s @returns {vec2} */
    static spow( v, s ) {
        const result = new vec2
        result[0] = v[0] ** s
        result[1] = v[1] ** s
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {vec2} */
    static vpow( v1, v2 ) {
        const result = new vec2
        result[0] = v1[0] ** v2[0]
        result[1] = v1[1] ** v2[1]
        return result
    }

    /** @returns {vec2} */
    abs() {
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static abs( v ) {
        const result = new vec2
        result[0] = Math.abs( v[0] )
        result[1] = Math.abs( v[1] )
        return result
    }

    /** @returns {vec2} */
    acos() {
        this[0] = Math.acos( this[0] )
        this[1] = Math.acos( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static acos( v ) {
        const result = new vec2
        result[0] = Math.acos( v[0] )
        result[1] = Math.acos( v[1] )
        return result
    }

    /** @returns {vec2} */
    acosh() {
        this[0] = Math.acosh( this[0] )
        this[1] = Math.acosh( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static acosh( v ) {
        const result = new vec2
        result[0] = Math.acosh( v[0] )
        result[1] = Math.acosh( v[1] )
        return result
    }

    /** @returns {vec2} */
    asin() {
        this[0] = Math.asin( this[0] )
        this[1] = Math.asin( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static asin( v ) {
        const result = new vec2
        result[0] = Math.asin( v[0] )
        result[1] = Math.asin( v[1] )
        return result
    }

    /** @returns {vec2} */
    asinh() {
        this[0] = Math.asinh( this[0] )
        this[1] = Math.asinh( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static asinh( v ) {
        const result = new vec2
        result[0] = Math.asinh( v[0] )
        result[1] = Math.asinh( v[1] )
        return result
    }

    /** @returns {vec2} */
    atan() {
        this[0] = Math.atan( this[0] )
        this[1] = Math.atan( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static atan( v ) {
        const result = new vec2
        result[0] = Math.atan( v[0] )
        result[1] = Math.atan( v[1] )
        return result
    }

    /** @returns {vec2} */
    atanh() {
        this[0] = Math.atanh( this[0] )
        this[1] = Math.atanh( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static atanh( v ) {
        const result = new vec2
        result[0] = Math.atanh( v[0] )
        result[1] = Math.atanh( v[1] )
        return result
    }

    /** @returns {vec2} */
    ceil() {
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static ceil( v ) {
        const result = new vec2
        result[0] = Math.ceil( v[0] )
        result[1] = Math.ceil( v[1] )
        return result
    }

    /** @returns {vec2} */
    cbrt() {
        this[0] = Math.cbrt( this[0] )
        this[1] = Math.cbrt( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static cbrt( v ) {
        const result = new vec2
        result[0] = Math.cbrt( v[0] )
        result[1] = Math.cbrt( v[1] )
        return result
    }

    /** @returns {vec2} */
    expm1() {
        this[0] = Math.expm1( this[0] )
        this[1] = Math.expm1( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static expm1( v ) {
        const result = new vec2
        result[0] = Math.expm1( v[0] )
        result[1] = Math.expm1( v[1] )
        return result
    }

    /** @returns {vec2} */
    clz32() {
        this[0] = Math.clz32( this[0] )
        this[1] = Math.clz32( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static clz32( v ) {
        const result = new vec2
        result[0] = Math.clz32( v[0] )
        result[1] = Math.clz32( v[1] )
        return result
    }

    /** @returns {vec2} */
    cos() {
        this[0] = Math.cos( this[0] )
        this[1] = Math.cos( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static cos( v ) {
        const result = new vec2
        result[0] = Math.cos( v[0] )
        result[1] = Math.cos( v[1] )
        return result
    }

    /** @returns {vec2} */
    cosh() {
        this[0] = Math.cosh( this[0] )
        this[1] = Math.cosh( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static cosh( v ) {
        const result = new vec2
        result[0] = Math.cosh( v[0] )
        result[1] = Math.cosh( v[1] )
        return result
    }

    /** @returns {vec2} */
    exp() {
        this[0] = Math.exp( this[0] )
        this[1] = Math.exp( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static exp( v ) {
        const result = new vec2
        result[0] = Math.exp( v[0] )
        result[1] = Math.exp( v[1] )
        return result
    }

    /** @returns {vec2} */
    floor() {
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static floor( v ) {
        const result = new vec2
        result[0] = Math.floor( v[0] )
        result[1] = Math.floor( v[1] )
        return result
    }

    /** @returns {vec2} */
    fround() {
        this[0] = Math.fround( this[0] )
        this[1] = Math.fround( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static fround( v ) {
        const result = new vec2
        result[0] = Math.fround( v[0] )
        result[1] = Math.fround( v[1] )
        return result
    }

    /** @returns {vec2} */
    log() {
        this[0] = Math.log( this[0] )
        this[1] = Math.log( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static log( v ) {
        const result = new vec2
        result[0] = Math.log( v[0] )
        result[1] = Math.log( v[1] )
        return result
    }

    /** @returns {vec2} */
    log1p() {
        this[0] = Math.log1p( this[0] )
        this[1] = Math.log1p( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static log1p( v ) {
        const result = new vec2
        result[0] = Math.log1p( v[0] )
        result[1] = Math.log1p( v[1] )
        return result
    }

    /** @returns {vec2} */
    log2() {
        this[0] = Math.log2( this[0] )
        this[1] = Math.log2( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static log2( v ) {
        const result = new vec2
        result[0] = Math.log2( v[0] )
        result[1] = Math.log2( v[1] )
        return result
    }

    /** @returns {vec2} */
    log10() {
        this[0] = Math.log10( this[0] )
        this[1] = Math.log10( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static log10( v ) {
        const result = new vec2
        result[0] = Math.log10( v[0] )
        result[1] = Math.log10( v[1] )
        return result
    }

    /** @returns {vec2} */
    round() {
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static round( v ) {
        const result = new vec2
        result[0] = Math.round( v[0] )
        result[1] = Math.round( v[1] )
        return result
    }

    /** @returns {vec2} */
    sign() {
        this[0] = Math.sign( this[0] )
        this[1] = Math.sign( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static sign( v ) {
        const result = new vec2
        result[0] = Math.sign( v[0] )
        result[1] = Math.sign( v[1] )
        return result
    }

    /** @returns {vec2} */
    sin() {
        this[0] = Math.sin( this[0] )
        this[1] = Math.sin( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static sin( v ) {
        const result = new vec2
        result[0] = Math.sin( v[0] )
        result[1] = Math.sin( v[1] )
        return result
    }

    /** @returns {vec2} */
    sinh() {
        this[0] = Math.sinh( this[0] )
        this[1] = Math.sinh( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static sinh( v ) {
        const result = new vec2
        result[0] = Math.sinh( v[0] )
        result[1] = Math.sinh( v[1] )
        return result
    }

    /** @returns {vec2} */
    sqrt() {
        this[0] = Math.sqrt( this[0] )
        this[1] = Math.sqrt( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static sqrt( v ) {
        const result = new vec2
        result[0] = Math.sqrt( v[0] )
        result[1] = Math.sqrt( v[1] )
        return result
    }

    /** @returns {vec2} */
    tan() {
        this[0] = Math.tan( this[0] )
        this[1] = Math.tan( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static tan( v ) {
        const result = new vec2
        result[0] = Math.tan( v[0] )
        result[1] = Math.tan( v[1] )
        return result
    }

    /** @returns {vec2} */
    tanh() {
        this[0] = Math.tanh( this[0] )
        this[1] = Math.tanh( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static tanh( v ) {
        const result = new vec2
        result[0] = Math.tanh( v[0] )
        result[1] = Math.tanh( v[1] )
        return result
    }

    /** @returns {vec2} */
    trunc() {
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static trunc( v ) {
        const result = new vec2
        result[0] = Math.trunc( v[0] )
        result[1] = Math.trunc( v[1] )
        return result
    }

    // ---------------------------
    //      PROPERTIES
    // ---------------------------

    /** @returns {number} */
    length() {
        return Math.sqrt( this[0] * this[0] + this[1] * this[1] )
    }

    /** @param {vec2Like} v @returns {number} */
    static length( v ) {
        return Math.sqrt( v[0] * v[0] + v[1] * v[1] )
    }

    /** @returns {number} */
    lengthSq() {
        return this[0] * this[0] + this[1] * this[1]
    }

    /** @param {vec2Like} v @returns {number} */
    static lengthSq( v ) {
        return v[0] * v[0] + v[1] * v[1]
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec2Like} v @returns {vec2} */
    pointTo( v ) {
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        return this
    }

    /** @param {vec2Like} from @param {vec2Like} to @returns {vec2} */
    static pointTo( from, to ) {
        const result = new vec2
        result[0] = to[0] - from[0]
        result[1] = to[1] - from[1]
        return result
    }

    /** @returns {vec2} */
    normalize() {
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] )
        this[0] *= factor
        this[1] *= factor
        return this
    }

    /** @param {vec2Like} v @returns {vec2} */
    static normalize( v ) {
        const result = new vec2
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] )
        result[0] = v[0] * factor
        result[1] = v[1] * factor
        return result
    }

    /** @param {vec2Like} v @returns {number} */
    dot( v ) {
        return this[0] * v[0] + this[1] * v[1]
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        return v1[0] * v2[0] + v1[1] * v2[1]
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        return Math.sqrt( d0 * d0 + d1 * d1 )
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        return d0 * d0 + d1 * d1
    }

    /** @param {vec2Like} v @param {number} min @returns {vec2} */
    static min( v, min ) {
        const result = new vec2
        result[0] = Math.min( v[0], min )
        result[1] = Math.min( v[1], min )
        return result
    }

    /** @param {vec2Like} v @param {number} max @returns {vec2} */
    static max( v, max ) {
        const result = new vec2
        result[0] = Math.max( v[0], max )
        result[1] = Math.max( v[1], max )
        return result
    }

    /** @param {vec2Like} v @param {number} min @param {number} max @returns {vec2} */
    static clamp( v, min, max ) {
        const result = new vec2
        result[0] = Math.min( Math.max( v[0], min ), max  )
        result[1] = Math.min( Math.max( v[1], min ), max  )
        return result
    }

    /** @param {vec2Like} v @returns {vec2} */
    static saturate( v ) {
        const result = new vec2
        result[0] = Math.min( Math.max( v[0], 0 ), 1 )
        result[1] = Math.min( Math.max( v[1], 0 ), 1 )
        return result
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {number} t @returns {vec2} */
    static mix( v1, v2, t ) {
        const result = new vec2
        result[0] = v1[0] * ( 1 - t ) + v2[0] * t
        result[1] = v1[1] * ( 1 - t ) + v2[1] * t
        return result
    }

}