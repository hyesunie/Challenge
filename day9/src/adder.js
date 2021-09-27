const gate = require("./gate"); //import gate function

exports.halfAdder = function (bitA, bitB) {
  //parameter type check
  if (!gate.paramsBooleanCheck(bitA, bitB)) return gate.typeError;
  return [bitA && bitB, gate.xor(bitA, bitB)];
};

exports.fullAdder = function (bitA, bitB, carryIn) {
  //parameter type check
  if (!gate.paramsBooleanCheck(bitA, bitB, carryIn)) return gate.typeError;

  [firstCarryOut, firstSum] = this.halfAdder(bitA, bitB);
  [secondCarryOut, secondSum] = this.halfAdder(carryIn, firstSum);
  return [firstCarryOut || secondCarryOut, secondSum];
};

exports.byteAdder = function (arrA, arrB) {
  //   //parameter type check
  //   if (
  //     gate.nand(
  //       gate.paramsBooleanArrayCheck(arrA) && gate.paramsBooleanArrayCheck(arrB)
  //     )
  //   )
  //     return gate.typeError;

  //   //parameter length check
  //   if (arrA.length !== arrB.length) return gate.typeError;

  let result = [];
  let carryIn = false;
  for (let i = 0; i < arrA.length; i++) {
    [carryOut, sum] = this.fullAdder(arrA[i], arrB[i], carryIn);
    carryIn = carryOut;
    result.push(sum);
  }
  result.push(carryIn);
  return result;
};
