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
const tc_vec4 = function( x ) {
    if ( Flags.FINITE ) tc_FINITE( x )
    const result = x instanceof vec4 || x instanceof vec2unsafe
    if ( !result ) throw new TypeError( `Expected Type 'vec4', got [${x?.constructor.name||typeof x}]: ${x}` )
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
const tc_FINITE3 = function( x ) {
    const result = [0, 1, 2, 3].every( i => isFinite( x[i] ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec4Like = function( x ) {
    if ( Flags.FINITE ) tc_FINITE3( x )
    const result = [0, 1, 2, 3].every( i => typeof x[i] === 'number' )
    if ( !result ) throw new TypeError( `Expected Type 'vec4Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_numbervec4Like = function( x ) {
    const result = (typeof x === 'number') || ([0, 1, 2, 3].every( i => typeof x[i] === 'number' ))
    if ( !result ) throw new TypeError( `Expected Type 'number|vec4Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec43 = function( x ) {
    const result = (x instanceof vec4 || x instanceof vec2unsafe) || (x === undefined)
    if ( !result ) throw new TypeError( `Expected Type 'vec4', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE4 = function( x ) {
    const result = Array.from( { length: 4 ** 2 } ).every( ( _, i ) => isFinite( x[i] ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_mat4Like = function( x ) {
    if ( Flags.FINITE ) tc_FINITE4( x )
    const result = Array.from( { length: 4 ** 2 } ).every( ( _, i ) => typeof x[i] === 'number' )
    if ( !result ) throw new TypeError( `Expected Type 'mat4Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE5 = function( x ) {
    const result = x.every( x => [0, 1, 2, 3].every( i => isFinite( x[i] ) ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec4Like5 = function( x ) {
    if ( Flags.FINITE ) tc_FINITE5( x )
    const result = x.every( x => [0, 1, 2, 3].every( i => typeof x[i] === 'number' ) )
    if ( !result ) throw new TypeError( `Expected Type 'vec4Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}

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

export class vec4 extends Float64Array {

    static get NaN() { return new vec4( NaN, NaN, NaN, NaN ) }

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
     * @param {number|vec4Like|{x: number, y: number, z: number, w: number}|{r: number, g: number, b: number, a: number}} [object=0]
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     * @returns {vec4}
     */
    static new( object = 0, y, z, w ) {
        let tc_return
        tc_number( y )
        tc_number( z )
        tc_number( w )
        const vec = new vec4
        if ( typeof object === "number" )
            y === undefined
                ? ( vec[0] = object, vec[1] = object, vec[2] = object, vec[3] = object )
                : ( vec[0] = object, vec[1] = +y, vec[2] = +( z ?? 0 ), vec[3] = +( w ?? 0 ) )
        else
            vec[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            vec[1] = +( object[1] ?? object.y ?? object.g ?? 0 ),
            vec[2] = +( object[2] ?? object.z ?? object.b ?? 0 ),
            vec[3] = +( object[3] ?? object.w ?? object.a ?? 0 )
        tc_return = vec
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {ArrayLike<number>} array @param {number} [index=0] @param {number} [stride=1] @returns {vec4} */
    static fromArray( array, index = 0, stride = 1 ) {
        let tc_return
        tc_number( index )
        tc_number( stride )
        tc_return = vec4.new( array[0 * stride + index], array[1 * stride + index], array[2 * stride + index], array[3 * stride + index] )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {(index: number) => number} fn @returns {vec4} */
    static fromFunction( fn ) {
        let tc_return
        tc_return = vec4.new( fn( 0 ), fn( 1 ), fn( 2 ), fn( 3 ) )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    static random() {
        let tc_return
        tc_return = vec4.new( Math.random(), Math.random(), Math.random(), Math.random() )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    static randomNorm() {
        let tc_return
        tc_return = vec4.new( randomNorm(), randomNorm(), randomNorm(), randomNorm() )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    static randomDir() {
        let tc_return
        tc_return = vec4.new( randomNorm(), randomNorm(), randomNorm(), randomNorm() ).normalize()
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    static randomSphere() {
        let tc_return
        tc_return = vec4.new( randomNorm(), randomNorm(), randomNorm(), randomNorm() ).setLength( Math.random() ** (1/4) )
        tc_vec4( tc_return )
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
    /** @returns {number} */
    get w() { let tc_return; tc_return = this[3]; return tc_return }
    /** @param {number} s */
    set w( s ) { let tc_return; tc_number0( s ); this[3] = s; return tc_return }
    /** @returns {number} */
    get a() { let tc_return; tc_return = this[3]; return tc_return }
    /** @param {number} s */
    set a( s ) { let tc_return; tc_number0( s ); this[3] = s; return tc_return }
    /** @returns {vec2} */
    get xx() { let tc_return; tc_return = vec4.new( this[0], this[0] ); return tc_return }
    /** @returns {vec2} */
    get rr() { let tc_return; tc_return = vec4.new( this[0], this[0] ); return tc_return }
    /** @returns {vec2} */
    get xy() { let tc_return; tc_return = vec4.new( this[0], this[1] ); return tc_return }
    /** @returns {vec2} */
    get rg() { let tc_return; tc_return = vec4.new( this[0], this[1] ); return tc_return }
    /** @param {vec2Like} v */
    set xy( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[1] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set rg( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[1] = v[1]; return tc_return }
    /** @returns {vec2} */
    get xz() { let tc_return; tc_return = vec4.new( this[0], this[2] ); return tc_return }
    /** @returns {vec2} */
    get rb() { let tc_return; tc_return = vec4.new( this[0], this[2] ); return tc_return }
    /** @param {vec2Like} v */
    set xz( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[2] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set rb( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[2] = v[1]; return tc_return }
    /** @returns {vec2} */
    get xw() { let tc_return; tc_return = vec4.new( this[0], this[3] ); return tc_return }
    /** @returns {vec2} */
    get ra() { let tc_return; tc_return = vec4.new( this[0], this[3] ); return tc_return }
    /** @param {vec2Like} v */
    set xw( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[3] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set ra( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[3] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yx() { let tc_return; tc_return = vec4.new( this[1], this[0] ); return tc_return }
    /** @returns {vec2} */
    get gr() { let tc_return; tc_return = vec4.new( this[1], this[0] ); return tc_return }
    /** @param {vec2Like} v */
    set yx( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[0] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set gr( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[0] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yy() { let tc_return; tc_return = vec4.new( this[1], this[1] ); return tc_return }
    /** @returns {vec2} */
    get gg() { let tc_return; tc_return = vec4.new( this[1], this[1] ); return tc_return }
    /** @returns {vec2} */
    get yz() { let tc_return; tc_return = vec4.new( this[1], this[2] ); return tc_return }
    /** @returns {vec2} */
    get gb() { let tc_return; tc_return = vec4.new( this[1], this[2] ); return tc_return }
    /** @param {vec2Like} v */
    set yz( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[2] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set gb( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[2] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yw() { let tc_return; tc_return = vec4.new( this[1], this[3] ); return tc_return }
    /** @returns {vec2} */
    get ga() { let tc_return; tc_return = vec4.new( this[1], this[3] ); return tc_return }
    /** @param {vec2Like} v */
    set yw( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[3] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set ga( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[3] = v[1]; return tc_return }
    /** @returns {vec2} */
    get zx() { let tc_return; tc_return = vec4.new( this[2], this[0] ); return tc_return }
    /** @returns {vec2} */
    get br() { let tc_return; tc_return = vec4.new( this[2], this[0] ); return tc_return }
    /** @param {vec2Like} v */
    set zx( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[0] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set br( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[0] = v[1]; return tc_return }
    /** @returns {vec2} */
    get zy() { let tc_return; tc_return = vec4.new( this[2], this[1] ); return tc_return }
    /** @returns {vec2} */
    get bg() { let tc_return; tc_return = vec4.new( this[2], this[1] ); return tc_return }
    /** @param {vec2Like} v */
    set zy( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[1] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set bg( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[1] = v[1]; return tc_return }
    /** @returns {vec2} */
    get zz() { let tc_return; tc_return = vec4.new( this[2], this[2] ); return tc_return }
    /** @returns {vec2} */
    get bb() { let tc_return; tc_return = vec4.new( this[2], this[2] ); return tc_return }
    /** @returns {vec2} */
    get zw() { let tc_return; tc_return = vec4.new( this[2], this[3] ); return tc_return }
    /** @returns {vec2} */
    get ba() { let tc_return; tc_return = vec4.new( this[2], this[3] ); return tc_return }
    /** @param {vec2Like} v */
    set zw( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[3] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set ba( v ) { let tc_return; tc_vec2Like( v ); this[2] = v[0], this[3] = v[1]; return tc_return }
    /** @returns {vec2} */
    get wx() { let tc_return; tc_return = vec4.new( this[3], this[0] ); return tc_return }
    /** @returns {vec2} */
    get ar() { let tc_return; tc_return = vec4.new( this[3], this[0] ); return tc_return }
    /** @param {vec2Like} v */
    set wx( v ) { let tc_return; tc_vec2Like( v ); this[3] = v[0], this[0] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set ar( v ) { let tc_return; tc_vec2Like( v ); this[3] = v[0], this[0] = v[1]; return tc_return }
    /** @returns {vec2} */
    get wy() { let tc_return; tc_return = vec4.new( this[3], this[1] ); return tc_return }
    /** @returns {vec2} */
    get ag() { let tc_return; tc_return = vec4.new( this[3], this[1] ); return tc_return }
    /** @param {vec2Like} v */
    set wy( v ) { let tc_return; tc_vec2Like( v ); this[3] = v[0], this[1] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set ag( v ) { let tc_return; tc_vec2Like( v ); this[3] = v[0], this[1] = v[1]; return tc_return }
    /** @returns {vec2} */
    get wz() { let tc_return; tc_return = vec4.new( this[3], this[2] ); return tc_return }
    /** @returns {vec2} */
    get ab() { let tc_return; tc_return = vec4.new( this[3], this[2] ); return tc_return }
    /** @param {vec2Like} v */
    set wz( v ) { let tc_return; tc_vec2Like( v ); this[3] = v[0], this[2] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set ab( v ) { let tc_return; tc_vec2Like( v ); this[3] = v[0], this[2] = v[1]; return tc_return }
    /** @returns {vec2} */
    get ww() { let tc_return; tc_return = vec4.new( this[3], this[3] ); return tc_return }
    /** @returns {vec2} */
    get aa() { let tc_return; tc_return = vec4.new( this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get xxx() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rrr() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xxy() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rrg() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get xxz() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rrb() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get xxw() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec3} */
    get rra() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec3} */
    get xyx() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rgr() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xyy() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rgg() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get xyz() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rgb() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set xyz( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rgb( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xyw() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3] ); return tc_return }
    /** @returns {vec3} */
    get rga() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3] ); return tc_return }
    /** @param {vec3Like} v */
    set xyw( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[3] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rga( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[1] = v[1], this[3] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xzx() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rbr() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xzy() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rbg() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set xzy( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rbg( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xzz() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rbb() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get xzw() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec3} */
    get rba() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3] ); return tc_return }
    /** @param {vec3Like} v */
    set xzw( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[3] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rba( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[2] = v[1], this[3] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xwx() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rar() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xwy() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rag() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set xwy( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[3] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rag( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[3] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xwz() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec3} */
    get rab() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set xwz( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[3] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set rab( v ) { let tc_return; tc_vec3Like( v ); this[0] = v[0], this[3] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get xww() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get raa() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get yxx() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get grr() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get yxy() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get grg() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yxz() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get grb() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set yxz( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set grb( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get yxw() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3] ); return tc_return }
    /** @returns {vec3} */
    get gra() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3] ); return tc_return }
    /** @param {vec3Like} v */
    set yxw( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[3] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set gra( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[0] = v[1], this[3] = v[2]; return tc_return }
    /** @returns {vec3} */
    get yyx() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get ggr() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get yyy() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get ggg() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yyz() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get ggb() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get yyw() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec3} */
    get gga() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec3} */
    get yzx() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get gbr() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set yzx( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set gbr( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get yzy() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get gbg() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yzz() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get gbb() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get yzw() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec3} */
    get gba() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3] ); return tc_return }
    /** @param {vec3Like} v */
    set yzw( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[3] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set gba( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[2] = v[1], this[3] = v[2]; return tc_return }
    /** @returns {vec3} */
    get ywx() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec3} */
    get gar() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set ywx( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[3] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set gar( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[3] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get ywy() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec3} */
    get gag() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec3} */
    get ywz() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec3} */
    get gab() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set ywz( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[3] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set gab( v ) { let tc_return; tc_vec3Like( v ); this[1] = v[0], this[3] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get yww() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get gaa() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get zxx() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get brr() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get zxy() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get brg() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set zxy( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set brg( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zxz() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get brb() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zxw() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3] ); return tc_return }
    /** @returns {vec3} */
    get bra() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3] ); return tc_return }
    /** @param {vec3Like} v */
    set zxw( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[3] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set bra( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[0] = v[1], this[3] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zyx() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get bgr() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set zyx( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set bgr( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zyy() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get bgg() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get zyz() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get bgb() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zyw() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3] ); return tc_return }
    /** @returns {vec3} */
    get bga() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3] ); return tc_return }
    /** @param {vec3Like} v */
    set zyw( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[3] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set bga( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[1] = v[1], this[3] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zzx() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get bbr() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get zzy() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get bbg() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get zzz() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get bbb() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zzw() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec3} */
    get bba() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec3} */
    get zwx() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec3} */
    get bar() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set zwx( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[3] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set bar( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[3] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zwy() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec3} */
    get bag() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set zwy( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[3] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set bag( v ) { let tc_return; tc_vec3Like( v ); this[2] = v[0], this[3] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get zwz() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec3} */
    get bab() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec3} */
    get zww() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get baa() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get wxx() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get arr() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get wxy() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get arg() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set wxy( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[0] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set arg( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[0] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get wxz() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec3} */
    get arb() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set wxz( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[0] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set arb( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[0] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get wxw() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec3} */
    get ara() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec3} */
    get wyx() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get agr() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set wyx( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[1] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set agr( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[1] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get wyy() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get agg() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get wyz() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec3} */
    get agb() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2] ); return tc_return }
    /** @param {vec3Like} v */
    set wyz( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[1] = v[1], this[2] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set agb( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[1] = v[1], this[2] = v[2]; return tc_return }
    /** @returns {vec3} */
    get wyw() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec3} */
    get aga() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec3} */
    get wzx() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec3} */
    get abr() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0] ); return tc_return }
    /** @param {vec3Like} v */
    set wzx( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[2] = v[1], this[0] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set abr( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[2] = v[1], this[0] = v[2]; return tc_return }
    /** @returns {vec3} */
    get wzy() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec3} */
    get abg() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1] ); return tc_return }
    /** @param {vec3Like} v */
    set wzy( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[2] = v[1], this[1] = v[2]; return tc_return }
    /** @param {vec3Like} v */
    set abg( v ) { let tc_return; tc_vec3Like( v ); this[3] = v[0], this[2] = v[1], this[1] = v[2]; return tc_return }
    /** @returns {vec3} */
    get wzz() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get abb() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec3} */
    get wzw() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec3} */
    get aba() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec3} */
    get wwx() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec3} */
    get aar() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec3} */
    get wwy() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec3} */
    get aag() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec3} */
    get wwz() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec3} */
    get aab() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec3} */
    get www() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3] ); return tc_return }
    /** @returns {vec3} */
    get aaa() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3] ); return tc_return }
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
    get xxxw() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rrra() { let tc_return; tc_return = vec4.new( this[0], this[0], this[0], this[3] ); return tc_return }
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
    get xxyw() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rrga() { let tc_return; tc_return = vec4.new( this[0], this[0], this[1], this[3] ); return tc_return }
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
    get xxzw() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rrba() { let tc_return; tc_return = vec4.new( this[0], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get xxwx() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rrar() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xxwy() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rrag() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xxwz() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rrab() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xxww() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rraa() { let tc_return; tc_return = vec4.new( this[0], this[0], this[3], this[3] ); return tc_return }
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
    get xyxw() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rgra() { let tc_return; tc_return = vec4.new( this[0], this[1], this[0], this[3] ); return tc_return }
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
    get xyyw() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rgga() { let tc_return; tc_return = vec4.new( this[0], this[1], this[1], this[3] ); return tc_return }
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
    get xyzw() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rgba() { let tc_return; tc_return = vec4.new( this[0], this[1], this[2], this[3] ); return tc_return }
    /** @param {vec4Like} v */
    set xyzw( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2], this[3] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set rgba( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[1] = v[1], this[2] = v[2], this[3] = v[3]; return tc_return }
    /** @returns {vec4} */
    get xywx() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rgar() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xywy() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rgag() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xywz() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rgab() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[2] ); return tc_return }
    /** @param {vec4Like} v */
    set xywz( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[1] = v[1], this[3] = v[2], this[2] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set rgab( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[1] = v[1], this[3] = v[2], this[2] = v[3]; return tc_return }
    /** @returns {vec4} */
    get xyww() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rgaa() { let tc_return; tc_return = vec4.new( this[0], this[1], this[3], this[3] ); return tc_return }
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
    get xzxw() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rbra() { let tc_return; tc_return = vec4.new( this[0], this[2], this[0], this[3] ); return tc_return }
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
    get xzyw() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rbga() { let tc_return; tc_return = vec4.new( this[0], this[2], this[1], this[3] ); return tc_return }
    /** @param {vec4Like} v */
    set xzyw( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2], this[3] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set rbga( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[2] = v[1], this[1] = v[2], this[3] = v[3]; return tc_return }
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
    get xzzw() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rbba() { let tc_return; tc_return = vec4.new( this[0], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get xzwx() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rbar() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xzwy() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rbag() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[1] ); return tc_return }
    /** @param {vec4Like} v */
    set xzwy( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[2] = v[1], this[3] = v[2], this[1] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set rbag( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[2] = v[1], this[3] = v[2], this[1] = v[3]; return tc_return }
    /** @returns {vec4} */
    get xzwz() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rbab() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xzww() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rbaa() { let tc_return; tc_return = vec4.new( this[0], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get xwxx() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rarr() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xwxy() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rarg() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xwxz() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rarb() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xwxw() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get rara() { let tc_return; tc_return = vec4.new( this[0], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get xwyx() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ragr() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xwyy() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ragg() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xwyz() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ragb() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[2] ); return tc_return }
    /** @param {vec4Like} v */
    set xwyz( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[3] = v[1], this[1] = v[2], this[2] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set ragb( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[3] = v[1], this[1] = v[2], this[2] = v[3]; return tc_return }
    /** @returns {vec4} */
    get xwyw() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get raga() { let tc_return; tc_return = vec4.new( this[0], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get xwzx() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rabr() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xwzy() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rabg() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[1] ); return tc_return }
    /** @param {vec4Like} v */
    set xwzy( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[3] = v[1], this[2] = v[2], this[1] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set rabg( v ) { let tc_return; tc_vec4Like( v ); this[0] = v[0], this[3] = v[1], this[2] = v[2], this[1] = v[3]; return tc_return }
    /** @returns {vec4} */
    get xwzz() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get rabb() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xwzw() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get raba() { let tc_return; tc_return = vec4.new( this[0], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get xwwx() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get raar() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xwwy() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get raag() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xwwz() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get raab() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get xwww() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get raaa() { let tc_return; tc_return = vec4.new( this[0], this[3], this[3], this[3] ); return tc_return }
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
    get yxxw() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get grra() { let tc_return; tc_return = vec4.new( this[1], this[0], this[0], this[3] ); return tc_return }
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
    get yxyw() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get grga() { let tc_return; tc_return = vec4.new( this[1], this[0], this[1], this[3] ); return tc_return }
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
    get yxzw() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get grba() { let tc_return; tc_return = vec4.new( this[1], this[0], this[2], this[3] ); return tc_return }
    /** @param {vec4Like} v */
    set yxzw( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2], this[3] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set grba( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[0] = v[1], this[2] = v[2], this[3] = v[3]; return tc_return }
    /** @returns {vec4} */
    get yxwx() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get grar() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yxwy() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get grag() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yxwz() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get grab() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[2] ); return tc_return }
    /** @param {vec4Like} v */
    set yxwz( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[0] = v[1], this[3] = v[2], this[2] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set grab( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[0] = v[1], this[3] = v[2], this[2] = v[3]; return tc_return }
    /** @returns {vec4} */
    get yxww() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get graa() { let tc_return; tc_return = vec4.new( this[1], this[0], this[3], this[3] ); return tc_return }
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
    get yyxw() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ggra() { let tc_return; tc_return = vec4.new( this[1], this[1], this[0], this[3] ); return tc_return }
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
    get yyyw() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ggga() { let tc_return; tc_return = vec4.new( this[1], this[1], this[1], this[3] ); return tc_return }
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
    get yyzw() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ggba() { let tc_return; tc_return = vec4.new( this[1], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get yywx() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ggar() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yywy() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ggag() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yywz() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ggab() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yyww() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ggaa() { let tc_return; tc_return = vec4.new( this[1], this[1], this[3], this[3] ); return tc_return }
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
    get yzxw() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gbra() { let tc_return; tc_return = vec4.new( this[1], this[2], this[0], this[3] ); return tc_return }
    /** @param {vec4Like} v */
    set yzxw( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2], this[3] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set gbra( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[2] = v[1], this[0] = v[2], this[3] = v[3]; return tc_return }
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
    get yzyw() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gbga() { let tc_return; tc_return = vec4.new( this[1], this[2], this[1], this[3] ); return tc_return }
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
    get yzzw() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gbba() { let tc_return; tc_return = vec4.new( this[1], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get yzwx() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gbar() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[0] ); return tc_return }
    /** @param {vec4Like} v */
    set yzwx( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[2] = v[1], this[3] = v[2], this[0] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set gbar( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[2] = v[1], this[3] = v[2], this[0] = v[3]; return tc_return }
    /** @returns {vec4} */
    get yzwy() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gbag() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yzwz() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gbab() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get yzww() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gbaa() { let tc_return; tc_return = vec4.new( this[1], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ywxx() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get garr() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ywxy() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get garg() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ywxz() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get garb() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[2] ); return tc_return }
    /** @param {vec4Like} v */
    set ywxz( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[3] = v[1], this[0] = v[2], this[2] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set garb( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[3] = v[1], this[0] = v[2], this[2] = v[3]; return tc_return }
    /** @returns {vec4} */
    get ywxw() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gara() { let tc_return; tc_return = vec4.new( this[1], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ywyx() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gagr() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ywyy() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gagg() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ywyz() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gagb() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ywyw() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gaga() { let tc_return; tc_return = vec4.new( this[1], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ywzx() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gabr() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[0] ); return tc_return }
    /** @param {vec4Like} v */
    set ywzx( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[3] = v[1], this[2] = v[2], this[0] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set gabr( v ) { let tc_return; tc_vec4Like( v ); this[1] = v[0], this[3] = v[1], this[2] = v[2], this[0] = v[3]; return tc_return }
    /** @returns {vec4} */
    get ywzy() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gabg() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ywzz() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gabb() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ywzw() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gaba() { let tc_return; tc_return = vec4.new( this[1], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get ywwx() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gaar() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ywwy() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gaag() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ywwz() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get gaab() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get ywww() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get gaaa() { let tc_return; tc_return = vec4.new( this[1], this[3], this[3], this[3] ); return tc_return }
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
    get zxxw() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get brra() { let tc_return; tc_return = vec4.new( this[2], this[0], this[0], this[3] ); return tc_return }
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
    get zxyw() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get brga() { let tc_return; tc_return = vec4.new( this[2], this[0], this[1], this[3] ); return tc_return }
    /** @param {vec4Like} v */
    set zxyw( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2], this[3] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set brga( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[0] = v[1], this[1] = v[2], this[3] = v[3]; return tc_return }
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
    get zxzw() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get brba() { let tc_return; tc_return = vec4.new( this[2], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zxwx() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get brar() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zxwy() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get brag() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[1] ); return tc_return }
    /** @param {vec4Like} v */
    set zxwy( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[0] = v[1], this[3] = v[2], this[1] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set brag( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[0] = v[1], this[3] = v[2], this[1] = v[3]; return tc_return }
    /** @returns {vec4} */
    get zxwz() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get brab() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zxww() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get braa() { let tc_return; tc_return = vec4.new( this[2], this[0], this[3], this[3] ); return tc_return }
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
    get zyxw() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bgra() { let tc_return; tc_return = vec4.new( this[2], this[1], this[0], this[3] ); return tc_return }
    /** @param {vec4Like} v */
    set zyxw( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2], this[3] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set bgra( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[1] = v[1], this[0] = v[2], this[3] = v[3]; return tc_return }
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
    get zyyw() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bgga() { let tc_return; tc_return = vec4.new( this[2], this[1], this[1], this[3] ); return tc_return }
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
    get zyzw() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bgba() { let tc_return; tc_return = vec4.new( this[2], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zywx() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bgar() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[0] ); return tc_return }
    /** @param {vec4Like} v */
    set zywx( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[1] = v[1], this[3] = v[2], this[0] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set bgar( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[1] = v[1], this[3] = v[2], this[0] = v[3]; return tc_return }
    /** @returns {vec4} */
    get zywy() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bgag() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zywz() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bgab() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zyww() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bgaa() { let tc_return; tc_return = vec4.new( this[2], this[1], this[3], this[3] ); return tc_return }
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
    get zzxw() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bbra() { let tc_return; tc_return = vec4.new( this[2], this[2], this[0], this[3] ); return tc_return }
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
    get zzyw() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bbga() { let tc_return; tc_return = vec4.new( this[2], this[2], this[1], this[3] ); return tc_return }
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
    /** @returns {vec4} */
    get zzzw() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bbba() { let tc_return; tc_return = vec4.new( this[2], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zzwx() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bbar() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zzwy() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bbag() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zzwz() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bbab() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zzww() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bbaa() { let tc_return; tc_return = vec4.new( this[2], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zwxx() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get barr() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zwxy() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get barg() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[1] ); return tc_return }
    /** @param {vec4Like} v */
    set zwxy( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[3] = v[1], this[0] = v[2], this[1] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set barg( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[3] = v[1], this[0] = v[2], this[1] = v[3]; return tc_return }
    /** @returns {vec4} */
    get zwxz() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get barb() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zwxw() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get bara() { let tc_return; tc_return = vec4.new( this[2], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zwyx() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get bagr() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[0] ); return tc_return }
    /** @param {vec4Like} v */
    set zwyx( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[3] = v[1], this[1] = v[2], this[0] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set bagr( v ) { let tc_return; tc_vec4Like( v ); this[2] = v[0], this[3] = v[1], this[1] = v[2], this[0] = v[3]; return tc_return }
    /** @returns {vec4} */
    get zwyy() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get bagg() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zwyz() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get bagb() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zwyw() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get baga() { let tc_return; tc_return = vec4.new( this[2], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zwzx() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get babr() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zwzy() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get babg() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zwzz() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get babb() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zwzw() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get baba() { let tc_return; tc_return = vec4.new( this[2], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get zwwx() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get baar() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get zwwy() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get baag() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get zwwz() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get baab() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get zwww() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get baaa() { let tc_return; tc_return = vec4.new( this[2], this[3], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wxxx() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get arrr() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wxxy() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get arrg() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wxxz() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get arrb() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wxxw() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get arra() { let tc_return; tc_return = vec4.new( this[3], this[0], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wxyx() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get argr() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wxyy() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get argg() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wxyz() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get argb() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[2] ); return tc_return }
    /** @param {vec4Like} v */
    set wxyz( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[0] = v[1], this[1] = v[2], this[2] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set argb( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[0] = v[1], this[1] = v[2], this[2] = v[3]; return tc_return }
    /** @returns {vec4} */
    get wxyw() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get arga() { let tc_return; tc_return = vec4.new( this[3], this[0], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wxzx() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get arbr() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wxzy() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get arbg() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[1] ); return tc_return }
    /** @param {vec4Like} v */
    set wxzy( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[0] = v[1], this[2] = v[2], this[1] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set arbg( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[0] = v[1], this[2] = v[2], this[1] = v[3]; return tc_return }
    /** @returns {vec4} */
    get wxzz() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get arbb() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wxzw() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get arba() { let tc_return; tc_return = vec4.new( this[3], this[0], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wxwx() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get arar() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wxwy() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get arag() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wxwz() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get arab() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wxww() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get araa() { let tc_return; tc_return = vec4.new( this[3], this[0], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wyxx() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get agrr() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wyxy() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get agrg() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wyxz() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get agrb() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[2] ); return tc_return }
    /** @param {vec4Like} v */
    set wyxz( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[1] = v[1], this[0] = v[2], this[2] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set agrb( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[1] = v[1], this[0] = v[2], this[2] = v[3]; return tc_return }
    /** @returns {vec4} */
    get wyxw() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get agra() { let tc_return; tc_return = vec4.new( this[3], this[1], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wyyx() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get aggr() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wyyy() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get aggg() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wyyz() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get aggb() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wyyw() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get agga() { let tc_return; tc_return = vec4.new( this[3], this[1], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wyzx() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get agbr() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[0] ); return tc_return }
    /** @param {vec4Like} v */
    set wyzx( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[1] = v[1], this[2] = v[2], this[0] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set agbr( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[1] = v[1], this[2] = v[2], this[0] = v[3]; return tc_return }
    /** @returns {vec4} */
    get wyzy() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get agbg() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wyzz() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get agbb() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wyzw() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get agba() { let tc_return; tc_return = vec4.new( this[3], this[1], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wywx() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get agar() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wywy() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get agag() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wywz() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get agab() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wyww() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get agaa() { let tc_return; tc_return = vec4.new( this[3], this[1], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wzxx() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get abrr() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wzxy() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get abrg() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[1] ); return tc_return }
    /** @param {vec4Like} v */
    set wzxy( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[2] = v[1], this[0] = v[2], this[1] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set abrg( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[2] = v[1], this[0] = v[2], this[1] = v[3]; return tc_return }
    /** @returns {vec4} */
    get wzxz() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get abrb() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wzxw() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get abra() { let tc_return; tc_return = vec4.new( this[3], this[2], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wzyx() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get abgr() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[0] ); return tc_return }
    /** @param {vec4Like} v */
    set wzyx( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[2] = v[1], this[1] = v[2], this[0] = v[3]; return tc_return }
    /** @param {vec4Like} v */
    set abgr( v ) { let tc_return; tc_vec4Like( v ); this[3] = v[0], this[2] = v[1], this[1] = v[2], this[0] = v[3]; return tc_return }
    /** @returns {vec4} */
    get wzyy() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get abgg() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wzyz() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get abgb() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wzyw() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get abga() { let tc_return; tc_return = vec4.new( this[3], this[2], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wzzx() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get abbr() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wzzy() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get abbg() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wzzz() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get abbb() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wzzw() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get abba() { let tc_return; tc_return = vec4.new( this[3], this[2], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wzwx() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get abar() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wzwy() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get abag() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wzwz() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get abab() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wzww() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get abaa() { let tc_return; tc_return = vec4.new( this[3], this[2], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wwxx() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get aarr() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wwxy() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get aarg() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wwxz() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get aarb() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wwxw() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get aara() { let tc_return; tc_return = vec4.new( this[3], this[3], this[0], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wwyx() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get aagr() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wwyy() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get aagg() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wwyz() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get aagb() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wwyw() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get aaga() { let tc_return; tc_return = vec4.new( this[3], this[3], this[1], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wwzx() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get aabr() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wwzy() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get aabg() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wwzz() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get aabb() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wwzw() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get aaba() { let tc_return; tc_return = vec4.new( this[3], this[3], this[2], this[3] ); return tc_return }
    /** @returns {vec4} */
    get wwwx() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get aaar() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[0] ); return tc_return }
    /** @returns {vec4} */
    get wwwy() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get aaag() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[1] ); return tc_return }
    /** @returns {vec4} */
    get wwwz() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get aaab() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[2] ); return tc_return }
    /** @returns {vec4} */
    get wwww() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[3] ); return tc_return }
    /** @returns {vec4} */
    get aaaa() { let tc_return; tc_return = vec4.new( this[3], this[3], this[3], this[3] ); return tc_return }

    /** @param {number|vec4Like} x @param {number} [y] @param {number} [z] @param {number} [w] @returns {vec4} */
    set( x, y, z, w ) {
        let tc_return
        tc_numbervec4Like( x )
        typeof x === "number"
            ? ( this[0] = x, this[1] = y, this[2] = z, this[3] = w )
            : ( this[0] = x[0], this[1] = x[1], this[2] = x[2], this[3] = x[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    clone() {
        let tc_return
        tc_return = vec4.new(  this  )
        tc_vec4( tc_return )
        return tc_return
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
    [Symbol.toStringTag]() { let tc_return; tc_return = "vec4"; return tc_return }
    /** @returns {string} */
    toString() { let tc_return; tc_return = `(${this[0]}, ${this[1]}, ${this[2]}, ${this[3]})`; return tc_return }
    /** @returns {number[]} */
    toArray() { let tc_return; tc_return = [this[0], this[1], this[2], this[3]]; return tc_return }
    /** @returns {Int8Array} */
    toInt8Array() { let tc_return; tc_return = new Int8Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Uint8Array} */
    toUint8Array() { let tc_return; tc_return = new Uint8Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { let tc_return; tc_return = new Uint8ClampedArray( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Int16Array} */
    toInt16Array() { let tc_return; tc_return = new Int16Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Uint16Array} */
    toUint16Array() { let tc_return; tc_return = new Uint16Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Int32Array} */
    toInt32Array() { let tc_return; tc_return = new Int32Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Uint32Array} */
    toUint32Array() { let tc_return; tc_return = new Uint32Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Float32Array} */
    toFloat32Array() { let tc_return; tc_return = new Float32Array( [this[0], this[1], this[2], this[3]] ); return tc_return }
    /** @returns {Float64Array} */
    toFloat64Array() { let tc_return; tc_return = new Float64Array( [this[0], this[1], this[2], this[3]] ); return tc_return }

    /** @param {{hex?: boolean}} [options={}] @returns {string} */
    toCSSColor( options = {} ) {
        let tc_return
        if ( options.hex ) {
            const r = Math.round( Math.min( Math.max( this[0] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const g = Math.round( Math.min( Math.max( this[1] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const b = Math.round( Math.min( Math.max( this[2] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            const a = Math.round( Math.min( Math.max( this[3] * 255, 0 ), 255 ) ).toString( 16 ).padStart( 2, 0 )
            tc_return = `#${r}${g}${b}${a}`
        } else {
            const r = Math.min( Math.max( this[0] * 100, 0 ), 100 )
            const g = Math.min( Math.max( this[1] * 100, 0 ), 100 )
            const b = Math.min( Math.max( this[2] * 100, 0 ), 100 )
            const a = Math.min( Math.max( this[3] * 100, 0 ), 100 )
            tc_return = `rgba(${r}%, ${g}%, ${b}%, ${a}%)`
        }
        return tc_return
    }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {vec4Like} v @returns {boolean} */
    eq( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = this[0] === v[0] && this[1] === v[1] && this[2] === v[2] && this[3] === v[3]
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {boolean} */
    static eq( v1, v2 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_return = v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2] && v1[3] === v2[3]
        return tc_return
    }

    /** @param {vec4Like} v @returns {boolean} */
    neq( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = this[0] !== v[0] || this[1] !== v[1] || this[2] !== v[2] || this[3] !== v[3]
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {boolean} */
    static neq( v1, v2 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_return = v1[0] !== v2[0] || v1[1] !== v2[1] || v1[2] !== v2[2] || v1[3] !== v2[3]
        return tc_return
    }

    /** @returns {boolean} */
    all() {
        let tc_return
        tc_return = !!this[0] && !!this[1] && !!this[2] && !!this[3]
        return tc_return
    }

    /** @param {vec4Like} v @returns {boolean} */
    static all( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = !!v[0] && !!v[1] && !!v[2] && !!v[3]
        return tc_return
    }

    /** @returns {boolean} */
    any() {
        let tc_return
        tc_return = !!this[0] || !!this[1] || !!this[2] || !!this[3]
        return tc_return
    }

    /** @param {vec4Like} v @returns {boolean} */
    static any( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = !!v[0] || !!v[1] || !!v[2] || !!v[3]
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    greaterThan( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = +( this[0] > v[0] )
        this[1] = +( this[1] > v[1] )
        this[2] = +( this[2] > v[2] )
        this[3] = +( this[3] > v[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static greaterThan( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = +( v1[0] > v2[0] )
        target[1] = +( v1[1] > v2[1] )
        target[2] = +( v1[2] > v2[2] )
        target[3] = +( v1[3] > v2[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    greaterThanEqual( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = +( this[0] >= v[0] )
        this[1] = +( this[1] >= v[1] )
        this[2] = +( this[2] >= v[2] )
        this[3] = +( this[3] >= v[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static greaterThanEqual( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = +( v1[0] >= v2[0] )
        target[1] = +( v1[1] >= v2[1] )
        target[2] = +( v1[2] >= v2[2] )
        target[3] = +( v1[3] >= v2[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    lessThan( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = +( this[0] < v[0] )
        this[1] = +( this[1] < v[1] )
        this[2] = +( this[2] < v[2] )
        this[3] = +( this[3] < v[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static lessThan( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = +( v1[0] < v2[0] )
        target[1] = +( v1[1] < v2[1] )
        target[2] = +( v1[2] < v2[2] )
        target[3] = +( v1[3] < v2[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    lessThanEqual( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = +( this[0] <= v[0] )
        this[1] = +( this[1] <= v[1] )
        this[2] = +( this[2] <= v[2] )
        this[3] = +( this[3] <= v[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static lessThanEqual( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = +( v1[0] <= v2[0] )
        target[1] = +( v1[1] <= v2[1] )
        target[2] = +( v1[2] <= v2[2] )
        target[3] = +( v1[3] <= v2[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    equal( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = +( this[0] === v[0] )
        this[1] = +( this[1] === v[1] )
        this[2] = +( this[2] === v[2] )
        this[3] = +( this[3] === v[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static equal( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = +( v1[0] === v2[0] )
        target[1] = +( v1[1] === v2[1] )
        target[2] = +( v1[2] === v2[2] )
        target[3] = +( v1[3] === v2[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    notEqual( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = +( this[0] !== v[0] )
        this[1] = +( this[1] !== v[1] )
        this[2] = +( this[2] !== v[2] )
        this[3] = +( this[3] !== v[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static notEqual( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = +( v1[0] !== v2[0] )
        target[1] = +( v1[1] !== v2[1] )
        target[2] = +( v1[2] !== v2[2] )
        target[3] = +( v1[3] !== v2[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    not() {
        let tc_return
        this[0] = +!this[0]
        this[1] = +!this[1]
        this[2] = +!this[2]
        this[3] = +!this[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static not( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = +!v[0]
        target[1] = +!v[1]
        target[2] = +!v[2]
        target[3] = +!v[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    isinf() {
        let tc_return
        this[0] = +( this[0] === -Infinity || this[0] === Infinity )
        this[1] = +( this[1] === -Infinity || this[1] === Infinity )
        this[2] = +( this[2] === -Infinity || this[2] === Infinity )
        this[3] = +( this[3] === -Infinity || this[3] === Infinity )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static isinf( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = +( v[0] === -Infinity || v[0] === Infinity )
        target[1] = +( v[1] === -Infinity || v[1] === Infinity )
        target[2] = +( v[2] === -Infinity || v[2] === Infinity )
        target[3] = +( v[3] === -Infinity || v[3] === Infinity )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    isnan() {
        let tc_return
        this[0] = +( this[0] !== this[0] )
        this[1] = +( this[1] !== this[1] )
        this[2] = +( this[2] !== this[2] )
        this[3] = +( this[3] !== this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static isnan( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = +( v[0] !== v[0] )
        target[1] = +( v[1] !== v[1] )
        target[2] = +( v[2] !== v[2] )
        target[3] = +( v[3] !== v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec4Like} x @returns {vec4} */
    add( x ) {
        let tc_return
        tc_numbervec4Like( x )
        tc_return = typeof x === "number" ? this.sadd( x ) : this.vadd( x )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static add( v, x, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( x )
        tc_vec43( target )
        tc_return = typeof x === "number" ? vec4.sadd( v, x, target ) : vec4.vadd( v, x, target )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    sadd( s ) {
        let tc_return
        tc_number0( s )
        this[0] += s
        this[1] += s
        this[2] += s
        this[3] += s
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static sadd( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        target[0] = v[0] + s
        target[1] = v[1] + s
        target[2] = v[2] + s
        target[3] = v[3] + s
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    vadd( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] += v[0]
        this[1] += v[1]
        this[2] += v[2]
        this[3] += v[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vadd( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] + v2[0]
        target[1] = v1[1] + v2[1]
        target[2] = v1[2] + v2[2]
        target[3] = v1[3] + v2[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    sub( x ) {
        let tc_return
        tc_numbervec4Like( x )
        tc_return = typeof x === "number" ? this.ssub( x ) : this.vsub( x )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static sub( v, x, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( x )
        tc_vec43( target )
        tc_return = typeof x === "number" ? vec4.ssub( v, x, target ) : vec4.vsub( v, x, target )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    ssub( s ) {
        let tc_return
        tc_number0( s )
        this[0] -= s
        this[1] -= s
        this[2] -= s
        this[3] -= s
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static ssub( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        target[0] = v[0] - s
        target[1] = v[1] - s
        target[2] = v[2] - s
        target[3] = v[3] - s
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    vsub( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] -= v[0]
        this[1] -= v[1]
        this[2] -= v[2]
        this[3] -= v[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vsub( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] - v2[0]
        target[1] = v1[1] - v2[1]
        target[2] = v1[2] - v2[2]
        target[3] = v1[3] - v2[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    mul( x ) {
        let tc_return
        tc_numbervec4Like( x )
        tc_return = typeof x === "number" ? this.smul( x ) : this.vmul( x )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static mul( v, x, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( x )
        tc_vec43( target )
        tc_return = typeof x === "number" ? vec4.smul( v, x, target ) : vec4.vmul( v, x, target )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    smul( s ) {
        let tc_return
        tc_number0( s )
        this[0] *= s
        this[1] *= s
        this[2] *= s
        this[3] *= s
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static smul( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        target[0] = v[0] * s
        target[1] = v[1] * s
        target[2] = v[2] * s
        target[3] = v[3] * s
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    vmul( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] *= v[0]
        this[1] *= v[1]
        this[2] *= v[2]
        this[3] *= v[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vmul( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] * v2[0]
        target[1] = v1[1] * v2[1]
        target[2] = v1[2] * v2[2]
        target[3] = v1[3] * v2[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    div( x ) {
        let tc_return
        tc_numbervec4Like( x )
        tc_return = typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static div( v, x, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( x )
        tc_vec43( target )
        tc_return = typeof x === "number" ? vec4.sdiv( v, x, target ) : vec4.vdiv( v, x, target )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    sdiv( s ) {
        let tc_return
        tc_number0( s )
        this[0] /= s
        this[1] /= s
        this[2] /= s
        this[3] /= s
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static sdiv( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        target[0] = v[0] / s
        target[1] = v[1] / s
        target[2] = v[2] / s
        target[3] = v[3] / s
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    vdiv( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] /= v[0]
        this[1] /= v[1]
        this[2] /= v[2]
        this[3] /= v[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vdiv( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] / v2[0]
        target[1] = v1[1] / v2[1]
        target[2] = v1[2] / v2[2]
        target[3] = v1[3] / v2[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    rem( x ) {
        let tc_return
        tc_numbervec4Like( x )
        tc_return = typeof x === "number" ? this.srem( x ) : this.vrem( x )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static rem( v, x, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( x )
        tc_vec43( target )
        tc_return = typeof x === "number" ? vec4.srem( v, x, target ) : vec4.vrem( v, x, target )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    srem( s ) {
        let tc_return
        tc_number0( s )
        this[0] %= s
        this[1] %= s
        this[2] %= s
        this[3] %= s
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static srem( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        target[0] = v[0] % s
        target[1] = v[1] % s
        target[2] = v[2] % s
        target[3] = v[3] % s
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    vrem( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] %= v[0]
        this[1] %= v[1]
        this[2] %= v[2]
        this[3] %= v[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vrem( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] % v2[0]
        target[1] = v1[1] % v2[1]
        target[2] = v1[2] % v2[2]
        target[3] = v1[3] % v2[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number|vec4Like} x @returns {vec4} */
    pow( x ) {
        let tc_return
        tc_numbervec4Like( x )
        tc_return = typeof x === "number" ? this.spow( x ) : this.vpow( x )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} x @param {vec4} [target=new vec4] @returns {vec4} */
    static pow( v, x, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( x )
        tc_vec43( target )
        tc_return = typeof x === "number" ? vec4.spow( v, x, target ) : vec4.vpow( v, x, target )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    spow( s ) {
        let tc_return
        tc_number0( s )
        this[0] **= s
        this[1] **= s
        this[2] **= s
        this[3] **= s
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static spow( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        target[0] = v[0] ** s
        target[1] = v[1] ** s
        target[2] = v[2] ** s
        target[3] = v[3] ** s
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {vec4} */
    vpow( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] **= v[0]
        this[1] **= v[1]
        this[2] **= v[2]
        this[3] **= v[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {vec4} [target=new vec4] @returns {vec4} */
    static vpow( v1, v2, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] ** v2[0]
        target[1] = v1[1] ** v2[1]
        target[2] = v1[2] ** v2[2]
        target[3] = v1[3] ** v2[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number|vec4Like} m @param {number|vec4Like} a @returns {vec4} */
    fma( m, a ) {
        let tc_return
        tc_numbervec4Like( m )
        tc_numbervec4Like( a )
        tc_return = typeof m === "number"
            ? ( typeof a === "number" ? this.sfma( m, a ) : this.svfma( m, a ) )
            : ( typeof a === "number" ? this.vsfma( m, a ) : this.vfma( m, a ) )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} m @param {number|vec4Like} a @param {vec4} [target=new vec4] @returns {vec4} */
    static fma( v, m, a, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( m )
        tc_numbervec4Like( a )
        tc_vec43( target )
        tc_return = typeof m === "number"
            ? ( typeof a === "number" ? vec4.sfma( v, m, a, target ) : vec4.svfma( v, m, a, target ) )
            : ( typeof a === "number" ? vec4.vsfma( v, m, a, target ) : vec4.vfma( v, m, a, target ) )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} m @param {number} a @returns {vec4} */
    sfma( m, a ) {
        let tc_return
        this[0] = this[0] * m + a
        this[1] = this[1] * m + a
        this[2] = this[2] * m + a
        this[3] = this[3] * m + a
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} m @param {number} a @param {vec4} [target=new vec4] @returns {vec4} */
    static sfma( v, m, a, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = v[0] * m + a
        target[1] = v[1] * m + a
        target[2] = v[2] * m + a
        target[3] = v[3] * m + a
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} m @param {vec4Like} a @returns {vec4} */
    svfma( m, a ) {
        let tc_return
        tc_vec4Like( a )
        this[0] = this[0] * m + a[0]
        this[1] = this[1] * m + a[1]
        this[2] = this[2] * m + a[2]
        this[3] = this[3] * m + a[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} m @param {vec4Like} a @param {vec4} [target=new vec4] @returns {vec4} */
    static svfma( v, m, a, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec4Like( a )
        tc_vec43( target )
        target[0] = v[0] * m + a[0]
        target[1] = v[1] * m + a[1]
        target[2] = v[2] * m + a[2]
        target[3] = v[3] * m + a[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} m @param {number} a @returns {vec4} */
    vsfma( m, a ) {
        let tc_return
        tc_vec4Like( m )
        this[0] = this[0] * m[0] + a
        this[1] = this[1] * m[1] + a
        this[2] = this[2] * m[2] + a
        this[3] = this[3] * m[3] + a
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4Like} m @param {number} a @param {vec4} [target=new vec4] @returns {vec4} */
    static vsfma( v, m, a, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec4Like( m )
        tc_vec43( target )
        target[0] = v[0] * m[0] + a
        target[1] = v[1] * m[1] + a
        target[2] = v[2] * m[2] + a
        target[3] = v[3] * m[3] + a
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} m @param {vec4Like} a @returns {vec4} */
    vfma( m, a ) {
        let tc_return
        tc_vec4Like( m )
        tc_vec4Like( a )
        this[0] = this[0] * m[0] + a[0]
        this[1] = this[1] * m[1] + a[1]
        this[2] = this[2] * m[2] + a[2]
        this[3] = this[3] * m[3] + a[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4Like} m @param {vec4Like} a @param {vec4} [target=new vec4] @returns {vec4} */
    static vfma( v, m, a, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec4Like( m )
        tc_vec4Like( a )
        tc_vec43( target )
        target[0] = v[0] * m[0] + a[0]
        target[1] = v[1] * m[1] + a[1]
        target[2] = v[2] * m[2] + a[2]
        target[3] = v[3] * m[3] + a[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {mat4Like} m @returns {vec4} */
    mmul( m ) {
        let tc_return
        tc_mat4Like( m )
        const c0 = this[0]
        const c1 = this[1]
        const c2 = this[2]
        const c3 = this[3]
        this[0] = c0 * m[0] + c1 * m[4] + c2 * m[8] + c3 * m[12]
        this[1] = c0 * m[1] + c1 * m[5] + c2 * m[9] + c3 * m[13]
        this[2] = c0 * m[2] + c1 * m[6] + c2 * m[10] + c3 * m[14]
        this[3] = c0 * m[3] + c1 * m[7] + c2 * m[11] + c3 * m[15]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {mat4Like} m @param {vec4} [target=new vec4] @returns {vec4} */
    static mmul( v, m, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_mat4Like( m )
        tc_vec43( target )
        const c0 = v[0]
        const c1 = v[1]
        const c2 = v[2]
        const c3 = v[3]
        target[0] = c0 * m[0] + c1 * m[4] + c2 * m[8] + c3 * m[12]
        target[1] = c0 * m[1] + c1 * m[5] + c2 * m[9] + c3 * m[13]
        target[2] = c0 * m[2] + c1 * m[6] + c2 * m[10] + c3 * m[14]
        target[3] = c0 * m[3] + c1 * m[7] + c2 * m[11] + c3 * m[15]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {(value: number, index: number) => number} fn @returns {vec4} */
    apply( fn ) {
        let tc_return
        this[0] = fn( this[0], 0 )
        this[1] = fn( this[1], 1 )
        this[2] = fn( this[2], 2 )
        this[3] = fn( this[3], 3 )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {(value: number, index: number) => number} fn @param {vec4} [target=new vec4] @returns {vec4} */
    static apply( v, fn, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = fn( v[0], 0 )
        target[1] = fn( v[1], 1 )
        target[2] = fn( v[2], 2 )
        target[3] = fn( v[3], 3 )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    abs() {
        let tc_return
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        this[2] = Math.abs( this[2] )
        this[3] = Math.abs( this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    sign() {
        let tc_return
        this[0] = Math.sign( this[0] )
        this[1] = Math.sign( this[1] )
        this[2] = Math.sign( this[2] )
        this[3] = Math.sign( this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    trunc() {
        let tc_return
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        this[2] = Math.trunc( this[2] )
        this[3] = Math.trunc( this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    round() {
        let tc_return
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        this[2] = Math.round( this[2] )
        this[3] = Math.round( this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    floor() {
        let tc_return
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        this[2] = Math.floor( this[2] )
        this[3] = Math.floor( this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    ceil() {
        let tc_return
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        this[2] = Math.ceil( this[2] )
        this[3] = Math.ceil( this[3] )
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static abs( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.abs( v[0] )
        target[1] = Math.abs( v[1] )
        target[2] = Math.abs( v[2] )
        target[3] = Math.abs( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static acos( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.acos( v[0] )
        target[1] = Math.acos( v[1] )
        target[2] = Math.acos( v[2] )
        target[3] = Math.acos( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static acosh( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.acosh( v[0] )
        target[1] = Math.acosh( v[1] )
        target[2] = Math.acosh( v[2] )
        target[3] = Math.acosh( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static asin( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.asin( v[0] )
        target[1] = Math.asin( v[1] )
        target[2] = Math.asin( v[2] )
        target[3] = Math.asin( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static asinh( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.asinh( v[0] )
        target[1] = Math.asinh( v[1] )
        target[2] = Math.asinh( v[2] )
        target[3] = Math.asinh( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static atan( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.atan( v[0] )
        target[1] = Math.atan( v[1] )
        target[2] = Math.atan( v[2] )
        target[3] = Math.atan( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static atanh( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.atanh( v[0] )
        target[1] = Math.atanh( v[1] )
        target[2] = Math.atanh( v[2] )
        target[3] = Math.atanh( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static ceil( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.ceil( v[0] )
        target[1] = Math.ceil( v[1] )
        target[2] = Math.ceil( v[2] )
        target[3] = Math.ceil( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static cbrt( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.cbrt( v[0] )
        target[1] = Math.cbrt( v[1] )
        target[2] = Math.cbrt( v[2] )
        target[3] = Math.cbrt( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static expm1( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.expm1( v[0] )
        target[1] = Math.expm1( v[1] )
        target[2] = Math.expm1( v[2] )
        target[3] = Math.expm1( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static cos( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.cos( v[0] )
        target[1] = Math.cos( v[1] )
        target[2] = Math.cos( v[2] )
        target[3] = Math.cos( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static cosh( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.cosh( v[0] )
        target[1] = Math.cosh( v[1] )
        target[2] = Math.cosh( v[2] )
        target[3] = Math.cosh( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static exp( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.exp( v[0] )
        target[1] = Math.exp( v[1] )
        target[2] = Math.exp( v[2] )
        target[3] = Math.exp( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static floor( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.floor( v[0] )
        target[1] = Math.floor( v[1] )
        target[2] = Math.floor( v[2] )
        target[3] = Math.floor( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.log( v[0] )
        target[1] = Math.log( v[1] )
        target[2] = Math.log( v[2] )
        target[3] = Math.log( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log1p( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.log1p( v[0] )
        target[1] = Math.log1p( v[1] )
        target[2] = Math.log1p( v[2] )
        target[3] = Math.log1p( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log2( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.log2( v[0] )
        target[1] = Math.log2( v[1] )
        target[2] = Math.log2( v[2] )
        target[3] = Math.log2( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static log10( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.log10( v[0] )
        target[1] = Math.log10( v[1] )
        target[2] = Math.log10( v[2] )
        target[3] = Math.log10( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static round( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.round( v[0] )
        target[1] = Math.round( v[1] )
        target[2] = Math.round( v[2] )
        target[3] = Math.round( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sign( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.sign( v[0] )
        target[1] = Math.sign( v[1] )
        target[2] = Math.sign( v[2] )
        target[3] = Math.sign( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sin( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.sin( v[0] )
        target[1] = Math.sin( v[1] )
        target[2] = Math.sin( v[2] )
        target[3] = Math.sin( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sinh( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.sinh( v[0] )
        target[1] = Math.sinh( v[1] )
        target[2] = Math.sinh( v[2] )
        target[3] = Math.sinh( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static sqrt( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.sqrt( v[0] )
        target[1] = Math.sqrt( v[1] )
        target[2] = Math.sqrt( v[2] )
        target[3] = Math.sqrt( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static tan( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.tan( v[0] )
        target[1] = Math.tan( v[1] )
        target[2] = Math.tan( v[2] )
        target[3] = Math.tan( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static tanh( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.tanh( v[0] )
        target[1] = Math.tanh( v[1] )
        target[2] = Math.tanh( v[2] )
        target[3] = Math.tanh( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static trunc( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.trunc( v[0] )
        target[1] = Math.trunc( v[1] )
        target[2] = Math.trunc( v[2] )
        target[3] = Math.trunc( v[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    // ---------------------------
    //      PROPERTIES
    // ---------------------------

    /** @returns {number} */
    length() {
        let tc_return
        tc_return = Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3] )
        return tc_return
    }

    /** @param {vec4Like} v @returns {number} */
    static length( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] )
        return tc_return
    }

    /** @returns {number} */
    lengthSq() {
        let tc_return
        tc_return = this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3]
        return tc_return
    }

    /** @param {vec4Like} v @returns {number} */
    static lengthSq( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]
        return tc_return
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec4Like} v @returns {vec4} */
    pointTo( v ) {
        let tc_return
        tc_vec4Like( v )
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        this[2] = v[2] - this[2]
        this[3] = v[3] - this[3]
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} from @param {vec4Like} to @param {vec4} [target=new vec4] @returns {vec4} */
    static pointTo( from, to, target = new vec4 ) {
        let tc_return
        tc_vec4Like( from )
        tc_vec4Like( to )
        tc_vec43( target )
        target[0] = to[0] - from[0]
        target[1] = to[1] - from[1]
        target[2] = to[2] - from[2]
        target[3] = to[3] - from[3]
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @returns {vec4} */
    normalize() {
        let tc_return
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        this[3] *= factor
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static normalize( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        target[3] = v[3] * factor
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec4} */
    setLength( s ) {
        let tc_return
        tc_number0( s )
        const factor = s / Math.sqrt( this[0] * this[0] + this[1] * this[1] + this[2] * this[2] + this[3] * this[3] )
        this[0] *= factor
        this[1] *= factor
        this[2] *= factor
        this[3] *= factor
        tc_return = this
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} s @param {vec4} [target=new vec4] @returns {vec4} */
    static setLength( v, s, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( s )
        tc_vec43( target )
        const factor = s / Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        target[2] = v[2] * factor
        target[3] = v[3] * factor
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @returns {number} */
    dot( v ) {
        let tc_return
        tc_vec4Like( v )
        tc_return = this[0] * v[0] + this[1] * v[1] + this[2] * v[2] + this[3] * v[3]
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_return = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3]
        return tc_return
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec4Like} v */
    static noop( ...v ) {
        let tc_return
        tc_vec4Like5( v )
        return
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        const d3 = v1[3] - v2[3]
        tc_return = Math.sqrt( d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3 )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        const d2 = v1[2] - v2[2]
        const d3 = v1[3] - v2[3]
        tc_return = d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3
        return tc_return
    }

    /** @param {...(number|vec4Like)} values @returns {vec4} */
    static min( ...values ) {
        let tc_return
        const target = new vec4
        target[0] = Math.min( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.min( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.min( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        target[3] = Math.min( ...values.map( x => typeof x === "number" ? x : x[3] ) )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {...(number|vec4Like)} values @returns {vec4} */
    static max( ...values ) {
        let tc_return
        const target = new vec4
        target[0] = Math.max( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.max( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        target[2] = Math.max( ...values.map( x => typeof x === "number" ? x : x[2] ) )
        target[3] = Math.max( ...values.map( x => typeof x === "number" ? x : x[3] ) )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number|vec4Like} min @param {number|vec4Like} max @param {vec4} [target=new vec4] @returns {vec4} */
    static clamp( v, min, max, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_numbervec4Like( min )
        tc_numbervec4Like( max )
        tc_vec43( target )
        tc_return = typeof min === "number"
            ? ( typeof max === "number" ? vec4.sclamp( v, min, max, target ) : vec4.svclamp( v, min, max, target ) )
            : ( typeof max === "number" ? vec4.vsclamp( v, min, max, target ) : vec4.vclamp( v, min, max, target ) )
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} min @param {number} max @param {vec4} [target=new vec4] @returns {vec4} */
    static sclamp( v, min, max, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( min )
        tc_number0( max )
        tc_vec43( target )
        target[0] = Math.min( Math.max( v[0], min ), max )
        target[1] = Math.min( Math.max( v[1], min ), max )
        target[2] = Math.min( Math.max( v[2], min ), max )
        target[3] = Math.min( Math.max( v[3], min ), max )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {number} min @param {vec4Like} max @param {vec4} [target=new vec4] @returns {vec4} */
    static svclamp( v, min, max, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_number0( min )
        tc_vec4Like( max )
        tc_vec43( target )
        target[0] = Math.min( Math.max( v[0], min ), max[0] )
        target[1] = Math.min( Math.max( v[1], min ), max[1] )
        target[2] = Math.min( Math.max( v[2], min ), max[2] )
        target[3] = Math.min( Math.max( v[3], min ), max[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4Like} min @param {number} max @param {vec4} [target=new vec4] @returns {vec4} */
    static vsclamp( v, min, max, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec4Like( min )
        tc_number0( max )
        tc_vec43( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max )
        target[1] = Math.min( Math.max( v[1], min[1] ), max )
        target[2] = Math.min( Math.max( v[2], min[2] ), max )
        target[3] = Math.min( Math.max( v[3], min[3] ), max )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4Like} min @param {vec4Like} max @param {vec4} [target=new vec4] @returns {vec4} */
    static vclamp( v, min, max, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec4Like( min )
        tc_vec4Like( max )
        tc_vec43( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max[0] )
        target[1] = Math.min( Math.max( v[1], min[1] ), max[1] )
        target[2] = Math.min( Math.max( v[2], min[2] ), max[2] )
        target[3] = Math.min( Math.max( v[3], min[3] ), max[3] )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v @param {vec4} [target=new vec4] @returns {vec4} */
    static saturate( v, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v )
        tc_vec43( target )
        target[0] = Math.min( Math.max( v[0], 0 ), 1 )
        target[1] = Math.min( Math.max( v[1], 0 ), 1 )
        target[2] = Math.min( Math.max( v[2], 0 ), 1 )
        target[3] = Math.min( Math.max( v[3], 0 ), 1 )
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

    /** @param {vec4Like} v1 @param {vec4Like} v2 @param {number} t @param {vec4} [target=new vec4] @returns {vec4} */
    static mix( v1, v2, t, target = new vec4 ) {
        let tc_return
        tc_vec4Like( v1 )
        tc_vec4Like( v2 )
        tc_vec43( target )
        target[0] = v1[0] * ( 1 - t ) + v2[0] * t
        target[1] = v1[1] * ( 1 - t ) + v2[1] * t
        target[2] = v1[2] * ( 1 - t ) + v2[2] * t
        target[3] = v1[3] * ( 1 - t ) + v2[3] * t
        tc_return = target
        tc_vec4( tc_return )
        return tc_return
    }

}