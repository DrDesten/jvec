import { randomNorm } from "./vechelper.js"
import { vec2 } from "./vec2.js"
/** @typedef {import("./vec2.js").vec2Like} vec2Like */
import { vec3 } from "./vec3.js"
/** @typedef {import("./vec3.js").vec3Like} vec3Like */
import { mat2 } from "./mat2.js"
/** @typedef {import("./mat2.js").mat2Like} mat2Like */
import { mat3 } from "./mat3.js"
/** @typedef {import("./mat3.js").mat3Like} mat3Like */
import { mat4 } from "./mat4.js"
/** @typedef {import("./mat4.js").mat4Like} mat4Like */

// ###############################################
//      vec4
// ###############################################

/** @typedef {vec4|ArrayLike<number>} vec4Like */

export class vec4 {

    static get NaN() { return new vec4( NaN, NaN, NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**
     * @param {number|vec4Like|{x: number, y: number, z: number, w: number}|{r: number, g: number, b: number, a: number}} [object=0]
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     */
    constructor( object = 0, y, z, w ) {
        if ( typeof object === "number" )
            y === undefined
                ? ( this[0] = object, this[1] = object, this[2] = object, this[3] = object )
                : ( this[0] = object, this[1] = +y, this[2] = +( z ?? 0 ), this[3] = +( w ?? 0 ) )
        else
            this[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            this[1] = +( object[1] ?? object.y ?? object.g ?? 0 ),
            this[2] = +( object[2] ?? object.z ?? object.b ?? 0 ),
            this[3] = +( object[3] ?? object.w ?? object.a ?? 0 )
        /** @type {number} x-coordinate of the vector */
        this[0]
        /** @type {number} y-coordinate of the vector */
        this[1]
        /** @type {number} z-coordinate of the vector */
        this[2]
        /** @type {number} w-coordinate of the vector */
        this[3]
    }

    /** @param {ArrayLike<number>} array @param {number} [index=0] @param {number} [stride=1] @returns {vec4} */
    static fromArray( array, index = 0, stride = 1 ) {
        return new vec4( array[0 * stride + index], array[1 * stride + index], array[2 * stride + index], array[3 * stride + index] )
    }

    /** @param {(index: number) => number} fn @returns {vec4} */
    static fromFunction( fn ) {
        return new vec4( fn( 0 ), fn( 1 ), fn( 2 ), fn( 3 ) )
    }

    /** @returns {vec4} */
    static random() {
        return new vec4( Math.random(), Math.random(), Math.random(), Math.random() )
    }

    /** @returns {vec4} */
    static randomNorm() {
        return new vec4( randomNorm(), randomNorm(), randomNorm(), randomNorm() )
    }

    /** @returns {vec4} */
    static randomDir() {
        return new vec4( randomNorm(), randomNorm(), randomNorm(), randomNorm() ).normalize()
    }

    /** @returns {vec4} */
    static randomSphere() {
        return new vec4( randomNorm(), randomNorm(), randomNorm(), randomNorm() ).setLength( Math.random() ** (1/4) )
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
    /** @returns {number} */
    get w() { return this[3] }
    /** @param {number} s */
    set w( s ) { this[3] = s }
    /** @returns {number} */
    get a() { return this[3] }
    /** @param {number} s */
    set a( s ) { this[3] = s }
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
    get xw() { return new vec2( this[0], this[3] ) }
    /** @returns {vec2} */
    get ra() { return new vec2( this[0], this[3] ) }
    /** @param {vec2Like} v */
    set xw( v ) { this[0] = v[0], this[3] = v[1] }
    /** @param {vec2Like} v */
    set ra( v ) { this[0] = v[0], this[3] = v[1] }
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
    get yw() { return new vec2( this[1], this[3] ) }
    /** @returns {vec2} */
    get ga() { return new vec2( this[1], this[3] ) }
    /** @param {vec2Like} v */
    set yw( v ) { this[1] = v[0], this[3] = v[1] }
    /** @param {vec2Like} v */
    set ga( v ) { this[1] = v[0], this[3] = v[1] }
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
    /** @returns {vec2} */
    get zw() { return new vec2( this[2], this[3] ) }
    /** @returns {vec2} */
    get ba() { return new vec2( this[2], this[3] ) }
    /** @param {vec2Like} v */
    set zw( v ) { this[2] = v[0], this[3] = v[1] }
    /** @param {vec2Like} v */
    set ba( v ) { this[2] = v[0], this[3] = v[1] }
    /** @returns {vec2} */
    get wx() { return new vec2( this[3], this[0] ) }
    /** @returns {vec2} */
    get ar() { return new vec2( this[3], this[0] ) }
    /** @param {vec2Like} v */
    set wx( v ) { this[3] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set ar( v ) { this[3] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get wy() { return new vec2( this[3], this[1] ) }
    /** @returns {vec2} */
    get ag() { return new vec2( this[3], this[1] ) }
    /** @param {vec2Like} v */
    set wy( v ) { this[3] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set ag( v ) { this[3] = v[0], this[1] = v[1] }
    /** @returns {vec2} */
    get wz() { return new vec2( this[3], this[2] ) }
    /** @returns {vec2} */
    get ab() { return new vec2( this[3], this[2] ) }
    /** @param {vec2Like} v */
    set wz( v ) { this[3] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set ab( v ) { this[3] = v[0], this[2] = v[1] }
    /** @returns {vec2} */
    get ww() { return new vec2( this[3], this[3] ) }
    /** @returns {vec2} */
    get aa() { return new vec2( this[3], this[3] ) }
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
    get xxw() { return new vec3( this[0], this[0], this[3] ) }
    /** @returns {vec3} */
    get rra() { return new vec3( this[0], this[0], this[3] ) }
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
    get xyw() { return new vec3( this[0], this[1], this[3] ) }
    /** @returns {vec3} */
    get rga() { return new vec3( this[0], this[1], this[3] ) }
    /** @param {vec3Like} v */
    set xyw( v ) { this[0] = v[0], this[1] = v[1], this[3] = v[2] }
    /** @param {vec3Like} v */
    set rga( v ) { this[0] = v[0], this[1] = v[1], this[3] = v[2] }
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
    get xzw() { return new vec3( this[0], this[2], this[3] ) }
    /** @returns {vec3} */
    get rba() { return new vec3( this[0], this[2], this[3] ) }
    /** @param {vec3Like} v */
    set xzw( v ) { this[0] = v[0], this[2] = v[1], this[3] = v[2] }
    /** @param {vec3Like} v */
    set rba( v ) { this[0] = v[0], this[2] = v[1], this[3] = v[2] }
    /** @returns {vec3} */
    get xwx() { return new vec3( this[0], this[3], this[0] ) }
    /** @returns {vec3} */
    get rar() { return new vec3( this[0], this[3], this[0] ) }
    /** @returns {vec3} */
    get xwy() { return new vec3( this[0], this[3], this[1] ) }
    /** @returns {vec3} */
    get rag() { return new vec3( this[0], this[3], this[1] ) }
    /** @param {vec3Like} v */
    set xwy( v ) { this[0] = v[0], this[3] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set rag( v ) { this[0] = v[0], this[3] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get xwz() { return new vec3( this[0], this[3], this[2] ) }
    /** @returns {vec3} */
    get rab() { return new vec3( this[0], this[3], this[2] ) }
    /** @param {vec3Like} v */
    set xwz( v ) { this[0] = v[0], this[3] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set rab( v ) { this[0] = v[0], this[3] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get xww() { return new vec3( this[0], this[3], this[3] ) }
    /** @returns {vec3} */
    get raa() { return new vec3( this[0], this[3], this[3] ) }
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
    get yxw() { return new vec3( this[1], this[0], this[3] ) }
    /** @returns {vec3} */
    get gra() { return new vec3( this[1], this[0], this[3] ) }
    /** @param {vec3Like} v */
    set yxw( v ) { this[1] = v[0], this[0] = v[1], this[3] = v[2] }
    /** @param {vec3Like} v */
    set gra( v ) { this[1] = v[0], this[0] = v[1], this[3] = v[2] }
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
    get yyw() { return new vec3( this[1], this[1], this[3] ) }
    /** @returns {vec3} */
    get gga() { return new vec3( this[1], this[1], this[3] ) }
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
    get yzw() { return new vec3( this[1], this[2], this[3] ) }
    /** @returns {vec3} */
    get gba() { return new vec3( this[1], this[2], this[3] ) }
    /** @param {vec3Like} v */
    set yzw( v ) { this[1] = v[0], this[2] = v[1], this[3] = v[2] }
    /** @param {vec3Like} v */
    set gba( v ) { this[1] = v[0], this[2] = v[1], this[3] = v[2] }
    /** @returns {vec3} */
    get ywx() { return new vec3( this[1], this[3], this[0] ) }
    /** @returns {vec3} */
    get gar() { return new vec3( this[1], this[3], this[0] ) }
    /** @param {vec3Like} v */
    set ywx( v ) { this[1] = v[0], this[3] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set gar( v ) { this[1] = v[0], this[3] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get ywy() { return new vec3( this[1], this[3], this[1] ) }
    /** @returns {vec3} */
    get gag() { return new vec3( this[1], this[3], this[1] ) }
    /** @returns {vec3} */
    get ywz() { return new vec3( this[1], this[3], this[2] ) }
    /** @returns {vec3} */
    get gab() { return new vec3( this[1], this[3], this[2] ) }
    /** @param {vec3Like} v */
    set ywz( v ) { this[1] = v[0], this[3] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set gab( v ) { this[1] = v[0], this[3] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get yww() { return new vec3( this[1], this[3], this[3] ) }
    /** @returns {vec3} */
    get gaa() { return new vec3( this[1], this[3], this[3] ) }
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
    get zxw() { return new vec3( this[2], this[0], this[3] ) }
    /** @returns {vec3} */
    get bra() { return new vec3( this[2], this[0], this[3] ) }
    /** @param {vec3Like} v */
    set zxw( v ) { this[2] = v[0], this[0] = v[1], this[3] = v[2] }
    /** @param {vec3Like} v */
    set bra( v ) { this[2] = v[0], this[0] = v[1], this[3] = v[2] }
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
    get zyw() { return new vec3( this[2], this[1], this[3] ) }
    /** @returns {vec3} */
    get bga() { return new vec3( this[2], this[1], this[3] ) }
    /** @param {vec3Like} v */
    set zyw( v ) { this[2] = v[0], this[1] = v[1], this[3] = v[2] }
    /** @param {vec3Like} v */
    set bga( v ) { this[2] = v[0], this[1] = v[1], this[3] = v[2] }
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
    /** @returns {vec3} */
    get zzw() { return new vec3( this[2], this[2], this[3] ) }
    /** @returns {vec3} */
    get bba() { return new vec3( this[2], this[2], this[3] ) }
    /** @returns {vec3} */
    get zwx() { return new vec3( this[2], this[3], this[0] ) }
    /** @returns {vec3} */
    get bar() { return new vec3( this[2], this[3], this[0] ) }
    /** @param {vec3Like} v */
    set zwx( v ) { this[2] = v[0], this[3] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set bar( v ) { this[2] = v[0], this[3] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get zwy() { return new vec3( this[2], this[3], this[1] ) }
    /** @returns {vec3} */
    get bag() { return new vec3( this[2], this[3], this[1] ) }
    /** @param {vec3Like} v */
    set zwy( v ) { this[2] = v[0], this[3] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set bag( v ) { this[2] = v[0], this[3] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get zwz() { return new vec3( this[2], this[3], this[2] ) }
    /** @returns {vec3} */
    get bab() { return new vec3( this[2], this[3], this[2] ) }
    /** @returns {vec3} */
    get zww() { return new vec3( this[2], this[3], this[3] ) }
    /** @returns {vec3} */
    get baa() { return new vec3( this[2], this[3], this[3] ) }
    /** @returns {vec3} */
    get wxx() { return new vec3( this[3], this[0], this[0] ) }
    /** @returns {vec3} */
    get arr() { return new vec3( this[3], this[0], this[0] ) }
    /** @returns {vec3} */
    get wxy() { return new vec3( this[3], this[0], this[1] ) }
    /** @returns {vec3} */
    get arg() { return new vec3( this[3], this[0], this[1] ) }
    /** @param {vec3Like} v */
    set wxy( v ) { this[3] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set arg( v ) { this[3] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get wxz() { return new vec3( this[3], this[0], this[2] ) }
    /** @returns {vec3} */
    get arb() { return new vec3( this[3], this[0], this[2] ) }
    /** @param {vec3Like} v */
    set wxz( v ) { this[3] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set arb( v ) { this[3] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get wxw() { return new vec3( this[3], this[0], this[3] ) }
    /** @returns {vec3} */
    get ara() { return new vec3( this[3], this[0], this[3] ) }
    /** @returns {vec3} */
    get wyx() { return new vec3( this[3], this[1], this[0] ) }
    /** @returns {vec3} */
    get agr() { return new vec3( this[3], this[1], this[0] ) }
    /** @param {vec3Like} v */
    set wyx( v ) { this[3] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set agr( v ) { this[3] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get wyy() { return new vec3( this[3], this[1], this[1] ) }
    /** @returns {vec3} */
    get agg() { return new vec3( this[3], this[1], this[1] ) }
    /** @returns {vec3} */
    get wyz() { return new vec3( this[3], this[1], this[2] ) }
    /** @returns {vec3} */
    get agb() { return new vec3( this[3], this[1], this[2] ) }
    /** @param {vec3Like} v */
    set wyz( v ) { this[3] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set agb( v ) { this[3] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get wyw() { return new vec3( this[3], this[1], this[3] ) }
    /** @returns {vec3} */
    get aga() { return new vec3( this[3], this[1], this[3] ) }
    /** @returns {vec3} */
    get wzx() { return new vec3( this[3], this[2], this[0] ) }
    /** @returns {vec3} */
    get abr() { return new vec3( this[3], this[2], this[0] ) }
    /** @param {vec3Like} v */
    set wzx( v ) { this[3] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set abr( v ) { this[3] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @returns {vec3} */
    get wzy() { return new vec3( this[3], this[2], this[1] ) }
    /** @returns {vec3} */
    get abg() { return new vec3( this[3], this[2], this[1] ) }
    /** @param {vec3Like} v */
    set wzy( v ) { this[3] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set abg( v ) { this[3] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get wzz() { return new vec3( this[3], this[2], this[2] ) }
    /** @returns {vec3} */
    get abb() { return new vec3( this[3], this[2], this[2] ) }
    /** @returns {vec3} */
    get wzw() { return new vec3( this[3], this[2], this[3] ) }
    /** @returns {vec3} */
    get aba() { return new vec3( this[3], this[2], this[3] ) }
    /** @returns {vec3} */
    get wwx() { return new vec3( this[3], this[3], this[0] ) }
    /** @returns {vec3} */
    get aar() { return new vec3( this[3], this[3], this[0] ) }
    /** @returns {vec3} */
    get wwy() { return new vec3( this[3], this[3], this[1] ) }
    /** @returns {vec3} */
    get aag() { return new vec3( this[3], this[3], this[1] ) }
    /** @returns {vec3} */
    get wwz() { return new vec3( this[3], this[3], this[2] ) }
    /** @returns {vec3} */
    get aab() { return new vec3( this[3], this[3], this[2] ) }
    /** @returns {vec3} */
    get www() { return new vec3( this[3], this[3], this[3] ) }
    /** @returns {vec3} */
    get aaa() { return new vec3( this[3], this[3], this[3] ) }
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
    get xxxw() { return new vec4( this[0], this[0], this[0], this[3] ) }
    /** @returns {vec4} */
    get rrra() { return new vec4( this[0], this[0], this[0], this[3] ) }
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
    get xxyw() { return new vec4( this[0], this[0], this[1], this[3] ) }
    /** @returns {vec4} */
    get rrga() { return new vec4( this[0], this[0], this[1], this[3] ) }
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
    get xxzw() { return new vec4( this[0], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get rrba() { return new vec4( this[0], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get xxwx() { return new vec4( this[0], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get rrar() { return new vec4( this[0], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get xxwy() { return new vec4( this[0], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get rrag() { return new vec4( this[0], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get xxwz() { return new vec4( this[0], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get rrab() { return new vec4( this[0], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get xxww() { return new vec4( this[0], this[0], this[3], this[3] ) }
    /** @returns {vec4} */
    get rraa() { return new vec4( this[0], this[0], this[3], this[3] ) }
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
    get xyxw() { return new vec4( this[0], this[1], this[0], this[3] ) }
    /** @returns {vec4} */
    get rgra() { return new vec4( this[0], this[1], this[0], this[3] ) }
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
    get xyyw() { return new vec4( this[0], this[1], this[1], this[3] ) }
    /** @returns {vec4} */
    get rgga() { return new vec4( this[0], this[1], this[1], this[3] ) }
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
    get xyzw() { return new vec4( this[0], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get rgba() { return new vec4( this[0], this[1], this[2], this[3] ) }
    /** @param {vec4Like} v */
    set xyzw( v ) { this[0] = v[0], this[1] = v[1], this[2] = v[2], this[3] = v[3] }
    /** @param {vec4Like} v */
    set rgba( v ) { this[0] = v[0], this[1] = v[1], this[2] = v[2], this[3] = v[3] }
    /** @returns {vec4} */
    get xywx() { return new vec4( this[0], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get rgar() { return new vec4( this[0], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get xywy() { return new vec4( this[0], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get rgag() { return new vec4( this[0], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get xywz() { return new vec4( this[0], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get rgab() { return new vec4( this[0], this[1], this[3], this[2] ) }
    /** @param {vec4Like} v */
    set xywz( v ) { this[0] = v[0], this[1] = v[1], this[3] = v[2], this[2] = v[3] }
    /** @param {vec4Like} v */
    set rgab( v ) { this[0] = v[0], this[1] = v[1], this[3] = v[2], this[2] = v[3] }
    /** @returns {vec4} */
    get xyww() { return new vec4( this[0], this[1], this[3], this[3] ) }
    /** @returns {vec4} */
    get rgaa() { return new vec4( this[0], this[1], this[3], this[3] ) }
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
    get xzxw() { return new vec4( this[0], this[2], this[0], this[3] ) }
    /** @returns {vec4} */
    get rbra() { return new vec4( this[0], this[2], this[0], this[3] ) }
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
    get xzyw() { return new vec4( this[0], this[2], this[1], this[3] ) }
    /** @returns {vec4} */
    get rbga() { return new vec4( this[0], this[2], this[1], this[3] ) }
    /** @param {vec4Like} v */
    set xzyw( v ) { this[0] = v[0], this[2] = v[1], this[1] = v[2], this[3] = v[3] }
    /** @param {vec4Like} v */
    set rbga( v ) { this[0] = v[0], this[2] = v[1], this[1] = v[2], this[3] = v[3] }
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
    get xzzw() { return new vec4( this[0], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get rbba() { return new vec4( this[0], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get xzwx() { return new vec4( this[0], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get rbar() { return new vec4( this[0], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get xzwy() { return new vec4( this[0], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get rbag() { return new vec4( this[0], this[2], this[3], this[1] ) }
    /** @param {vec4Like} v */
    set xzwy( v ) { this[0] = v[0], this[2] = v[1], this[3] = v[2], this[1] = v[3] }
    /** @param {vec4Like} v */
    set rbag( v ) { this[0] = v[0], this[2] = v[1], this[3] = v[2], this[1] = v[3] }
    /** @returns {vec4} */
    get xzwz() { return new vec4( this[0], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get rbab() { return new vec4( this[0], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get xzww() { return new vec4( this[0], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get rbaa() { return new vec4( this[0], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get xwxx() { return new vec4( this[0], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get rarr() { return new vec4( this[0], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get xwxy() { return new vec4( this[0], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get rarg() { return new vec4( this[0], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get xwxz() { return new vec4( this[0], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get rarb() { return new vec4( this[0], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get xwxw() { return new vec4( this[0], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get rara() { return new vec4( this[0], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get xwyx() { return new vec4( this[0], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get ragr() { return new vec4( this[0], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get xwyy() { return new vec4( this[0], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get ragg() { return new vec4( this[0], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get xwyz() { return new vec4( this[0], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get ragb() { return new vec4( this[0], this[3], this[1], this[2] ) }
    /** @param {vec4Like} v */
    set xwyz( v ) { this[0] = v[0], this[3] = v[1], this[1] = v[2], this[2] = v[3] }
    /** @param {vec4Like} v */
    set ragb( v ) { this[0] = v[0], this[3] = v[1], this[1] = v[2], this[2] = v[3] }
    /** @returns {vec4} */
    get xwyw() { return new vec4( this[0], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get raga() { return new vec4( this[0], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get xwzx() { return new vec4( this[0], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get rabr() { return new vec4( this[0], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get xwzy() { return new vec4( this[0], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get rabg() { return new vec4( this[0], this[3], this[2], this[1] ) }
    /** @param {vec4Like} v */
    set xwzy( v ) { this[0] = v[0], this[3] = v[1], this[2] = v[2], this[1] = v[3] }
    /** @param {vec4Like} v */
    set rabg( v ) { this[0] = v[0], this[3] = v[1], this[2] = v[2], this[1] = v[3] }
    /** @returns {vec4} */
    get xwzz() { return new vec4( this[0], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get rabb() { return new vec4( this[0], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get xwzw() { return new vec4( this[0], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get raba() { return new vec4( this[0], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get xwwx() { return new vec4( this[0], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get raar() { return new vec4( this[0], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get xwwy() { return new vec4( this[0], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get raag() { return new vec4( this[0], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get xwwz() { return new vec4( this[0], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get raab() { return new vec4( this[0], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get xwww() { return new vec4( this[0], this[3], this[3], this[3] ) }
    /** @returns {vec4} */
    get raaa() { return new vec4( this[0], this[3], this[3], this[3] ) }
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
    get yxxw() { return new vec4( this[1], this[0], this[0], this[3] ) }
    /** @returns {vec4} */
    get grra() { return new vec4( this[1], this[0], this[0], this[3] ) }
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
    get yxyw() { return new vec4( this[1], this[0], this[1], this[3] ) }
    /** @returns {vec4} */
    get grga() { return new vec4( this[1], this[0], this[1], this[3] ) }
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
    get yxzw() { return new vec4( this[1], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get grba() { return new vec4( this[1], this[0], this[2], this[3] ) }
    /** @param {vec4Like} v */
    set yxzw( v ) { this[1] = v[0], this[0] = v[1], this[2] = v[2], this[3] = v[3] }
    /** @param {vec4Like} v */
    set grba( v ) { this[1] = v[0], this[0] = v[1], this[2] = v[2], this[3] = v[3] }
    /** @returns {vec4} */
    get yxwx() { return new vec4( this[1], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get grar() { return new vec4( this[1], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get yxwy() { return new vec4( this[1], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get grag() { return new vec4( this[1], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get yxwz() { return new vec4( this[1], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get grab() { return new vec4( this[1], this[0], this[3], this[2] ) }
    /** @param {vec4Like} v */
    set yxwz( v ) { this[1] = v[0], this[0] = v[1], this[3] = v[2], this[2] = v[3] }
    /** @param {vec4Like} v */
    set grab( v ) { this[1] = v[0], this[0] = v[1], this[3] = v[2], this[2] = v[3] }
    /** @returns {vec4} */
    get yxww() { return new vec4( this[1], this[0], this[3], this[3] ) }
    /** @returns {vec4} */
    get graa() { return new vec4( this[1], this[0], this[3], this[3] ) }
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
    get yyxw() { return new vec4( this[1], this[1], this[0], this[3] ) }
    /** @returns {vec4} */
    get ggra() { return new vec4( this[1], this[1], this[0], this[3] ) }
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
    get yyyw() { return new vec4( this[1], this[1], this[1], this[3] ) }
    /** @returns {vec4} */
    get ggga() { return new vec4( this[1], this[1], this[1], this[3] ) }
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
    get yyzw() { return new vec4( this[1], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get ggba() { return new vec4( this[1], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get yywx() { return new vec4( this[1], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get ggar() { return new vec4( this[1], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get yywy() { return new vec4( this[1], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get ggag() { return new vec4( this[1], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get yywz() { return new vec4( this[1], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get ggab() { return new vec4( this[1], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get yyww() { return new vec4( this[1], this[1], this[3], this[3] ) }
    /** @returns {vec4} */
    get ggaa() { return new vec4( this[1], this[1], this[3], this[3] ) }
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
    get yzxw() { return new vec4( this[1], this[2], this[0], this[3] ) }
    /** @returns {vec4} */
    get gbra() { return new vec4( this[1], this[2], this[0], this[3] ) }
    /** @param {vec4Like} v */
    set yzxw( v ) { this[1] = v[0], this[2] = v[1], this[0] = v[2], this[3] = v[3] }
    /** @param {vec4Like} v */
    set gbra( v ) { this[1] = v[0], this[2] = v[1], this[0] = v[2], this[3] = v[3] }
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
    get yzyw() { return new vec4( this[1], this[2], this[1], this[3] ) }
    /** @returns {vec4} */
    get gbga() { return new vec4( this[1], this[2], this[1], this[3] ) }
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
    get yzzw() { return new vec4( this[1], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get gbba() { return new vec4( this[1], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get yzwx() { return new vec4( this[1], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get gbar() { return new vec4( this[1], this[2], this[3], this[0] ) }
    /** @param {vec4Like} v */
    set yzwx( v ) { this[1] = v[0], this[2] = v[1], this[3] = v[2], this[0] = v[3] }
    /** @param {vec4Like} v */
    set gbar( v ) { this[1] = v[0], this[2] = v[1], this[3] = v[2], this[0] = v[3] }
    /** @returns {vec4} */
    get yzwy() { return new vec4( this[1], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get gbag() { return new vec4( this[1], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get yzwz() { return new vec4( this[1], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get gbab() { return new vec4( this[1], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get yzww() { return new vec4( this[1], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get gbaa() { return new vec4( this[1], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get ywxx() { return new vec4( this[1], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get garr() { return new vec4( this[1], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get ywxy() { return new vec4( this[1], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get garg() { return new vec4( this[1], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get ywxz() { return new vec4( this[1], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get garb() { return new vec4( this[1], this[3], this[0], this[2] ) }
    /** @param {vec4Like} v */
    set ywxz( v ) { this[1] = v[0], this[3] = v[1], this[0] = v[2], this[2] = v[3] }
    /** @param {vec4Like} v */
    set garb( v ) { this[1] = v[0], this[3] = v[1], this[0] = v[2], this[2] = v[3] }
    /** @returns {vec4} */
    get ywxw() { return new vec4( this[1], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get gara() { return new vec4( this[1], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get ywyx() { return new vec4( this[1], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get gagr() { return new vec4( this[1], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get ywyy() { return new vec4( this[1], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get gagg() { return new vec4( this[1], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get ywyz() { return new vec4( this[1], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get gagb() { return new vec4( this[1], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get ywyw() { return new vec4( this[1], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get gaga() { return new vec4( this[1], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get ywzx() { return new vec4( this[1], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get gabr() { return new vec4( this[1], this[3], this[2], this[0] ) }
    /** @param {vec4Like} v */
    set ywzx( v ) { this[1] = v[0], this[3] = v[1], this[2] = v[2], this[0] = v[3] }
    /** @param {vec4Like} v */
    set gabr( v ) { this[1] = v[0], this[3] = v[1], this[2] = v[2], this[0] = v[3] }
    /** @returns {vec4} */
    get ywzy() { return new vec4( this[1], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get gabg() { return new vec4( this[1], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get ywzz() { return new vec4( this[1], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get gabb() { return new vec4( this[1], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get ywzw() { return new vec4( this[1], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get gaba() { return new vec4( this[1], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get ywwx() { return new vec4( this[1], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get gaar() { return new vec4( this[1], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get ywwy() { return new vec4( this[1], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get gaag() { return new vec4( this[1], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get ywwz() { return new vec4( this[1], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get gaab() { return new vec4( this[1], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get ywww() { return new vec4( this[1], this[3], this[3], this[3] ) }
    /** @returns {vec4} */
    get gaaa() { return new vec4( this[1], this[3], this[3], this[3] ) }
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
    get zxxw() { return new vec4( this[2], this[0], this[0], this[3] ) }
    /** @returns {vec4} */
    get brra() { return new vec4( this[2], this[0], this[0], this[3] ) }
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
    get zxyw() { return new vec4( this[2], this[0], this[1], this[3] ) }
    /** @returns {vec4} */
    get brga() { return new vec4( this[2], this[0], this[1], this[3] ) }
    /** @param {vec4Like} v */
    set zxyw( v ) { this[2] = v[0], this[0] = v[1], this[1] = v[2], this[3] = v[3] }
    /** @param {vec4Like} v */
    set brga( v ) { this[2] = v[0], this[0] = v[1], this[1] = v[2], this[3] = v[3] }
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
    get zxzw() { return new vec4( this[2], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get brba() { return new vec4( this[2], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get zxwx() { return new vec4( this[2], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get brar() { return new vec4( this[2], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get zxwy() { return new vec4( this[2], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get brag() { return new vec4( this[2], this[0], this[3], this[1] ) }
    /** @param {vec4Like} v */
    set zxwy( v ) { this[2] = v[0], this[0] = v[1], this[3] = v[2], this[1] = v[3] }
    /** @param {vec4Like} v */
    set brag( v ) { this[2] = v[0], this[0] = v[1], this[3] = v[2], this[1] = v[3] }
    /** @returns {vec4} */
    get zxwz() { return new vec4( this[2], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get brab() { return new vec4( this[2], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get zxww() { return new vec4( this[2], this[0], this[3], this[3] ) }
    /** @returns {vec4} */
    get braa() { return new vec4( this[2], this[0], this[3], this[3] ) }
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
    get zyxw() { return new vec4( this[2], this[1], this[0], this[3] ) }
    /** @returns {vec4} */
    get bgra() { return new vec4( this[2], this[1], this[0], this[3] ) }
    /** @param {vec4Like} v */
    set zyxw( v ) { this[2] = v[0], this[1] = v[1], this[0] = v[2], this[3] = v[3] }
    /** @param {vec4Like} v */
    set bgra( v ) { this[2] = v[0], this[1] = v[1], this[0] = v[2], this[3] = v[3] }
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
    get zyyw() { return new vec4( this[2], this[1], this[1], this[3] ) }
    /** @returns {vec4} */
    get bgga() { return new vec4( this[2], this[1], this[1], this[3] ) }
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
    get zyzw() { return new vec4( this[2], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get bgba() { return new vec4( this[2], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get zywx() { return new vec4( this[2], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get bgar() { return new vec4( this[2], this[1], this[3], this[0] ) }
    /** @param {vec4Like} v */
    set zywx( v ) { this[2] = v[0], this[1] = v[1], this[3] = v[2], this[0] = v[3] }
    /** @param {vec4Like} v */
    set bgar( v ) { this[2] = v[0], this[1] = v[1], this[3] = v[2], this[0] = v[3] }
    /** @returns {vec4} */
    get zywy() { return new vec4( this[2], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get bgag() { return new vec4( this[2], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get zywz() { return new vec4( this[2], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get bgab() { return new vec4( this[2], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get zyww() { return new vec4( this[2], this[1], this[3], this[3] ) }
    /** @returns {vec4} */
    get bgaa() { return new vec4( this[2], this[1], this[3], this[3] ) }
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
    get zzxw() { return new vec4( this[2], this[2], this[0], this[3] ) }
    /** @returns {vec4} */
    get bbra() { return new vec4( this[2], this[2], this[0], this[3] ) }
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
    get zzyw() { return new vec4( this[2], this[2], this[1], this[3] ) }
    /** @returns {vec4} */
    get bbga() { return new vec4( this[2], this[2], this[1], this[3] ) }
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
    /** @returns {vec4} */
    get zzzw() { return new vec4( this[2], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get bbba() { return new vec4( this[2], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get zzwx() { return new vec4( this[2], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get bbar() { return new vec4( this[2], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get zzwy() { return new vec4( this[2], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get bbag() { return new vec4( this[2], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get zzwz() { return new vec4( this[2], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get bbab() { return new vec4( this[2], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get zzww() { return new vec4( this[2], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get bbaa() { return new vec4( this[2], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get zwxx() { return new vec4( this[2], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get barr() { return new vec4( this[2], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get zwxy() { return new vec4( this[2], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get barg() { return new vec4( this[2], this[3], this[0], this[1] ) }
    /** @param {vec4Like} v */
    set zwxy( v ) { this[2] = v[0], this[3] = v[1], this[0] = v[2], this[1] = v[3] }
    /** @param {vec4Like} v */
    set barg( v ) { this[2] = v[0], this[3] = v[1], this[0] = v[2], this[1] = v[3] }
    /** @returns {vec4} */
    get zwxz() { return new vec4( this[2], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get barb() { return new vec4( this[2], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get zwxw() { return new vec4( this[2], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get bara() { return new vec4( this[2], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get zwyx() { return new vec4( this[2], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get bagr() { return new vec4( this[2], this[3], this[1], this[0] ) }
    /** @param {vec4Like} v */
    set zwyx( v ) { this[2] = v[0], this[3] = v[1], this[1] = v[2], this[0] = v[3] }
    /** @param {vec4Like} v */
    set bagr( v ) { this[2] = v[0], this[3] = v[1], this[1] = v[2], this[0] = v[3] }
    /** @returns {vec4} */
    get zwyy() { return new vec4( this[2], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get bagg() { return new vec4( this[2], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get zwyz() { return new vec4( this[2], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get bagb() { return new vec4( this[2], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get zwyw() { return new vec4( this[2], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get baga() { return new vec4( this[2], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get zwzx() { return new vec4( this[2], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get babr() { return new vec4( this[2], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get zwzy() { return new vec4( this[2], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get babg() { return new vec4( this[2], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get zwzz() { return new vec4( this[2], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get babb() { return new vec4( this[2], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get zwzw() { return new vec4( this[2], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get baba() { return new vec4( this[2], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get zwwx() { return new vec4( this[2], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get baar() { return new vec4( this[2], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get zwwy() { return new vec4( this[2], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get baag() { return new vec4( this[2], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get zwwz() { return new vec4( this[2], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get baab() { return new vec4( this[2], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get zwww() { return new vec4( this[2], this[3], this[3], this[3] ) }
    /** @returns {vec4} */
    get baaa() { return new vec4( this[2], this[3], this[3], this[3] ) }
    /** @returns {vec4} */
    get wxxx() { return new vec4( this[3], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get arrr() { return new vec4( this[3], this[0], this[0], this[0] ) }
    /** @returns {vec4} */
    get wxxy() { return new vec4( this[3], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get arrg() { return new vec4( this[3], this[0], this[0], this[1] ) }
    /** @returns {vec4} */
    get wxxz() { return new vec4( this[3], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get arrb() { return new vec4( this[3], this[0], this[0], this[2] ) }
    /** @returns {vec4} */
    get wxxw() { return new vec4( this[3], this[0], this[0], this[3] ) }
    /** @returns {vec4} */
    get arra() { return new vec4( this[3], this[0], this[0], this[3] ) }
    /** @returns {vec4} */
    get wxyx() { return new vec4( this[3], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get argr() { return new vec4( this[3], this[0], this[1], this[0] ) }
    /** @returns {vec4} */
    get wxyy() { return new vec4( this[3], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get argg() { return new vec4( this[3], this[0], this[1], this[1] ) }
    /** @returns {vec4} */
    get wxyz() { return new vec4( this[3], this[0], this[1], this[2] ) }
    /** @returns {vec4} */
    get argb() { return new vec4( this[3], this[0], this[1], this[2] ) }
    /** @param {vec4Like} v */
    set wxyz( v ) { this[3] = v[0], this[0] = v[1], this[1] = v[2], this[2] = v[3] }
    /** @param {vec4Like} v */
    set argb( v ) { this[3] = v[0], this[0] = v[1], this[1] = v[2], this[2] = v[3] }
    /** @returns {vec4} */
    get wxyw() { return new vec4( this[3], this[0], this[1], this[3] ) }
    /** @returns {vec4} */
    get arga() { return new vec4( this[3], this[0], this[1], this[3] ) }
    /** @returns {vec4} */
    get wxzx() { return new vec4( this[3], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get arbr() { return new vec4( this[3], this[0], this[2], this[0] ) }
    /** @returns {vec4} */
    get wxzy() { return new vec4( this[3], this[0], this[2], this[1] ) }
    /** @returns {vec4} */
    get arbg() { return new vec4( this[3], this[0], this[2], this[1] ) }
    /** @param {vec4Like} v */
    set wxzy( v ) { this[3] = v[0], this[0] = v[1], this[2] = v[2], this[1] = v[3] }
    /** @param {vec4Like} v */
    set arbg( v ) { this[3] = v[0], this[0] = v[1], this[2] = v[2], this[1] = v[3] }
    /** @returns {vec4} */
    get wxzz() { return new vec4( this[3], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get arbb() { return new vec4( this[3], this[0], this[2], this[2] ) }
    /** @returns {vec4} */
    get wxzw() { return new vec4( this[3], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get arba() { return new vec4( this[3], this[0], this[2], this[3] ) }
    /** @returns {vec4} */
    get wxwx() { return new vec4( this[3], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get arar() { return new vec4( this[3], this[0], this[3], this[0] ) }
    /** @returns {vec4} */
    get wxwy() { return new vec4( this[3], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get arag() { return new vec4( this[3], this[0], this[3], this[1] ) }
    /** @returns {vec4} */
    get wxwz() { return new vec4( this[3], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get arab() { return new vec4( this[3], this[0], this[3], this[2] ) }
    /** @returns {vec4} */
    get wxww() { return new vec4( this[3], this[0], this[3], this[3] ) }
    /** @returns {vec4} */
    get araa() { return new vec4( this[3], this[0], this[3], this[3] ) }
    /** @returns {vec4} */
    get wyxx() { return new vec4( this[3], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get agrr() { return new vec4( this[3], this[1], this[0], this[0] ) }
    /** @returns {vec4} */
    get wyxy() { return new vec4( this[3], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get agrg() { return new vec4( this[3], this[1], this[0], this[1] ) }
    /** @returns {vec4} */
    get wyxz() { return new vec4( this[3], this[1], this[0], this[2] ) }
    /** @returns {vec4} */
    get agrb() { return new vec4( this[3], this[1], this[0], this[2] ) }
    /** @param {vec4Like} v */
    set wyxz( v ) { this[3] = v[0], this[1] = v[1], this[0] = v[2], this[2] = v[3] }
    /** @param {vec4Like} v */
    set agrb( v ) { this[3] = v[0], this[1] = v[1], this[0] = v[2], this[2] = v[3] }
    /** @returns {vec4} */
    get wyxw() { return new vec4( this[3], this[1], this[0], this[3] ) }
    /** @returns {vec4} */
    get agra() { return new vec4( this[3], this[1], this[0], this[3] ) }
    /** @returns {vec4} */
    get wyyx() { return new vec4( this[3], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get aggr() { return new vec4( this[3], this[1], this[1], this[0] ) }
    /** @returns {vec4} */
    get wyyy() { return new vec4( this[3], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get aggg() { return new vec4( this[3], this[1], this[1], this[1] ) }
    /** @returns {vec4} */
    get wyyz() { return new vec4( this[3], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get aggb() { return new vec4( this[3], this[1], this[1], this[2] ) }
    /** @returns {vec4} */
    get wyyw() { return new vec4( this[3], this[1], this[1], this[3] ) }
    /** @returns {vec4} */
    get agga() { return new vec4( this[3], this[1], this[1], this[3] ) }
    /** @returns {vec4} */
    get wyzx() { return new vec4( this[3], this[1], this[2], this[0] ) }
    /** @returns {vec4} */
    get agbr() { return new vec4( this[3], this[1], this[2], this[0] ) }
    /** @param {vec4Like} v */
    set wyzx( v ) { this[3] = v[0], this[1] = v[1], this[2] = v[2], this[0] = v[3] }
    /** @param {vec4Like} v */
    set agbr( v ) { this[3] = v[0], this[1] = v[1], this[2] = v[2], this[0] = v[3] }
    /** @returns {vec4} */
    get wyzy() { return new vec4( this[3], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get agbg() { return new vec4( this[3], this[1], this[2], this[1] ) }
    /** @returns {vec4} */
    get wyzz() { return new vec4( this[3], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get agbb() { return new vec4( this[3], this[1], this[2], this[2] ) }
    /** @returns {vec4} */
    get wyzw() { return new vec4( this[3], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get agba() { return new vec4( this[3], this[1], this[2], this[3] ) }
    /** @returns {vec4} */
    get wywx() { return new vec4( this[3], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get agar() { return new vec4( this[3], this[1], this[3], this[0] ) }
    /** @returns {vec4} */
    get wywy() { return new vec4( this[3], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get agag() { return new vec4( this[3], this[1], this[3], this[1] ) }
    /** @returns {vec4} */
    get wywz() { return new vec4( this[3], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get agab() { return new vec4( this[3], this[1], this[3], this[2] ) }
    /** @returns {vec4} */
    get wyww() { return new vec4( this[3], this[1], this[3], this[3] ) }
    /** @returns {vec4} */
    get agaa() { return new vec4( this[3], this[1], this[3], this[3] ) }
    /** @returns {vec4} */
    get wzxx() { return new vec4( this[3], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get abrr() { return new vec4( this[3], this[2], this[0], this[0] ) }
    /** @returns {vec4} */
    get wzxy() { return new vec4( this[3], this[2], this[0], this[1] ) }
    /** @returns {vec4} */
    get abrg() { return new vec4( this[3], this[2], this[0], this[1] ) }
    /** @param {vec4Like} v */
    set wzxy( v ) { this[3] = v[0], this[2] = v[1], this[0] = v[2], this[1] = v[3] }
    /** @param {vec4Like} v */
    set abrg( v ) { this[3] = v[0], this[2] = v[1], this[0] = v[2], this[1] = v[3] }
    /** @returns {vec4} */
    get wzxz() { return new vec4( this[3], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get abrb() { return new vec4( this[3], this[2], this[0], this[2] ) }
    /** @returns {vec4} */
    get wzxw() { return new vec4( this[3], this[2], this[0], this[3] ) }
    /** @returns {vec4} */
    get abra() { return new vec4( this[3], this[2], this[0], this[3] ) }
    /** @returns {vec4} */
    get wzyx() { return new vec4( this[3], this[2], this[1], this[0] ) }
    /** @returns {vec4} */
    get abgr() { return new vec4( this[3], this[2], this[1], this[0] ) }
    /** @param {vec4Like} v */
    set wzyx( v ) { this[3] = v[0], this[2] = v[1], this[1] = v[2], this[0] = v[3] }
    /** @param {vec4Like} v */
    set abgr( v ) { this[3] = v[0], this[2] = v[1], this[1] = v[2], this[0] = v[3] }
    /** @returns {vec4} */
    get wzyy() { return new vec4( this[3], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get abgg() { return new vec4( this[3], this[2], this[1], this[1] ) }
    /** @returns {vec4} */
    get wzyz() { return new vec4( this[3], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get abgb() { return new vec4( this[3], this[2], this[1], this[2] ) }
    /** @returns {vec4} */
    get wzyw() { return new vec4( this[3], this[2], this[1], this[3] ) }
    /** @returns {vec4} */
    get abga() { return new vec4( this[3], this[2], this[1], this[3] ) }
    /** @returns {vec4} */
    get wzzx() { return new vec4( this[3], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get abbr() { return new vec4( this[3], this[2], this[2], this[0] ) }
    /** @returns {vec4} */
    get wzzy() { return new vec4( this[3], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get abbg() { return new vec4( this[3], this[2], this[2], this[1] ) }
    /** @returns {vec4} */
    get wzzz() { return new vec4( this[3], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get abbb() { return new vec4( this[3], this[2], this[2], this[2] ) }
    /** @returns {vec4} */
    get wzzw() { return new vec4( this[3], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get abba() { return new vec4( this[3], this[2], this[2], this[3] ) }
    /** @returns {vec4} */
    get wzwx() { return new vec4( this[3], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get abar() { return new vec4( this[3], this[2], this[3], this[0] ) }
    /** @returns {vec4} */
    get wzwy() { return new vec4( this[3], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get abag() { return new vec4( this[3], this[2], this[3], this[1] ) }
    /** @returns {vec4} */
    get wzwz() { return new vec4( this[3], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get abab() { return new vec4( this[3], this[2], this[3], this[2] ) }
    /** @returns {vec4} */
    get wzww() { return new vec4( this[3], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get abaa() { return new vec4( this[3], this[2], this[3], this[3] ) }
    /** @returns {vec4} */
    get wwxx() { return new vec4( this[3], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get aarr() { return new vec4( this[3], this[3], this[0], this[0] ) }
    /** @returns {vec4} */
    get wwxy() { return new vec4( this[3], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get aarg() { return new vec4( this[3], this[3], this[0], this[1] ) }
    /** @returns {vec4} */
    get wwxz() { return new vec4( this[3], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get aarb() { return new vec4( this[3], this[3], this[0], this[2] ) }
    /** @returns {vec4} */
    get wwxw() { return new vec4( this[3], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get aara() { return new vec4( this[3], this[3], this[0], this[3] ) }
    /** @returns {vec4} */
    get wwyx() { return new vec4( this[3], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get aagr() { return new vec4( this[3], this[3], this[1], this[0] ) }
    /** @returns {vec4} */
    get wwyy() { return new vec4( this[3], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get aagg() { return new vec4( this[3], this[3], this[1], this[1] ) }
    /** @returns {vec4} */
    get wwyz() { return new vec4( this[3], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get aagb() { return new vec4( this[3], this[3], this[1], this[2] ) }
    /** @returns {vec4} */
    get wwyw() { return new vec4( this[3], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get aaga() { return new vec4( this[3], this[3], this[1], this[3] ) }
    /** @returns {vec4} */
    get wwzx() { return new vec4( this[3], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get aabr() { return new vec4( this[3], this[3], this[2], this[0] ) }
    /** @returns {vec4} */
    get wwzy() { return new vec4( this[3], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get aabg() { return new vec4( this[3], this[3], this[2], this[1] ) }
    /** @returns {vec4} */
    get wwzz() { return new vec4( this[3], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get aabb() { return new vec4( this[3], this[3], this[2], this[2] ) }
    /** @returns {vec4} */
    get wwzw() { return new vec4( this[3], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get aaba() { return new vec4( this[3], this[3], this[2], this[3] ) }
    /** @returns {vec4} */
    get wwwx() { return new vec4( this[3], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get aaar() { return new vec4( this[3], this[3], this[3], this[0] ) }
    /** @returns {vec4} */
    get wwwy() { return new vec4( this[3], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get aaag() { return new vec4( this[3], this[3], this[3], this[1] ) }
    /** @returns {vec4} */
    get wwwz() { return new vec4( this[3], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get aaab() { return new vec4( this[3], this[3], this[3], this[2] ) }
    /** @returns {vec4} */
    get wwww() { return new vec4( this[3], this[3], this[3], this[3] ) }
    /** @returns {vec4} */
    get aaaa() { return new vec4( this[3], this[3], this[3], this[3] ) }

    /** @param {number|vec4Like} x @param {number} [y] @param {number} [z] @param {number} [w] @returns {vec4} */
    set( x, y, z, w ) {
        typeof x === "number"
            ? ( this[0] = x, this[1] = y, this[2] = z, this[3] = w )
            : ( this[0] = x[0], this[1] = x[1], this[2] = x[2], this[3] = x[3] )
        return this
    }

    /** @returns {vec4} */
    clone() {
        return new vec4( this )
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
    [Symbol.toStringTag]() { return "vec4" }
    /** @returns {string} */
    toString() { return `(${this[0]}, ${this[1]}, ${this[2]}, ${this[3]})` }
    /** @returns {number[]} */
    toArray() { return [this[0], this[1], this[2], this[3]] }
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

    /** @param {{hex?: boolean}} [options={}] @returns {string} */
    toCSSColor( options = {} ) {
        if ( options.hex ) {
            const r = Math.round( Math.min( Math.max( this[0] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const g = Math.round( Math.min( Math.max( this[1] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const b = Math.round( Math.min( Math.max( this[2] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const a = Math.round( Math.min( Math.max( this[3] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            return `#${r}${g}${b}${a}`
        } else {
            const r = Math.min( Math.max( this[0] * 100, 0 ), 100 )
            const g = Math.min( Math.max( this[1] * 100, 0 ), 100 )
            const b = Math.min( Math.max( this[2] * 100, 0 ), 100 )
            const a = Math.min( Math.max( this[3] * 100, 0 ), 100 )
            return `rgba(${r}%, ${g}%, ${b}%, ${a}%)`
        }
    }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {vec4Like} v @returns {boolean} */
    eq( v ) {
        return this[0] === v[0] && this[1] === v[1] && this[2] === v[2] && this[3] === v[3]
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {boolean} */
    static eq( v1, v2 ) {
        return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2] && v1[3] === v2[3]
    }

    /** @param {vec4Like} v @returns {boolean} */
    neq( v ) {
        return this[0] !== v[0] || this[1] !== v[1] || this[2] !== v[2] || this[3] !== v[3]
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {boolean} */
    static neq( v1, v2 ) {
        return v1[0] !== v2[0] || v1[1] !== v2[1] || v1[2] !== v2[2] || v1[3] !== v2[3]
    }

    /** @returns {boolean} */
    all() {
        return !!this[0] && !!this[1] && !!this[2] && !!this[3]
    }

    /** @param {vec4Like} v @returns {boolean} */
    static all( v ) {
        return !!v[0] && !!v[1] && !!v[2] && !!v[3]
    }

    /** @returns {boolean} */
    any() {
        return !!this[0] || !!this[1] || !!this[2] || !!this[3]
    }

    /** @param {vec4Like} v @returns {boolean} */
    static any( v ) {
        return !!v[0] || !!v[1] || !!v[2] || !!v[3]
    }

    /** @param {vec4Like} v @returns {vec4} */
    greaterThan( v ) {
        this[0] = +( this[0] > v[0] )
        this[1] = +( this[1] > v[1] )
        this[2] = +( this[2] > v[2] )
        this[3] = +( this[3] > v[3] )
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static greaterThan( v1, v2, target = new vec4 ) {
        target[0] = +( v1[0] > v2[0] )
        target[1] = +( v1[1] > v2[1] )
        target[2] = +( v1[2] > v2[2] )
        target[3] = +( v1[3] > v2[3] )
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    greaterThanEqual( v ) {
        this[0] = +( this[0] >= v[0] )
        this[1] = +( this[1] >= v[1] )
        this[2] = +( this[2] >= v[2] )
        this[3] = +( this[3] >= v[3] )
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static greaterThanEqual( v1, v2, target = new vec4 ) {
        target[0] = +( v1[0] >= v2[0] )
        target[1] = +( v1[1] >= v2[1] )
        target[2] = +( v1[2] >= v2[2] )
        target[3] = +( v1[3] >= v2[3] )
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    lessThan( v ) {
        this[0] = +( this[0] < v[0] )
        this[1] = +( this[1] < v[1] )
        this[2] = +( this[2] < v[2] )
        this[3] = +( this[3] < v[3] )
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static lessThan( v1, v2, target = new vec4 ) {
        target[0] = +( v1[0] < v2[0] )
        target[1] = +( v1[1] < v2[1] )
        target[2] = +( v1[2] < v2[2] )
        target[3] = +( v1[3] < v2[3] )
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    lessThanEqual( v ) {
        this[0] = +( this[0] <= v[0] )
        this[1] = +( this[1] <= v[1] )
        this[2] = +( this[2] <= v[2] )
        this[3] = +( this[3] <= v[3] )
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static lessThanEqual( v1, v2, target = new vec4 ) {
        target[0] = +( v1[0] <= v2[0] )
        target[1] = +( v1[1] <= v2[1] )
        target[2] = +( v1[2] <= v2[2] )
        target[3] = +( v1[3] <= v2[3] )
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    equal( v ) {
        this[0] = +( this[0] === v[0] )
        this[1] = +( this[1] === v[1] )
        this[2] = +( this[2] === v[2] )
        this[3] = +( this[3] === v[3] )
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static equal( v1, v2, target = new vec4 ) {
        target[0] = +( v1[0] === v2[0] )
        target[1] = +( v1[1] === v2[1] )
        target[2] = +( v1[2] === v2[2] )
        target[3] = +( v1[3] === v2[3] )
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    notEqual( v ) {
        this[0] = +( this[0] !== v[0] )
        this[1] = +( this[1] !== v[1] )
        this[2] = +( this[2] !== v[2] )
        this[3] = +( this[3] !== v[3] )
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static notEqual( v1, v2, target = new vec4 ) {
        target[0] = +( v1[0] !== v2[0] )
        target[1] = +( v1[1] !== v2[1] )
        target[2] = +( v1[2] !== v2[2] )
        target[3] = +( v1[3] !== v2[3] )
        return target
    }

    /** @returns {vec4} */
    not() {
        this[0] = +!this[0]
        this[1] = +!this[1]
        this[2] = +!this[2]
        this[3] = +!this[3]
        return this
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static not( v, target = new vec4 ) {
        target[0] = +!v[0]
        target[1] = +!v[1]
        target[2] = +!v[2]
        target[3] = +!v[3]
        return target
    }

    /** @returns {vec4} */
    isinf() {
        this[0] = +( this[0] === -Infinity || this[0] === Infinity )
        this[1] = +( this[1] === -Infinity || this[1] === Infinity )
        this[2] = +( this[2] === -Infinity || this[2] === Infinity )
        this[3] = +( this[3] === -Infinity || this[3] === Infinity )
        return this
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static isinf( v, target = new vec4 ) {
        target[0] = +( v[0] === -Infinity || v[0] === Infinity )
        target[1] = +( v[1] === -Infinity || v[1] === Infinity )
        target[2] = +( v[2] === -Infinity || v[2] === Infinity )
        target[3] = +( v[3] === -Infinity || v[3] === Infinity )
        return target
    }

    /** @returns {vec4} */
    isnan() {
        this[0] = +( this[0] !== this[0] )
        this[1] = +( this[1] !== this[1] )
        this[2] = +( this[2] !== this[2] )
        this[3] = +( this[3] !== this[3] )
        return this
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static isnan( v, target = new vec4 ) {
        target[0] = +( v[0] !== v[0] )
        target[1] = +( v[1] !== v[1] )
        target[2] = +( v[2] !== v[2] )
        target[3] = +( v[3] !== v[3] )
        return target
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec4Like} x @returns {vec4} */
    add( x ) {
        return typeof x === "number" ? this.sadd( x ) : this.vadd( x )
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static add( v, x, target = new vec4 ) {
        return typeof x === "number" ? vec4.sadd( v, x, target ) : vec4.vadd( v, x, target )
    }

    /** @param {number} s @returns {vec4} */
    sadd( s ) {
        this[0] += s
        this[1] += s
        this[2] += s
        this[3] += s
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static sadd( v, s, target = new vec4 ) {
        target[0] = v[0] + s
        target[1] = v[1] + s
        target[2] = v[2] + s
        target[3] = v[3] + s
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    vadd( v ) {
        this[0] += v[0]
        this[1] += v[1]
        this[2] += v[2]
        this[3] += v[3]
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vadd( v1, v2, target = new vec4 ) {
        target[0] = v1[0] + v2[0]
        target[1] = v1[1] + v2[1]
        target[2] = v1[2] + v2[2]
        target[3] = v1[3] + v2[3]
        return target
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    sub( x ) {
        return typeof x === "number" ? this.ssub( x ) : this.vsub( x )
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static sub( v, x, target = new vec4 ) {
        return typeof x === "number" ? vec4.ssub( v, x, target ) : vec4.vsub( v, x, target )
    }

    /** @param {number} s @returns {vec4} */
    ssub( s ) {
        this[0] -= s
        this[1] -= s
        this[2] -= s
        this[3] -= s
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static ssub( v, s, target = new vec4 ) {
        target[0] = v[0] - s
        target[1] = v[1] - s
        target[2] = v[2] - s
        target[3] = v[3] - s
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    vsub( v ) {
        this[0] -= v[0]
        this[1] -= v[1]
        this[2] -= v[2]
        this[3] -= v[3]
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vsub( v1, v2, target = new vec4 ) {
        target[0] = v1[0] - v2[0]
        target[1] = v1[1] - v2[1]
        target[2] = v1[2] - v2[2]
        target[3] = v1[3] - v2[3]
        return target
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    mul( x ) {
        return typeof x === "number" ? this.smul( x ) : this.vmul( x )
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static mul( v, x, target = new vec4 ) {
        return typeof x === "number" ? vec4.smul( v, x, target ) : vec4.vmul( v, x, target )
    }

    /** @param {number} s @returns {vec4} */
    smul( s ) {
        this[0] *= s
        this[1] *= s
        this[2] *= s
        this[3] *= s
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static smul( v, s, target = new vec4 ) {
        target[0] = v[0] * s
        target[1] = v[1] * s
        target[2] = v[2] * s
        target[3] = v[3] * s
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    vmul( v ) {
        this[0] *= v[0]
        this[1] *= v[1]
        this[2] *= v[2]
        this[3] *= v[3]
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vmul( v1, v2, target = new vec4 ) {
        target[0] = v1[0] * v2[0]
        target[1] = v1[1] * v2[1]
        target[2] = v1[2] * v2[2]
        target[3] = v1[3] * v2[3]
        return target
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    div( x ) {
        return typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static div( v, x, target = new vec4 ) {
        return typeof x === "number" ? vec4.sdiv( v, x, target ) : vec4.vdiv( v, x, target )
    }

    /** @param {number} s @returns {vec4} */
    sdiv( s ) {
        this[0] /= s
        this[1] /= s
        this[2] /= s
        this[3] /= s
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static sdiv( v, s, target = new vec4 ) {
        target[0] = v[0] / s
        target[1] = v[1] / s
        target[2] = v[2] / s
        target[3] = v[3] / s
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    vdiv( v ) {
        this[0] /= v[0]
        this[1] /= v[1]
        this[2] /= v[2]
        this[3] /= v[3]
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vdiv( v1, v2, target = new vec4 ) {
        target[0] = v1[0] / v2[0]
        target[1] = v1[1] / v2[1]
        target[2] = v1[2] / v2[2]
        target[3] = v1[3] / v2[3]
        return target
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    rem( x ) {
        return typeof x === "number" ? this.srem( x ) : this.vrem( x )
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static rem( v, x, target = new vec4 ) {
        return typeof x === "number" ? vec4.srem( v, x, target ) : vec4.vrem( v, x, target )
    }

    /** @param {number} s @returns {vec4} */
    srem( s ) {
        this[0] %= s
        this[1] %= s
        this[2] %= s
        this[3] %= s
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static srem( v, s, target = new vec4 ) {
        target[0] = v[0] % s
        target[1] = v[1] % s
        target[2] = v[2] % s
        target[3] = v[3] % s
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    vrem( v ) {
        this[0] %= v[0]
        this[1] %= v[1]
        this[2] %= v[2]
        this[3] %= v[3]
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vrem( v1, v2, target = new vec4 ) {
        target[0] = v1[0] % v2[0]
        target[1] = v1[1] % v2[1]
        target[2] = v1[2] % v2[2]
        target[3] = v1[3] % v2[3]
        return target
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    pow( x ) {
        return typeof x === "number" ? this.spow( x ) : this.vpow( x )
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static pow( v, x, target = new vec4 ) {
        return typeof x === "number" ? vec4.spow( v, x, target ) : vec4.vpow( v, x, target )
    }

    /** @param {number} s @returns {vec4} */
    spow( s ) {
        this[0] **= s
        this[1] **= s
        this[2] **= s
        this[3] **= s
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static spow( v, s, target = new vec4 ) {
        target[0] = v[0] ** s
        target[1] = v[1] ** s
        target[2] = v[2] ** s
        target[3] = v[3] ** s
        return target
    }

    /** @param {vec4Like} v @returns {vec4} */
    vpow( v ) {
        this[0] **= v[0]
        this[1] **= v[1]
        this[2] **= v[2]
        this[3] **= v[3]
        return this
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vpow( v1, v2, target = new vec4 ) {
        target[0] = v1[0] ** v2[0]
        target[1] = v1[1] ** v2[1]
        target[2] = v1[2] ** v2[2]
        target[3] = v1[3] ** v2[3]
        return target
    }

    /** @param {number|vec4Like} m @param {number|vec4Like} a @returns {vec4} */
    fma( m, a ) {
        return typeof m === "number"
            ? (typeof a === "number" ? this.sfma( m, a ) : this.svfma( m, a ))
            : (typeof a === "number" ? this.vsfma( m, a ) : this.vfma( m, a ))
    }

    /** @param {vec4Like} v @param {number|vec4Like} m @param {number|vec4Like} a @param {vec4} [target=new vec4] @returns {vec4} */
    static fma( v, m, a, target = new vec4 ) {
        return typeof m === "number"
            ? ( typeof a === "number" ? vec4.sfma( v, m, a, target ) : vec4.svfma( v, m, a, target ) )
            : ( typeof a === "number" ? vec4.vsfma( v, m, a, target ) : vec4.vfma( v, m, a, target ) )
    }

    /** @param {number} m @param {number} a @returns {vec4} */
    sfma( m, a ) {
        this[0] = this[0] * m + a
        this[1] = this[1] * m + a
        this[2] = this[2] * m + a
        this[3] = this[3] * m + a
        return this
    }

    /** @param {vec4Like} v @param {number} m @param {number} a @param {vec4} [target=new vec4] @returns {vec4} */
    static sfma( v, m, a, target = new vec4 ) {
        target[0] = v[0] * m + a
        target[1] = v[1] * m + a
        target[2] = v[2] * m + a
        target[3] = v[3] * m + a
        return target
    }

    /** @param {number} m @param {vec4Like} a @returns {vec4} */
    svfma( m, a ) {
        this[0] = this[0] * m + a[0]
        this[1] = this[1] * m + a[1]
        this[2] = this[2] * m + a[2]
        this[3] = this[3] * m + a[3]
        return this
    }

    /** @param {vec4Like} v @param {number} m @param {vec4Like} a @param {vec4} [target=new vec4] @returns {vec4} */
    static svfma( v, m, a, target = new vec4 ) {
        target[0] = v[0] * m + a[0]
        target[1] = v[1] * m + a[1]
        target[2] = v[2] * m + a[2]
        target[3] = v[3] * m + a[3]
        return target
    }

    /** @param {vec4Like} m @param {number} a @returns {vec4} */
    vsfma( m, a ) {
        this[0] = this[0] * m[0] + a
        this[1] = this[1] * m[1] + a
        this[2] = this[2] * m[2] + a
        this[3] = this[3] * m[3] + a
        return this
    }

    /** @param {vec4Like} v @param {vec4Like} m @param {number} a @param {vec4} [target=new vec4] @returns {vec4} */
    static vsfma( v, m, a, target = new vec4 ) {
        target[0] = v[0] * m[0] + a
        target[1] = v[1] * m[1] + a
        target[2] = v[2] * m[2] + a
        target[3] = v[3] * m[3] + a
        return target
    }

    /** @param {vec4Like} m @param {vec4Like} a @returns {vec4} */
    vfma( m, a ) {
        this[0] = this[0] * m[0] + a[0]
        this[1] = this[1] * m[1] + a[1]
        this[2] = this[2] * m[2] + a[2]
        this[3] = this[3] * m[3] + a[3]
        return this
    }

    /** @param {vec4Like} v @param {vec4Like} m @param {vec4Like} a @param {vec4} [target=new vec4] @returns {vec4} */
    static vfma( v, m, a, target = new vec4 ) {
        target[0] = v[0] * m[0] + a[0]
        target[1] = v[1] * m[1] + a[1]
        target[2] = v[2] * m[2] + a[2]
        target[3] = v[3] * m[3] + a[3]
        return target
    }

    /** @param {mat4Like} m @returns {vec4} */
    mmul( m ) {
        const c0 = this[0]
        const c1 = this[1]
        const c2 = this[2]
        const c3 = this[3]
        this[0] = c0 * m[0] + c1 * m[4] + c2 * m[8] + c3 * m[12]
        this[1] = c0 * m[1] + c1 * m[5] + c2 * m[9] + c3 * m[13]
        this[2] = c0 * m[2] + c1 * m[6] + c2 * m[10] + c3 * m[14]
        this[3] = c0 * m[3] + c1 * m[7] + c2 * m[11] + c3 * m[15]
        return this
    }

    /** @param {vec4Like} v @param {mat4Like} m @param {vec4} [target=new vec4] @returns {vec4} */
    static mmul( v, m, target = new vec4 ) {
        const c0 = v[0]
        const c1 = v[1]
        const c2 = v[2]
        const c3 = v[3]
        target[0] = c0 * m[0] + c1 * m[4] + c2 * m[8] + c3 * m[12]
        target[1] = c0 * m[1] + c1 * m[5] + c2 * m[9] + c3 * m[13]
        target[2] = c0 * m[2] + c1 * m[6] + c2 * m[10] + c3 * m[14]
        target[3] = c0 * m[3] + c1 * m[7] + c2 * m[11] + c3 * m[15]
        return target
    }

    /** @param {(value: number, index: number) => number} fn @returns {vec4} */
    apply( fn ) {
        this[0] = fn( this[0], 0 )
        this[1] = fn( this[1], 1 )
        this[2] = fn( this[2], 2 )
        this[3] = fn( this[3], 3 )
        return this
    }

    /** @param {vec4Like} v @param {(value: number, index: number) => number} fn @param {vec4} [target=new vec4] @returns {vec4} */
    static apply( v, fn, target = new vec4 ) {
        target[0] = fn( v[0], 0 )
        target[1] = fn( v[1], 1 )
        target[2] = fn( v[2], 2 )
        target[3] = fn( v[3], 3 )
        return target
    }

    /** @returns {vec4} */
    abs() {
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        this[2] = Math.abs( this[2] )
        this[3] = Math.abs( this[3] )
        return this
    }

    /** @returns {vec4} */
    trunc() {
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        this[2] = Math.trunc( this[2] )
        this[3] = Math.trunc( this[3] )
        return this
    }

    /** @returns {vec4} */
    round() {
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        this[2] = Math.round( this[2] )
        this[3] = Math.round( this[3] )
        return this
    }

    /** @returns {vec4} */
    floor() {
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        this[2] = Math.floor( this[2] )
        this[3] = Math.floor( this[3] )
        return this
    }

    /** @returns {vec4} */
    ceil() {
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        this[2] = Math.ceil( this[2] )
        this[3] = Math.ceil( this[3] )
        return this
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static abs( v, target = new vec4 ) {
        target[0] = Math.abs( v[0] )
        target[1] = Math.abs( v[1] )
        target[2] = Math.abs( v[2] )
        target[3] = Math.abs( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static acos( v, target = new vec4 ) {
        target[0] = Math.acos( v[0] )
        target[1] = Math.acos( v[1] )
        target[2] = Math.acos( v[2] )
        target[3] = Math.acos( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static acosh( v, target = new vec4 ) {
        target[0] = Math.acosh( v[0] )
        target[1] = Math.acosh( v[1] )
        target[2] = Math.acosh( v[2] )
        target[3] = Math.acosh( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static asin( v, target = new vec4 ) {
        target[0] = Math.asin( v[0] )
        target[1] = Math.asin( v[1] )
        target[2] = Math.asin( v[2] )
        target[3] = Math.asin( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static asinh( v, target = new vec4 ) {
        target[0] = Math.asinh( v[0] )
        target[1] = Math.asinh( v[1] )
        target[2] = Math.asinh( v[2] )
        target[3] = Math.asinh( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static atan( v, target = new vec4 ) {
        target[0] = Math.atan( v[0] )
        target[1] = Math.atan( v[1] )
        target[2] = Math.atan( v[2] )
        target[3] = Math.atan( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static atanh( v, target = new vec4 ) {
        target[0] = Math.atanh( v[0] )
        target[1] = Math.atanh( v[1] )
        target[2] = Math.atanh( v[2] )
        target[3] = Math.atanh( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static ceil( v, target = new vec4 ) {
        target[0] = Math.ceil( v[0] )
        target[1] = Math.ceil( v[1] )
        target[2] = Math.ceil( v[2] )
        target[3] = Math.ceil( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static cbrt( v, target = new vec4 ) {
        target[0] = Math.cbrt( v[0] )
        target[1] = Math.cbrt( v[1] )
        target[2] = Math.cbrt( v[2] )
        target[3] = Math.cbrt( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static expm1( v, target = new vec4 ) {
        target[0] = Math.expm1( v[0] )
        target[1] = Math.expm1( v[1] )
        target[2] = Math.expm1( v[2] )
        target[3] = Math.expm1( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static cos( v, target = new vec4 ) {
        target[0] = Math.cos( v[0] )
        target[1] = Math.cos( v[1] )
        target[2] = Math.cos( v[2] )
        target[3] = Math.cos( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static cosh( v, target = new vec4 ) {
        target[0] = Math.cosh( v[0] )
        target[1] = Math.cosh( v[1] )
        target[2] = Math.cosh( v[2] )
        target[3] = Math.cosh( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static exp( v, target = new vec4 ) {
        target[0] = Math.exp( v[0] )
        target[1] = Math.exp( v[1] )
        target[2] = Math.exp( v[2] )
        target[3] = Math.exp( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static floor( v, target = new vec4 ) {
        target[0] = Math.floor( v[0] )
        target[1] = Math.floor( v[1] )
        target[2] = Math.floor( v[2] )
        target[3] = Math.floor( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log( v, target = new vec4 ) {
        target[0] = Math.log( v[0] )
        target[1] = Math.log( v[1] )
        target[2] = Math.log( v[2] )
        target[3] = Math.log( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log1p( v, target = new vec4 ) {
        target[0] = Math.log1p( v[0] )
        target[1] = Math.log1p( v[1] )
        target[2] = Math.log1p( v[2] )
        target[3] = Math.log1p( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log2( v, target = new vec4 ) {
        target[0] = Math.log2( v[0] )
        target[1] = Math.log2( v[1] )
        target[2] = Math.log2( v[2] )
        target[3] = Math.log2( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log10( v, target = new vec4 ) {
        target[0] = Math.log10( v[0] )
        target[1] = Math.log10( v[1] )
        target[2] = Math.log10( v[2] )
        target[3] = Math.log10( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static round( v, target = new vec4 ) {
        target[0] = Math.round( v[0] )
        target[1] = Math.round( v[1] )
        target[2] = Math.round( v[2] )
        target[3] = Math.round( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sign( v, target = new vec4 ) {
        target[0] = Math.sign( v[0] )
        target[1] = Math.sign( v[1] )
        target[2] = Math.sign( v[2] )
        target[3] = Math.sign( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sin( v, target = new vec4 ) {
        target[0] = Math.sin( v[0] )
        target[1] = Math.sin( v[1] )
        target[2] = Math.sin( v[2] )
        target[3] = Math.sin( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sinh( v, target = new vec4 ) {
        target[0] = Math.sinh( v[0] )
        target[1] = Math.sinh( v[1] )
        target[2] = Math.sinh( v[2] )
        target[3] = Math.sinh( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sqrt( v, target = new vec4 ) {
        target[0] = Math.sqrt( v[0] )
        target[1] = Math.sqrt( v[1] )
        target[2] = Math.sqrt( v[2] )
        target[3] = Math.sqrt( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static tan( v, target = new vec4 ) {
        target[0] = Math.tan( v[0] )
        target[1] = Math.tan( v[1] )
        target[2] = Math.tan( v[2] )
        target[3] = Math.tan( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static tanh( v, target = new vec4 ) {
        target[0] = Math.tanh( v[0] )
        target[1] = Math.tanh( v[1] )
        target[2] = Math.tanh( v[2] )
        target[3] = Math.tanh( v[3] )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static trunc( v, target = new vec4 ) {
        target[0] = Math.trunc( v[0] )
        target[1] = Math.trunc( v[1] )
        target[2] = Math.trunc( v[2] )
        target[3] = Math.trunc( v[3] )
        return target
    }

    // ---------------------------
    //      PROPERTIES
    // ---------------------------

    /** @returns {number} */
    length() {
        return Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3] )
    }

    /** @param {vec4Like} v @returns {number} */
    static length( v ) {
        return Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] )
    }

    /** @returns {number} */
    lengthSq() {
        return this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3]
    }

    /** @param {vec4Like} v @returns {number} */
    static lengthSq( v ) {
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec4Like} v @returns {vec4} */
    pointTo( v ) {
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        this[2] = v[2] - this[2]
        this[3] = v[3] - this[3]
        return this
    }

    /** @param {vec4Like} from @param {vec4Like} to @param {vec4} [target=new vec4] @returns {vec4} */
    static pointTo( from, to, target = new vec4 ) {
        target[0] = to[0] - from[0]
        target[1] = to[1] - from[1]
        target[2] = to[2] - from[2]
        target[3] = to[3] - from[3]
        return target
    }

    /** @returns {vec4} */
    normalize() {
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        this[3] *= factor
        return this
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static normalize( v, target = new vec4 ) {
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        target[3] = v[3] * factor
        return target
    }

    /** @param {number} s @returns {vec4} */
    setLength( s ) {
        const factor = s / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        this[3] *= factor
        return this
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static setLength( v, s, target = new vec4 ) {
        const factor = s / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        target[3] = v[3] * factor
        return target
    }

    /** @param {vec4Like} v @returns {number} */
    dot( v ) {
        return this[0] * v[0] + this[1] * v[1] + this[2] * v[2] + this[3] * v[3]
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3]
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        const d3 = v1[3] - v2[3]
        return Math.sqrt( d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3 )
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        const d3 = v1[3] - v2[3]
        return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3
    }

    /** @param {...(number|vec4Like)} values @returns {vec4} */
    static min( ...values ) {
        const target = new vec4
        target[0] = Math.min( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.min( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.min( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        target[3] = Math.min( ...values.map( x => typeof x === "number" ? x : x[3] ) )
        return target
    }

    /** @param {...(number|vec4Like)} values @returns {vec4} */
    static max( ...values ) {
        const target = new vec4
        target[0] = Math.max( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.max( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.max( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        target[3] = Math.max( ...values.map( x => typeof x === "number" ? x : x[3] ) )
        return target
    }

    /** @param {vec4Like} v @param {number|vec4Like} min @param {number|vec4Like} max @param {vec4} [target=new vec4] @returns {vec4} */
    static clamp( v, min, max, target = new vec4 ) {
        return typeof min === "number"
            ? ( typeof max === "number" ? vec4.sclamp( v, min, max, target ) : vec4.svclamp( v, min, max, target ) )
            : ( typeof max === "number" ? vec4.vsclamp( v, min, max, target ) : vec4.vclamp( v, min, max, target ) )
    }

    /** @param {vec4Like} v @param {number} min @param {number} max @param {vec4} [target=new vec4] @returns {vec4} */
    static sclamp( v, min, max, target = new vec4 ) {
        target[0] = Math.min( Math.max( v[0], min ), max  )
        target[1] = Math.min( Math.max( v[1], min ), max  )
        target[2] = Math.min( Math.max( v[2], min ), max  )
        target[3] = Math.min( Math.max( v[3], min ), max  )
        return target
    }

    /** @param {vec4Like} v @param {number} min @param {vec4Like} max @param {vec4} [target=new vec4] @returns {vec4} */
    static svclamp( v, min, max, target = new vec4 ) {
        target[0] = Math.min( Math.max( v[0], min ), max[0]  )
        target[1] = Math.min( Math.max( v[1], min ), max[1]  )
        target[2] = Math.min( Math.max( v[2], min ), max[2]  )
        target[3] = Math.min( Math.max( v[3], min ), max[3]  )
        return target
    }

    /** @param {vec4Like} v @param {vec4Like} min @param {number} max @param {vec4} [target=new vec4] @returns {vec4} */
    static vsclamp( v, min, max, target = new vec4 ) {
        target[0] = Math.min( Math.max( v[0], min[0] ), max  )
        target[1] = Math.min( Math.max( v[1], min[1] ), max  )
        target[2] = Math.min( Math.max( v[2], min[2] ), max  )
        target[3] = Math.min( Math.max( v[3], min[3] ), max  )
        return target
    }

    /** @param {vec4Like} v @param {vec4Like} min @param {vec4Like} max @param {vec4} [target=new vec4] @returns {vec4} */
    static vclamp( v, min, max, target = new vec4 ) {
        target[0] = Math.min( Math.max( v[0], min[0] ), max[0]  )
        target[1] = Math.min( Math.max( v[1], min[1] ), max[1]  )
        target[2] = Math.min( Math.max( v[2], min[2] ), max[2]  )
        target[3] = Math.min( Math.max( v[3], min[3] ), max[3]  )
        return target
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static saturate( v, target = new vec4 ) {
        target[0] = Math.min( Math.max( v[0], 0 ), 1 )
        target[1] = Math.min( Math.max( v[1], 0 ), 1 )
        target[2] = Math.min( Math.max( v[2], 0 ), 1 )
        target[3] = Math.min( Math.max( v[3], 0 ), 1 )
        return target
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {number} t @param {vec4} [target=new vec4] @returns {vec4} */
    static mix( v1, v2, t, target = new vec4 ) {
        target[0] = v1[0] * ( 1 - t ) + v2[0] * t
        target[1] = v1[1] * ( 1 - t ) + v2[1] * t
        target[2] = v1[2] * ( 1 - t ) + v2[2] * t
        target[3] = v1[3] * ( 1 - t ) + v2[3] * t
        return target
    }

}