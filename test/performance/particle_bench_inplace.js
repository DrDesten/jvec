import { vec2 } from "../../bin/vec.js"
import { PerformanceResult } from "./performance.js"

class Particle {
    constructor( pos ) {
        this.pos = pos
        this.vel = new vec2
        this.acc = new vec2
    }

    update() {
        this.vel.add( this.acc )
        this.pos.add( this.vel )
        this.acc.set( 0, 0 )
    }
}

export default function bench( particleCount, simulationSteps ) {
    const start = performance.now()
    const particles = Array.from( { length: particleCount }, () => new Particle( vec2.randomNorm() ) )
    for ( let i = 0; i < simulationSteps; i++ ) {
        for ( const particle of particles ) {
            particle.update()
        }
    }
    const end = performance.now()
    return new PerformanceResult( "Particle Bench - 2D Inplace", end - start, { particleCount, simulationSteps } )
}