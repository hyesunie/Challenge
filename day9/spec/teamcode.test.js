const { sum, isEven, appendLazy, delay } = require("../src/source.js");
const _ = require("lodash");
const { test, assert } = require("../lib/tester.js");
const {
  nand,
  arrayCheck,
  paramsBooleanArrayCheck,
  booleanCheck,
  xor,
} = require("../src/gate.js");

test("(nand) equal check!!", () => {
  assert.equal(nand(false, false), true);
  assert.equal(nand(true, false), true);
  assert.equal(nand(false, true), true);
  assert.equal(nand(true, true), false);
});

test("(arrayCheck) nonEqual check!!", () => {
  assert.notEqual(arrayCheck("String"), true);
  assert.notEqual(arrayCheck(0), true);
  assert.notEqual(arrayCheck(null), true);
  assert.notEqual(arrayCheck(undefined), true);
  assert.notEqual(arrayCheck(true), true);
  assert.notEqual(arrayCheck({ object: "object" }), true);
});

test("(arrayCheck) equal check!!", () => {
  assert.equal(arrayCheck([1, 2, 3]), true);
  assert.equal(arrayCheck([1, 2, 3, [6, 7, 8], 9]), true);
  assert.equal(arrayCheck([1, 2, 3, { i: 2 }, 9]), true);
  assert.equal(arrayCheck([1, 2, 3, null, 9]), true);
  assert.equal(arrayCheck([]), true);
  assert.equal(arrayCheck([undefined]), true);
});

test("(paramsBooleanArrayCheck) equal check!!", () => {
  assert.equal(paramsBooleanArrayCheck([true, false, true]), true);
  assert.equal(paramsBooleanArrayCheck([true, [false, true], false]), true); // false
});

test("(booleanCheck) nonEqual check!!", () => {
  assert.notEqual(booleanCheck(0), true);
  assert.notEqual(booleanCheck("String"), true);
  assert.notEqual(booleanCheck(null), true);
  assert.notEqual(booleanCheck(undefined), true);
  assert.notEqual(booleanCheck([1, 2]), true);
  assert.notEqual(booleanCheck({ object: true }), true);
});

test("(xor) equal check!!", () => {
  assert.equal(xor(false, false), false);
  assert.equal(xor(true, false), true);
  assert.equal(xor(false, true), true);
  assert.equal(xor(true, true), false);
});
