class v {

    errDM(op, d1, d2)         { return `${op} > Dimension Mismatch: ${d1} ≠ ${d2}` } 
    errTY(op, varname, t, et) { return `${op} > Type Mismatch: ${varname}(${t}) must be ${et}` } 

    // Array Arithmetic (private use)
    ADD(arr = [], val) {
        if (typeof(val) == "number")  return arr.map(v => v + val)
        if (val.length == arr.length) return arr.map((v, i) => v + val[i])
        else throw this.errDM("Addition", arr.length, val.length)
    }
    SUB(arr = [], val) {
        if (typeof(val) == "number")  return arr.map(v => v - val)
        if (val.length == arr.length) return arr.map((v, i) => v - val[i])
        else throw this.errDM("Subtraction", arr.length, val.length)
    }
    MUL(arr = [], val) {
        if (typeof(val) == "number")  return arr.map(v => v * val)
        if (val.length == arr.length) return arr.map((v, i) => v * val[i])
        else throw this.errDM("Multiplication", arr.length, val.length)
    }
    DIV(arr = [], val) {
        if (typeof(val) == "number")  return arr.map(v => v / val)
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
            if (typeof(x) == "number") this.vec = [x,x]
            if (typeof(x) == "object") this.vec = x
            else throw this.errTY("Constructor", "x", typeof(x), "number/object")
        } else {
            if (typeof(x) == "number" && typeof(y) == "number") this.vec = [x,y]
            else if (typeof(x) != "number") throw this.errTY("Constructor", "x", typeof(x), "number")
            else if (typeof(y) != "number") throw this.errTY("Constructor", "y", typeof(y), "number")
        }
    }

    get x() { return this.vec[0] }
    get y() { return this.vec[0] }
    get xx() { return new vec2([this.vec[0],this.vec[0]]) }
    get xy() { return new vec2([this.vec[0],this.vec[1]]) }
    get yx() { return new vec2([this.vec[1],this.vec[0]]) }
    get yy() { return new vec2([this.vec[1],this.vec[1]]) }

    get components() { return this.vec }
    get dimension()  { return this.vec.length }
    get sqmag()      { return this.DOT(this.vec, this.vec) }
    get length()     { return Math.sqrt(this.DOT(this.vec, this.vec)) }

    normalize() {
        this.vec = this.MUL(this.vec, 1. / this.length)
    }

    a(v) {
        if (typeof(v) == "number") this.vec = this.ADD(this.vec, v)
        else                       this.vec = this.ADD(this.vec, v.vec)
    }
    s(v) {
        if (typeof(v) == "number") this.vec = this.SUB(this.vec, v)
        else                       this.vec = this.SUB(this.vec, v.vec)
    }
    m(v) {
        if (typeof(v) == "number") this.vec = this.MUL(this.vec, v)
        else                       this.vec = this.MUL(this.vec, v.vec)
    }
    d(v) {
        if (typeof(v) == "number") this.vec = this.DIV(this.vec, v)
        else                       this.vec = this.DIV(this.vec, v.vec)
    }

}