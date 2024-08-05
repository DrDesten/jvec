import { vec2 } from "../../bin/vec.js"
import { PerformanceResult } from "./performance.js"

export default function bench( count, repetitions ) {
    const vectors = Array.from( { length: count }, () => new vec2 )
    const start = performance.now()
    for ( let i = 0; i < repetitions; i++ ) {
        for ( const v of vectors ) {
            v.toArray()
            v.toFloat32Array()
            v.toFloat64Array()
            v.toInt8Array()
            v.toInt16Array()
            v.toInt32Array()
            v.toUint8Array()
            v.toUint8ClampedArray()
            v.toUint16Array()
            v.toUint32Array()
        }
    }
    const end = performance.now()
    return new PerformanceResult( "Conversion Bench", end - start, { count, repetitions } )
}