class jvec_utils {

    // Basic Array and Scalar Arithmetic
    ADD(arr, scalar) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] += scalar
        }
        return arr
    }
    SUB(arr, scalar) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] -= scalar
        }
        return arr
    }
    MUL(arr, scalar) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] *= scalar
        }
        return arr
    }
    DIV(arr, scalar) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] /= scalar
        }
        return arr
    }

    // Basic Array and Array Arithmetic
    arrADD(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            arr1[i] += arr2[i]
        }
        return arr1
    }
    arrSUB(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            arr1[i] -= arr2[i]
        }
        return arr1
    }
    arrMUL(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            arr1[i] *= arr2[i]
        }
        return arr1
    }
    arrDIV(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            arr1[i] /= arr2[i]
        }
        return arr1
    }

    // Vector Arithmetic
    arrDOT(arr1, arr2) {
        let result = 0.0
        for (let i = 0; i < arr1.length; i++) {
            result += arr1[i] * arr2[i]
        }
        return result
    }
    arrCROSS(arr1, arr2) {
        switch(arr1.length) {
            case 2: // Returns Magnitude of 3d cross product
                return (arr1[0]*arr2[1]) - (arr2[0]*arr1[1]) 
            case 3: // Returns 3d cross product
                return [
                    arr1[1]*arr2[2] - arr1[2]*arr2[1],
                    arr1[2]*arr2[0] - arr1[0]*arr2[2],
                    arr1[0]*arr2[1] - arr1[1]*arr2[0]
                ]
            default:
                throw `jvec_utils: Cross-Product failed\nWrong Dimension: ${arr1.length}d\nOnly 2d and 3d vectors accepted`
        }
    }
}

class vmath {
    constructor() {
        this.u = jvec_utils()
    }

    // Basic Arithmetic
    add(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.u.ADD(v1.vec, v2)) }
        else                        { return  (this.u.arrADD(v1.vec, v2.vec)) }
    }
    sub(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.u.SUB(v1.vec, v2)) }
        else                        { return  (this.u.arrSUB(v1.vec, v2.vec)) }
    }
    mul(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.u.MUL(v1.vec, v2)) }
        else                        { return  (this.u.arrMUL(v1.vec, v2.vec)) }
    }
    div(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.u.DIV(v1.vec, v2)) }
        else                        { return  (this.u.arrDIV(v1.vec, v2.vec)) }
    }
    
    // Vector Arithmetic
    dot(v1, v2) {
        return arrDOT(v1.vec, v2.vec)
    }
    cross(v1, v2) {
        return arrCROSS(v1.vec, v2.vec)
    }
}


class vec2 {
    constructor(x, y = 0.0) {
        this.u = new jvec_utils()
        if (typeof(x) == "number") { this.vec = [x, y] }
        else                       { this.vec = x }
    }

    get components() {
        return this.vec
    }
    get dimension() {
        return this.vec.length()
    }
    get sqmag() {
        return this.u.arrDOT(this.vec, this.vec)
    }
    get length() {
        return Math.sqrt(this.u.arrDOT(this.vec, this.vec))
    }
    normalize() {
        this.vec = this.u.MUL(this.vec, 1. / this.length())
    }

    add(v) {
        this.vec = this.u.arrADD(this.vec, v)
    }
    sub(v) {
        this.vec = this.u.arrSUB(this.vec, v)
    }
    mul(v) {
        this.vec = this.u.arrMUL(this.vec, v)
    }
    div(v) {
        this.vec = this.u.arrDIV(this.vec, v)
    }

}