import { strict as assert }  from "assert"
import { assign, binary, index } from "./codegenutils.js";

class Tester {
    constructor() { this.tests = [] }
    addTest(description, fn) {
        this.tests.push({ description, fn });
    }
    runTests() {
        this.tests.forEach((test, index) => {
            try {
                test.fn();
                console.log(`Test ${index + 1}: ${test.description} - \x1b[32mpassed\x1b[0m`);
            } catch (error) {
                console.error(`Test ${index + 1}: ${test.description} - \x1b[31mfailed\x1b[0m`);
                if (error instanceof assert.AssertionError) {
                    console.error(`AssertionError: ${error.message}`);
                    //console.error(`Expected: ${error.expected}`);
                    //console.error(`Actual: ${error.actual}`);
                    //console.error(`Operator: ${error.operator}`);
                } else {
                    console.error(error);
                }
            }
        })
    }

    // Custom assertion method
    static assertAllEqual(...values) {
        for (let i = 1; i < values.length; i++) {
            assert.equal(values[i], values[0], `Value at index ${i} (${values[i]}) is not equal to the first value (${values[0]})`);
        }
    }
}

/*
API idea


# Primitive Usage

## index: returns function to index into variable
index("x") returns f // f(1) returns "a[1]"

## binary: returns function to create binary operation
binary("+") returns f // f(1,2) returns "1 + 2"

## assign: returns function to create assignment
assign("x") returns f // f(2) returns "x = 2"

# Composite Usage

## binary: returns function to create binary operation
binary("+")(index("a"), index("b")) returns f // f(1,2) returns "a[1] + b[2]"
binary("+")(index("a"),          1) returns f // f(2) returns "a[1] + 1"
binary("+")(1,          index("a")) returns f // f(1) returns "1 + a[2]"

## assign: returns function to create assignment
assign("x",        index("a")) returns f // f(1)   returns "x = a[1]"
assign(index("x"), index("a")) returns f // f(1,2) returns "x[1] = a[2]"

assign(index("this"), binary("+")(index("a"), index("b"))) returns f 
    f(1,2,3) returns "this[1] = a[2] + b[3]"


# Currying
index("x")(1) === index("x", 1)
binary("+")(1)(2) === binary("+", 1)(2) === binary("+", 1, 2) === binary("+")(1, 2)


*/

const tester = new Tester()

tester.addTest("primitive index", ()=>{
    const f = index("x")
    assert.equal(typeof f, "function")
    assert.equal(f(1), "x[1]")
})
tester.addTest("primitive binary", ()=>{
    const f = binary("+")
    assert.equal(typeof f, "function")
    assert.equal(f(1,2), "1 + 2")
})
tester.addTest("primitive assign", ()=>{
    const f = assign("x")
    assert.equal(typeof f, "function")
    assert.equal(f(2), "x = 2")
})

tester.addTest("composite binary", ()=>{
    const f = binary("+")
    const c = f(index("a"), index("b"))
    assert.equal(typeof c, "function")
    assert.equal(c(1,2), "a[1] + b[2]")
})
tester.addTest("mixed binary", ()=>{
    const f = binary("+")
    const c1 = f(index("a"), 1)
    const c2 = f(1, index("a"))
    assert.equal(typeof c1, "function")
    assert.equal(c1(1), "a[1] + 1")
    assert.equal(typeof c2, "function")
    assert.equal(c2(2), "1 + a[2]")
})

tester.addTest("composite assign", ()=>{
    const c1 = assign("x", index("a"))
    const c2 = assign(index("x"), index("a"))
    assert.equal(typeof c1, "function")
    assert.equal(c1(1), "x = a[1]")
    assert.equal(typeof c2, "function")
    assert.equal(c2(1,2), "x[1] = a[2]")
})
tester.addTest("composite binary assign", ()=>{
    const f = assign(index("this"), binary("+")(index("a"), index("b")))
    assert.equal(typeof f, "function")
    assert.equal(f(1,2,3), "this[1] = a[2] + b[3]")
})

tester.addTest("currying", ()=>{
    Tester.assertAllEqual(
        index("x")(1),
        index("x", 1)
    )
    Tester.assertAllEqual(
        binary("+")(1)(2),
        binary("+", 1)(2),
        binary("+", 1, 2),
        binary("+")(1, 2)
    )
})

tester.runTests()