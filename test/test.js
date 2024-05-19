import util from "util"
import { vec2, vec3, vec4 } from "../bin/vec.js"

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
                T.equals( baseline.result, result.result ),
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

const colorTests = [
    [[], "#000000"],
    [[1], "#ffffff"],
]
