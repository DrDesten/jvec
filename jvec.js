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
        let rcp = 1./scalar
        for (let i = 0; i < arr.length; i++) {
            arr[i] *= rcp
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

    // Generalized Arithmetic
    arrOPS(arr, func) { // Scalar Operation
        for (let i = 0; i < arr.length; i++) {
            arr[i] = func(arr[i])
        }
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

class vmath extends jvec_utils {
    constructor() {
        super()
    }

    // Basic Arithmetic
    add(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.ADD(v1.vec, v2)) }
        else                        { return  (this.arrADD(v1.vec, v2.vec)) }
    }
    sub(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.SUB(v1.vec, v2)) }
        else                        { return  (this.arrSUB(v1.vec, v2.vec)) }
    }
    mul(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.MUL(v1.vec, v2)) }
        else                        { return  (this.arrMUL(v1.vec, v2.vec)) }
    }
    div(v1, v2) { 
        if (typeof(v2) == "number") { return  (this.DIV(v1.vec, v2)) }
        else                        { return  (this.arrDIV(v1.vec, v2.vec)) }
    }

    // Generalized Component Operation
    cop(v, op) {
        return this.arrOPS(v.vec, op)
    }
    
    // Vector Arithmetic
    dot(v1, v2) {
        return arrDOT(v1.vec, v2.vec)
    }
    cross(v1, v2) {
        return arrCROSS(v1.vec, v2.vec)
    }
}

class v {

    constructor() {
        const tn = "number"
        const to = "object"
    }

    errDM(op, d1, d2)         { return `${op} > Dimension Mismatch: ${d1} ≠ ${d2}` } 
    errTY(op, varname, t, et) { return `${op} > Type Mismatch: ${varname}(${t}) must be ${et}` } 

    // Array Arithmetic (private use)
    ADD(arr = [], val) {
        if (typeof(val) == tn)        return arr.map(v => v + val)
        if (val.length == arr.length) return arr.map((v, i) => v + val[i])
        else throw this.errDM("Addition", arr.length, val.length)
    }
    SUB(arr = [], val) {
        if (typeof(val) == tn)        return arr.map(v => v - val)
        if (val.length == arr.length) return arr.map((v, i) => v - val[i])
        else throw this.errDM("Subtraction", arr.length, val.length)
    }
    MUL(arr = [], val) {
        if (typeof(val) == tn)        return arr.map(v => v * val)
        if (val.length == arr.length) return arr.map((v, i) => v * val[i])
        else throw this.errDM("Multiplication", arr.length, val.length)
    }
    DIV(arr = [], val) {
        if (typeof(val) == tn)        return arr.map(v => v / val)
        if (val.length == arr.length) return arr.map((v, i) => v / val[i])
        else throw this.errDM("Division", arr.length, val.length)
    }

    DOT(arr1 = [], arr2 = []) {
        if (arr1.length == arr2.length) return arr1.reduce((prev, curr, i) => curr * arr2[i] + prev, 0)
        else throw this.errDM("Dot Product", arr1.length, arr2.length)
    }

    CROSS(arr1 = [], arr2 = []) {
        if (arr1.length == arr2.length == 2) return (arr1[0]*arr2[1]) - (arr2[0]*arr1[1])
        else throw this.errDM("Cross Product", arr1.length, `${arr2.length} ≠ 2`)
    }


    // Basic Arithmetic (public)

    dot(v1, v2) {
        if (v1.obj == v2.obj == "vector") return this.DOT(v1.vec, v2.vec)
    }

    cross(v1, v2) {
        if (v1.obj == v2.obj == "vector") return this.CROSS(v1.vec, v2.vec)
    }

}

class vec2 extends v {
    constructor(x, y = undefined) {
        super()

        this.vec = [0.0,0.0]
        this.obj = "vector"

        if (y == undefined) {
            if (typeof(x) == tn) this.vec = [x,x]
            if (typeof(x) == to) this.vec = x
            else throw this.errTY("Constructor", "x", typeof(x), "number/object")
        } else {
            if (typeof(x) == tn && typeof(y) == tn) this.vec = [x,y]
            else if (typeof(x) != tn) throw this.errTY("Constructor", "x", typeof(x), tn)
            else if (typeof(y) != tn) throw this.errTY("Constructor", "y", typeof(y), tn)
        }
    }

    get x() { return this.vec[0] }
    get y() { return this.vec[0] }

    get components() { return this.vec }
    get dimension()  { return this.vec.length }
    get sqmag()      { return this.DOT(this.vec, this.vec) }
    get length()     { return Math.sqrt(this.DOT(this.vec, this.vec)) }

    normalize() {
        this.vec = this.MUL(this.vec, 1. / this.length())
    }

    a(v) {
        if (typeof(v) == tn) this.vec = this.ADD(this.vec, v)
        else                 this.vec = this.ADD(this.vec, v.vec)
    }
    s(v) {
        if (typeof(v) == tn) this.vec = this.SUB(this.vec, v)
        else                 this.vec = this.SUB(this.vec, v.vec)
    }
    m(v) {
        if (typeof(v) == tn) this.vec = this.MUL(this.vec, v)
        else                 this.vec = this.MUL(this.vec, v.vec)
    }
    d(v) {
        if (typeof(v) == tn) this.vec = this.DIV(this.vec, v)
        else                 this.vec = this.DIV(this.vec, v.vec)
    }

}