const tc_numberundefined = function numberundefined( x ) {
    const result = ((x => typeof x === "number" && isFinite( x ))(x) || (x => x === undefined)(x))(x)
    if ( !result ) throw new TypeError( `Expected Type 'number|undefined', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_number = function number( x ) {
    const result = (x => typeof x === "number" && isFinite( x ))(x)
    if ( !result ) throw new TypeError( `Expected Type 'number', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec2Like = function vec2Like( x ) {
    const result = (x => Array.from( { length: 2 } ).every( ( _, i ) => typeof x[i] === "number" && isFinite( x[i] ) ))(x)
    if ( !result ) throw new TypeError( `Expected Type 'vec2Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec3Like = function vec3Like( x ) {
    const result = (x => Array.from( { length: 3 } ).every( ( _, i ) => typeof x[i] === "number" && isFinite( x[i] ) ))(x)
    if ( !result ) throw new TypeError( `Expected Type 'vec3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_numbervec3Like = function numbervec3Like( x ) {
    const result = ((x => typeof x === "number" && isFinite( x ))(x) || (x => Array.from( { length: 3 } ).every( ( _, i ) => typeof x[i] === "number" && isFinite( x[i] ) ))(x))(x)
    if ( !result ) throw new TypeError( `Expected Type 'number|vec3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec3 = function vec3( x ) {
    const result = (x => x instanceof vec3 && [...x].every( isFinite ))(x)
    if ( !result ) throw new TypeError( `Expected Type 'vec3', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec3undefined = function vec3undefined( x ) {
    const result = ((x => x instanceof vec3 && [...x].every( isFinite ))(x) || (x => x === undefined)(x))(x)
    if ( !result ) throw new TypeError( `Expected Type 'vec3|undefined', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_mat3Like = function mat3Like( x ) {
    const result = (x => Array.from( { length: 3 ** 2 } ).every( ( _, i ) => typeof x[i] === "number" && isFinite( x[i] ) ))(x)
    if ( !result ) throw new TypeError( `Expected Type 'mat3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}

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

export class vec3 {

    static get NaN() { return new vec3( NaN, NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**
     * @param {number|vec3Like|{x: number, y: number, z: number}|{r: number, g: number, b: number}} [object=0]
     * @param {number|undefined} [y]
     * @param {number|undefined} [z]
     */
    constructor( object = 0, y, z ) {
        tc_numberundefined( y )
        tc_numberundefined( z )
        if ( typeof object === "number" )
            y === undefined
                ? ( this[0] = object, this[1] = object, this[2] = object )
                : ( this[0] = object, this[1] = +y, this[2] = +( z ?? 0 ) )
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

    /** @param {ArrayLike<number>} array @param {number|undefined} [index=0] @param {number|undefined} [stride=1] @returns {vec3} */
    static fromArray( array, index = 0, stride = 1 ) {
        tc_numberundefined( index )
        tc_numberundefined( stride )
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
        return new vec3( randomNorm(), randomNorm(), randomNorm() ).setLength( Math.random() ** (1/3) )
    }

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @returns {number} */
    get x() { return this[0] }
    /** @param {number} s */
    set x( s ) { tc_number( s ); this[0] = s }
    /** @returns {number} */
    get r() { return this[0] }
    /** @param {number} s */
    set r( s ) { tc_number( s ); this[0] = s }
    /** @returns {number} */
    get y() { return this[1] }
    /** @param {number} s */
    set y( s ) { tc_number( s ); this[1] = s }
    /** @returns {number} */
    get g() { return this[1] }
    /** @param {number} s */
    set g( s ) { tc_number( s ); this[1] = s }
    /** @returns {number} */
    get z() { return this[2] }
    /** @param {number} s */
    set z( s ) { tc_number( s ); this[2] = s }
    /** @returns {number} */
    get b() { return this[2] }
    /** @param {number} s */
    set b( s ) { tc_number( s ); this[2] = s }
    /** @returns {vec2} */
    get xx() { return new vec2( this[0], this[0] ) }
    /** @returns {vec2} */
    get rr() { return new vec2( this[0], this[0] ) }
    /** @returns {vec2} */
    get xy() { return new vec2( this[0], this[1] ) }
    /** @returns {vec2} */
    get rg() { return new vec2( this[0], this[1] ) }
    /** @param {vec2Like} v */
    set xy( v ) { tc_vec2Like( v ); this[0] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set rg( v ) { tc_vec2Like( v ); this[0] = v[0], this[1] = v[1] }
    /** @returns {vec2} */
    get xz() { return new vec2( this[0], this[2] ) }
    /** @returns {vec2} */
    get rb() { return new vec2( this[0], this[2] ) }
    /** @param {vec2Like} v */
    set xz( v ) { tc_vec2Like( v ); this[0] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set rb( v ) { tc_vec2Like( v ); this[0] = v[0], this[2] = v[1] }
    /** @returns {vec2} */
    get yx() { return new vec2( this[1], this[0] ) }
    /** @returns {vec2} */
    get gr() { return new vec2( this[1], this[0] ) }
    /** @param {vec2Like} v */
    set yx( v ) { tc_vec2Like( v ); this[1] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set gr( v ) { tc_vec2Like( v ); this[1] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get yy() { return new vec2( this[1], this[1] ) }
    /** @returns {vec2} */
    get gg() { return new vec2( this[1], this[1] ) }
    /** @returns {vec2} */
    get yz() { return new vec2( this[1], this[2] ) }
    /** @returns {vec2} */
    get gb() { return new vec2( this[1], this[2] ) }
    /** @param {vec2Like} v */
    set yz( v ) { tc_vec2Like( v ); this[1] = v[0], this[2] = v[1] }
    /** @param {vec2Like} v */
    set gb( v ) { tc_vec2Like( v ); this[1] = v[0], this[2] = v[1] }
    /** @returns {vec2} */
    get zx() { return new vec2( this[2], this[0] ) }
    /** @returns {vec2} */
    get br() { return new vec2( this[2], this[0] ) }
    /** @param {vec2Like} v */
    set zx( v ) { tc_vec2Like( v ); this[2] = v[0], this[0] = v[1] }
    /** @param {vec2Like} v */
    set br( v ) { tc_vec2Like( v ); this[2] = v[0], this[0] = v[1] }
    /** @returns {vec2} */
    get zy() { return new vec2( this[2], this[1] ) }
    /** @returns {vec2} */
    get bg() { return new vec2( this[2], this[1] ) }
    /** @param {vec2Like} v */
    set zy( v ) { tc_vec2Like( v ); this[2] = v[0], this[1] = v[1] }
    /** @param {vec2Like} v */
    set bg( v ) { tc_vec2Like( v ); this[2] = v[0], this[1] = v[1] }
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
    set xyz( v ) { tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set rgb( v ) { tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2] }
    /** @returns {vec3} */
    get xzx() { return new vec3( this[0], this[2], this[0] ) }
    /** @returns {vec3} */
    get rbr() { return new vec3( this[0], this[2], this[0] ) }
    /** @returns {vec3} */
    get xzy() { return new vec3( this[0], this[2], this[1] ) }
    /** @returns {vec3} */
    get rbg() { return new vec3( this[0], this[2], this[1] ) }
    /** @param {vec3Like} v */
    set xzy( v ) { tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set rbg( v ) { tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2] }
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
    set yxz( v ) { tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2] }
    /** @param {vec3Like} v */
    set grb( v ) { tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2] }
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
    set yzx( v ) { tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set gbr( v ) { tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2] }
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
    set zxy( v ) { tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @param {vec3Like} v */
    set brg( v ) { tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2] }
    /** @returns {vec3} */
    get zxz() { return new vec3( this[2], this[0], this[2] ) }
    /** @returns {vec3} */
    get brb() { return new vec3( this[2], this[0], this[2] ) }
    /** @returns {vec3} */
    get zyx() { return new vec3( this[2], this[1], this[0] ) }
    /** @returns {vec3} */
    get bgr() { return new vec3( this[2], this[1], this[0] ) }
    /** @param {vec3Like} v */
    set zyx( v ) { tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2] }
    /** @param {vec3Like} v */
    set bgr( v ) { tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2] }
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

    /** @param {number|vec3Like} x @param {number} [y] @param {number} [z] @returns {vec3} */
    set( x, y, z ) {
        tc_numbervec3Like( x )
        typeof x === "number"
            ? ( this[0] = x, this[1] = y, this[2] = z )
            : ( this[0] = x[0], this[1] = x[1], this[2] = x[2] )
        tc_numbervec3Like( x )
        tc_vec3( this )
        return this
    }

    /** @returns {vec3} */
    clone() {
        return new vec3( this )
    }

    *[Symbol.iterator]() {
        yield this[0]
        yield this[1]
        yield this[2]
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    [Symbol.toStringTag]() { return "vec3" }
    /** @returns {string} */
    toString() { return `(${this[0]}, ${this[1]}, ${this[2]})` }
    /** @returns {number[]} */
    toArray() { return [this[0], this[1], this[2]] }
    /** @returns {Int8Array} */
    toInt8Array() { return new Int8Array( [this[0], this[1], this[2]] ) }
    /** @returns {Uint8Array} */
    toUint8Array() { return new Uint8Array( [this[0], this[1], this[2]] ) }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { return new Uint8ClampedArray( [this[0], this[1], this[2]] ) }
    /** @returns {Int16Array} */
    toInt16Array() { return new Int16Array( [this[0], this[1], this[2]] ) }
    /** @returns {Uint16Array} */
    toUint16Array() { return new Uint16Array( [this[0], this[1], this[2]] ) }
    /** @returns {Int32Array} */
    toInt32Array() { return new Int32Array( [this[0], this[1], this[2]] ) }
    /** @returns {Uint32Array} */
    toUint32Array() { return new Uint32Array( [this[0], this[1], this[2]] ) }
    /** @returns {Float32Array} */
    toFloat32Array() { return new Float32Array( [this[0], this[1], this[2]] ) }
    /** @returns {Float64Array} */
    toFloat64Array() { return new Float64Array( [this[0], this[1], this[2]] ) }

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
        tc_vec3Like( v )
        return this[0] === v[0] && this[1] === v[1] && this[2] === v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static eq( v1, v2 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    neq( v ) {
        tc_vec3Like( v )
        return this[0] !== v[0] || this[1] !== v[1] || this[2] !== v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static neq( v1, v2 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        return v1[0] !== v2[0] || v1[1] !== v2[1] || v1[2] !== v2[2]
    }

    /** @returns {boolean} */
    all() {
        return !!this[0] && !!this[1] && !!this[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    static all( v ) {
        tc_vec3Like( v )
        return !!v[0] && !!v[1] && !!v[2]
    }

    /** @returns {boolean} */
    any() {
        return !!this[0] || !!this[1] || !!this[2]
    }

    /** @param {vec3Like} v @returns {boolean} */
    static any( v ) {
        tc_vec3Like( v )
        return !!v[0] || !!v[1] || !!v[2]
    }

    /** @param {vec3Like} v @returns {vec3} */
    greaterThan( v ) {
        tc_vec3Like( v )
        this[0] = +( this[0] > v[0] )
        this[1] = +( this[1] > v[1] )
        this[2] = +( this[2] > v[2] )
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static greaterThan( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = +( v1[0] > v2[0] )
        target[1] = +( v1[1] > v2[1] )
        target[2] = +( v1[2] > v2[2] )
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    greaterThanEqual( v ) {
        tc_vec3Like( v )
        this[0] = +( this[0] >= v[0] )
        this[1] = +( this[1] >= v[1] )
        this[2] = +( this[2] >= v[2] )
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static greaterThanEqual( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = +( v1[0] >= v2[0] )
        target[1] = +( v1[1] >= v2[1] )
        target[2] = +( v1[2] >= v2[2] )
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    lessThan( v ) {
        tc_vec3Like( v )
        this[0] = +( this[0] < v[0] )
        this[1] = +( this[1] < v[1] )
        this[2] = +( this[2] < v[2] )
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static lessThan( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = +( v1[0] < v2[0] )
        target[1] = +( v1[1] < v2[1] )
        target[2] = +( v1[2] < v2[2] )
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    lessThanEqual( v ) {
        tc_vec3Like( v )
        this[0] = +( this[0] <= v[0] )
        this[1] = +( this[1] <= v[1] )
        this[2] = +( this[2] <= v[2] )
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static lessThanEqual( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = +( v1[0] <= v2[0] )
        target[1] = +( v1[1] <= v2[1] )
        target[2] = +( v1[2] <= v2[2] )
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    equal( v ) {
        tc_vec3Like( v )
        this[0] = +( this[0] === v[0] )
        this[1] = +( this[1] === v[1] )
        this[2] = +( this[2] === v[2] )
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static equal( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = +( v1[0] === v2[0] )
        target[1] = +( v1[1] === v2[1] )
        target[2] = +( v1[2] === v2[2] )
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    notEqual( v ) {
        tc_vec3Like( v )
        this[0] = +( this[0] !== v[0] )
        this[1] = +( this[1] !== v[1] )
        this[2] = +( this[2] !== v[2] )
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static notEqual( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = +( v1[0] !== v2[0] )
        target[1] = +( v1[1] !== v2[1] )
        target[2] = +( v1[2] !== v2[2] )
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @returns {vec3} */
    not() {
        this[0] = +!this[0]
        this[1] = +!this[1]
        this[2] = +!this[2]
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static not( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = +!v[0]
        target[1] = +!v[1]
        target[2] = +!v[2]
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @returns {vec3} */
    isinf() {
        this[0] = +( this[0] === -Infinity || this[0] === Infinity )
        this[1] = +( this[1] === -Infinity || this[1] === Infinity )
        this[2] = +( this[2] === -Infinity || this[2] === Infinity )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static isinf( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = +( v[0] === -Infinity || v[0] === Infinity )
        target[1] = +( v[1] === -Infinity || v[1] === Infinity )
        target[2] = +( v[2] === -Infinity || v[2] === Infinity )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @returns {vec3} */
    isnan() {
        this[0] = +( this[0] !== this[0] )
        this[1] = +( this[1] !== this[1] )
        this[2] = +( this[2] !== this[2] )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static isnan( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = +( v[0] !== v[0] )
        target[1] = +( v[1] !== v[1] )
        target[2] = +( v[2] !== v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec3Like} x @returns {vec3} */
    add( x ) {
        tc_numbervec3Like( x )
        return typeof x === "number" ? this.sadd( x ) : this.vadd( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static add( v, x, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec3undefined( target )
        return typeof x === "number" ? vec3.sadd( v, x, target ) : vec3.vadd( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    sadd( s ) {
        tc_number( s )
        this[0] += s
        this[1] += s
        this[2] += s
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sadd( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        target[0] = v[0] + s
        target[1] = v[1] + s
        target[2] = v[2] + s
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vadd( v ) {
        tc_vec3Like( v )
        this[0] += v[0]
        this[1] += v[1]
        this[2] += v[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vadd( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] + v2[0]
        target[1] = v1[1] + v2[1]
        target[2] = v1[2] + v2[2]
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    sub( x ) {
        tc_numbervec3Like( x )
        return typeof x === "number" ? this.ssub( x ) : this.vsub( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sub( v, x, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec3undefined( target )
        return typeof x === "number" ? vec3.ssub( v, x, target ) : vec3.vsub( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    ssub( s ) {
        tc_number( s )
        this[0] -= s
        this[1] -= s
        this[2] -= s
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static ssub( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        target[0] = v[0] - s
        target[1] = v[1] - s
        target[2] = v[2] - s
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vsub( v ) {
        tc_vec3Like( v )
        this[0] -= v[0]
        this[1] -= v[1]
        this[2] -= v[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vsub( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] - v2[0]
        target[1] = v1[1] - v2[1]
        target[2] = v1[2] - v2[2]
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    mul( x ) {
        tc_numbervec3Like( x )
        return typeof x === "number" ? this.smul( x ) : this.vmul( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static mul( v, x, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec3undefined( target )
        return typeof x === "number" ? vec3.smul( v, x, target ) : vec3.vmul( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    smul( s ) {
        tc_number( s )
        this[0] *= s
        this[1] *= s
        this[2] *= s
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static smul( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        target[0] = v[0] * s
        target[1] = v[1] * s
        target[2] = v[2] * s
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vmul( v ) {
        tc_vec3Like( v )
        this[0] *= v[0]
        this[1] *= v[1]
        this[2] *= v[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vmul( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] * v2[0]
        target[1] = v1[1] * v2[1]
        target[2] = v1[2] * v2[2]
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    div( x ) {
        tc_numbervec3Like( x )
        return typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static div( v, x, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec3undefined( target )
        return typeof x === "number" ? vec3.sdiv( v, x, target ) : vec3.vdiv( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    sdiv( s ) {
        tc_number( s )
        this[0] /= s
        this[1] /= s
        this[2] /= s
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sdiv( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        target[0] = v[0] / s
        target[1] = v[1] / s
        target[2] = v[2] / s
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vdiv( v ) {
        tc_vec3Like( v )
        this[0] /= v[0]
        this[1] /= v[1]
        this[2] /= v[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vdiv( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] / v2[0]
        target[1] = v1[1] / v2[1]
        target[2] = v1[2] / v2[2]
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    rem( x ) {
        tc_numbervec3Like( x )
        return typeof x === "number" ? this.srem( x ) : this.vrem( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static rem( v, x, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec3undefined( target )
        return typeof x === "number" ? vec3.srem( v, x, target ) : vec3.vrem( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    srem( s ) {
        tc_number( s )
        this[0] %= s
        this[1] %= s
        this[2] %= s
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static srem( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        target[0] = v[0] % s
        target[1] = v[1] % s
        target[2] = v[2] % s
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vrem( v ) {
        tc_vec3Like( v )
        this[0] %= v[0]
        this[1] %= v[1]
        this[2] %= v[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vrem( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] % v2[0]
        target[1] = v1[1] % v2[1]
        target[2] = v1[2] % v2[2]
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    pow( x ) {
        tc_numbervec3Like( x )
        return typeof x === "number" ? this.spow( x ) : this.vpow( x )
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static pow( v, x, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec3undefined( target )
        return typeof x === "number" ? vec3.spow( v, x, target ) : vec3.vpow( v, x, target )
    }

    /** @param {number} s @returns {vec3} */
    spow( s ) {
        tc_number( s )
        this[0] **= s
        this[1] **= s
        this[2] **= s
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static spow( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        target[0] = v[0] ** s
        target[1] = v[1] ** s
        target[2] = v[2] ** s
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {vec3} */
    vpow( v ) {
        tc_vec3Like( v )
        this[0] **= v[0]
        this[1] **= v[1]
        this[2] **= v[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vpow( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] ** v2[0]
        target[1] = v1[1] ** v2[1]
        target[2] = v1[2] ** v2[2]
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number|vec3Like} m @param {number|vec3Like} a @returns {vec3} */
    fma( m, a ) {
        tc_numbervec3Like( m )
        tc_numbervec3Like( a )
        return typeof m === "number"
            ? ( typeof a === "number" ? this.sfma( m, a ) : this.svfma( m, a ) )
            : ( typeof a === "number" ? this.vsfma( m, a ) : this.vfma( m, a ) )
    }

    /** @param {vec3Like} v @param {number|vec3Like} m @param {number|vec3Like} a @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static fma( v, m, a, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( m )
        tc_numbervec3Like( a )
        tc_vec3undefined( target )
        return typeof m === "number"
            ? ( typeof a === "number" ? vec3.sfma( v, m, a, target ) : vec3.svfma( v, m, a, target ) )
            : ( typeof a === "number" ? vec3.vsfma( v, m, a, target ) : vec3.vfma( v, m, a, target ) )
    }

    /** @param {number} m @param {number} a @returns {vec3} */
    sfma( m, a ) {
        this[0] = this[0] * m + a
        this[1] = this[1] * m + a
        this[2] = this[2] * m + a
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} m @param {number} a @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sfma( v, m, a, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = v[0] * m + a
        target[1] = v[1] * m + a
        target[2] = v[2] * m + a
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number} m @param {vec3Like} a @returns {vec3} */
    svfma( m, a ) {
        tc_vec3Like( a )
        this[0] = this[0] * m + a[0]
        this[1] = this[1] * m + a[1]
        this[2] = this[2] * m + a[2]
        tc_vec3Like( a )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} m @param {vec3Like} a @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static svfma( v, m, a, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3Like( a )
        tc_vec3undefined( target )
        target[0] = v[0] * m + a[0]
        target[1] = v[1] * m + a[1]
        target[2] = v[2] * m + a[2]
        tc_vec3Like( v )
        tc_vec3Like( a )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} m @param {number} a @returns {vec3} */
    vsfma( m, a ) {
        tc_vec3Like( m )
        this[0] = this[0] * m[0] + a
        this[1] = this[1] * m[1] + a
        this[2] = this[2] * m[2] + a
        tc_vec3Like( m )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3Like} m @param {number} a @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vsfma( v, m, a, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3Like( m )
        tc_vec3undefined( target )
        target[0] = v[0] * m[0] + a
        target[1] = v[1] * m[1] + a
        target[2] = v[2] * m[2] + a
        tc_vec3Like( v )
        tc_vec3Like( m )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} m @param {vec3Like} a @returns {vec3} */
    vfma( m, a ) {
        tc_vec3Like( m )
        tc_vec3Like( a )
        this[0] = this[0] * m[0] + a[0]
        this[1] = this[1] * m[1] + a[1]
        this[2] = this[2] * m[2] + a[2]
        tc_vec3Like( m )
        tc_vec3Like( a )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3Like} m @param {vec3Like} a @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vfma( v, m, a, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3Like( m )
        tc_vec3Like( a )
        tc_vec3undefined( target )
        target[0] = v[0] * m[0] + a[0]
        target[1] = v[1] * m[1] + a[1]
        target[2] = v[2] * m[2] + a[2]
        tc_vec3Like( v )
        tc_vec3Like( m )
        tc_vec3Like( a )
        tc_vec3undefined( target )
        return target
    }

    /** @param {mat3Like} m @returns {vec3} */
    mmul( m ) {
        tc_mat3Like( m )
        const c0 = this[0]
        const c1 = this[1]
        const c2 = this[2]
        this[0] = c0 * m[0] + c1 * m[3] + c2 * m[6]
        this[1] = c0 * m[1] + c1 * m[4] + c2 * m[7]
        this[2] = c0 * m[2] + c1 * m[5] + c2 * m[8]
        tc_mat3Like( m )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {mat3Like} m @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static mmul( v, m, target = new vec3 ) {
        tc_vec3Like( v )
        tc_mat3Like( m )
        tc_vec3undefined( target )
        const c0 = v[0]
        const c1 = v[1]
        const c2 = v[2]
        target[0] = c0 * m[0] + c1 * m[3] + c2 * m[6]
        target[1] = c0 * m[1] + c1 * m[4] + c2 * m[7]
        target[2] = c0 * m[2] + c1 * m[5] + c2 * m[8]
        tc_vec3Like( v )
        tc_mat3Like( m )
        tc_vec3undefined( target )
        return target
    }

    /** @param {(value: number, index: number) => number} fn @returns {vec3} */
    apply( fn ) {
        this[0] = fn( this[0], 0 )
        this[1] = fn( this[1], 1 )
        this[2] = fn( this[2], 2 )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {(value: number, index: number) => number} fn @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static apply( v, fn, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = fn( v[0], 0 )
        target[1] = fn( v[1], 1 )
        target[2] = fn( v[2], 2 )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @returns {vec3} */
    abs() {
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        this[2] = Math.abs( this[2] )
        tc_vec3( this )
        return this
    }

    /** @returns {vec3} */
    sign() {
        this[0] = Math.sign( this[0] )
        this[1] = Math.sign( this[1] )
        this[2] = Math.sign( this[2] )
        tc_vec3( this )
        return this
    }

    /** @returns {vec3} */
    trunc() {
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        this[2] = Math.trunc( this[2] )
        tc_vec3( this )
        return this
    }

    /** @returns {vec3} */
    round() {
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        this[2] = Math.round( this[2] )
        tc_vec3( this )
        return this
    }

    /** @returns {vec3} */
    floor() {
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        this[2] = Math.floor( this[2] )
        tc_vec3( this )
        return this
    }

    /** @returns {vec3} */
    ceil() {
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        this[2] = Math.ceil( this[2] )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static abs( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.abs( v[0] )
        target[1] = Math.abs( v[1] )
        target[2] = Math.abs( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static acos( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.acos( v[0] )
        target[1] = Math.acos( v[1] )
        target[2] = Math.acos( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static acosh( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.acosh( v[0] )
        target[1] = Math.acosh( v[1] )
        target[2] = Math.acosh( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static asin( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.asin( v[0] )
        target[1] = Math.asin( v[1] )
        target[2] = Math.asin( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static asinh( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.asinh( v[0] )
        target[1] = Math.asinh( v[1] )
        target[2] = Math.asinh( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static atan( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.atan( v[0] )
        target[1] = Math.atan( v[1] )
        target[2] = Math.atan( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static atanh( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.atanh( v[0] )
        target[1] = Math.atanh( v[1] )
        target[2] = Math.atanh( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static ceil( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.ceil( v[0] )
        target[1] = Math.ceil( v[1] )
        target[2] = Math.ceil( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static cbrt( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.cbrt( v[0] )
        target[1] = Math.cbrt( v[1] )
        target[2] = Math.cbrt( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static expm1( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.expm1( v[0] )
        target[1] = Math.expm1( v[1] )
        target[2] = Math.expm1( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static cos( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.cos( v[0] )
        target[1] = Math.cos( v[1] )
        target[2] = Math.cos( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static cosh( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.cosh( v[0] )
        target[1] = Math.cosh( v[1] )
        target[2] = Math.cosh( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static exp( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.exp( v[0] )
        target[1] = Math.exp( v[1] )
        target[2] = Math.exp( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static floor( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.floor( v[0] )
        target[1] = Math.floor( v[1] )
        target[2] = Math.floor( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static log( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.log( v[0] )
        target[1] = Math.log( v[1] )
        target[2] = Math.log( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static log1p( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.log1p( v[0] )
        target[1] = Math.log1p( v[1] )
        target[2] = Math.log1p( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static log2( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.log2( v[0] )
        target[1] = Math.log2( v[1] )
        target[2] = Math.log2( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static log10( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.log10( v[0] )
        target[1] = Math.log10( v[1] )
        target[2] = Math.log10( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static round( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.round( v[0] )
        target[1] = Math.round( v[1] )
        target[2] = Math.round( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sign( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.sign( v[0] )
        target[1] = Math.sign( v[1] )
        target[2] = Math.sign( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sin( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.sin( v[0] )
        target[1] = Math.sin( v[1] )
        target[2] = Math.sin( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sinh( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.sinh( v[0] )
        target[1] = Math.sinh( v[1] )
        target[2] = Math.sinh( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sqrt( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.sqrt( v[0] )
        target[1] = Math.sqrt( v[1] )
        target[2] = Math.sqrt( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static tan( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.tan( v[0] )
        target[1] = Math.tan( v[1] )
        target[2] = Math.tan( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static tanh( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.tanh( v[0] )
        target[1] = Math.tanh( v[1] )
        target[2] = Math.tanh( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static trunc( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.trunc( v[0] )
        target[1] = Math.trunc( v[1] )
        target[2] = Math.trunc( v[2] )
        tc_vec3Like( v )
        tc_vec3undefined( target )
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
        tc_vec3Like( v )
        return Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
    }

    /** @returns {number} */
    lengthSq() {
        return this[0] * this[0] + this[1] * this[1] + this[2] * this[2]
    }

    /** @param {vec3Like} v @returns {number} */
    static lengthSq( v ) {
        tc_vec3Like( v )
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec3Like} v @returns {vec3} */
    pointTo( v ) {
        tc_vec3Like( v )
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        this[2] = v[2] - this[2]
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} from @param {vec3Like} to @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static pointTo( from, to, target = new vec3 ) {
        tc_vec3Like( from )
        tc_vec3Like( to )
        tc_vec3undefined( target )
        target[0] = to[0] - from[0]
        target[1] = to[1] - from[1]
        target[2] = to[2] - from[2]
        tc_vec3Like( from )
        tc_vec3Like( to )
        tc_vec3undefined( target )
        return target
    }

    /** @returns {vec3} */
    normalize() {
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static normalize( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {number} s @returns {vec3} */
    setLength( s ) {
        tc_number( s )
        const factor = s / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        tc_number( s )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v @param {number} s @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static setLength( v, s, target = new vec3 ) {
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        const factor = s / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        tc_vec3Like( v )
        tc_number( s )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @returns {number} */
    dot( v ) {
        tc_vec3Like( v )
        return this[0] * v[0] + this[1] * v[1] + this[2] * v[2]
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
    }

    /** @param {vec3Like} v @returns {vec3} */
    cross( v ) {
        tc_vec3Like( v )
        const t0 = this[1] * v[2] - this[2] * v[1]
        const t1 = this[2] * v[0] - this[0] * v[2]
        const t2 = this[0] * v[1] - this[1] * v[0]
        this[0] = t0
        this[1] = t1
        this[2] = t2
        tc_vec3Like( v )
        tc_vec3( this )
        return this
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static cross( v1, v2, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        const t0 = v1[1] * v2[2] - v1[2] * v2[1]
        const t1 = v1[2] * v2[0] - v1[0] * v2[2]
        const t2 = v1[0] * v2[1] - v1[1] * v2[0]
        target[0] = t0
        target[1] = t1
        target[2] = t2
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        return Math.sqrt( d0 * d0 + d1 * d1 + d2 * d2 )
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
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

    /** @param {vec3Like} v @param {number|vec3Like} min @param {number|vec3Like} max @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static clamp( v, min, max, target = new vec3 ) {
        tc_vec3Like( v )
        tc_numbervec3Like( min )
        tc_numbervec3Like( max )
        tc_vec3undefined( target )
        return typeof min === "number"
            ? ( typeof max === "number" ? vec3.sclamp( v, min, max, target ) : vec3.svclamp( v, min, max, target ) )
            : ( typeof max === "number" ? vec3.vsclamp( v, min, max, target ) : vec3.vclamp( v, min, max, target ) )
    }

    /** @param {vec3Like} v @param {number} min @param {number} max @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static sclamp( v, min, max, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.min( Math.max( v[0], min ), max  )
        target[1] = Math.min( Math.max( v[1], min ), max  )
        target[2] = Math.min( Math.max( v[2], min ), max  )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {number} min @param {vec3Like} max @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static svclamp( v, min, max, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3Like( max )
        tc_vec3undefined( target )
        target[0] = Math.min( Math.max( v[0], min ), max[0]  )
        target[1] = Math.min( Math.max( v[1], min ), max[1]  )
        target[2] = Math.min( Math.max( v[2], min ), max[2]  )
        tc_vec3Like( v )
        tc_vec3Like( max )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3Like} min @param {number} max @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vsclamp( v, min, max, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3Like( min )
        tc_vec3undefined( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max  )
        target[1] = Math.min( Math.max( v[1], min[1] ), max  )
        target[2] = Math.min( Math.max( v[2], min[2] ), max  )
        tc_vec3Like( v )
        tc_vec3Like( min )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3Like} min @param {vec3Like} max @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static vclamp( v, min, max, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3Like( min )
        tc_vec3Like( max )
        tc_vec3undefined( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max[0]  )
        target[1] = Math.min( Math.max( v[1], min[1] ), max[1]  )
        target[2] = Math.min( Math.max( v[2], min[2] ), max[2]  )
        tc_vec3Like( v )
        tc_vec3Like( min )
        tc_vec3Like( max )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static saturate( v, target = new vec3 ) {
        tc_vec3Like( v )
        tc_vec3undefined( target )
        target[0] = Math.min( Math.max( v[0], 0 ), 1 )
        target[1] = Math.min( Math.max( v[1], 0 ), 1 )
        target[2] = Math.min( Math.max( v[2], 0 ), 1 )
        tc_vec3Like( v )
        tc_vec3undefined( target )
        return target
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {number} t @param {vec3|undefined} [target=new vec3] @returns {vec3} */
    static mix( v1, v2, t, target = new vec3 ) {
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        target[0] = v1[0] * ( 1 - t ) + v2[0] * t
        target[1] = v1[1] * ( 1 - t ) + v2[1] * t
        target[2] = v1[2] * ( 1 - t ) + v2[2] * t
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec3undefined( target )
        return target
    }

}