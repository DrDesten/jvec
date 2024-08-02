export class PerformanceResult {
    /**
     * @param {string} identifier Identifier of the performance test
     * @param {number} totalTime Total runtime in ms
     * @param {{[name: string]: number}} [correctionalFactors={}] Correctional factors
     */
    constructor( identifier, totalTime, correctionalFactors = {} ) {
        this.identifier = identifier
        this.total = totalTime
        this.factors = correctionalFactors
        this.factor = 1 / Object.values( correctionalFactors ).reduce( ( a, b ) => a * b, 1 )
        this.relative = this.total * this.factor
    }

    toString() {
        let strings = [
            `${this.identifier} {`,
            `    result: ${this.relative.toPrecision( 4 )} ms/op`,
            `    total: ${this.total.toPrecision( 4 )} ms`,
            /* `    factors: {`,
            ...Object.entries( this.factors ).map( ( [key, value] ) => `        ${key}: ${value}` ),
            `    }`, */
            `}`
        ]
        return strings.join( '\n' )
    }
}