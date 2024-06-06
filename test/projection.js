import { vec2, vec3, vec4 } from "../bin/vec.js"

function projectCanonical( vector, target ) {
    const norm = vec2.normalize( target )
    const tan = vec2.rotate90( norm )
    const n = vec2.dot( vector, norm )
    const t = vec2.dot( vector, tan )
    return { norm: vec2.mul( norm, n ), tan: vec2.mul( tan, t ) }
}

function projectOptimized( vector, target ) {
    const norm = vec2.mul( target, vec2.dot( target, vector ) / vec2.dot( target, target ) )
    const tan = vec2.sub( vector, norm )
    return { norm, tan }
}

for ( let i = 0; i < 100; i++ ) {
    const vector = vec2.randomNorm()
    const target = vec2.randomNorm()
    const { norm: bnorm, tan: btan } = projectCanonical( vector, target )
    const { norm: onorm, tan: otan } = projectOptimized( vector, target )
    console.log( vec2.sub( bnorm, onorm ).length().toPrecision( 1 ), vec2.sub( btan, otan ).length().toPrecision( 1 ) )
}