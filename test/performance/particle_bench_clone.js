import { vec2 } from "../../bin/vec.js"
import { PerformanceResult } from "./performance.js"

class Particle {
    constructor( pos ) {
        this.pos = pos
        this.vel = new vec2
        this.acc = new vec2
    }

    update() {
        this.vel = vec2.add( this.vel, this.acc )
        this.pos = vec2.add( this.pos, this.vel )
        this.acc = new vec2
    }
}

export default function bench( particleCount, simulationSteps ) {
    const particles = Array.from( { length: particleCount }, () => new Particle( vec2.randomNorm() ) )
    const start = performance.now()
    for ( let i = 0; i < simulationSteps; i++ ) {
        for ( const particle of particles ) {
            particle.update()
        }
    }
    const end = performance.now()
    return new PerformanceResult( "Particle Bench - 2D Clone", end - start, { particleCount, simulationSteps } )
}