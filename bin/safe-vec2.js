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
const tc_vec2 = function( x ) {
    if ( Flags.FINITE ) tc_FINITE( x )
    const result = x instanceof vec2 || x instanceof vec2unsafe
    if ( !result ) throw new TypeError( `Expected Type 'vec2', got [${x?.constructor.name||typeof x}]: ${x}` )
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
const tc_numbervec2Like = function( x ) {
    const result = (typeof x === 'number') || ([0, 1].every( i => typeof x[i] === 'number' ))
    if ( !result ) throw new TypeError( `Expected Type 'number|vec2Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec21 = function( x ) {
    const result = (x instanceof vec2 || x instanceof vec2unsafe) || (x === undefined)
    if ( !result ) throw new TypeError( `Expected Type 'vec2', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE2 = function( x ) {
    const result = Array.from( { length: 2 ** 2 } ).every( ( _, i ) => isFinite( x[i] ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_mat2Like = function( x ) {
    if ( Flags.FINITE ) tc_FINITE2( x )
    const result = Array.from( { length: 2 ** 2 } ).every( ( _, i ) => typeof x[i] === 'number' )
    if ( !result ) throw new TypeError( `Expected Type 'mat2Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_FINITE3 = function( x ) {
    const result = x.every( x => [0, 1].every( i => isFinite( x[i] ) ) )
    if ( !result ) throw new Error( `Failed optional check 'FINITE'. Got [${x?.constructor.name||typeof x}]: ${x}` )
}
const tc_vec2Like3 = function( x ) {
    if ( Flags.FINITE ) tc_FINITE3( x )
    const result = x.every( x => [0, 1].every( i => typeof x[i] === 'number' ) )
    if ( !result ) throw new TypeError( `Expected Type 'vec2Like', got [${x?.constructor.name||typeof x}]: ${x}` )
}

import { randomNorm } from "./vechelper.js"
import { vec3 } from "./vec3.js"
/** @typedef {import("./vec3.js").vec3Like} vec3Like */
import { vec4 } from "./vec4.js"
/** @typedef {import("./vec4.js").vec4Like} vec4Like */
import { mat2 } from "./mat2.js"
/** @typedef {import("./mat2.js").mat2Like} mat2Like */
import { mat3 } from "./mat3.js"
/** @typedef {import("./mat3.js").mat3Like} mat3Like */
import { mat4 } from "./mat4.js"
/** @typedef {import("./mat4.js").mat4Like} mat4Like */

// ###############################################
//      vec2
// ###############################################

/** @typedef {vec2|ArrayLike<number>} vec2Like */

export class vec2 {

    static get NaN() { return new vec2( NaN, NaN ) }

    // ---------------------------
    //      CONSTRUCTORS
    // ---------------------------

    /**
     * @param {number|vec2Like|{x: number, y: number}|{r: number, g: number}} [object=0]
     * @param {number} [y]
     */
    constructor( object = 0, y ) {
        let tc_return
        tc_number( y )
        if ( typeof object === "number" )
            y === undefined
                ? ( this[0] = object, this[1] = object )
                : ( this[0] = object, this[1] = +y )
        else
            this[0] = +( object[0] ?? object.x ?? object.r ?? 0 ),
            this[1] = +( object[1] ?? object.y ?? object.g ?? 0 )
        /** @type {number} x-coordinate of the vector */
        this[0]
        /** @type {number} y-coordinate of the vector */
        this[1]
        return tc_return
    }

    /** @param {ArrayLike<number>} array @param {number} [index=0] @param {number} [stride=1] @returns {vec2} */
    static fromArray( array, index = 0, stride = 1 ) {
        let tc_return
        tc_number( index )
        tc_number( stride )
        tc_return = new vec2( array[0 * stride + index], array[1 * stride + index] )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {(index: number) => number} fn @returns {vec2} */
    static fromFunction( fn ) {
        let tc_return
        tc_return = new vec2( fn( 0 ), fn( 1 ) )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} angle @returns {vec2} */
    static fromAngle( angle ) {
        let tc_return
        tc_number0( angle )
        tc_return = new vec2( Math.cos( angle ), Math.sin( angle ) )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    static random() {
        let tc_return
        tc_return = new vec2( Math.random(), Math.random() )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    static randomNorm() {
        let tc_return
        tc_return = new vec2( randomNorm(), randomNorm() )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    static randomDir() {
        let tc_return
        tc_return = new vec2( randomNorm(), randomNorm() ).normalize()
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    static randomSphere() {
        let tc_return
        tc_return = new vec2( randomNorm(), randomNorm() ).setLength( Math.random() ** (1/2) )
        tc_vec2( tc_return )
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
    /** @returns {vec2} */
    get xx() { let tc_return; tc_return = new vec2( this[0], this[0] ); return tc_return }
    /** @returns {vec2} */
    get rr() { let tc_return; tc_return = new vec2( this[0], this[0] ); return tc_return }
    /** @returns {vec2} */
    get xy() { let tc_return; tc_return = new vec2( this[0], this[1] ); return tc_return }
    /** @returns {vec2} */
    get rg() { let tc_return; tc_return = new vec2( this[0], this[1] ); return tc_return }
    /** @param {vec2Like} v */
    set xy( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[1] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set rg( v ) { let tc_return; tc_vec2Like( v ); this[0] = v[0], this[1] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yx() { let tc_return; tc_return = new vec2( this[1], this[0] ); return tc_return }
    /** @returns {vec2} */
    get gr() { let tc_return; tc_return = new vec2( this[1], this[0] ); return tc_return }
    /** @param {vec2Like} v */
    set yx( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[0] = v[1]; return tc_return }
    /** @param {vec2Like} v */
    set gr( v ) { let tc_return; tc_vec2Like( v ); this[1] = v[0], this[0] = v[1]; return tc_return }
    /** @returns {vec2} */
    get yy() { let tc_return; tc_return = new vec2( this[1], this[1] ); return tc_return }
    /** @returns {vec2} */
    get gg() { let tc_return; tc_return = new vec2( this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get xxx() { let tc_return; tc_return = new vec3( this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rrr() { let tc_return; tc_return = new vec3( this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xxy() { let tc_return; tc_return = new vec3( this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rrg() { let tc_return; tc_return = new vec3( this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get xyx() { let tc_return; tc_return = new vec3( this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get rgr() { let tc_return; tc_return = new vec3( this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get xyy() { let tc_return; tc_return = new vec3( this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get rgg() { let tc_return; tc_return = new vec3( this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yxx() { let tc_return; tc_return = new vec3( this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get grr() { let tc_return; tc_return = new vec3( this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec3} */
    get yxy() { let tc_return; tc_return = new vec3( this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get grg() { let tc_return; tc_return = new vec3( this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec3} */
    get yyx() { let tc_return; tc_return = new vec3( this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get ggr() { let tc_return; tc_return = new vec3( this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec3} */
    get yyy() { let tc_return; tc_return = new vec3( this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec3} */
    get ggg() { let tc_return; tc_return = new vec3( this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xxxx() { let tc_return; tc_return = new vec4( this[0], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rrrr() { let tc_return; tc_return = new vec4( this[0], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xxxy() { let tc_return; tc_return = new vec4( this[0], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rrrg() { let tc_return; tc_return = new vec4( this[0], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xxyx() { let tc_return; tc_return = new vec4( this[0], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rrgr() { let tc_return; tc_return = new vec4( this[0], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xxyy() { let tc_return; tc_return = new vec4( this[0], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rrgg() { let tc_return; tc_return = new vec4( this[0], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xyxx() { let tc_return; tc_return = new vec4( this[0], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rgrr() { let tc_return; tc_return = new vec4( this[0], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xyxy() { let tc_return; tc_return = new vec4( this[0], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rgrg() { let tc_return; tc_return = new vec4( this[0], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get xyyx() { let tc_return; tc_return = new vec4( this[0], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get rggr() { let tc_return; tc_return = new vec4( this[0], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get xyyy() { let tc_return; tc_return = new vec4( this[0], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get rggg() { let tc_return; tc_return = new vec4( this[0], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yxxx() { let tc_return; tc_return = new vec4( this[1], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get grrr() { let tc_return; tc_return = new vec4( this[1], this[0], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yxxy() { let tc_return; tc_return = new vec4( this[1], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get grrg() { let tc_return; tc_return = new vec4( this[1], this[0], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yxyx() { let tc_return; tc_return = new vec4( this[1], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get grgr() { let tc_return; tc_return = new vec4( this[1], this[0], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yxyy() { let tc_return; tc_return = new vec4( this[1], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get grgg() { let tc_return; tc_return = new vec4( this[1], this[0], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yyxx() { let tc_return; tc_return = new vec4( this[1], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get ggrr() { let tc_return; tc_return = new vec4( this[1], this[1], this[0], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yyxy() { let tc_return; tc_return = new vec4( this[1], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get ggrg() { let tc_return; tc_return = new vec4( this[1], this[1], this[0], this[1] ); return tc_return }
    /** @returns {vec4} */
    get yyyx() { let tc_return; tc_return = new vec4( this[1], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get gggr() { let tc_return; tc_return = new vec4( this[1], this[1], this[1], this[0] ); return tc_return }
    /** @returns {vec4} */
    get yyyy() { let tc_return; tc_return = new vec4( this[1], this[1], this[1], this[1] ); return tc_return }
    /** @returns {vec4} */
    get gggg() { let tc_return; tc_return = new vec4( this[1], this[1], this[1], this[1] ); return tc_return }

    /** @param {number|vec2Like} x @param {number} [y] @returns {vec2} */
    set( x, y ) {
        let tc_return
        tc_numbervec2Like( x )
        typeof x === "number"
            ? ( this[0] = x, this[1] = y )
            : ( this[0] = x[0], this[1] = x[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    clone() {
        let tc_return
        tc_return = new vec2( this )
        tc_vec2( tc_return )
        return tc_return
    }

    *[Symbol.iterator]() {
        yield this[0]
        yield this[1]
    }

    // ---------------------------
    //      CONVERSION
    // ---------------------------

    /** @returns {string} */
    [Symbol.toStringTag]() { let tc_return; tc_return = "vec2"; return tc_return }
    /** @returns {string} */
    toString() { let tc_return; tc_return = `(${this[0]}, ${this[1]})`; return tc_return }
    /** @returns {number[]} */
    toArray() { let tc_return; tc_return = [this[0], this[1]]; return tc_return }
    /** @returns {Int8Array} */
    toInt8Array() { let tc_return; tc_return = new Int8Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Uint8Array} */
    toUint8Array() { let tc_return; tc_return = new Uint8Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Uint8ClampedArray} */
    toUint8ClampedArray() { let tc_return; tc_return = new Uint8ClampedArray( [this[0], this[1]] ); return tc_return }
    /** @returns {Int16Array} */
    toInt16Array() { let tc_return; tc_return = new Int16Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Uint16Array} */
    toUint16Array() { let tc_return; tc_return = new Uint16Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Int32Array} */
    toInt32Array() { let tc_return; tc_return = new Int32Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Uint32Array} */
    toUint32Array() { let tc_return; tc_return = new Uint32Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Float32Array} */
    toFloat32Array() { let tc_return; tc_return = new Float32Array( [this[0], this[1]] ); return tc_return }
    /** @returns {Float64Array} */
    toFloat64Array() { let tc_return; tc_return = new Float64Array( [this[0], this[1]] ); return tc_return }

    // ---------------------------
    //      BOOLEAN
    // ---------------------------

    /** @param {vec2Like} v @returns {boolean} */
    eq( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = this[0] === v[0] && this[1] === v[1]
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {boolean} */
    static eq( v1, v2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_return = v1[0] === v2[0] && v1[1] === v2[1]
        return tc_return
    }

    /** @param {vec2Like} v @returns {boolean} */
    neq( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = this[0] !== v[0] || this[1] !== v[1]
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {boolean} */
    static neq( v1, v2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_return = v1[0] !== v2[0] || v1[1] !== v2[1]
        return tc_return
    }

    /** @returns {boolean} */
    all() {
        let tc_return
        tc_return = !!this[0] && !!this[1]
        return tc_return
    }

    /** @param {vec2Like} v @returns {boolean} */
    static all( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = !!v[0] && !!v[1]
        return tc_return
    }

    /** @returns {boolean} */
    any() {
        let tc_return
        tc_return = !!this[0] || !!this[1]
        return tc_return
    }

    /** @param {vec2Like} v @returns {boolean} */
    static any( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = !!v[0] || !!v[1]
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    greaterThan( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = +( this[0] > v[0] )
        this[1] = +( this[1] > v[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static greaterThan( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = +( v1[0] > v2[0] )
        target[1] = +( v1[1] > v2[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    greaterThanEqual( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = +( this[0] >= v[0] )
        this[1] = +( this[1] >= v[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static greaterThanEqual( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = +( v1[0] >= v2[0] )
        target[1] = +( v1[1] >= v2[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    lessThan( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = +( this[0] < v[0] )
        this[1] = +( this[1] < v[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static lessThan( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = +( v1[0] < v2[0] )
        target[1] = +( v1[1] < v2[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    lessThanEqual( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = +( this[0] <= v[0] )
        this[1] = +( this[1] <= v[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static lessThanEqual( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = +( v1[0] <= v2[0] )
        target[1] = +( v1[1] <= v2[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    equal( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = +( this[0] === v[0] )
        this[1] = +( this[1] === v[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static equal( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = +( v1[0] === v2[0] )
        target[1] = +( v1[1] === v2[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    notEqual( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = +( this[0] !== v[0] )
        this[1] = +( this[1] !== v[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static notEqual( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = +( v1[0] !== v2[0] )
        target[1] = +( v1[1] !== v2[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    not() {
        let tc_return
        this[0] = +!this[0]
        this[1] = +!this[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static not( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = +!v[0]
        target[1] = +!v[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    isinf() {
        let tc_return
        this[0] = +( this[0] === -Infinity || this[0] === Infinity )
        this[1] = +( this[1] === -Infinity || this[1] === Infinity )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static isinf( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = +( v[0] === -Infinity || v[0] === Infinity )
        target[1] = +( v[1] === -Infinity || v[1] === Infinity )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    isnan() {
        let tc_return
        this[0] = +( this[0] !== this[0] )
        this[1] = +( this[1] !== this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static isnan( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = +( v[0] !== v[0] )
        target[1] = +( v[1] !== v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    // ---------------------------
    //      ARITHMETIC
    // ---------------------------

    /** @param {number|vec2Like} x @returns {vec2} */
    add( x ) {
        let tc_return
        tc_numbervec2Like( x )
        tc_return = typeof x === "number" ? this.sadd( x ) : this.vadd( x )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @param {vec2} [target=new vec2] @returns {vec2} */
    static add( v, x, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( x )
        tc_vec21( target )
        tc_return = typeof x === "number" ? vec2.sadd( v, x, target ) : vec2.vadd( v, x, target )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    sadd( s ) {
        let tc_return
        tc_number0( s )
        this[0] += s
        this[1] += s
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static sadd( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        target[0] = v[0] + s
        target[1] = v[1] + s
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    vadd( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] += v[0]
        this[1] += v[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static vadd( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] + v2[0]
        target[1] = v1[1] + v2[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    sub( x ) {
        let tc_return
        tc_numbervec2Like( x )
        tc_return = typeof x === "number" ? this.ssub( x ) : this.vsub( x )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @param {vec2} [target=new vec2] @returns {vec2} */
    static sub( v, x, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( x )
        tc_vec21( target )
        tc_return = typeof x === "number" ? vec2.ssub( v, x, target ) : vec2.vsub( v, x, target )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    ssub( s ) {
        let tc_return
        tc_number0( s )
        this[0] -= s
        this[1] -= s
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static ssub( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        target[0] = v[0] - s
        target[1] = v[1] - s
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    vsub( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] -= v[0]
        this[1] -= v[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static vsub( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] - v2[0]
        target[1] = v1[1] - v2[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    mul( x ) {
        let tc_return
        tc_numbervec2Like( x )
        tc_return = typeof x === "number" ? this.smul( x ) : this.vmul( x )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @param {vec2} [target=new vec2] @returns {vec2} */
    static mul( v, x, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( x )
        tc_vec21( target )
        tc_return = typeof x === "number" ? vec2.smul( v, x, target ) : vec2.vmul( v, x, target )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    smul( s ) {
        let tc_return
        tc_number0( s )
        this[0] *= s
        this[1] *= s
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static smul( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        target[0] = v[0] * s
        target[1] = v[1] * s
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    vmul( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] *= v[0]
        this[1] *= v[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static vmul( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] * v2[0]
        target[1] = v1[1] * v2[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    div( x ) {
        let tc_return
        tc_numbervec2Like( x )
        tc_return = typeof x === "number" ? this.sdiv( x ) : this.vdiv( x )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @param {vec2} [target=new vec2] @returns {vec2} */
    static div( v, x, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( x )
        tc_vec21( target )
        tc_return = typeof x === "number" ? vec2.sdiv( v, x, target ) : vec2.vdiv( v, x, target )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    sdiv( s ) {
        let tc_return
        tc_number0( s )
        this[0] /= s
        this[1] /= s
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static sdiv( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        target[0] = v[0] / s
        target[1] = v[1] / s
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    vdiv( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] /= v[0]
        this[1] /= v[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static vdiv( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] / v2[0]
        target[1] = v1[1] / v2[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    rem( x ) {
        let tc_return
        tc_numbervec2Like( x )
        tc_return = typeof x === "number" ? this.srem( x ) : this.vrem( x )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @param {vec2} [target=new vec2] @returns {vec2} */
    static rem( v, x, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( x )
        tc_vec21( target )
        tc_return = typeof x === "number" ? vec2.srem( v, x, target ) : vec2.vrem( v, x, target )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    srem( s ) {
        let tc_return
        tc_number0( s )
        this[0] %= s
        this[1] %= s
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static srem( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        target[0] = v[0] % s
        target[1] = v[1] % s
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    vrem( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] %= v[0]
        this[1] %= v[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static vrem( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] % v2[0]
        target[1] = v1[1] % v2[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number|vec2Like} x @returns {vec2} */
    pow( x ) {
        let tc_return
        tc_numbervec2Like( x )
        tc_return = typeof x === "number" ? this.spow( x ) : this.vpow( x )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} x @param {vec2} [target=new vec2] @returns {vec2} */
    static pow( v, x, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( x )
        tc_vec21( target )
        tc_return = typeof x === "number" ? vec2.spow( v, x, target ) : vec2.vpow( v, x, target )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    spow( s ) {
        let tc_return
        tc_number0( s )
        this[0] **= s
        this[1] **= s
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static spow( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        target[0] = v[0] ** s
        target[1] = v[1] ** s
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {vec2} */
    vpow( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] **= v[0]
        this[1] **= v[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {vec2} [target=new vec2] @returns {vec2} */
    static vpow( v1, v2, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] ** v2[0]
        target[1] = v1[1] ** v2[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number|vec2Like} m @param {number|vec2Like} a @returns {vec2} */
    fma( m, a ) {
        let tc_return
        tc_numbervec2Like( m )
        tc_numbervec2Like( a )
        tc_return = typeof m === "number"
            ? ( typeof a === "number" ? this.sfma( m, a ) : this.svfma( m, a ) )
            : ( typeof a === "number" ? this.vsfma( m, a ) : this.vfma( m, a ) )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} m @param {number|vec2Like} a @param {vec2} [target=new vec2] @returns {vec2} */
    static fma( v, m, a, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( m )
        tc_numbervec2Like( a )
        tc_vec21( target )
        tc_return = typeof m === "number"
            ? ( typeof a === "number" ? vec2.sfma( v, m, a, target ) : vec2.svfma( v, m, a, target ) )
            : ( typeof a === "number" ? vec2.vsfma( v, m, a, target ) : vec2.vfma( v, m, a, target ) )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} m @param {number} a @returns {vec2} */
    sfma( m, a ) {
        let tc_return
        this[0] = this[0] * m + a
        this[1] = this[1] * m + a
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} m @param {number} a @param {vec2} [target=new vec2] @returns {vec2} */
    static sfma( v, m, a, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = v[0] * m + a
        target[1] = v[1] * m + a
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} m @param {vec2Like} a @returns {vec2} */
    svfma( m, a ) {
        let tc_return
        tc_vec2Like( a )
        this[0] = this[0] * m + a[0]
        this[1] = this[1] * m + a[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} m @param {vec2Like} a @param {vec2} [target=new vec2] @returns {vec2} */
    static svfma( v, m, a, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec2Like( a )
        tc_vec21( target )
        target[0] = v[0] * m + a[0]
        target[1] = v[1] * m + a[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} m @param {number} a @returns {vec2} */
    vsfma( m, a ) {
        let tc_return
        tc_vec2Like( m )
        this[0] = this[0] * m[0] + a
        this[1] = this[1] * m[1] + a
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2Like} m @param {number} a @param {vec2} [target=new vec2] @returns {vec2} */
    static vsfma( v, m, a, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec2Like( m )
        tc_vec21( target )
        target[0] = v[0] * m[0] + a
        target[1] = v[1] * m[1] + a
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} m @param {vec2Like} a @returns {vec2} */
    vfma( m, a ) {
        let tc_return
        tc_vec2Like( m )
        tc_vec2Like( a )
        this[0] = this[0] * m[0] + a[0]
        this[1] = this[1] * m[1] + a[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2Like} m @param {vec2Like} a @param {vec2} [target=new vec2] @returns {vec2} */
    static vfma( v, m, a, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec2Like( m )
        tc_vec2Like( a )
        tc_vec21( target )
        target[0] = v[0] * m[0] + a[0]
        target[1] = v[1] * m[1] + a[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {mat2Like} m @returns {vec2} */
    mmul( m ) {
        let tc_return
        tc_mat2Like( m )
        const c0 = this[0]
        const c1 = this[1]
        this[0] = c0 * m[0] + c1 * m[2]
        this[1] = c0 * m[1] + c1 * m[3]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {mat2Like} m @param {vec2} [target=new vec2] @returns {vec2} */
    static mmul( v, m, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_mat2Like( m )
        tc_vec21( target )
        const c0 = v[0]
        const c1 = v[1]
        target[0] = c0 * m[0] + c1 * m[2]
        target[1] = c0 * m[1] + c1 * m[3]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {(value: number, index: number) => number} fn @returns {vec2} */
    apply( fn ) {
        let tc_return
        this[0] = fn( this[0], 0 )
        this[1] = fn( this[1], 1 )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {(value: number, index: number) => number} fn @param {vec2} [target=new vec2] @returns {vec2} */
    static apply( v, fn, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = fn( v[0], 0 )
        target[1] = fn( v[1], 1 )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    abs() {
        let tc_return
        this[0] = Math.abs( this[0] )
        this[1] = Math.abs( this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    sign() {
        let tc_return
        this[0] = Math.sign( this[0] )
        this[1] = Math.sign( this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    trunc() {
        let tc_return
        this[0] = Math.trunc( this[0] )
        this[1] = Math.trunc( this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    round() {
        let tc_return
        this[0] = Math.round( this[0] )
        this[1] = Math.round( this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    floor() {
        let tc_return
        this[0] = Math.floor( this[0] )
        this[1] = Math.floor( this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    ceil() {
        let tc_return
        this[0] = Math.ceil( this[0] )
        this[1] = Math.ceil( this[1] )
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static abs( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.abs( v[0] )
        target[1] = Math.abs( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static acos( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.acos( v[0] )
        target[1] = Math.acos( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static acosh( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.acosh( v[0] )
        target[1] = Math.acosh( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static asin( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.asin( v[0] )
        target[1] = Math.asin( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static asinh( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.asinh( v[0] )
        target[1] = Math.asinh( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static atan( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.atan( v[0] )
        target[1] = Math.atan( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static atanh( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.atanh( v[0] )
        target[1] = Math.atanh( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static ceil( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.ceil( v[0] )
        target[1] = Math.ceil( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static cbrt( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.cbrt( v[0] )
        target[1] = Math.cbrt( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static expm1( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.expm1( v[0] )
        target[1] = Math.expm1( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static cos( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.cos( v[0] )
        target[1] = Math.cos( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static cosh( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.cosh( v[0] )
        target[1] = Math.cosh( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static exp( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.exp( v[0] )
        target[1] = Math.exp( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static floor( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.floor( v[0] )
        target[1] = Math.floor( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static log( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.log( v[0] )
        target[1] = Math.log( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static log1p( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.log1p( v[0] )
        target[1] = Math.log1p( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static log2( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.log2( v[0] )
        target[1] = Math.log2( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static log10( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.log10( v[0] )
        target[1] = Math.log10( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static round( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.round( v[0] )
        target[1] = Math.round( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static sign( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.sign( v[0] )
        target[1] = Math.sign( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static sin( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.sin( v[0] )
        target[1] = Math.sin( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static sinh( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.sinh( v[0] )
        target[1] = Math.sinh( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static sqrt( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.sqrt( v[0] )
        target[1] = Math.sqrt( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static tan( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.tan( v[0] )
        target[1] = Math.tan( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static tanh( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.tanh( v[0] )
        target[1] = Math.tanh( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static trunc( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.trunc( v[0] )
        target[1] = Math.trunc( v[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    // ---------------------------
    //      PROPERTIES
    // ---------------------------

    /** @returns {number} */
    length() {
        let tc_return
        tc_return = Math.sqrt( this[0] * this[0] + this[1] * this[1] )
        return tc_return
    }

    /** @param {vec2Like} v @returns {number} */
    static length( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = Math.sqrt( v[0] * v[0] + v[1] * v[1] )
        return tc_return
    }

    /** @returns {number} */
    lengthSq() {
        let tc_return
        tc_return = this[0] * this[0] + this[1] * this[1]
        return tc_return
    }

    /** @param {vec2Like} v @returns {number} */
    static lengthSq( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = v[0] * v[0] + v[1] * v[1]
        return tc_return
    }

    // ---------------------------
    //      VECTOR OPS
    // ---------------------------

    /** @param {vec2Like} v @returns {vec2} */
    pointTo( v ) {
        let tc_return
        tc_vec2Like( v )
        this[0] = v[0] - this[0]
        this[1] = v[1] - this[1]
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} from @param {vec2Like} to @param {vec2} [target=new vec2] @returns {vec2} */
    static pointTo( from, to, target = new vec2 ) {
        let tc_return
        tc_vec2Like( from )
        tc_vec2Like( to )
        tc_vec21( target )
        target[0] = to[0] - from[0]
        target[1] = to[1] - from[1]
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    normalize() {
        let tc_return
        const factor = 1 / Math.sqrt( this[0] * this[0] + this[1] * this[1] )
        this[0] *= factor
        this[1] *= factor
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static normalize( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        const factor = 1 / Math.sqrt( v[0] * v[0] + v[1] * v[1] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {number} s @returns {vec2} */
    setLength( s ) {
        let tc_return
        tc_number0( s )
        const factor = s / Math.sqrt( this[0] * this[0] + this[1] * this[1] )
        this[0] *= factor
        this[1] *= factor
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} s @param {vec2} [target=new vec2] @returns {vec2} */
    static setLength( v, s, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( s )
        tc_vec21( target )
        const factor = s / Math.sqrt( v[0] * v[0] + v[1] * v[1] )
        target[0] = v[0] * factor
        target[1] = v[1] * factor
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @returns {number} */
    dot( v ) {
        let tc_return
        tc_vec2Like( v )
        tc_return = this[0] * v[0] + this[1] * v[1]
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {number} */
    static dot( v1, v2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_return = v1[0] * v2[0] + v1[1] * v2[1]
        return tc_return
    }

    /** @param {number} angle @returns {vec2} */
    rotate( angle ) {
        let tc_return
        const sin = Math.sin( angle ), cos = Math.cos( angle )
        const t0 = this[0] * cos - this[1] * sin
        const t1 = this[0] * sin + this[1] * cos
        this[0] = t0
        this[1] = t1
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} angle @param {vec2} [target=new vec2] @returns {vec2} */
    static rotate( v, angle, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        const sin = Math.sin( angle ), cos = Math.cos( angle )
        const t0 = v[0] * cos - v[1] * sin
        const t1 = v[0] * sin + v[1] * cos
        target[0] = t0
        target[1] = t1
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @returns {vec2} */
    rotate90() {
        let tc_return
        const t0 = -this[1]
        const t1 = this[0]
        this[0] = t0
        this[1] = t1
        tc_return = this
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static rotate90( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        const t0 = -v[1]
        const t1 = v[0]
        target[0] = t0
        target[1] = t1
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    // ---------------------------
    //      VECTOR UTILS
    // ---------------------------

    /** @param {vec2Like} v */
    static noop( ...v ) {
        let tc_return
        tc_vec2Like3( v )
        return
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {number} */
    static distance( v1, v2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        tc_return = Math.sqrt( d0 * d0 + d1 * d1 )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @returns {number} */
    static distanceSq( v1, v2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        const d0 = v1[0] - v2[0]
        const d1 = v1[1] - v2[1]
        tc_return = d0 * d0 + d1 * d1
        return tc_return
    }

    /** @param {...(number|vec2Like)} values @returns {vec2} */
    static min( ...values ) {
        let tc_return
        const target = new vec2
        target[0] = Math.min( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.min( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {...(number|vec2Like)} values @returns {vec2} */
    static max( ...values ) {
        let tc_return
        const target = new vec2
        target[0] = Math.max( ...values.map( x => typeof x === "number" ? x : x[0] ) )
        target[1] = Math.max( ...values.map( x => typeof x === "number" ? x : x[1] ) )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number|vec2Like} min @param {number|vec2Like} max @param {vec2} [target=new vec2] @returns {vec2} */
    static clamp( v, min, max, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_numbervec2Like( min )
        tc_numbervec2Like( max )
        tc_vec21( target )
        tc_return = typeof min === "number"
            ? ( typeof max === "number" ? vec2.sclamp( v, min, max, target ) : vec2.svclamp( v, min, max, target ) )
            : ( typeof max === "number" ? vec2.vsclamp( v, min, max, target ) : vec2.vclamp( v, min, max, target ) )
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} min @param {number} max @param {vec2} [target=new vec2] @returns {vec2} */
    static sclamp( v, min, max, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( min )
        tc_number0( max )
        tc_vec21( target )
        target[0] = Math.min( Math.max( v[0], min ), max )
        target[1] = Math.min( Math.max( v[1], min ), max )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {number} min @param {vec2Like} max @param {vec2} [target=new vec2] @returns {vec2} */
    static svclamp( v, min, max, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_number0( min )
        tc_vec2Like( max )
        tc_vec21( target )
        target[0] = Math.min( Math.max( v[0], min ), max[0] )
        target[1] = Math.min( Math.max( v[1], min ), max[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2Like} min @param {number} max @param {vec2} [target=new vec2] @returns {vec2} */
    static vsclamp( v, min, max, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec2Like( min )
        tc_number0( max )
        tc_vec21( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max )
        target[1] = Math.min( Math.max( v[1], min[1] ), max )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2Like} min @param {vec2Like} max @param {vec2} [target=new vec2] @returns {vec2} */
    static vclamp( v, min, max, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec2Like( min )
        tc_vec2Like( max )
        tc_vec21( target )
        target[0] = Math.min( Math.max( v[0], min[0] ), max[0] )
        target[1] = Math.min( Math.max( v[1], min[1] ), max[1] )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v @param {vec2} [target=new vec2] @returns {vec2} */
    static saturate( v, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v )
        tc_vec21( target )
        target[0] = Math.min( Math.max( v[0], 0 ), 1 )
        target[1] = Math.min( Math.max( v[1], 0 ), 1 )
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

    /** @param {vec2Like} v1 @param {vec2Like} v2 @param {number} t @param {vec2} [target=new vec2] @returns {vec2} */
    static mix( v1, v2, t, target = new vec2 ) {
        let tc_return
        tc_vec2Like( v1 )
        tc_vec2Like( v2 )
        tc_vec21( target )
        target[0] = v1[0] * ( 1 - t ) + v2[0] * t
        target[1] = v1[1] * ( 1 - t ) + v2[1] * t
        tc_return = target
        tc_vec2( tc_return )
        return tc_return
    }

}