import { vec2, vec3, vec4 } from "../bin/vec.js"

/**
 * @typedef {typeof vec2|typeof vec3|typeof vec4} BenchmarkType
 * @typedef {Object} Benchmark
 * @property {string} name
 * @property {(type: BenchmarkType, random1: number[], random2: number) => void} fn
 */

/** @type {Benchmark[]} */
const benchmarks = [
    {
        name: "default construction",
        fn: function ( type ) {
            new type()
        }
    },
    {
        name: "construction with numbers",
        fn: function ( type, random1 ) {
            new type( random1[0], random1[1], random1[2], random1[3] )
        }
    },
    {
        name: "construction with array",
        fn: function ( type, random1 ) {
            new type( random1 )
        }
    },
    {
        name: "construction with xyz",
        fn: function ( type, random1 ) {
            new type( { x: random1[0], y: random1[1], z: random1[2], w: random1[3] } )
        }
    },
    {
        name: "construction with rgb",
        fn: function ( type, random1 ) {
            new type( { r: random1[0], g: random1[1], b: random1[2], a: random1[3] } )
        }
    },
    {
        name: "addition",
        fn: function ( type, random1, random2 ) {
            type.add( random1, random2 )
        }
    },
    {
        name: "multiplication",
        fn: function ( type, random1, random2 ) {
            type.mul( random1, random2 )
        }
    },
    {
        name: "division",
        fn: function ( type, random1, random2 ) {
            type.div( random1, random2 )
        }
    }
]

/** @param {typeof vec2|typeof vec3|typeof vec4} type @param {number} iterations  */
function runBench( type, iterations ) {
    const results = []
    for ( const { name, fn } of benchmarks ) {
        const random1 = Array.from( { length: 100 }, () => Math.random() )
        const random2 = Array.from( { length: 100 }, () => Math.random() )

        for ( let i = 0; i < 100; i++ ) fn( type, random1, random2 ) // Warmup

        const start = performance.now()
        for ( let i = 0; i < iterations; i++ )
            fn( type, random1, random2 )
        const end = performance.now()

        results.push( { name, time: ( end - start ) / iterations } )
    }
    return results
}

const results = [
    [vec2, runBench( vec2, 1e5 )],
    [vec3, runBench( vec3, 1e5 )],
    [vec4, runBench( vec4, 1e5 )],
]

for ( const [type, result] of results ) {
    console.info( `Benchmark Results for ${type.prototype.constructor.name}:` )
    for ( const { name, time } of result ) {
        const units = [
            [time * 1_000_000, "ns"],
            [time * 1_000, "μs"],
            [time, "ms"],
            [time / 1_000, "s"],
        ]
        const unit = units.find( ( [time] ) => time < 10 )
        console.info( `  - ${name}: ${unit[0].toFixed( 3 )}${unit[1]}` )
    }
}