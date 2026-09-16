const test = require("node:test");
const assert = require("node:assert/strict");
const { add, subtract, multiply, divide } = require("../src/math");

test.describe("Math functions unit tests", () => {
  test.it("should add two numbers correctly", () => {
    assert.strictEqual(add(2, 3), 5);
    assert.strictEqual(add(-1, 1), 0);
  });

  test.it("should subtract two numbers correctly", () => {
    assert.strictEqual(subtract(10, 4), 6);
    assert.strictEqual(subtract(0, 5), -5);
  });

  test.it("should multiply two numbers correctly", () => {
    assert.strictEqual(multiply(4, 5), 20);
    assert.strictEqual(multiply(-2, 3), -6);
  });

  test.it("should divide two numbers correctly", () => {
    assert.strictEqual(divide(10, 2), 5);
    assert.strictEqual(divide(9, 3), 3);
  });

  test.it("should throw an error when dividing by zero", () => {
    assert.throws(
      () => divide(10, 0),
      {
        name: "Error",
        message: "Cannot divide by zero",
      }
    );
  });
});
