import ParticleInplace from "./performance/particle_bench_inplace.js"

console.info( ParticleInplace( 10_000, 1_000 ).toString() )
console.info( ParticleInplace( 10_000, 2_000 ).toString() )