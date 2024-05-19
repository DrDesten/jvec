/** Box-Muller transform to generate a standard normal distributed random variable */
export function gaussianRandom() {
    let u = 0, v = 0
    while ( u === 0 ) u = Math.random() // Convert [0,1) to (0,1)
    while ( v === 0 ) v = Math.random()
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
}