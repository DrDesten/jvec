import { Flags } from './safe-vec.js'
import { vec2 as vec2unsafe, vec3 as vec3unsafe, vec4 as vec4unsafe } from './vec.js'
import { mat2 as mat2unsafe, mat3 as mat3unsafe, mat4 as mat4unsafe } from './mat.js'
const tc_number = function( x ) {
    const result = (typeof x === 'number') || (x === undefined)
    if ( !result ) throw new TypeError( `Expected Type 'number', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE = function( x ) {
    const result = [...x].every( isFinite )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec3 = function( x ) {
    if ( Flags.FINITE ) tc_FINITE( x )
    const result = x instanceof vec3 || x instanceof vec2unsafe
    if ( !result ) throw new TypeError( `Expected Type 'vec3', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_NAN = function( x ) {
    const result = !isNaN( x )
    if ( !result ) throw new Error( `Failed optional check 'NAN'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE0 = function( x ) {
    const result = isFinite( x )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_number0 = function( x ) {
    if ( Flags.NAN ) tc_NAN( x )
    if ( Flags.FINITE ) tc_FINITE0( x )
    const result = typeof x === 'number'
    if ( !result ) throw new TypeError( `Expected Type 'number', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE1 = function( x ) {
    const result = [0, 1].every( i => isFinite( x[i] ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec2Like = function( x ) {
    if ( Flags.FINITE ) tc_FINITE1( x )
    const result = [0, 1].every( i => typeof x[i] === 'number' )
    if ( !result ) throw new TypeError( `Expected Type 'vec2Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE2 = function( x ) {
    const result = [0, 1, 2].every( i => isFinite( x[i] ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec3Like = function( x ) {
    if ( Flags.FINITE ) tc_FINITE2( x )
    const result = [0, 1, 2].every( i => typeof x[i] === 'number' )
    if ( !result ) throw new TypeError( `Expected Type 'vec3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_numbervec3Like = function( x ) {
    const result = (typeof x === 'number') || ([0, 1, 2].every( i => typeof x[i] === 'number' ))
    if ( !result ) throw new TypeError( `Expected Type 'number|vec3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec32 = function( x ) {
    const result = (x instanceof vec3 || x instanceof vec2unsafe) || (x === undefined)
    if ( !result ) throw new TypeError( `Expected Type 'vec3', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE3 = function( x ) {
    const result = Array.from( { length: 3 ** 2 } ).every( ( _, i ) => isFinite( x[i] ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_mat3Like = function( x ) {
    if ( Flags.FINITE ) tc_FINITE3( x )
    const result = Array.from( { length: 3 ** 2 } ).every( ( _, i ) => typeof x[i] === 'number' )
    if ( !result ) throw new TypeError( `Expected Type 'mat3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE4 = function( x ) {
    const result = x.every( x => [0, 1, 2].every( i => isFinite( x[i] ) ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec3Like4 = function( x ) {
    if ( Flags.FINITE ) tc_FINITE4( x )
    const result = x.every( x => [0, 1, 2].every( i => typeof x[i] === 'number' ) )
    if ( !result ) throw new TypeError( `Expected Type 'vec3Like', got [${x?.constructor.name||typeof x}]: ${x}` )
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

export class vec3 extends Float64Array {

    static get NaN() { return new vec3( NaN, NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**  */
    constructor() {
        let tc_return
        super( 2 )
        return tc_return
    }

    /**
     * @param {number|vec3Like|{x: number, y: number, z: number}|{r: number, g: number, b: number}} [object=0]
     * @param {number} [y]
     * @param {number} [z]
     * @returns {vec3}
     */
    static new( object = 0, y, z ) {
        let tc_return
        tc_number( y )
        tc_number( z )
        const vec = new vec3
        if ( typeof object === "number" )
            y === undefined
                ? ( vec[0] = object, vec[1] = object, vec[2] = object )
                : ( vec[0] = object, vec[1] = +y, vec[2] = +( z ?? 0 ) )
        else
            vec[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            vec[1] = +( object[1] ?? object.y ?? object.g ?? 0 ),
            vec[2] = +( object[2] ?? object.z ?? object.b ?? 0 )
        tc_return = vec
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {ArrayLike<number>} array @param {number} [index=0] @param {number} [stride=1] @returns {vec3} */
    static fromArray( array, index = 0, stride = 1 ) {
        let tc_return
        tc_number( index )
        tc_number( stride )
        tc_return = vec3.new( array[0 * stride + index], array[1 * stride + index], array[2 * stride + index] )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {(index: number) => number} fn @returns {vec3} */
    static fromFunction( fn ) {
        let tc_return
        tc_return = vec3.new( fn( 0 ), fn( 1 ), fn( 2 ) )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    static random() {
        let tc_return
        tc_return = vec3.new( Math.random(), Math.random(), Math.random() )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    static randomNorm() {
        let tc_return
        tc_return = vec3.new( randomNorm(), randomNorm(), randomNorm() )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    static randomDir() {
        let tc_return
        tc_return = vec3.new( randomNorm(), randomNorm(), randomNorm() ).normalize()
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    static randomSphere() {
        let tc_return
        tc_return = vec3.new( randomNorm(), randomNorm(), randomNorm() ).setLength( Math.random() ** (1/3) )
        tc_vec3( tc_return )
        return tc_return
    }

    // ---------------------------
    //      FIELDS
    // ---------------------------

    /** @returns {number} */
    get x() { let tc_return; tc_return = this[0]; return tc_return }
    /** @param {number} s */
    set x( s ) { let tc_return; tc_number0( s ); this[0] = s; return tc_return }
    /** @returns {number} */
    get r() { let tc_return; tc_return = this[0]; return tc_return }
    /** @param {number} s */
    set r( s ) { let tc_return; tc_number0( s ); this[0] = s; return tc_return }
    /** @returns {number} */
    get y() { let tc_return; tc_return = this[1]; return tc_return }
    /** @param {number} s */
    set y( s ) { let tc_return; tc_number0( s ); this[1] = s; return tc_return }
    /** @returns {number} */
    get g() { let tc_return; tc_return = this[1]; return tc_return }
    /** @param {number} s */
    set g( s ) { let tc_return; tc_number0( s ); this[1] = s; return tc_return }
    /** @returns {number} */
    get z() { let tc_return; tc_return = this[2]; return tc_return }
    /** @param {number} s */
    set z( s ) { let tc_return; tc_number0( s ); this[2] = s; return tc_return }
    /** @returns {number} */
    get b() { let tc_return; tc_return = this[2]; return tc_return }
    /** @param {number} s */
    set b( s ) { let tc_return; tc_number0( s ); this[2] = s; return tc_return }
    /** @returns {vec2} */
    get xx() { let tc_return; tc_return = vec2.new( this[0], this[0] ); return tc_return }
    /** @returns {vec2} */
    get rr() { let tc_return; tc_return = vec2.new( this[0], this[0] ); return tc_return }
    /** @returns {vec2} */
    get xy() { let tc_return; tc_return = vec2.new( this[0], this[1] ); return tc_return }
    /** @returns {vec2} */
    get rg() { let tc_return; tc_return = vec2.new( this[0], this[1] ); return tc_return }
    /** @param {vec2Like} v */
    set xy( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[1] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set rg( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[1] = v[1]; return tc_return }
    /** @returns {vec2} */
    get xz() { let tc_return; tc_return = vec2.new( this[0], this[2] ); return tc_return }
    /** @returns {vec2} */
    get rb() { let tc_return; tc_return = vec2.new( this[0], this[2] ); return tc_return }
    /** @param {vec2Like} v */
    set xz( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[2] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set rb( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[2] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yx() { let tc_return; tc_return = vec2.new( this[1], this[0] ); return tc_return }
    /** @returns {vec2} */
    get gr() { let tc_return; tc_return = vec2.new( this[1], this[0] ); return tc_return }
    /** @param {vec2Like} v */
    set yx( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[0] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set gr( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[0] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yy() { let tc_return; tc_return = vec2.new( this[1], this[1] ); return tc_return }
    /** @returns {vec2} */
    get gg() { let tc_return; tc_return = vec2.new( this[1], this[1] ); return tc_return }
    /** @returns {vec2} */
    get yz() { let tc_return; tc_return = vec2.new( this[1], this[2] ); return tc_return }
    /** @returns {vec2} */
    get gb() { let tc_return; tc_return = vec2.new( this[1], this[2] ); return tc_return }
    /** @param {vec2Like} v */
    set yz( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[2] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set gb( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[2] = v[1]; return tc_return }
    /** @returns {vec2} */
    get zx() { let tc_return; tc_return = vec2.new( this[2], this[0] ); return tc_return }
    /** @returns {vec2} */
    get br() { let tc_return; tc_return = vec2.new( this[2], this[0] ); return tc_return }
    /** @param {vec2Like} v */
    set zx( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[0] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set br( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[0] = v[1]; return tc_return }
    /** @returns {vec2} */
    get zy() { let tc_return; tc_return = vec2.new( this[2], this[1] ); return tc_return }
    /** @returns {vec2} */
    get bg() { let tc_return; tc_return = vec2.new( this[2], this[1] ); return tc_return }
    /** @param {vec2Like} v */
    set zy( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[1] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set bg( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[1] = v[1]; return tc_return }
    /** @returns {vec2} */
    get zz() { let tc_return; tc_return = vec2.new( this[2], this[2] ); return tc_return }
    /** @returns {vec2} */
    get bb() { let tc_return; tc_return = vec2.new( this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get xxx() { let tc_return; tc_return = vec3.new( this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rrr() { let tc_return; tc_return = vec3.new( this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xxy() { let tc_return; tc_return = vec3.new( this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rrg() { let tc_return; tc_return = vec3.new( this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get xxz() { let tc_return; tc_return = vec3.new( this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rrb() { let tc_return; tc_return = vec3.new( this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get xyx() { let tc_return; tc_return = vec3.new( this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rgr() { let tc_return; tc_return = vec3.new( this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xyy() { let tc_return; tc_return = vec3.new( this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rgg() { let tc_return; tc_return = vec3.new( this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get xyz() { let tc_return; tc_return = vec3.new( this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rgb() { let tc_return; tc_return = vec3.new( this[0], this[1], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set xyz( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rgb( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xzx() { let tc_return; tc_return = vec3.new( this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rbr() { let tc_return; tc_return = vec3.new( this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xzy() { let tc_return; tc_return = vec3.new( this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rbg() { let tc_return; tc_return = vec3.new( this[0], this[2], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set xzy( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rbg( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xzz() { let tc_return; tc_return = vec3.new( this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rbb() { let tc_return; tc_return = vec3.new( this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get yxx() { let tc_return; tc_return = vec3.new( this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get grr() { let tc_return; tc_return = vec3.new( this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get yxy() { let tc_return; tc_return = vec3.new( this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get grg() { let tc_return; tc_return = vec3.new( this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yxz() { let tc_return; tc_return = vec3.new( this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get grb() { let tc_return; tc_return = vec3.new( this[1], this[0], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set yxz( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set grb( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get yyx() { let tc_return; tc_return = vec3.new( this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get ggr() { let tc_return; tc_return = vec3.new( this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get yyy() { let tc_return; tc_return = vec3.new( this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get ggg() { let tc_return; tc_return = vec3.new( this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yyz() { let tc_return; tc_return = vec3.new( this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get ggb() { let tc_return; tc_return = vec3.new( this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get yzx() { let tc_return; tc_return = vec3.new( this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get gbr() { let tc_return; tc_return = vec3.new( this[1], this[2], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set yzx( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set gbr( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get yzy() { let tc_return; tc_return = vec3.new( this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get gbg() { let tc_return; tc_return = vec3.new( this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yzz() { let tc_return; tc_return = vec3.new( this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get gbb() { let tc_return; tc_return = vec3.new( this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zxx() { let tc_return; tc_return = vec3.new( this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get brr() { let tc_return; tc_return = vec3.new( this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get zxy() { let tc_return; tc_return = vec3.new( this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get brg() { let tc_return; tc_return = vec3.new( this[2], this[0], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set zxy( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set brg( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zxz() { let tc_return; tc_return = vec3.new( this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get brb() { let tc_return; tc_return = vec3.new( this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zyx() { let tc_return; tc_return = vec3.new( this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get bgr() { let tc_return; tc_return = vec3.new( this[2], this[1], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set zyx( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set bgr( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zyy() { let tc_return; tc_return = vec3.new( this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get bgg() { let tc_return; tc_return = vec3.new( this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get zyz() { let tc_return; tc_return = vec3.new( this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get bgb() { let tc_return; tc_return = vec3.new( this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zzx() { let tc_return; tc_return = vec3.new( this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get bbr() { let tc_return; tc_return = vec3.new( this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get zzy() { let tc_return; tc_return = vec3.new( this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get bbg() { let tc_return; tc_return = vec3.new( this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get zzz() { let tc_return; tc_return = vec3.new( this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get bbb() { let tc_return; tc_return = vec3.new( this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xxxx() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rrrr() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xxxy() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rrrg() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xxxz() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rrrb() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xxyx() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rrgr() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xxyy() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rrgg() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xxyz() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rrgb() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xxzx() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rrbr() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xxzy() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rrbg() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xxzz() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rrbb() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xyxx() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rgrr() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xyxy() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rgrg() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xyxz() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rgrb() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xyyx() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rggr() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xyyy() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rggg() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xyyz() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rggb() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xyzx() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rgbr() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xyzy() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rgbg() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xyzz() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rgbb() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xzxx() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rbrr() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xzxy() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rbrg() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xzxz() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rbrb() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xzyx() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rbgr() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xzyy() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rbgg() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xzyz() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rbgb() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xzzx() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rbbr() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xzzy() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rbbg() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xzzz() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rbbb() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yxxx() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get grrr() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yxxy() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get grrg() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yxxz() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get grrb() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yxyx() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get grgr() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yxyy() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get grgg() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yxyz() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get grgb() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yxzx() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get grbr() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yxzy() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get grbg() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yxzz() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get grbb() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yyxx() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ggrr() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yyxy() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ggrg() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yyxz() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ggrb() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yyyx() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gggr() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yyyy() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gggg() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yyyz() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gggb() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yyzx() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ggbr() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yyzy() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ggbg() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yyzz() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ggbb() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yzxx() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gbrr() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yzxy() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gbrg() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yzxz() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gbrb() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yzyx() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gbgr() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yzyy() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gbgg() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yzyz() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gbgb() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yzzx() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gbbr() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yzzy() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gbbg() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yzzz() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gbbb() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zxxx() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get brrr() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zxxy() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get brrg() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zxxz() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get brrb() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zxyx() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get brgr() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zxyy() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get brgg() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zxyz() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get brgb() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zxzx() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get brbr() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zxzy() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get brbg() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zxzz() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get brbb() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zyxx() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bgrr() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zyxy() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bgrg() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zyxz() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bgrb() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zyyx() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bggr() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zyyy() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bggg() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zyyz() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bggb() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zyzx() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bgbr() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zyzy() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bgbg() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zyzz() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bgbb() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zzxx() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bbrr() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zzxy() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bbrg() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zzxz() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bbrb() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zzyx() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bbgr() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zzyy() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bbgg() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zzyz() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bbgb() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zzzx() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bbbr() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zzzy() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bbbg() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zzzz() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bbbb() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[2] ); return tc_return }

    /** @param {number|vec3Like} x @param {number} [y] @param {number} [z] @returns {vec3} */
    set( x, y, z ) {
        let tc_return
        tc_numbervec3Like( x )
        typeof x === "number"
            ? ( this[0] = x, this[1] = y, this[2] = z )
            : ( this[0] = x[0], this[1] = x[1], this[2] = x[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    clone() {
        let tc_return
        const target = new vec3
        target[0] = this[0]
        target[1] = this[1]
        target[2] = this[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static clone( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = v[0]
        target[1] = v[1]
        target[2] = v[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /**  */
    *[Symbol.iterator]() {
        let tc_return
        yield this[0]
        yield this[1]
        yield this[2]
        return tc_return
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    [Symbol.toStringTag]() { let tc_return; tc_return = "vec3"; return tc_return }
    /** @returns {string} */
    toString() { let tc_return; tc_return = `(${this[0]}, ${this[1]}, ${this[2]})`; return tc_return }
    /** @returns {number[]} */
    toArray() { let tc_return; tc_return = [this[0], this[1], this[2]]; return tc_return }
    /** @returns {Int8Array} */
    toInt8Array() { let tc_return; tc_return = new Int8Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Uint8Array} */
    toUint8Array() { let tc_return; tc_return = new Uint8Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { let tc_return; tc_return = new Uint8ClampedArray( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Int16Array} */
    toInt16Array() { let tc_return; tc_return = new Int16Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Uint16Array} */
    toUint16Array() { let tc_return; tc_return = new Uint16Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Int32Array} */
    toInt32Array() { let tc_return; tc_return = new Int32Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Uint32Array} */
    toUint32Array() { let tc_return; tc_return = new Uint32Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Float32Array} */
    toFloat32Array() { let tc_return; tc_return = new Float32Array( [this[0], this[1], this[2]] ); return tc_return }
    /** @returns {Float64Array} */
    toFloat64Array() { let tc_return; tc_return = new Float64Array( [this[0], this[1], this[2]] ); return tc_return }

    /** @param {{hex?: boolean}} [options={}] @returns {string} */
    toCSSColor( options = {} ) {
        let tc_return
        if ( options.hex ) {
            const r = Math.round( Math.min( Math.max( this[0] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const g = Math.round( Math.min( Math.max( this[1] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const b = Math.round( Math.min( Math.max( this[2] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            tc_return = `#${r}${g}${b}`
        } else {
            const r = Math.min( Math.max( this[0] * 100, 0 ), 100 )
            const g = Math.min( Math.max( this[1] * 100, 0 ), 100 )
            const b = Math.min( Math.max( this[2] * 100, 0 ), 100 )
            tc_return = `rgb(${r}%, ${g}%, ${b}%)`
        }
        return tc_return
    }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {vec3Like} v @returns {boolean} */
    eq( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = this[0] === v[0] && this[1] === v[1] && this[2] === v[2]
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static eq( v1, v2 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_return = v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2]
        return tc_return
    }

    /** @param {vec3Like} v @returns {boolean} */
    neq( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = this[0] !== v[0] || this[1] !== v[1] || this[2] !== v[2]
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {boolean} */
    static neq( v1, v2 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_return = v1[0] !== v2[0] || v1[1] !== v2[1] || v1[2] !== v2[2]
        return tc_return
    }

    /** @returns {boolean} */
    all() {
        let tc_return
        tc_return = !!this[0] && !!this[1] && !!this[2]
        return tc_return
    }

    /** @param {vec3Like} v @returns {boolean} */
    static all( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = !!v[0] && !!v[1] && !!v[2]
        return tc_return
    }

    /** @returns {boolean} */
    any() {
        let tc_return
        tc_return = !!this[0] || !!this[1] || !!this[2]
        return tc_return
    }

    /** @param {vec3Like} v @returns {boolean} */
    static any( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = !!v[0] || !!v[1] || !!v[2]
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    greaterThan( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = +( this[0] > v[0] )
        this[1] = +( this[1] > v[1] )
        this[2] = +( this[2] > v[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static greaterThan( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = +( v1[0] > v2[0] )
        target[1] = +( v1[1] > v2[1] )
        target[2] = +( v1[2] > v2[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    greaterThanEqual( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = +( this[0] >= v[0] )
        this[1] = +( this[1] >= v[1] )
        this[2] = +( this[2] >= v[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static greaterThanEqual( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = +( v1[0] >= v2[0] )
        target[1] = +( v1[1] >= v2[1] )
        target[2] = +( v1[2] >= v2[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    lessThan( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = +( this[0] < v[0] )
        this[1] = +( this[1] < v[1] )
        this[2] = +( this[2] < v[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static lessThan( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = +( v1[0] < v2[0] )
        target[1] = +( v1[1] < v2[1] )
        target[2] = +( v1[2] < v2[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    lessThanEqual( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = +( this[0] <= v[0] )
        this[1] = +( this[1] <= v[1] )
        this[2] = +( this[2] <= v[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static lessThanEqual( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = +( v1[0] <= v2[0] )
        target[1] = +( v1[1] <= v2[1] )
        target[2] = +( v1[2] <= v2[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    equal( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = +( this[0] === v[0] )
        this[1] = +( this[1] === v[1] )
        this[2] = +( this[2] === v[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static equal( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = +( v1[0] === v2[0] )
        target[1] = +( v1[1] === v2[1] )
        target[2] = +( v1[2] === v2[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    notEqual( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = +( this[0] !== v[0] )
        this[1] = +( this[1] !== v[1] )
        this[2] = +( this[2] !== v[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static notEqual( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = +( v1[0] !== v2[0] )
        target[1] = +( v1[1] !== v2[1] )
        target[2] = +( v1[2] !== v2[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    not() {
        let tc_return
        this[0] = +!this[0]
        this[1] = +!this[1]
        this[2] = +!this[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static not( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = +!v[0]
        target[1] = +!v[1]
        target[2] = +!v[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    isinf() {
        let tc_return
        this[0] = +( this[0] === -Infinity || this[0] === Infinity )
        this[1] = +( this[1] === -Infinity || this[1] === Infinity )
        this[2] = +( this[2] === -Infinity || this[2] === Infinity )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static isinf( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = +( v[0] === -Infinity || v[0] === Infinity )
        target[1] = +( v[1] === -Infinity || v[1] === Infinity )
        target[2] = +( v[2] === -Infinity || v[2] === Infinity )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    isnan() {
        let tc_return
        this[0] = +( this[0] !== this[0] )
        this[1] = +( this[1] !== this[1] )
        this[2] = +( this[2] !== this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static isnan( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = +( v[0] !== v[0] )
        target[1] = +( v[1] !== v[1] )
        target[2] = +( v[2] !== v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec3Like} x @returns {vec3} */
    add( x ) {
        let tc_return
        tc_numbervec3Like( x )
        tc_return = typeof x === "number" ? this.sadd( x ) : this.vadd( x )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static add( v, x, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec32( target )
        tc_return = typeof x === "number" ? vec3.sadd( v, x, target ) : vec3.vadd( v, x, target )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    sadd( s ) {
        let tc_return
        tc_number0( s )
        this[0] += s
        this[1] += s
        this[2] += s
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static sadd( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        target[0] = v[0] + s
        target[1] = v[1] + s
        target[2] = v[2] + s
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    vadd( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] += v[0]
        this[1] += v[1]
        this[2] += v[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vadd( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] + v2[0]
        target[1] = v1[1] + v2[1]
        target[2] = v1[2] + v2[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    sub( x ) {
        let tc_return
        tc_numbervec3Like( x )
        tc_return = typeof x === "number" ? this.ssub( x ) : this.vsub( x )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static sub( v, x, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec32( target )
        tc_return = typeof x === "number" ? vec3.ssub( v, x, target ) : vec3.vsub( v, x, target )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    ssub( s ) {
        let tc_return
        tc_number0( s )
        this[0] -= s
        this[1] -= s
        this[2] -= s
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static ssub( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        target[0] = v[0] - s
        target[1] = v[1] - s
        target[2] = v[2] - s
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    vsub( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] -= v[0]
        this[1] -= v[1]
        this[2] -= v[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vsub( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] - v2[0]
        target[1] = v1[1] - v2[1]
        target[2] = v1[2] - v2[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    mul( x ) {
        let tc_return
        tc_numbervec3Like( x )
        tc_return = typeof x === "number" ? this.smul( x ) : this.vmul( x )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static mul( v, x, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec32( target )
        tc_return = typeof x === "number" ? vec3.smul( v, x, target ) : vec3.vmul( v, x, target )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    smul( s ) {
        let tc_return
        tc_number0( s )
        this[0] *= s
        this[1] *= s
        this[2] *= s
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static smul( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        target[0] = v[0] * s
        target[1] = v[1] * s
        target[2] = v[2] * s
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    vmul( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] *= v[0]
        this[1] *= v[1]
        this[2] *= v[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vmul( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] * v2[0]
        target[1] = v1[1] * v2[1]
        target[2] = v1[2] * v2[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    div( x ) {
        let tc_return
        tc_numbervec3Like( x )
        tc_return = typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static div( v, x, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec32( target )
        tc_return = typeof x === "number" ? vec3.sdiv( v, x, target ) : vec3.vdiv( v, x, target )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    sdiv( s ) {
        let tc_return
        tc_number0( s )
        this[0] /= s
        this[1] /= s
        this[2] /= s
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static sdiv( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        target[0] = v[0] / s
        target[1] = v[1] / s
        target[2] = v[2] / s
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    vdiv( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] /= v[0]
        this[1] /= v[1]
        this[2] /= v[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vdiv( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] / v2[0]
        target[1] = v1[1] / v2[1]
        target[2] = v1[2] / v2[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    rem( x ) {
        let tc_return
        tc_numbervec3Like( x )
        tc_return = typeof x === "number" ? this.srem( x ) : this.vrem( x )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static rem( v, x, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec32( target )
        tc_return = typeof x === "number" ? vec3.srem( v, x, target ) : vec3.vrem( v, x, target )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    srem( s ) {
        let tc_return
        tc_number0( s )
        this[0] %= s
        this[1] %= s
        this[2] %= s
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static srem( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        target[0] = v[0] % s
        target[1] = v[1] % s
        target[2] = v[2] % s
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    vrem( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] %= v[0]
        this[1] %= v[1]
        this[2] %= v[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vrem( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] % v2[0]
        target[1] = v1[1] % v2[1]
        target[2] = v1[2] % v2[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number|vec3Like} x @returns {vec3} */
    pow( x ) {
        let tc_return
        tc_numbervec3Like( x )
        tc_return = typeof x === "number" ? this.spow( x ) : this.vpow( x )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} x @param {vec3} [target=new vec3] @returns {vec3} */
    static pow( v, x, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( x )
        tc_vec32( target )
        tc_return = typeof x === "number" ? vec3.spow( v, x, target ) : vec3.vpow( v, x, target )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    spow( s ) {
        let tc_return
        tc_number0( s )
        this[0] **= s
        this[1] **= s
        this[2] **= s
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static spow( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        target[0] = v[0] ** s
        target[1] = v[1] ** s
        target[2] = v[2] ** s
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    vpow( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] **= v[0]
        this[1] **= v[1]
        this[2] **= v[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static vpow( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] ** v2[0]
        target[1] = v1[1] ** v2[1]
        target[2] = v1[2] ** v2[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number|vec3Like} m @param {number|vec3Like} a @returns {vec3} */
    fma( m, a ) {
        let tc_return
        tc_numbervec3Like( m )
        tc_numbervec3Like( a )
        tc_return = typeof m === "number"
            ? ( typeof a === "number" ? this.sfma( m, a ) : this.svfma( m, a ) )
            : ( typeof a === "number" ? this.vsfma( m, a ) : this.vfma( m, a ) )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} m @param {number|vec3Like} a @param {vec3} [target=new vec3] @returns {vec3} */
    static fma( v, m, a, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( m )
        tc_numbervec3Like( a )
        tc_vec32( target )
        tc_return = typeof m === "number"
            ? ( typeof a === "number" ? vec3.sfma( v, m, a, target ) : vec3.svfma( v, m, a, target ) )
            : ( typeof a === "number" ? vec3.vsfma( v, m, a, target ) : vec3.vfma( v, m, a, target ) )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} m @param {number} a @returns {vec3} */
    sfma( m, a ) {
        let tc_return
        this[0] = this[0] * m + a
        this[1] = this[1] * m + a
        this[2] = this[2] * m + a
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} m @param {number} a @param {vec3} [target=new vec3] @returns {vec3} */
    static sfma( v, m, a, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = v[0] * m + a
        target[1] = v[1] * m + a
        target[2] = v[2] * m + a
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} m @param {vec3Like} a @returns {vec3} */
    svfma( m, a ) {
        let tc_return
        tc_vec3Like( a )
        this[0] = this[0] * m + a[0]
        this[1] = this[1] * m + a[1]
        this[2] = this[2] * m + a[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} m @param {vec3Like} a @param {vec3} [target=new vec3] @returns {vec3} */
    static svfma( v, m, a, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec3Like( a )
        tc_vec32( target )
        target[0] = v[0] * m + a[0]
        target[1] = v[1] * m + a[1]
        target[2] = v[2] * m + a[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} m @param {number} a @returns {vec3} */
    vsfma( m, a ) {
        let tc_return
        tc_vec3Like( m )
        this[0] = this[0] * m[0] + a
        this[1] = this[1] * m[1] + a
        this[2] = this[2] * m[2] + a
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3Like} m @param {number} a @param {vec3} [target=new vec3] @returns {vec3} */
    static vsfma( v, m, a, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec3Like( m )
        tc_vec32( target )
        target[0] = v[0] * m[0] + a
        target[1] = v[1] * m[1] + a
        target[2] = v[2] * m[2] + a
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} m @param {vec3Like} a @returns {vec3} */
    vfma( m, a ) {
        let tc_return
        tc_vec3Like( m )
        tc_vec3Like( a )
        this[0] = this[0] * m[0] + a[0]
        this[1] = this[1] * m[1] + a[1]
        this[2] = this[2] * m[2] + a[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3Like} m @param {vec3Like} a @param {vec3} [target=new vec3] @returns {vec3} */
    static vfma( v, m, a, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec3Like( m )
        tc_vec3Like( a )
        tc_vec32( target )
        target[0] = v[0] * m[0] + a[0]
        target[1] = v[1] * m[1] + a[1]
        target[2] = v[2] * m[2] + a[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {mat3Like} m @returns {vec3} */
    mmul( m ) {
        let tc_return
        tc_mat3Like( m )
        const c0 = this[0]
        const c1 = this[1]
        const c2 = this[2]
        this[0] = c0 * m[0] + c1 * m[3] + c2 * m[6]
        this[1] = c0 * m[1] + c1 * m[4] + c2 * m[7]
        this[2] = c0 * m[2] + c1 * m[5] + c2 * m[8]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {mat3Like} m @param {vec3} [target=new vec3] @returns {vec3} */
    static mmul( v, m, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_mat3Like( m )
        tc_vec32( target )
        const c0 = v[0]
        const c1 = v[1]
        const c2 = v[2]
        target[0] = c0 * m[0] + c1 * m[3] + c2 * m[6]
        target[1] = c0 * m[1] + c1 * m[4] + c2 * m[7]
        target[2] = c0 * m[2] + c1 * m[5] + c2 * m[8]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {(value: number, index: number) => number} fn @returns {vec3} */
    apply( fn ) {
        let tc_return
        this[0] = fn( this[0], 0 )
        this[1] = fn( this[1], 1 )
        this[2] = fn( this[2], 2 )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {(value: number, index: number) => number} fn @param {vec3} [target=new vec3] @returns {vec3} */
    static apply( v, fn, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = fn( v[0], 0 )
        target[1] = fn( v[1], 1 )
        target[2] = fn( v[2], 2 )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    abs() {
        let tc_return
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        this[2] = Math.abs( this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    sign() {
        let tc_return
        this[0] = Math.sign( this[0] )
        this[1] = Math.sign( this[1] )
        this[2] = Math.sign( this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    trunc() {
        let tc_return
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        this[2] = Math.trunc( this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    round() {
        let tc_return
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        this[2] = Math.round( this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    floor() {
        let tc_return
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        this[2] = Math.floor( this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    ceil() {
        let tc_return
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        this[2] = Math.ceil( this[2] )
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static abs( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.abs( v[0] )
        target[1] = Math.abs( v[1] )
        target[2] = Math.abs( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static acos( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.acos( v[0] )
        target[1] = Math.acos( v[1] )
        target[2] = Math.acos( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static acosh( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.acosh( v[0] )
        target[1] = Math.acosh( v[1] )
        target[2] = Math.acosh( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static asin( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.asin( v[0] )
        target[1] = Math.asin( v[1] )
        target[2] = Math.asin( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static asinh( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.asinh( v[0] )
        target[1] = Math.asinh( v[1] )
        target[2] = Math.asinh( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static atan( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.atan( v[0] )
        target[1] = Math.atan( v[1] )
        target[2] = Math.atan( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static atanh( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.atanh( v[0] )
        target[1] = Math.atanh( v[1] )
        target[2] = Math.atanh( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static ceil( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.ceil( v[0] )
        target[1] = Math.ceil( v[1] )
        target[2] = Math.ceil( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static cbrt( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.cbrt( v[0] )
        target[1] = Math.cbrt( v[1] )
        target[2] = Math.cbrt( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static expm1( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.expm1( v[0] )
        target[1] = Math.expm1( v[1] )
        target[2] = Math.expm1( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static cos( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.cos( v[0] )
        target[1] = Math.cos( v[1] )
        target[2] = Math.cos( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static cosh( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.cosh( v[0] )
        target[1] = Math.cosh( v[1] )
        target[2] = Math.cosh( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static exp( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.exp( v[0] )
        target[1] = Math.exp( v[1] )
        target[2] = Math.exp( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static floor( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.floor( v[0] )
        target[1] = Math.floor( v[1] )
        target[2] = Math.floor( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.log( v[0] )
        target[1] = Math.log( v[1] )
        target[2] = Math.log( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log1p( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.log1p( v[0] )
        target[1] = Math.log1p( v[1] )
        target[2] = Math.log1p( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log2( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.log2( v[0] )
        target[1] = Math.log2( v[1] )
        target[2] = Math.log2( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static log10( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.log10( v[0] )
        target[1] = Math.log10( v[1] )
        target[2] = Math.log10( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static round( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.round( v[0] )
        target[1] = Math.round( v[1] )
        target[2] = Math.round( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sign( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.sign( v[0] )
        target[1] = Math.sign( v[1] )
        target[2] = Math.sign( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sin( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.sin( v[0] )
        target[1] = Math.sin( v[1] )
        target[2] = Math.sin( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sinh( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.sinh( v[0] )
        target[1] = Math.sinh( v[1] )
        target[2] = Math.sinh( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static sqrt( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.sqrt( v[0] )
        target[1] = Math.sqrt( v[1] )
        target[2] = Math.sqrt( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static tan( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.tan( v[0] )
        target[1] = Math.tan( v[1] )
        target[2] = Math.tan( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static tanh( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.tanh( v[0] )
        target[1] = Math.tanh( v[1] )
        target[2] = Math.tanh( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static trunc( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.trunc( v[0] )
        target[1] = Math.trunc( v[1] )
        target[2] = Math.trunc( v[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    // ---------------------------
    //      PROPERTIES
    // ---------------------------

    /** @returns {number} */
    length() {
        let tc_return
        tc_return = Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        return tc_return
    }

    /** @param {vec3Like} v @returns {number} */
    static length( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        return tc_return
    }

    /** @returns {number} */
    lengthSq() {
        let tc_return
        tc_return = this[0] * this[0] + this[1] * this[1] + this[2] * this[2]
        return tc_return
    }

    /** @param {vec3Like} v @returns {number} */
    static lengthSq( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
        return tc_return
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec3Like} v @returns {vec3} */
    pointTo( v ) {
        let tc_return
        tc_vec3Like( v )
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        this[2] = v[2] - this[2]
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} from @param {vec3Like} to @param {vec3} [target=new vec3] @returns {vec3} */
    static pointTo( from, to, target = new vec3 ) {
        let tc_return
        tc_vec3Like( from )
        tc_vec3Like( to )
        tc_vec32( target )
        target[0] = to[0] - from[0]
        target[1] = to[1] - from[1]
        target[2] = to[2] - from[2]
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @returns {vec3} */
    normalize() {
        let tc_return
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static normalize( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec3} */
    setLength( s ) {
        let tc_return
        tc_number0( s )
        const factor = s / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} s @param {vec3} [target=new vec3] @returns {vec3} */
    static setLength( v, s, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( s )
        tc_vec32( target )
        const factor = s / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @returns {number} */
    dot( v ) {
        let tc_return
        tc_vec3Like( v )
        tc_return = this[0] * v[0] + this[1] * v[1] + this[2] * v[2]
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_return = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
        return tc_return
    }

    /** @param {vec3Like} v @returns {vec3} */
    cross( v ) {
        let tc_return
        tc_vec3Like( v )
        const t0 = this[1] * v[2] - this[2] * v[1]
        const t1 = this[2] * v[0] - this[0] * v[2]
        const t2 = this[0] * v[1] - this[1] * v[0]
        this[0] = t0
        this[1] = t1
        this[2] = t2
        tc_return = this
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {vec3} [target=new vec3] @returns {vec3} */
    static cross( v1, v2, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        const t0 = v1[1] * v2[2] - v1[2] * v2[1]
        const t1 = v1[2] * v2[0] - v1[0] * v2[2]
        const t2 = v1[0] * v2[1] - v1[1] * v2[0]
        target[0] = t0
        target[1] = t1
        target[2] = t2
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec3Like} v */
    static noop( ...v ) {
        let tc_return
        tc_vec3Like4( v )
        return
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        tc_return = Math.sqrt( d0 * d0 + d1 * d1 + d2 * d2 )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        tc_return = d0 * d0 + d1 * d1 + d2 * d2
        return tc_return
    }

    /** @param {...(number|vec3Like)} values @returns {vec3} */
    static min( ...values ) {
        let tc_return
        const target = new vec3
        target[0] = Math.min( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.min( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.min( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {...(number|vec3Like)} values @returns {vec3} */
    static max( ...values ) {
        let tc_return
        const target = new vec3
        target[0] = Math.max( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.max( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.max( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number|vec3Like} min @param {number|vec3Like} max @param {vec3} [target=new vec3] @returns {vec3} */
    static clamp( v, min, max, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_numbervec3Like( min )
        tc_numbervec3Like( max )
        tc_vec32( target )
        tc_return = typeof min === "number"
            ? ( typeof max === "number" ? vec3.sclamp( v, min, max, target ) : vec3.svclamp( v, min, max, target ) )
            : ( typeof max === "number" ? vec3.vsclamp( v, min, max, target ) : vec3.vclamp( v, min, max, target ) )
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} min @param {number} max @param {vec3} [target=new vec3] @returns {vec3} */
    static sclamp( v, min, max, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( min )
        tc_number0( max )
        tc_vec32( target )
        target[0] = Math.min( Math.max( v[0], min ), max )
        target[1] = Math.min( Math.max( v[1], min ), max )
        target[2] = Math.min( Math.max( v[2], min ), max )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {number} min @param {vec3Like} max @param {vec3} [target=new vec3] @returns {vec3} */
    static svclamp( v, min, max, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_number0( min )
        tc_vec3Like( max )
        tc_vec32( target )
        target[0] = Math.min( Math.max( v[0], min ), max[0] )
        target[1] = Math.min( Math.max( v[1], min ), max[1] )
        target[2] = Math.min( Math.max( v[2], min ), max[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3Like} min @param {number} max @param {vec3} [target=new vec3] @returns {vec3} */
    static vsclamp( v, min, max, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec3Like( min )
        tc_number0( max )
        tc_vec32( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max )
        target[1] = Math.min( Math.max( v[1], min[1] ), max )
        target[2] = Math.min( Math.max( v[2], min[2] ), max )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3Like} min @param {vec3Like} max @param {vec3} [target=new vec3] @returns {vec3} */
    static vclamp( v, min, max, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec3Like( min )
        tc_vec3Like( max )
        tc_vec32( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max[0] )
        target[1] = Math.min( Math.max( v[1], min[1] ), max[1] )
        target[2] = Math.min( Math.max( v[2], min[2] ), max[2] )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v @param {vec3} [target=new vec3] @returns {vec3} */
    static saturate( v, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v )
        tc_vec32( target )
        target[0] = Math.min( Math.max( v[0], 0 ), 1 )
        target[1] = Math.min( Math.max( v[1], 0 ), 1 )
        target[2] = Math.min( Math.max( v[2], 0 ), 1 )
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

    /** @param {vec3Like} v1 @param {vec3Like} v2 @param {number} t @param {vec3} [target=new vec3] @returns {vec3} */
    static mix( v1, v2, t, target = new vec3 ) {
        let tc_return
        tc_vec3Like( v1 )
        tc_vec3Like( v2 )
        tc_vec32( target )
        target[0] = v1[0] * ( 1 - t ) + v2[0] * t
        target[1] = v1[1] * ( 1 - t ) + v2[1] * t
        target[2] = v1[2] * ( 1 - t ) + v2[2] * t
        tc_return = target
        tc_vec3( tc_return )
        return tc_return
    }

}