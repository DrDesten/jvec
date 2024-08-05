import { randomNorm } from "./vechelper.js"
import { vec2 } from "./vec2.js"
/** @typedef {import("./vec2.js").vec2Like} vec2Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */
import { mat2 } from "./mat2.js"
/** @typedef {import("./mat2.js").mat2Like} mat2Like */
import { mat3 } from "./mat3.js"
/** @typedef {import("./mat3.js").mat3Like} mat3Like */
import { mat4 } from "./mat4.js"
/** @typedef {import("./mat4.js").mat4Like} mat4Like */

// ###############################################
//      vec3
// ###############################################

/** @typedef {vec3|ArrayLike<number>} vec3Like */

export class vec3 extends Float64Array {

    static get NaN() { return vec3.new( NaN, NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**  */
    constructor() {
        super( 2 )
    }

    /**
     * @param {number|vec3Like|{x: number, y: number, z: number}|{r: number, g: number, b: number}} [object=0]
     * @param {number} [y]
     * @param {number} [z]
     * @returns {vec3}
     */
    static new( object = 0, y, z ) {
        const vec = new vec3
        if ( typeof object === "number" )
            y === undefined
                ? ( vec[0] = object, vec[1] = object, vec[2] = object )
                : ( vec[0] = object, vec[1] = +y, vec[2] = +( z ?? 0 ) )
        else
            vec[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            vec[1] = +( object[1] ?? object.y ?? object.g ?? 0 ),
            vec[2] = +( object[2] ?? object.z ?? object.b ?? 0 )
        return vec
    }

    /** @param {ArrayLike<number>} array @param {number} [index=0] @param {number} [stride=1] @returns {vec3} */
    static fromArray( array, index = 0, stride = 1 ) {
        return vec3.new( array[0 * stride + index], array[1 * stride + index], array[2 * stride + index] )
    }

    /** @param {(index: number) => number} fn @returns {vec3} */
    static fromFunction( fn ) {
        return vec3.new( fn( 0 ), fn( 1 ), fn( 2 ) )
    }

    /** @returns {vec3} */
    static random() {
        return vec3.new( Math.random(), Math.random(), Math.random() )
    }

    /** @returns {vec3} */
    static randomNorm() {
        return vec3.new( randomNorm(), randomNorm(), randomNorm() )
    }

    /** @returns {vec3} */
    static randomDir() {
        return vec3.new( randomNorm(), randomNorm(), randomNorm() ).normalize()
    }

    /** @returns {vec3} */
    static randomSphere() {
        return vec3.new( randomNorm(), randomNorm(), randomNorm() ).setLength( Math.random() ** (1/3) )
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
    get xx() { return vec2.new( this[0], this[0] ) }
    /** @returns {vec2} */
    get rr() { return vec2.new( this[0], this[0] ) }
    /** @returns {vec2} */
    get xy() { return vec2.new( this[0], this[1] ) }
    /** @returns {vec2} */
    get rg() { return vec2.new( this[0], this[1] ) }
    /** @param {vec2Like} v */
    set xy( v ) { this[0] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set rg( v ) { this[0] = v[0], this[1] = v[1] }
    /** @returns {vec2} */
    get xz() { return vec2.new( this[0], this[2] ) }
    /** @returns {vec2} */
    get rb() { return vec2.new( this[0], this[2] ) }
    /** @param {vec2Like} v */
    set xz( v ) { this[0] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set rb( v ) { this[0] = v[0], this[2] = v[1] }
    /** @returns {vec2} */
    get yx() { return vec2.new( this[1], this[0] ) }
    /** @returns {vec2} */
    get gr() { return vec2.new( this[1], this[0] ) }
    /** @param {vec2Like} v */
    set yx( v ) { this[1] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set gr( v ) { this[1] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get yy() { return vec2.new( this[1], this[1] ) }
    /** @returns {vec2} */
    get gg() { return vec2.new( this[1], this[1] ) }
    /** @returns {vec2} */
    get yz() { return vec2.new( this[1], this[2] ) }
    /** @returns {vec2} */
    get gb() { return vec2.new( this[1], this[2] ) }
    /** @param {vec2Like} v */
    set yz( v ) { this[1] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set gb( v ) { this[1] = v[0], this[2] = v[1] }
    /** @returns {vec2} */
    get zx() { return vec2.new( this[2], this[0] ) }
    /** @returns {vec2} */
    get br() { return vec2.new( this[2], this[0] ) }
    /** @param {vec2Like} v */
    set zx( v ) { this[2] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set br( v ) { this[2] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get zy() { return vec2.new( this[2], this[1] ) }
    /** @returns {vec2} */
    get bg() { return vec2.new( this[2], this[1] ) }
    /** @param {vec2Like} v */
    set zy( v ) { this[2] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set bg( v ) { this[2] = v[0], this[1] = v[1] }
    /** @returns {vec2} */
    get zz() { return vec2.new( this[2], this[2] ) }
    /** @returns {vec2} */
    get bb() { return vec2.new( this[2], this[2] ) }
    /** @returns {vec3} */
    get xxx() { return vec3.new( this[0], this[0], this[0] ) }
    /** @returns {vec3} */
    get rrr() { return vec3.new( this[0], this[0], this[0] ) }
    /** @returns {vec3} */
    get xxy() { return vec3.new( this[0], this[0], this[1] ) }
    /** @returns {vec3} */
    get rrg() { return vec3.new( this[0], this[0], this[1] ) }
    /** @returns {vec3} */
    get xxz() { return vec3.new( this[0], this[0], this[2] ) }
    /** @returns {vec3} */
    get rrb() { return vec3.new( this[0], this[0], this[2] ) }
    /** @returns {vec3} */
    get xyx() { return vec3.new( this[0], this[1], this[0] ) }
    /** @returns {vec3} */
    get rgr() { return vec3.new( this[0], this[1], this[0] ) }
    /** @returns {vec3} */
    get xyy() { return vec3.new( this[0], this[1], this[1] ) }
    /** @returns {vec3} */
    get rgg() { return vec3.new( this[0], this[1], this[1] ) }
    /** @returns {vec3} */
    get xyz() { return vec3.new( this[0], this[1], this[2] ) }
    /** @returns {vec3} */
    get rgb() { return vec3.new( this[0], this[1], this[2] ) }
    /** @param {vec3Like} v */
    set xyz( v ) { this[0] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set rgb( v ) { this[0] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get xzx() { return vec3.new( this[0], this[2], this[0] ) }
    /** @returns {vec3} */
    get rbr() { return vec3.new( this[0], this[2], this[0] ) }
    /** @returns {vec3} */
    get xzy() { return vec3.new( this[0], this[2], this[1] ) }
    /** @returns {vec3} */
    get rbg() { return vec3.new( this[0], this[2], this[1] ) }
    /** @param {vec3Like} v */
    set xzy( v ) { this[0] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set rbg( v ) { this[0] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get xzz() { return vec3.new( this[0], this[2], this[2] ) }
    /** @returns {vec3} */
    get rbb() { return vec3.new( this[0], this[2], this[2] ) }
    /** @returns {vec3} */
    get yxx() { return vec3.new( this[1], this[0], this[0] ) }
    /** @returns {vec3} */
    get grr() { return vec3.new( this[1], this[0], this[0] ) }
    /** @returns {vec3} */
    get yxy() { return vec3.new( this[1], this[0], this[1] ) }
    /** @returns {vec3} */
    get grg() { return vec3.new( this[1], this[0], this[1] ) }
    /** @returns {vec3} */
    get yxz() { return vec3.new( this[1], this[0], this[2] ) }
    /** @returns {vec3} */
    get grb() { return vec3.new( this[1], this[0], this[2] ) }
    /** @param {vec3Like} v */
    set yxz( v ) { this[1] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set grb( v ) { this[1] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get yyx() { return vec3.new( this[1], this[1], this[0] ) }
    /** @returns {vec3} */
    get ggr() { return vec3.new( this[1], this[1], this[0] ) }
    /** @returns {vec3} */
    get yyy() { return vec3.new( this[1], this[1], this[1] ) }
    /** @returns {vec3} */
    get ggg() { return vec3.new( this[1], this[1], this[1] ) }
    /** @returns {vec3} */
    get yyz() { return vec3.new( this[1], this[1], this[2] ) }
    /** @returns {vec3} */
    get ggb() { return vec3.new( this[1], this[1], this[2] ) }
    /** @returns {vec3} */
    get yzx() { return vec3.new( this[1], this[2], this[0] ) }
    /** @returns {vec3} */
    get gbr() { return vec3.new( this[1], this[2], this[0] ) }
    /** @param {vec3Like} v */
    set yzx( v ) { this[1] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set gbr( v ) { this[1] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get yzy() { return vec3.new( this[1], this[2], this[1] ) }
    /** @returns {vec3} */
    get gbg() { return vec3.new( this[1], this[2], this[1] ) }
    /** @returns {vec3} */
    get yzz() { return vec3.new( this[1], this[2], this[2] ) }
    /** @returns {vec3} */
    get gbb() { return vec3.new( this[1], this[2], this[2] ) }
    /** @returns {vec3} */
    get zxx() { return vec3.new( this[2], this[0], this[0] ) }
    /** @returns {vec3} */
    get brr() { return vec3.new( this[2], this[0], this[0] ) }
    /** @returns {vec3} */
    get zxy() { return vec3.new( this[2], this[0], this[1] ) }
    /** @returns {vec3} */
    get brg() { return vec3.new( this[2], this[0], this[1] ) }
    /** @param {vec3Like} v */
    set zxy( v ) { this[2] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set brg( v ) { this[2] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get zxz() { return vec3.new( this[2], this[0], this[2] ) }
    /** @returns {vec3} */
    get brb() { return vec3.new( this[2], this[0], this[2] ) }
    /** @returns {vec3} */
    get zyx() { return vec3.new( this[2], this[1], this[0] ) }
    /** @returns {vec3} */
    get bgr() { return vec3.new( this[2], this[1], this[0] ) }
    /** @param {vec3Like} v */
    set zyx( v ) { this[2] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set bgr( v ) { this[2] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get zyy() { return vec3.new( this[2], this[1], this[1] ) }
    /** @returns {vec3} */
    get bgg() { return vec3.new( this[2], this[1], this[1] ) }
    /** @returns {vec3} */
    get zyz() { return vec3.new( this[2], this[1], this[2] ) }
    /** @returns {vec3} */
    get bgb() { return vec3.new( this[2], this[1], this[2] ) }
    /** @returns {vec3} */
    get zzx() { return vec3.new( this[2], this[2], this[0] ) }
    /** @returns {vec3} */
    get bbr() { return vec3.new( this[2], this[2], this[0] ) }
    /** @returns {vec3} */
    get zzy() { return vec3.new( this[2], this[2], this[1] ) }
    /** @returns {vec3} */
    get bbg() { return vec3.new( this[2], this[2], this[1] ) }
    /** @returns {vec3} */
    get zzz() { return vec3.new( this[2], this[2], this[2] ) }
    /** @returns {vec3} */
    get bbb() { return vec3.new( this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get xxxx() { return vec4.new( this[0], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get rrrr() { return vec4.new( this[0], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get xxxy() { return vec4.new( this[0], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get rrrg() { return vec4.new( this[0], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get xxxz() { return vec4.new( this[0], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get rrrb() { return vec4.new( this[0], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get xxyx() { return vec4.new( this[0], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get rrgr() { return vec4.new( this[0], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get xxyy() { return vec4.new( this[0], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get rrgg() { return vec4.new( this[0], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get xxyz() { return vec4.new( this[0], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get rrgb() { return vec4.new( this[0], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get xxzx() { return vec4.new( this[0], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get rrbr() { return vec4.new( this[0], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get xxzy() { return vec4.new( this[0], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get rrbg() { return vec4.new( this[0], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get xxzz() { return vec4.new( this[0], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get rrbb() { return vec4.new( this[0], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get xyxx() { return vec4.new( this[0], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get rgrr() { return vec4.new( this[0], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get xyxy() { return vec4.new( this[0], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get rgrg() { return vec4.new( this[0], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get xyxz() { return vec4.new( this[0], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get rgrb() { return vec4.new( this[0], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get xyyx() { return vec4.new( this[0], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get rggr() { return vec4.new( this[0], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get xyyy() { return vec4.new( this[0], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get rggg() { return vec4.new( this[0], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get xyyz() { return vec4.new( this[0], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get rggb() { return vec4.new( this[0], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get xyzx() { return vec4.new( this[0], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get rgbr() { return vec4.new( this[0], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get xyzy() { return vec4.new( this[0], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get rgbg() { return vec4.new( this[0], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get xyzz() { return vec4.new( this[0], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get rgbb() { return vec4.new( this[0], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get xzxx() { return vec4.new( this[0], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get rbrr() { return vec4.new( this[0], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get xzxy() { return vec4.new( this[0], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get rbrg() { return vec4.new( this[0], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get xzxz() { return vec4.new( this[0], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get rbrb() { return vec4.new( this[0], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get xzyx() { return vec4.new( this[0], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get rbgr() { return vec4.new( this[0], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get xzyy() { return vec4.new( this[0], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get rbgg() { return vec4.new( this[0], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get xzyz() { return vec4.new( this[0], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get rbgb() { return vec4.new( this[0], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get xzzx() { return vec4.new( this[0], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get rbbr() { return vec4.new( this[0], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get xzzy() { return vec4.new( this[0], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get rbbg() { return vec4.new( this[0], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get xzzz() { return vec4.new( this[0], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get rbbb() { return vec4.new( this[0], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get yxxx() { return vec4.new( this[1], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get grrr() { return vec4.new( this[1], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get yxxy() { return vec4.new( this[1], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get grrg() { return vec4.new( this[1], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get yxxz() { return vec4.new( this[1], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get grrb() { return vec4.new( this[1], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get yxyx() { return vec4.new( this[1], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get grgr() { return vec4.new( this[1], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get yxyy() { return vec4.new( this[1], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get grgg() { return vec4.new( this[1], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get yxyz() { return vec4.new( this[1], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get grgb() { return vec4.new( this[1], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get yxzx() { return vec4.new( this[1], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get grbr() { return vec4.new( this[1], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get yxzy() { return vec4.new( this[1], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get grbg() { return vec4.new( this[1], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get yxzz() { return vec4.new( this[1], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get grbb() { return vec4.new( this[1], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get yyxx() { return vec4.new( this[1], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get ggrr() { return vec4.new( this[1], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get yyxy() { return vec4.new( this[1], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get ggrg() { return vec4.new( this[1], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get yyxz() { return vec4.new( this[1], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get ggrb() { return vec4.new( this[1], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get yyyx() { return vec4.new( this[1], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get gggr() { return vec4.new( this[1], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get yyyy() { return vec4.new( this[1], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get gggg() { return vec4.new( this[1], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get yyyz() { return vec4.new( this[1], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get gggb() { return vec4.new( this[1], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get yyzx() { return vec4.new( this[1], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get ggbr() { return vec4.new( this[1], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get yyzy() { return vec4.new( this[1], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get ggbg() { return vec4.new( this[1], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get yyzz() { return vec4.new( this[1], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get ggbb() { return vec4.new( this[1], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get yzxx() { return vec4.new( this[1], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get gbrr() { return vec4.new( this[1], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get yzxy() { return vec4.new( this[1], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get gbrg() { return vec4.new( this[1], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get yzxz() { return vec4.new( this[1], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get gbrb() { return vec4.new( this[1], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get yzyx() { return vec4.new( this[1], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get gbgr() { return vec4.new( this[1], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get yzyy() { return vec4.new( this[1], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get gbgg() { return vec4.new( this[1], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get yzyz() { return vec4.new( this[1], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get gbgb() { return vec4.new( this[1], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get yzzx() { return vec4.new( this[1], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get gbbr() { return vec4.new( this[1], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get yzzy() { return vec4.new( this[1], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get gbbg() { return vec4.new( this[1], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get yzzz() { return vec4.new( this[1], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get gbbb() { return vec4.new( this[1], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get zxxx() { return vec4.new( this[2], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get brrr() { return vec4.new( this[2], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get zxxy() { return vec4.new( this[2], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get brrg() { return vec4.new( this[2], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get zxxz() { return vec4.new( this[2], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get brrb() { return vec4.new( this[2], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get zxyx() { return vec4.new( this[2], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get brgr() { return vec4.new( this[2], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get zxyy() { return vec4.new( this[2], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get brgg() { return vec4.new( this[2], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get zxyz() { return vec4.new( this[2], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get brgb() { return vec4.new( this[2], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get zxzx() { return vec4.new( this[2], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get brbr() { return vec4.new( this[2], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get zxzy() { return vec4.new( this[2], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get brbg() { return vec4.new( this[2], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get zxzz() { return vec4.new( this[2], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get brbb() { return vec4.new( this[2], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get zyxx() { return vec4.new( this[2], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get bgrr() { return vec4.new( this[2], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get zyxy() { return vec4.new( this[2], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get bgrg() { return vec4.new( this[2], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get zyxz() { return vec4.new( this[2], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get bgrb() { return vec4.new( this[2], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get zyyx() { return vec4.new( this[2], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get bggr() { return vec4.new( this[2], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get zyyy() { return vec4.new( this[2], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get bggg() { return vec4.new( this[2], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get zyyz() { return vec4.new( this[2], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get bggb() { return vec4.new( this[2], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get zyzx() { return vec4.new( this[2], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get bgbr() { return vec4.new( this[2], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get zyzy() { return vec4.new( this[2], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get bgbg() { return vec4.new( this[2], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get zyzz() { return vec4.new( this[2], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get bgbb() { return vec4.new( this[2], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get zzxx() { return vec4.new( this[2], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get bbrr() { return vec4.new( this[2], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get zzxy() { return vec4.new( this[2], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get bbrg() { return vec4.new( this[2], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get zzxz() { return vec4.new( this[2], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get bbrb() { return vec4.new( this[2], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get zzyx() { return vec4.new( this[2], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get bbgr() { return vec4.new( this[2], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get zzyy() { return vec4.new( this[2], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get bbgg() { return vec4.new( this[2], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get zzyz() { return vec4.new( this[2], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get bbgb() { return vec4.new( this[2], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get zzzx() { return vec4.new( this[2], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get bbbr() { return vec4.new( this[2], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get zzzy() { return vec4.new( this[2], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get bbbg() { return vec4.new( this[2], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get zzzz() { return vec4.new( this[2], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get bbbb() { return vec4.new( this[2], this[2], this[2], this[2] ) }

    /** @param {number|vec3Like} x @param {number} [y] @param {number} [z] @returns {vec3} */
    set( x, y, z ) {
        typeof x === "number"
            ? ( this[0] = x, this[1] = y, this[2] = z )
            : ( this[0] = x[0], this[1] = x[1], this[2] = x[2] )
        return this
    }

    /** @returns {vec3} */
    clone() {
        const target = new vec3
        target[0] = this[0]
        target[1] = this[1]
        target[2] = this[2]
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static clone( v, target = new vec3 ) {
        target[0] = v[0]
        target[1] = v[1]
        target[2] = v[2]
        return target
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    [Symbol.toStringTag]() { return "vec3" }
    /** @returns {string} */
    toString() { return `(${this[0]}, ${this[1]}, ${this[2]})` }
    /** @returns {number[]} */
    toArray() { return [...this] }
    /** @returns {Int8Array} */
    toInt8Array() { return new Int8Array( this ) }
    /** @returns {Uint8Array} */
    toUint8Array() { return new Uint8Array( this ) }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { return new Uint8ClampedArray( this ) }
    /** @returns {Int16Array} */
    toInt16Array() { return new Int16Array( this ) }
    /** @returns {Uint16Array} */
    toUint16Array() { return new Uint16Array( this ) }
    /** @returns {Int32Array} */
    toInt32Array() { return new Int32Array( this ) }
    /** @returns {Uint32Array} */
    toUint32Array() { return new Uint32Array( this ) }
    /** @returns {Float32Array} */
    toFloat32Array() { return new Float32Array( this ) }
    /** @returns {Float64Array} */
    toFloat64Array() { return new Float64Array( this ) }

    /** @param {{hex?: boolean}} [options={}] @returns {string} */
    toCSSColor( options = {} ) {
        if ( options.hex ) {
            const r = Math.round( Math.min( Math.max( this[0] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const g = Math.round( Math.min( Math.max( this[1] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const b = Math.round( Math.min( Math.max( this[2] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            return `#${r}${g}${b}`
        } else {
            const r = Math.min( Math.max( this[0] * 100, 0 ), 100 )
            const g = Math.min( Math.max( this[1] * 100, 0 ), 100 )
            const b = Math.min( Math.max( this[2] * 100, 0 ), 100 )
            return `rgb(${r}%, ${g}%, ${b}%)`
        }
    }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {vec3Like} v @returns {boolean} */
    eq( v ) {
        return this[0] === v[0] && this[1] === v[1] && this[2] === v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static eq( v1, v2 ) {
        return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    neq( v ) {
        return this[0] !== v[0] || this[1] !== v[1] || this[2] !== v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static neq( v1, v2 ) {
        return v1[0] !== v2[0] || v1[1] !== v2[1] || v1[2] !== v2[2]
    }

    /** @returns {boolean} */
    all() {
        return !!this[0] && !!this[1] && !!this[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    static all( v ) {
        return !!v[0] && !!v[1] && !!v[2]
    }

    /** @returns {boolean} */
    any() {
        return !!this[0] || !!this[1] || !!this[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    static any( v ) {
        return !!v[0] || !!v[1] || !!v[2]
    }

    /** @param {vec3Like} v @returns {vec3} */
    greaterThan( v ) {
        this[0] = +( this[0] > v[0] )
        this[1] = +( this[1] > v[1] )
        this[2] = +( this[2] > v[2] )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static greaterThan( v1, v2, target = new vec3 ) {
        target[0] = +( v1[0] > v2[0] )
        target[1] = +( v1[1] > v2[1] )
        target[2] = +( v1[2] > v2[2] )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    greaterThanEqual( v ) {
        this[0] = +( this[0] >= v[0] )
        this[1] = +( this[1] >= v[1] )
        this[2] = +( this[2] >= v[2] )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static greaterThanEqual( v1, v2, target = new vec3 ) {
        target[0] = +( v1[0] >= v2[0] )
        target[1] = +( v1[1] >= v2[1] )
        target[2] = +( v1[2] >= v2[2] )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    lessThan( v ) {
        this[0] = +( this[0] < v[0] )
        this[1] = +( this[1] < v[1] )
        this[2] = +( this[2] < v[2] )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static lessThan( v1, v2, target = new vec3 ) {
        target[0] = +( v1[0] < v2[0] )
        target[1] = +( v1[1] < v2[1] )
        target[2] = +( v1[2] < v2[2] )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    lessThanEqual( v ) {
        this[0] = +( this[0] <= v[0] )
        this[1] = +( this[1] <= v[1] )
        this[2] = +( this[2] <= v[2] )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static lessThanEqual( v1, v2, target = new vec3 ) {
        target[0] = +( v1[0] <= v2[0] )
        target[1] = +( v1[1] <= v2[1] )
        target[2] = +( v1[2] <= v2[2] )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    equal( v ) {
        this[0] = +( this[0] === v[0] )
        this[1] = +( this[1] === v[1] )
        this[2] = +( this[2] === v[2] )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static equal( v1, v2, target = new vec3 ) {
        target[0] = +( v1[0] === v2[0] )
        target[1] = +( v1[1] === v2[1] )
        target[2] = +( v1[2] === v2[2] )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    notEqual( v ) {
        this[0] = +( this[0] !== v[0] )
        this[1] = +( this[1] !== v[1] )
        this[2] = +( this[2] !== v[2] )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static notEqual( v1, v2, target = new vec3 ) {
        target[0] = +( v1[0] !== v2[0] )
        target[1] = +( v1[1] !== v2[1] )
        target[2] = +( v1[2] !== v2[2] )
        return target
    }

    /** @returns {vec3} */
    not() {
        this[0] = +!this[0]
        this[1] = +!this[1]
        this[2] = +!this[2]
        return this
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static not( v, target = new vec3 ) {
        target[0] = +!v[0]
        target[1] = +!v[1]
        target[2] = +!v[2]
        return target
    }

    /** @returns {vec3} */
    isinf() {
        this[0] = +( this[0] === -Infinity || this[0] === Infinity )
        this[1] = +( this[1] === -Infinity || this[1] === Infinity )
        this[2] = +( this[2] === -Infinity || this[2] === Infinity )
        return this
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static isinf( v, target = new vec3 ) {
        target[0] = +( v[0] === -Infinity || v[0] === Infinity )
        target[1] = +( v[1] === -Infinity || v[1] === Infinity )
        target[2] = +( v[2] === -Infinity || v[2] === Infinity )
        return target
    }

    /** @returns {vec3} */
    isnan() {
        this[0] = +( this[0] !== this[0] )
        this[1] = +( this[1] !== this[1] )
        this[2] = +( this[2] !== this[2] )
        return this
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static isnan( v, target = new vec3 ) {
        target[0] = +( v[0] !== v[0] )
        target[1] = +( v[1] !== v[1] )
        target[2] = +( v[2] !== v[2] )
        return target
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec3Like} x @returns {vec3} */
    add( x ) {
        return typeof x === "number" ? this.sadd( x ) : this.vadd( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static add( v, x, target = new vec3 ) {
        return typeof x === "number" ? vec3.sadd( v, x, target ) : vec3.vadd( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    sadd( s ) {
        this[0] += s
        this[1] += s
        this[2] += s
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static sadd( v, s, target = new vec3 ) {
        target[0] = v[0] + s
        target[1] = v[1] + s
        target[2] = v[2] + s
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vadd( v ) {
        this[0] += v[0]
        this[1] += v[1]
        this[2] += v[2]
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vadd( v1, v2, target = new vec3 ) {
        target[0] = v1[0] + v2[0]
        target[1] = v1[1] + v2[1]
        target[2] = v1[2] + v2[2]
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    sub( x ) {
        return typeof x === "number" ? this.ssub( x ) : this.vsub( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static sub( v, x, target = new vec3 ) {
        return typeof x === "number" ? vec3.ssub( v, x, target ) : vec3.vsub( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    ssub( s ) {
        this[0] -= s
        this[1] -= s
        this[2] -= s
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static ssub( v, s, target = new vec3 ) {
        target[0] = v[0] - s
        target[1] = v[1] - s
        target[2] = v[2] - s
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vsub( v ) {
        this[0] -= v[0]
        this[1] -= v[1]
        this[2] -= v[2]
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vsub( v1, v2, target = new vec3 ) {
        target[0] = v1[0] - v2[0]
        target[1] = v1[1] - v2[1]
        target[2] = v1[2] - v2[2]
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    mul( x ) {
        return typeof x === "number" ? this.smul( x ) : this.vmul( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static mul( v, x, target = new vec3 ) {
        return typeof x === "number" ? vec3.smul( v, x, target ) : vec3.vmul( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    smul( s ) {
        this[0] *= s
        this[1] *= s
        this[2] *= s
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static smul( v, s, target = new vec3 ) {
        target[0] = v[0] * s
        target[1] = v[1] * s
        target[2] = v[2] * s
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vmul( v ) {
        this[0] *= v[0]
        this[1] *= v[1]
        this[2] *= v[2]
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vmul( v1, v2, target = new vec3 ) {
        target[0] = v1[0] * v2[0]
        target[1] = v1[1] * v2[1]
        target[2] = v1[2] * v2[2]
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    div( x ) {
        return typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static div( v, x, target = new vec3 ) {
        return typeof x === "number" ? vec3.sdiv( v, x, target ) : vec3.vdiv( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    sdiv( s ) {
        this[0] /= s
        this[1] /= s
        this[2] /= s
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static sdiv( v, s, target = new vec3 ) {
        target[0] = v[0] / s
        target[1] = v[1] / s
        target[2] = v[2] / s
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vdiv( v ) {
        this[0] /= v[0]
        this[1] /= v[1]
        this[2] /= v[2]
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vdiv( v1, v2, target = new vec3 ) {
        target[0] = v1[0] / v2[0]
        target[1] = v1[1] / v2[1]
        target[2] = v1[2] / v2[2]
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    rem( x ) {
        return typeof x === "number" ? this.srem( x ) : this.vrem( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static rem( v, x, target = new vec3 ) {
        return typeof x === "number" ? vec3.srem( v, x, target ) : vec3.vrem( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    srem( s ) {
        this[0] %= s
        this[1] %= s
        this[2] %= s
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static srem( v, s, target = new vec3 ) {
        target[0] = v[0] % s
        target[1] = v[1] % s
        target[2] = v[2] % s
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vrem( v ) {
        this[0] %= v[0]
        this[1] %= v[1]
        this[2] %= v[2]
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vrem( v1, v2, target = new vec3 ) {
        target[0] = v1[0] % v2[0]
        target[1] = v1[1] % v2[1]
        target[2] = v1[2] % v2[2]
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    pow( x ) {
        return typeof x === "number" ? this.spow( x ) : this.vpow( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static pow( v, x, target = new vec3 ) {
        return typeof x === "number" ? vec3.spow( v, x, target ) : vec3.vpow( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    spow( s ) {
        this[0] **= s
        this[1] **= s
        this[2] **= s
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static spow( v, s, target = new vec3 ) {
        target[0] = v[0] ** s
        target[1] = v[1] ** s
        target[2] = v[2] ** s
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vpow( v ) {
        this[0] **= v[0]
        this[1] **= v[1]
        this[2] **= v[2]
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vpow( v1, v2, target = new vec3 ) {
        target[0] = v1[0] ** v2[0]
        target[1] = v1[1] ** v2[1]
        target[2] = v1[2] ** v2[2]
        return target
    }

    /** @param {number|vec3Like} m @param {number|vec3Like} a @returns {vec3} */
    fma( m, a ) {
        return typeof m === "number"
            ? ( typeof a === "number" ? this.sfma( m, a ) : this.svfma( m, a ) )
            : ( typeof a === "number" ? this.vsfma( m, a ) : this.vfma( m, a ) )
    }

    /** @param {vec3Like} v @param {number|vec3Like} m @param {number|vec3Like} a @param {vec3} [target=new vec3] @returns {vec3} */
    static fma( v, m, a, target = new vec3 ) {
        return typeof m === "number"
            ? ( typeof a === "number" ? vec3.sfma( v, m, a, target ) : vec3.svfma( v, m, a, target ) )
            : ( typeof a === "number" ? vec3.vsfma( v, m, a, target ) : vec3.vfma( v, m, a, target ) )
    }

    /** @param {number} m @param {number} a @returns {vec3} */
    sfma( m, a ) {
        this[0] = this[0] * m + a
        this[1] = this[1] * m + a
        this[2] = this[2] * m + a
        return this
    }

    /** @param {vec3Like} v @param {number} m @param {number} a @param {vec3} [target=new vec3] @returns {vec3} */
    static sfma( v, m, a, target = new vec3 ) {
        target[0] = v[0] * m + a
        target[1] = v[1] * m + a
        target[2] = v[2] * m + a
        return target
    }

    /** @param {number} m @param {vec3Like} a @returns {vec3} */
    svfma( m, a ) {
        this[0] = this[0] * m + a[0]
        this[1] = this[1] * m + a[1]
        this[2] = this[2] * m + a[2]
        return this
    }

    /** @param {vec3Like} v @param {number} m @param {vec3Like} a @param {vec3} [target=new vec3] @returns {vec3} */
    static svfma( v, m, a, target = new vec3 ) {
        target[0] = v[0] * m + a[0]
        target[1] = v[1] * m + a[1]
        target[2] = v[2] * m + a[2]
        return target
    }

    /** @param {vec3Like} m @param {number} a @returns {vec3} */
    vsfma( m, a ) {
        this[0] = this[0] * m[0] + a
        this[1] = this[1] * m[1] + a
        this[2] = this[2] * m[2] + a
        return this
    }

    /** @param {vec3Like} v @param {vec3Like} m @param {number} a @param {vec3} [target=new vec3] @returns {vec3} */
    static vsfma( v, m, a, target = new vec3 ) {
        target[0] = v[0] * m[0] + a
        target[1] = v[1] * m[1] + a
        target[2] = v[2] * m[2] + a
        return target
    }

    /** @param {vec3Like} m @param {vec3Like} a @returns {vec3} */
    vfma( m, a ) {
        this[0] = this[0] * m[0] + a[0]
        this[1] = this[1] * m[1] + a[1]
        this[2] = this[2] * m[2] + a[2]
        return this
    }

    /** @param {vec3Like} v @param {vec3Like} m @param {vec3Like} a @param {vec3} [target=new vec3] @returns {vec3} */
    static vfma( v, m, a, target = new vec3 ) {
        target[0] = v[0] * m[0] + a[0]
        target[1] = v[1] * m[1] + a[1]
        target[2] = v[2] * m[2] + a[2]
        return target
    }

    /** @param {mat3Like} m @returns {vec3} */
    mmul( m ) {
        const c0 = this[0]
        const c1 = this[1]
        const c2 = this[2]
        this[0] = c0 * m[0] + c1 * m[3] + c2 * m[6]
        this[1] = c0 * m[1] + c1 * m[4] + c2 * m[7]
        this[2] = c0 * m[2] + c1 * m[5] + c2 * m[8]
        return this
    }

    /** @param {vec3Like} v @param {mat3Like} m @param {vec3} [target=new vec3] @returns {vec3} */
    static mmul( v, m, target = new vec3 ) {
        const c0 = v[0]
        const c1 = v[1]
        const c2 = v[2]
        target[0] = c0 * m[0] + c1 * m[3] + c2 * m[6]
        target[1] = c0 * m[1] + c1 * m[4] + c2 * m[7]
        target[2] = c0 * m[2] + c1 * m[5] + c2 * m[8]
        return target
    }

    /** @param {(value: number, index: number) => number} fn @returns {vec3} */
    apply( fn ) {
        this[0] = fn( this[0], 0 )
        this[1] = fn( this[1], 1 )
        this[2] = fn( this[2], 2 )
        return this
    }

    /** @param {vec3Like} v @param {(value: number, index: number) => number} fn @param {vec3} [target=new vec3] @returns {vec3} */
    static apply( v, fn, target = new vec3 ) {
        target[0] = fn( v[0], 0 )
        target[1] = fn( v[1], 1 )
        target[2] = fn( v[2], 2 )
        return target
    }

    /** @returns {vec3} */
    abs() {
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        this[2] = Math.abs( this[2] )
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
    trunc() {
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        this[2] = Math.trunc( this[2] )
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
    floor() {
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        this[2] = Math.floor( this[2] )
        return this
    }

    /** @returns {vec3} */
    ceil() {
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        this[2] = Math.ceil( this[2] )
        return this
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static abs( v, target = new vec3 ) {
        target[0] = Math.abs( v[0] )
        target[1] = Math.abs( v[1] )
        target[2] = Math.abs( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static acos( v, target = new vec3 ) {
        target[0] = Math.acos( v[0] )
        target[1] = Math.acos( v[1] )
        target[2] = Math.acos( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static acosh( v, target = new vec3 ) {
        target[0] = Math.acosh( v[0] )
        target[1] = Math.acosh( v[1] )
        target[2] = Math.acosh( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static asin( v, target = new vec3 ) {
        target[0] = Math.asin( v[0] )
        target[1] = Math.asin( v[1] )
        target[2] = Math.asin( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static asinh( v, target = new vec3 ) {
        target[0] = Math.asinh( v[0] )
        target[1] = Math.asinh( v[1] )
        target[2] = Math.asinh( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static atan( v, target = new vec3 ) {
        target[0] = Math.atan( v[0] )
        target[1] = Math.atan( v[1] )
        target[2] = Math.atan( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static atanh( v, target = new vec3 ) {
        target[0] = Math.atanh( v[0] )
        target[1] = Math.atanh( v[1] )
        target[2] = Math.atanh( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static ceil( v, target = new vec3 ) {
        target[0] = Math.ceil( v[0] )
        target[1] = Math.ceil( v[1] )
        target[2] = Math.ceil( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static cbrt( v, target = new vec3 ) {
        target[0] = Math.cbrt( v[0] )
        target[1] = Math.cbrt( v[1] )
        target[2] = Math.cbrt( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static expm1( v, target = new vec3 ) {
        target[0] = Math.expm1( v[0] )
        target[1] = Math.expm1( v[1] )
        target[2] = Math.expm1( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static cos( v, target = new vec3 ) {
        target[0] = Math.cos( v[0] )
        target[1] = Math.cos( v[1] )
        target[2] = Math.cos( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static cosh( v, target = new vec3 ) {
        target[0] = Math.cosh( v[0] )
        target[1] = Math.cosh( v[1] )
        target[2] = Math.cosh( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static exp( v, target = new vec3 ) {
        target[0] = Math.exp( v[0] )
        target[1] = Math.exp( v[1] )
        target[2] = Math.exp( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static floor( v, target = new vec3 ) {
        target[0] = Math.floor( v[0] )
        target[1] = Math.floor( v[1] )
        target[2] = Math.floor( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log( v, target = new vec3 ) {
        target[0] = Math.log( v[0] )
        target[1] = Math.log( v[1] )
        target[2] = Math.log( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log1p( v, target = new vec3 ) {
        target[0] = Math.log1p( v[0] )
        target[1] = Math.log1p( v[1] )
        target[2] = Math.log1p( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log2( v, target = new vec3 ) {
        target[0] = Math.log2( v[0] )
        target[1] = Math.log2( v[1] )
        target[2] = Math.log2( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log10( v, target = new vec3 ) {
        target[0] = Math.log10( v[0] )
        target[1] = Math.log10( v[1] )
        target[2] = Math.log10( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static round( v, target = new vec3 ) {
        target[0] = Math.round( v[0] )
        target[1] = Math.round( v[1] )
        target[2] = Math.round( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sign( v, target = new vec3 ) {
        target[0] = Math.sign( v[0] )
        target[1] = Math.sign( v[1] )
        target[2] = Math.sign( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sin( v, target = new vec3 ) {
        target[0] = Math.sin( v[0] )
        target[1] = Math.sin( v[1] )
        target[2] = Math.sin( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sinh( v, target = new vec3 ) {
        target[0] = Math.sinh( v[0] )
        target[1] = Math.sinh( v[1] )
        target[2] = Math.sinh( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sqrt( v, target = new vec3 ) {
        target[0] = Math.sqrt( v[0] )
        target[1] = Math.sqrt( v[1] )
        target[2] = Math.sqrt( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static tan( v, target = new vec3 ) {
        target[0] = Math.tan( v[0] )
        target[1] = Math.tan( v[1] )
        target[2] = Math.tan( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static tanh( v, target = new vec3 ) {
        target[0] = Math.tanh( v[0] )
        target[1] = Math.tanh( v[1] )
        target[2] = Math.tanh( v[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static trunc( v, target = new vec3 ) {
        target[0] = Math.trunc( v[0] )
        target[1] = Math.trunc( v[1] )
        target[2] = Math.trunc( v[2] )
        return target
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

    /** @param {vec3Like} from @param {vec3Like} to @param {vec3} [target=new vec3] @returns {vec3} */
    static pointTo( from, to, target = new vec3 ) {
        target[0] = to[0] - from[0]
        target[1] = to[1] - from[1]
        target[2] = to[2] - from[2]
        return target
    }

    /** @returns {vec3} */
    normalize() {
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        return this
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static normalize( v, target = new vec3 ) {
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        return target
    }

    /** @param {number} s @returns {vec3} */
    setLength( s ) {
        const factor = s / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static setLength( v, s, target = new vec3 ) {
        const factor = s / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        return target
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

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static cross( v1, v2, target = new vec3 ) {
        const t0 = v1[1] * v2[2] - v1[2] * v2[1]
        const t1 = v1[2] * v2[0] - v1[0] * v2[2]
        const t2 = v1[0] * v2[1] - v1[1] * v2[0]
        target[0] = t0
        target[1] = t1
        target[2] = t2
        return target
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec3Like} v */
    static noop( ...v ) {
        return
    }

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

    /** @param {...(number|vec3Like)} values @returns {vec3} */
    static min( ...values ) {
        const target = new vec3
        target[0] = Math.min( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.min( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.min( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        return target
    }

    /** @param {...(number|vec3Like)} values @returns {vec3} */
    static max( ...values ) {
        const target = new vec3
        target[0] = Math.max( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.max( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.max( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        return target
    }

    /** @param {vec3Like} v @param {number|vec3Like} min @param {number|vec3Like} max @param {vec3} [target=new vec3] @returns {vec3} */
    static clamp( v, min, max, target = new vec3 ) {
        return typeof min === "number"
            ? ( typeof max === "number" ? vec3.sclamp( v, min, max, target ) : vec3.svclamp( v, min, max, target ) )
            : ( typeof max === "number" ? vec3.vsclamp( v, min, max, target ) : vec3.vclamp( v, min, max, target ) )
    }

    /** @param {vec3Like} v @param {number} min @param {number} max @param {vec3} [target=new vec3] @returns {vec3} */
    static sclamp( v, min, max, target = new vec3 ) {
        target[0] = Math.min( Math.max( v[0], min ), max )
        target[1] = Math.min( Math.max( v[1], min ), max )
        target[2] = Math.min( Math.max( v[2], min ), max )
        return target
    }

    /** @param {vec3Like} v @param {number} min @param {vec3Like} max @param {vec3} [target=new vec3] @returns {vec3} */
    static svclamp( v, min, max, target = new vec3 ) {
        target[0] = Math.min( Math.max( v[0], min ), max[0] )
        target[1] = Math.min( Math.max( v[1], min ), max[1] )
        target[2] = Math.min( Math.max( v[2], min ), max[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3Like} min @param {number} max @param {vec3} [target=new vec3] @returns {vec3} */
    static vsclamp( v, min, max, target = new vec3 ) {
        target[0] = Math.min( Math.max( v[0], min[0] ), max )
        target[1] = Math.min( Math.max( v[1], min[1] ), max )
        target[2] = Math.min( Math.max( v[2], min[2] ), max )
        return target
    }

    /** @param {vec3Like} v @param {vec3Like} min @param {vec3Like} max @param {vec3} [target=new vec3] @returns {vec3} */
    static vclamp( v, min, max, target = new vec3 ) {
        target[0] = Math.min( Math.max( v[0], min[0] ), max[0] )
        target[1] = Math.min( Math.max( v[1], min[1] ), max[1] )
        target[2] = Math.min( Math.max( v[2], min[2] ), max[2] )
        return target
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static saturate( v, target = new vec3 ) {
        target[0] = Math.min( Math.max( v[0], 0 ), 1 )
        target[1] = Math.min( Math.max( v[1], 0 ), 1 )
        target[2] = Math.min( Math.max( v[2], 0 ), 1 )
        return target
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {number} t @param {vec3} [target=new vec3] @returns {vec3} */
    static mix( v1, v2, t, target = new vec3 ) {
        target[0] = v1[0] * ( 1 - t ) + v2[0] * t
        target[1] = v1[1] * ( 1 - t ) + v2[1] * t
        target[2] = v1[2] * ( 1 - t ) + v2[2] * t
        return target
    }

}