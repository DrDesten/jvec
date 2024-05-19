import { randomNorm } from "./vechelper.js"
import { vec2 } from "./vec2.js"
/** @typedef {import("./vec2.js").vec2Like} vec2Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */

// ###############################################
//      vec3
// ###############################################

/** @typedef {ArrayLike<number>} vec3Like */

export class vec3 {

    static get NaN() { return new vec3( NaN, NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**
     * @param {number|vec3Like|{x: number, y: number, z: number}|{r: number, g: number, b: number}} [object]
     * @param {number} [y]
     * @param {number} [z]
     */
    constructor( object = 0, y = object, z = y ) {
        if ( typeof object === "number" ) 
            this[0] = object, this[1] = +y, this[2] = +z
        else
            this[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            this[1] = +( object[1] ?? object.y ?? object.g ?? 0 ),
            this[2] = +( object[2] ?? object.z ?? object.b ?? 0 )
        /** @type {number} x-coordinate of the vector */
        this[0]
        /** @type {number} y-coordinate of the vector */
        this[1]
        /** @type {number} z-coordinate of the vector */
        this[2]
    }

    /** @param {ArrayLike<number>} array @param {number} [index] @param {number} [stride] @returns {vec3} */
    static fromArray( array, index = 0, stride = 1 ) {
        return new vec3( array[0 * stride + index], array[1 * stride + index], array[2 * stride + index] )
    }

    /** @param {(index: number) => number} fn @returns {vec3} */
    static fromFunction( fn ) {
        return new vec3( fn( 0 ), fn( 1 ), fn( 2 ) )
    }

    /** @returns {vec3} */
    static random() {
        return new vec3( Math.random(), Math.random(), Math.random() )
    }

    /** @returns {vec3} */
    static randomNorm() {
        return new vec3( randomNorm(), randomNorm(), randomNorm() )
    }

    /** @returns {vec3} */
    static randomDir() {
        return new vec3( randomNorm(), randomNorm(), randomNorm() ).normalize()
    }

    /** @returns {vec3} */
    static randomSphere() {
        return new vec3( randomNorm(), randomNorm(), randomNorm() ).normalize().mul( Math.random ** 0.3333333333333333 )
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
    /** @returns {number} */
    get z() { return this[2] }
    /** @param {number} s */
    set z( s ) { this[2] = s }
    /** @returns {number} */
    get b() { return this[2] }
    /** @param {number} s */
    set b( s ) { this[2] = s }
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
    get xz() { return new vec2( this[0], this[2] ) }
    /** @returns {vec2} */
    get rb() { return new vec2( this[0], this[2] ) }
    /** @param {vec2Like} v */
    set xz( v ) { this[0] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set rb( v ) { this[0] = v[0], this[2] = v[1] }
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
    /** @returns {vec2} */
    get yz() { return new vec2( this[1], this[2] ) }
    /** @returns {vec2} */
    get gb() { return new vec2( this[1], this[2] ) }
    /** @param {vec2Like} v */
    set yz( v ) { this[1] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set gb( v ) { this[1] = v[0], this[2] = v[1] }
    /** @returns {vec2} */
    get zx() { return new vec2( this[2], this[0] ) }
    /** @returns {vec2} */
    get br() { return new vec2( this[2], this[0] ) }
    /** @param {vec2Like} v */
    set zx( v ) { this[2] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set br( v ) { this[2] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get zy() { return new vec2( this[2], this[1] ) }
    /** @returns {vec2} */
    get bg() { return new vec2( this[2], this[1] ) }
    /** @param {vec2Like} v */
    set zy( v ) { this[2] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set bg( v ) { this[2] = v[0], this[1] = v[1] }
    /** @returns {vec2} */
    get zz() { return new vec2( this[2], this[2] ) }
    /** @returns {vec2} */
    get bb() { return new vec2( this[2], this[2] ) }
    /** @returns {vec3} */
    get xxx() { return new vec3( this[0], this[0], this[0] ) }
    /** @returns {vec3} */
    get rrr() { return new vec3( this[0], this[0], this[0] ) }
    /** @returns {vec3} */
    get xxy() { return new vec3( this[0], this[0], this[1] ) }
    /** @returns {vec3} */
    get rrg() { return new vec3( this[0], this[0], this[1] ) }
    /** @returns {vec3} */
    get xxz() { return new vec3( this[0], this[0], this[2] ) }
    /** @returns {vec3} */
    get rrb() { return new vec3( this[0], this[0], this[2] ) }
    /** @returns {vec3} */
    get xyx() { return new vec3( this[0], this[1], this[0] ) }
    /** @returns {vec3} */
    get rgr() { return new vec3( this[0], this[1], this[0] ) }
    /** @returns {vec3} */
    get xyy() { return new vec3( this[0], this[1], this[1] ) }
    /** @returns {vec3} */
    get rgg() { return new vec3( this[0], this[1], this[1] ) }
    /** @returns {vec3} */
    get xyz() { return new vec3( this[0], this[1], this[2] ) }
    /** @returns {vec3} */
    get rgb() { return new vec3( this[0], this[1], this[2] ) }
    /** @param {vec3Like} v */
    set xyz( v ) { this[0] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set rgb( v ) { this[0] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get xzx() { return new vec3( this[0], this[2], this[0] ) }
    /** @returns {vec3} */
    get rbr() { return new vec3( this[0], this[2], this[0] ) }
    /** @returns {vec3} */
    get xzy() { return new vec3( this[0], this[2], this[1] ) }
    /** @returns {vec3} */
    get rbg() { return new vec3( this[0], this[2], this[1] ) }
    /** @param {vec3Like} v */
    set xzy( v ) { this[0] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set rbg( v ) { this[0] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get xzz() { return new vec3( this[0], this[2], this[2] ) }
    /** @returns {vec3} */
    get rbb() { return new vec3( this[0], this[2], this[2] ) }
    /** @returns {vec3} */
    get yxx() { return new vec3( this[1], this[0], this[0] ) }
    /** @returns {vec3} */
    get grr() { return new vec3( this[1], this[0], this[0] ) }
    /** @returns {vec3} */
    get yxy() { return new vec3( this[1], this[0], this[1] ) }
    /** @returns {vec3} */
    get grg() { return new vec3( this[1], this[0], this[1] ) }
    /** @returns {vec3} */
    get yxz() { return new vec3( this[1], this[0], this[2] ) }
    /** @returns {vec3} */
    get grb() { return new vec3( this[1], this[0], this[2] ) }
    /** @param {vec3Like} v */
    set yxz( v ) { this[1] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set grb( v ) { this[1] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get yyx() { return new vec3( this[1], this[1], this[0] ) }
    /** @returns {vec3} */
    get ggr() { return new vec3( this[1], this[1], this[0] ) }
    /** @returns {vec3} */
    get yyy() { return new vec3( this[1], this[1], this[1] ) }
    /** @returns {vec3} */
    get ggg() { return new vec3( this[1], this[1], this[1] ) }
    /** @returns {vec3} */
    get yyz() { return new vec3( this[1], this[1], this[2] ) }
    /** @returns {vec3} */
    get ggb() { return new vec3( this[1], this[1], this[2] ) }
    /** @returns {vec3} */
    get yzx() { return new vec3( this[1], this[2], this[0] ) }
    /** @returns {vec3} */
    get gbr() { return new vec3( this[1], this[2], this[0] ) }
    /** @param {vec3Like} v */
    set yzx( v ) { this[1] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set gbr( v ) { this[1] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get yzy() { return new vec3( this[1], this[2], this[1] ) }
    /** @returns {vec3} */
    get gbg() { return new vec3( this[1], this[2], this[1] ) }
    /** @returns {vec3} */
    get yzz() { return new vec3( this[1], this[2], this[2] ) }
    /** @returns {vec3} */
    get gbb() { return new vec3( this[1], this[2], this[2] ) }
    /** @returns {vec3} */
    get zxx() { return new vec3( this[2], this[0], this[0] ) }
    /** @returns {vec3} */
    get brr() { return new vec3( this[2], this[0], this[0] ) }
    /** @returns {vec3} */
    get zxy() { return new vec3( this[2], this[0], this[1] ) }
    /** @returns {vec3} */
    get brg() { return new vec3( this[2], this[0], this[1] ) }
    /** @param {vec3Like} v */
    set zxy( v ) { this[2] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set brg( v ) { this[2] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get zxz() { return new vec3( this[2], this[0], this[2] ) }
    /** @returns {vec3} */
    get brb() { return new vec3( this[2], this[0], this[2] ) }
    /** @returns {vec3} */
    get zyx() { return new vec3( this[2], this[1], this[0] ) }
    /** @returns {vec3} */
    get bgr() { return new vec3( this[2], this[1], this[0] ) }
    /** @param {vec3Like} v */
    set zyx( v ) { this[2] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set bgr( v ) { this[2] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get zyy() { return new vec3( this[2], this[1], this[1] ) }
    /** @returns {vec3} */
    get bgg() { return new vec3( this[2], this[1], this[1] ) }
    /** @returns {vec3} */
    get zyz() { return new vec3( this[2], this[1], this[2] ) }
    /** @returns {vec3} */
    get bgb() { return new vec3( this[2], this[1], this[2] ) }
    /** @returns {vec3} */
    get zzx() { return new vec3( this[2], this[2], this[0] ) }
    /** @returns {vec3} */
    get bbr() { return new vec3( this[2], this[2], this[0] ) }
    /** @returns {vec3} */
    get zzy() { return new vec3( this[2], this[2], this[1] ) }
    /** @returns {vec3} */
    get bbg() { return new vec3( this[2], this[2], this[1] ) }
    /** @returns {vec3} */
    get zzz() { return new vec3( this[2], this[2], this[2] ) }
    /** @returns {vec3} */
    get bbb() { return new vec3( this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get xxxx() { return new vec4( this[0], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get rrrr() { return new vec4( this[0], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get xxxy() { return new vec4( this[0], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get rrrg() { return new vec4( this[0], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get xxxz() { return new vec4( this[0], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get rrrb() { return new vec4( this[0], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get xxyx() { return new vec4( this[0], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get rrgr() { return new vec4( this[0], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get xxyy() { return new vec4( this[0], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get rrgg() { return new vec4( this[0], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get xxyz() { return new vec4( this[0], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get rrgb() { return new vec4( this[0], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get xxzx() { return new vec4( this[0], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get rrbr() { return new vec4( this[0], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get xxzy() { return new vec4( this[0], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get rrbg() { return new vec4( this[0], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get xxzz() { return new vec4( this[0], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get rrbb() { return new vec4( this[0], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get xyxx() { return new vec4( this[0], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get rgrr() { return new vec4( this[0], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get xyxy() { return new vec4( this[0], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get rgrg() { return new vec4( this[0], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get xyxz() { return new vec4( this[0], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get rgrb() { return new vec4( this[0], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get xyyx() { return new vec4( this[0], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get rggr() { return new vec4( this[0], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get xyyy() { return new vec4( this[0], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get rggg() { return new vec4( this[0], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get xyyz() { return new vec4( this[0], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get rggb() { return new vec4( this[0], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get xyzx() { return new vec4( this[0], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get rgbr() { return new vec4( this[0], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get xyzy() { return new vec4( this[0], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get rgbg() { return new vec4( this[0], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get xyzz() { return new vec4( this[0], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get rgbb() { return new vec4( this[0], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get xzxx() { return new vec4( this[0], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get rbrr() { return new vec4( this[0], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get xzxy() { return new vec4( this[0], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get rbrg() { return new vec4( this[0], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get xzxz() { return new vec4( this[0], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get rbrb() { return new vec4( this[0], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get xzyx() { return new vec4( this[0], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get rbgr() { return new vec4( this[0], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get xzyy() { return new vec4( this[0], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get rbgg() { return new vec4( this[0], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get xzyz() { return new vec4( this[0], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get rbgb() { return new vec4( this[0], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get xzzx() { return new vec4( this[0], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get rbbr() { return new vec4( this[0], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get xzzy() { return new vec4( this[0], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get rbbg() { return new vec4( this[0], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get xzzz() { return new vec4( this[0], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get rbbb() { return new vec4( this[0], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get yxxx() { return new vec4( this[1], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get grrr() { return new vec4( this[1], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get yxxy() { return new vec4( this[1], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get grrg() { return new vec4( this[1], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get yxxz() { return new vec4( this[1], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get grrb() { return new vec4( this[1], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get yxyx() { return new vec4( this[1], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get grgr() { return new vec4( this[1], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get yxyy() { return new vec4( this[1], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get grgg() { return new vec4( this[1], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get yxyz() { return new vec4( this[1], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get grgb() { return new vec4( this[1], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get yxzx() { return new vec4( this[1], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get grbr() { return new vec4( this[1], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get yxzy() { return new vec4( this[1], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get grbg() { return new vec4( this[1], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get yxzz() { return new vec4( this[1], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get grbb() { return new vec4( this[1], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get yyxx() { return new vec4( this[1], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get ggrr() { return new vec4( this[1], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get yyxy() { return new vec4( this[1], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get ggrg() { return new vec4( this[1], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get yyxz() { return new vec4( this[1], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get ggrb() { return new vec4( this[1], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get yyyx() { return new vec4( this[1], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get gggr() { return new vec4( this[1], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get yyyy() { return new vec4( this[1], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get gggg() { return new vec4( this[1], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get yyyz() { return new vec4( this[1], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get gggb() { return new vec4( this[1], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get yyzx() { return new vec4( this[1], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get ggbr() { return new vec4( this[1], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get yyzy() { return new vec4( this[1], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get ggbg() { return new vec4( this[1], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get yyzz() { return new vec4( this[1], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get ggbb() { return new vec4( this[1], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get yzxx() { return new vec4( this[1], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get gbrr() { return new vec4( this[1], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get yzxy() { return new vec4( this[1], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get gbrg() { return new vec4( this[1], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get yzxz() { return new vec4( this[1], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get gbrb() { return new vec4( this[1], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get yzyx() { return new vec4( this[1], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get gbgr() { return new vec4( this[1], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get yzyy() { return new vec4( this[1], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get gbgg() { return new vec4( this[1], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get yzyz() { return new vec4( this[1], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get gbgb() { return new vec4( this[1], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get yzzx() { return new vec4( this[1], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get gbbr() { return new vec4( this[1], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get yzzy() { return new vec4( this[1], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get gbbg() { return new vec4( this[1], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get yzzz() { return new vec4( this[1], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get gbbb() { return new vec4( this[1], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get zxxx() { return new vec4( this[2], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get brrr() { return new vec4( this[2], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get zxxy() { return new vec4( this[2], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get brrg() { return new vec4( this[2], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get zxxz() { return new vec4( this[2], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get brrb() { return new vec4( this[2], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get zxyx() { return new vec4( this[2], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get brgr() { return new vec4( this[2], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get zxyy() { return new vec4( this[2], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get brgg() { return new vec4( this[2], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get zxyz() { return new vec4( this[2], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get brgb() { return new vec4( this[2], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get zxzx() { return new vec4( this[2], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get brbr() { return new vec4( this[2], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get zxzy() { return new vec4( this[2], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get brbg() { return new vec4( this[2], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get zxzz() { return new vec4( this[2], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get brbb() { return new vec4( this[2], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get zyxx() { return new vec4( this[2], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get bgrr() { return new vec4( this[2], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get zyxy() { return new vec4( this[2], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get bgrg() { return new vec4( this[2], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get zyxz() { return new vec4( this[2], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get bgrb() { return new vec4( this[2], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get zyyx() { return new vec4( this[2], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get bggr() { return new vec4( this[2], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get zyyy() { return new vec4( this[2], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get bggg() { return new vec4( this[2], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get zyyz() { return new vec4( this[2], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get bggb() { return new vec4( this[2], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get zyzx() { return new vec4( this[2], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get bgbr() { return new vec4( this[2], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get zyzy() { return new vec4( this[2], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get bgbg() { return new vec4( this[2], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get zyzz() { return new vec4( this[2], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get bgbb() { return new vec4( this[2], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get zzxx() { return new vec4( this[2], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get bbrr() { return new vec4( this[2], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get zzxy() { return new vec4( this[2], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get bbrg() { return new vec4( this[2], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get zzxz() { return new vec4( this[2], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get bbrb() { return new vec4( this[2], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get zzyx() { return new vec4( this[2], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get bbgr() { return new vec4( this[2], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get zzyy() { return new vec4( this[2], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get bbgg() { return new vec4( this[2], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get zzyz() { return new vec4( this[2], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get bbgb() { return new vec4( this[2], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get zzzx() { return new vec4( this[2], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get bbbr() { return new vec4( this[2], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get zzzy() { return new vec4( this[2], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get bbbg() { return new vec4( this[2], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get zzzz() { return new vec4( this[2], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get bbbb() { return new vec4( this[2], this[2], this[2], this[2] ) }

    /** @returns {vec3} */
    clone() {
        return new vec3( this )
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

    /** @param {vec3Like} v @returns {boolean} */
    equals( v ) {
        return this[0] === v[0] && this[1] === v[1] && this[2] === v[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    nequals( v ) {
        return this[0] !== v[0] || this[1] !== v[1] || this[2] !== v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static equals( v1, v2 ) {
        return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static nequals( v1, v2 ) {
        return v1[0] !== v2[0] || v1[1] !== v2[1] || v1[2] !== v2[2]
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec3Like} x @returns {vec3} */
    add( x ) {
        return typeof x === "number" ? this.sadd( x ) : this.vadd( x )
    }

    /** @param {number} s @returns {vec3} */
    sadd( s ) {
        this[0] += s
        this[1] += s
        this[2] += s
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    vadd( v ) {
        this[0] += v[0]
        this[1] += v[1]
        this[2] += v[2]
        return this
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @returns {vec3} */
    static add( v, x ) {
        return typeof x === "number" ? vec3.sadd( v, x ) : vec3.vadd( v, x )
    }

    /** @param {vec3Like} v @param {number} s @returns {vec3} */
    static sadd( v, s ) {
        const result = new vec3
        result[0] = v[0] + s
        result[1] = v[1] + s
        result[2] = v[2] + s
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static vadd( v1, v2 ) {
        const result = new vec3
        result[0] = v1[0] + v2[0]
        result[1] = v1[1] + v2[1]
        result[2] = v1[2] + v2[2]
        return result
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    sub( x ) {
        return typeof x === "number" ? this.ssub( x ) : this.vsub( x )
    }

    /** @param {number} s @returns {vec3} */
    ssub( s ) {
        this[0] -= s
        this[1] -= s
        this[2] -= s
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    vsub( v ) {
        this[0] -= v[0]
        this[1] -= v[1]
        this[2] -= v[2]
        return this
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @returns {vec3} */
    static sub( v, x ) {
        return typeof x === "number" ? vec3.ssub( v, x ) : vec3.vsub( v, x )
    }

    /** @param {vec3Like} v @param {number} s @returns {vec3} */
    static ssub( v, s ) {
        const result = new vec3
        result[0] = v[0] - s
        result[1] = v[1] - s
        result[2] = v[2] - s
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static vsub( v1, v2 ) {
        const result = new vec3
        result[0] = v1[0] - v2[0]
        result[1] = v1[1] - v2[1]
        result[2] = v1[2] - v2[2]
        return result
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    mul( x ) {
        return typeof x === "number" ? this.smul( x ) : this.vmul( x )
    }

    /** @param {number} s @returns {vec3} */
    smul( s ) {
        this[0] *= s
        this[1] *= s
        this[2] *= s
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    vmul( v ) {
        this[0] *= v[0]
        this[1] *= v[1]
        this[2] *= v[2]
        return this
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @returns {vec3} */
    static mul( v, x ) {
        return typeof x === "number" ? vec3.smul( v, x ) : vec3.vmul( v, x )
    }

    /** @param {vec3Like} v @param {number} s @returns {vec3} */
    static smul( v, s ) {
        const result = new vec3
        result[0] = v[0] * s
        result[1] = v[1] * s
        result[2] = v[2] * s
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static vmul( v1, v2 ) {
        const result = new vec3
        result[0] = v1[0] * v2[0]
        result[1] = v1[1] * v2[1]
        result[2] = v1[2] * v2[2]
        return result
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    div( x ) {
        return typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
    }

    /** @param {number} s @returns {vec3} */
    sdiv( s ) {
        this[0] /= s
        this[1] /= s
        this[2] /= s
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    vdiv( v ) {
        this[0] /= v[0]
        this[1] /= v[1]
        this[2] /= v[2]
        return this
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @returns {vec3} */
    static div( v, x ) {
        return typeof x === "number" ? vec3.sdiv( v, x ) : vec3.vdiv( v, x )
    }

    /** @param {vec3Like} v @param {number} s @returns {vec3} */
    static sdiv( v, s ) {
        const result = new vec3
        result[0] = v[0] / s
        result[1] = v[1] / s
        result[2] = v[2] / s
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static vdiv( v1, v2 ) {
        const result = new vec3
        result[0] = v1[0] / v2[0]
        result[1] = v1[1] / v2[1]
        result[2] = v1[2] / v2[2]
        return result
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    rem( x ) {
        return typeof x === "number" ? this.srem( x ) : this.vrem( x )
    }

    /** @param {number} s @returns {vec3} */
    srem( s ) {
        this[0] %= s
        this[1] %= s
        this[2] %= s
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    vrem( v ) {
        this[0] %= v[0]
        this[1] %= v[1]
        this[2] %= v[2]
        return this
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @returns {vec3} */
    static rem( v, x ) {
        return typeof x === "number" ? vec3.srem( v, x ) : vec3.vrem( v, x )
    }

    /** @param {vec3Like} v @param {number} s @returns {vec3} */
    static srem( v, s ) {
        const result = new vec3
        result[0] = v[0] % s
        result[1] = v[1] % s
        result[2] = v[2] % s
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static vrem( v1, v2 ) {
        const result = new vec3
        result[0] = v1[0] % v2[0]
        result[1] = v1[1] % v2[1]
        result[2] = v1[2] % v2[2]
        return result
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    pow( x ) {
        return typeof x === "number" ? this.spow( x ) : this.vpow( x )
    }

    /** @param {number} s @returns {vec3} */
    spow( s ) {
        this[0] **= s
        this[1] **= s
        this[2] **= s
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    vpow( v ) {
        this[0] **= v[0]
        this[1] **= v[1]
        this[2] **= v[2]
        return this
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @returns {vec3} */
    static pow( v, x ) {
        return typeof x === "number" ? vec3.spow( v, x ) : vec3.vpow( v, x )
    }

    /** @param {vec3Like} v @param {number} s @returns {vec3} */
    static spow( v, s ) {
        const result = new vec3
        result[0] = v[0] ** s
        result[1] = v[1] ** s
        result[2] = v[2] ** s
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static vpow( v1, v2 ) {
        const result = new vec3
        result[0] = v1[0] ** v2[0]
        result[1] = v1[1] ** v2[1]
        result[2] = v1[2] ** v2[2]
        return result
    }

    /** @returns {vec3} */
    abs() {
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        this[2] = Math.abs( this[2] )
        return this
    }

    /** @returns {vec3} */
    ceil() {
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        this[2] = Math.ceil( this[2] )
        return this
    }

    /** @returns {vec3} */
    cbrt() {
        this[0] = Math.cbrt( this[0] )
        this[1] = Math.cbrt( this[1] )
        this[2] = Math.cbrt( this[2] )
        return this
    }

    /** @returns {vec3} */
    floor() {
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        this[2] = Math.floor( this[2] )
        return this
    }

    /** @returns {vec3} */
    round() {
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        this[2] = Math.round( this[2] )
        return this
    }

    /** @returns {vec3} */
    sign() {
        this[0] = Math.sign( this[0] )
        this[1] = Math.sign( this[1] )
        this[2] = Math.sign( this[2] )
        return this
    }

    /** @returns {vec3} */
    sqrt() {
        this[0] = Math.sqrt( this[0] )
        this[1] = Math.sqrt( this[1] )
        this[2] = Math.sqrt( this[2] )
        return this
    }

    /** @returns {vec3} */
    trunc() {
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        this[2] = Math.trunc( this[2] )
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    static abs( v ) {
        const result = new vec3
        result[0] = Math.abs( v[0] )
        result[1] = Math.abs( v[1] )
        result[2] = Math.abs( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static acos( v ) {
        const result = new vec3
        result[0] = Math.acos( v[0] )
        result[1] = Math.acos( v[1] )
        result[2] = Math.acos( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static acosh( v ) {
        const result = new vec3
        result[0] = Math.acosh( v[0] )
        result[1] = Math.acosh( v[1] )
        result[2] = Math.acosh( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static asin( v ) {
        const result = new vec3
        result[0] = Math.asin( v[0] )
        result[1] = Math.asin( v[1] )
        result[2] = Math.asin( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static asinh( v ) {
        const result = new vec3
        result[0] = Math.asinh( v[0] )
        result[1] = Math.asinh( v[1] )
        result[2] = Math.asinh( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static atan( v ) {
        const result = new vec3
        result[0] = Math.atan( v[0] )
        result[1] = Math.atan( v[1] )
        result[2] = Math.atan( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static atanh( v ) {
        const result = new vec3
        result[0] = Math.atanh( v[0] )
        result[1] = Math.atanh( v[1] )
        result[2] = Math.atanh( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static ceil( v ) {
        const result = new vec3
        result[0] = Math.ceil( v[0] )
        result[1] = Math.ceil( v[1] )
        result[2] = Math.ceil( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static cbrt( v ) {
        const result = new vec3
        result[0] = Math.cbrt( v[0] )
        result[1] = Math.cbrt( v[1] )
        result[2] = Math.cbrt( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static expm1( v ) {
        const result = new vec3
        result[0] = Math.expm1( v[0] )
        result[1] = Math.expm1( v[1] )
        result[2] = Math.expm1( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static cos( v ) {
        const result = new vec3
        result[0] = Math.cos( v[0] )
        result[1] = Math.cos( v[1] )
        result[2] = Math.cos( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static cosh( v ) {
        const result = new vec3
        result[0] = Math.cosh( v[0] )
        result[1] = Math.cosh( v[1] )
        result[2] = Math.cosh( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static exp( v ) {
        const result = new vec3
        result[0] = Math.exp( v[0] )
        result[1] = Math.exp( v[1] )
        result[2] = Math.exp( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static floor( v ) {
        const result = new vec3
        result[0] = Math.floor( v[0] )
        result[1] = Math.floor( v[1] )
        result[2] = Math.floor( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static log( v ) {
        const result = new vec3
        result[0] = Math.log( v[0] )
        result[1] = Math.log( v[1] )
        result[2] = Math.log( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static log1p( v ) {
        const result = new vec3
        result[0] = Math.log1p( v[0] )
        result[1] = Math.log1p( v[1] )
        result[2] = Math.log1p( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static log2( v ) {
        const result = new vec3
        result[0] = Math.log2( v[0] )
        result[1] = Math.log2( v[1] )
        result[2] = Math.log2( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static log10( v ) {
        const result = new vec3
        result[0] = Math.log10( v[0] )
        result[1] = Math.log10( v[1] )
        result[2] = Math.log10( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static round( v ) {
        const result = new vec3
        result[0] = Math.round( v[0] )
        result[1] = Math.round( v[1] )
        result[2] = Math.round( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static sign( v ) {
        const result = new vec3
        result[0] = Math.sign( v[0] )
        result[1] = Math.sign( v[1] )
        result[2] = Math.sign( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static sin( v ) {
        const result = new vec3
        result[0] = Math.sin( v[0] )
        result[1] = Math.sin( v[1] )
        result[2] = Math.sin( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static sinh( v ) {
        const result = new vec3
        result[0] = Math.sinh( v[0] )
        result[1] = Math.sinh( v[1] )
        result[2] = Math.sinh( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static sqrt( v ) {
        const result = new vec3
        result[0] = Math.sqrt( v[0] )
        result[1] = Math.sqrt( v[1] )
        result[2] = Math.sqrt( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static tan( v ) {
        const result = new vec3
        result[0] = Math.tan( v[0] )
        result[1] = Math.tan( v[1] )
        result[2] = Math.tan( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static tanh( v ) {
        const result = new vec3
        result[0] = Math.tanh( v[0] )
        result[1] = Math.tanh( v[1] )
        result[2] = Math.tanh( v[2] )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static trunc( v ) {
        const result = new vec3
        result[0] = Math.trunc( v[0] )
        result[1] = Math.trunc( v[1] )
        result[2] = Math.trunc( v[2] )
        return result
    }

    // ---------------------------
    //      PROPERTIES
    // ---------------------------

    /** @returns {number} */
    length() {
        return Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
    }

    /** @param {vec3Like} v @returns {number} */
    static length( v ) {
        return Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
    }

    /** @returns {number} */
    lengthSq() {
        return this[0] * this[0] + this[1] * this[1] + this[2] * this[2]
    }

    /** @param {vec3Like} v @returns {number} */
    static lengthSq( v ) {
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec3Like} v @returns {vec3} */
    pointTo( v ) {
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        this[2] = v[2] - this[2]
        return this
    }

    /** @param {vec3Like} from @param {vec3Like} to @returns {vec3} */
    static pointTo( from, to ) {
        const result = new vec3
        result[0] = to[0] - from[0]
        result[1] = to[1] - from[1]
        result[2] = to[2] - from[2]
        return result
    }

    /** @returns {vec3} */
    normalize() {
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        return this
    }

    /** @param {vec3Like} v @returns {vec3} */
    static normalize( v ) {
        const result = new vec3
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        result[0] = v[0] * factor
        result[1] = v[1] * factor
        result[2] = v[2] * factor
        return result
    }

    /** @param {vec3Like} v @returns {number} */
    dot( v ) {
        return this[0] * v[0] + this[1] * v[1] + this[2] * v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
    }

    /** @param {vec3Like} v @returns {vec3} */
    cross( v ) {
        const t0 = this[1] * v[2] - this[2] * v[1]
        const t1 = this[2] * v[0] - this[0] * v[2]
        const t2 = this[0] * v[1] - this[1] * v[0]
        this[0] = t0
        this[1] = t1
        this[2] = t2
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {vec3} */
    static cross( v1, v2 ) {
        const result = new vec3
        result[0] = v1[1] * v2[2] - v1[2] * v2[1]
        result[1] = v1[2] * v2[0] - v1[0] * v2[2]
        result[2] = v1[0] * v2[1] - v1[1] * v2[0]
        return result
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        return Math.sqrt( d0 * d0 + d1 * d1 + d2 * d2 )
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        return d0 * d0 + d1 * d1 + d2 * d2
    }

    /** @param {vec3Like} v @param {number} min @returns {vec3} */
    static min( v, min ) {
        const result = new vec3
        result[0] = Math.min( v[0], min )
        result[1] = Math.min( v[1], min )
        result[2] = Math.min( v[2], min )
        return result
    }

    /** @param {vec3Like} v @param {number} max @returns {vec3} */
    static max( v, max ) {
        const result = new vec3
        result[0] = Math.max( v[0], max )
        result[1] = Math.max( v[1], max )
        result[2] = Math.max( v[2], max )
        return result
    }

    /** @param {vec3Like} v @param {number} min @param {number} max @returns {vec3} */
    static clamp( v, min, max ) {
        const result = new vec3
        result[0] = Math.min( Math.max( v[0], min ), max  )
        result[1] = Math.min( Math.max( v[1], min ), max  )
        result[2] = Math.min( Math.max( v[2], min ), max  )
        return result
    }

    /** @param {vec3Like} v @returns {vec3} */
    static saturate( v ) {
        const result = new vec3
        result[0] = Math.min( Math.max( v[0], 0 ), 1 )
        result[1] = Math.min( Math.max( v[1], 0 ), 1 )
        result[2] = Math.min( Math.max( v[2], 0 ), 1 )
        return result
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {number} t @returns {vec3} */
    static mix( v1, v2, t ) {
        const result = new vec3
        result[0] = v1[0] * ( 1 - t ) + v2[0] * t
        result[1] = v1[1] * ( 1 - t ) + v2[1] * t
        result[2] = v1[2] * ( 1 - t ) + v2[2] * t
        return result
    }

}