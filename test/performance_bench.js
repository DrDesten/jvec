import ParticleInplace from "./performance/particle_bench_inplace.js"
import ParticleClone from "./performance/particle_bench_clone.js"

console.info( ParticleInplace( 10_000, 1_000 ).toString() )
console.info( ParticleInplace( 10_000, 2_000 ).toString() )
console.info( ParticleClone( 10_000, 1_000 ).toString() )
console.info( ParticleClone( 10_000, 2_000 ).toString() )