import { mat2, mat3, mat4 } from "../bin/mat.js"


{ // mat2
    const mat = new mat2
    console.log( mat )
    console.log( mat.clone() )

    console.assert( mat2.eq( mat, mat ), "eq" )
    console.assert( !mat2.neq( mat, mat ), "neq" )
    console.assert( mat2.eq( mat, mat.clone() ), "clone" )

    console.assert( mat2.eq( mat, new mat2().mmul( mat ) ), "identity mmul" )
    console.assert( mat2.eq( mat, mat2.scale( [-2, 2] ).mmul( mat2.scale( [-.5, .5] ) ) ), "scale mmul" )

    {
        const identity = new mat2
        const scaled = mat2.scale( [2, 2] )

        const i_identity = identity.clone().inverse()
        const i_scaled = scaled.clone().inverse()

        console.assert( mat2.eq( i_identity, identity ), "identity inverse" )
        console.assert( mat2.eq( i_scaled, mat2.scale( [.5, .5] ) ), "scaled inverse" )
        console.assert( mat2.eq( scaled.clone().mmul( i_scaled ), identity ), "scaled inverse mmul" )
    }

}

{// mat4
    console.assert( mat4.eq( new mat4, new mat4 ) )
    console.assert( mat4.eq( mat4.translate( [1, -2, 3] ), mat4.translate( [-1, 2, -3] ).inverse() ) )

    console.log( mat4.translate( [1, 2, 3] ).toArray() )
    console.log( mat4.translate( [1, 2, 3] ).inverse().toArray() )
}