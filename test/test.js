import util from "util"
import { vec2, vec3, vec4 } from "../bin/vec.js"

console.info( "vec2:", Object.getOwnPropertyNames( vec2.prototype ).length, "member functions and getters/setters" )
console.info( "vec3:", Object.getOwnPropertyNames( vec3.prototype ).length, "member functions and getters/setters" )
console.info( "vec4:", Object.getOwnPropertyNames( vec4.prototype ).length, "member functions and getters/setters" )

/** @param {...(any[]|any)[]} tests  */
function defineTests( ...tests ) {
    const constructed = {
        vec2: tests.map( test => test.map( args => args instanceof Array ? new vec2( ...args ) : args ) ),
        vec3: tests.map( test => test.map( args => args instanceof Array ? new vec3( ...args ) : args ) ),
        vec4: tests.map( test => test.map( args => args instanceof Array ? new vec4( ...args ) : args ) ),

        test( mapFn ) {
            /** @param {any[][]} tests */
            function test( tests ) {
                for ( const test of tests ) {
                    const baseline = test[0]
                    const cases = test.slice( 1 ).map( mapFn )
                    for ( const case_ of cases ) {
                        console.assert(
                            vec2.eq( baseline, case_ ),
                            `Test Failed\n${baseline} != ${case_}`
                        )
                    }
                }
            }
            test( this.vec2 )
            test( this.vec3 )
            test( this.vec4 )
        }
    }
    return constructed
}

const constructorTests = [
    [[0, 0, 0, 0], [], [[]], [{}]],
    [[1, 1, 1, 1], [1]],
    [[2, 2, 2, 2], [2]],

    [[1, 0, 0, 0], [1, 0], [[1]], [{ x: 1 }]],
    [[1, 2, 0, 0], [1, 2], [[1, 2]], [{ x: 1, y: 2 }]],
    [[1, 2, 3, 0], [1, 2, 3], [[1, 2, 3]], [{ x: 1, y: 2, z: 3 }]],
    [[1, 2, 3, 4], [1, 2, 3, 4], [[1, 2, 3, 4]], [{ x: 1, y: 2, z: 3, w: 4 }]],
]

for ( const T of [vec2, vec3, vec4] ) {
    const typename = T.prototype.constructor.name
    for ( const test of constructorTests ) {
        const results = test.map( args => ( {
            args: args,
            argsString: util.inspect( args ).slice( 1, -1 ),
            result: new T( ...args ),
        } ) )
        const baseline = results[0]
        for ( const result of results ) {
            console.assert(
                T.eq( baseline.result, result.result ),
                `Constructor Test Failed\nnew ${typename}(${result.argsString}) != new ${typename}(${baseline.argsString})`
            )
        }
    }
}


const spreadTest = [...new vec2( 1 ), ...new vec3( 1 ), ...new vec4( 1 )]
console.assert(
    spreadTest.length === 2 + 3 + 4 && spreadTest.every( x => x === 1 ),
    `Spread Test Failed: [${spreadTest}]`
)

const minmaxTest = [
    []
]

const colorTests = [
    [[], "#000000"],
    [[1], "#ffffff"],
]

