import ParticleInplace from "./performance/particle_bench_inplace.js"
import ParticleClone from "./performance/particle_bench_clone.js"
import Conversion from "./performance/conversion_bench.js"

console.info( ParticleInplace( 1_000, 1_000 ).toString() )
console.info( ParticleInplace( 1_000, 2_000 ).toString() )
console.info( ParticleClone( 1_000, 1_000 ).toString() )
console.info( ParticleClone( 1_000, 2_000 ).toString() )
console.info( Conversion( 1_000, 1_000 ).toString() )
console.info( Conversion( 1_000, 2_000 ).toString() )