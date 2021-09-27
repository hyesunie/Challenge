const typeError = "올바른 매개변수를 입력하세요";
const booleanCheck = (param) =>
  Object.prototype.toString.call(param) === "[object Boolean]";
const arrayCheck = (param) =>
  Object.prototype.toString.call(param) === "[object Array]";

const paramsBooleanCheck = function (...params) {
  result = true;
  for (let param of params) {
    if (result === false) break;
    result = result && booleanCheck(param);
  }
  return result;
};
const paramsBooleanArrayCheck = function (arr) {
  result = arrayCheck(arr);
  for (let ele of arr) {
    if (result === false) break;
    result = result && booleanCheck(ele);
  }
  return result;
};

const nand = function (bitA, bitB) {
  //parameter type check
  if (!paramsBooleanCheck(bitA, bitB)) return typeError;
  return !(bitA && bitB);
};

const nor = function (bitA, bitB) {
  //   parameter type check
  if (!paramsBooleanCheck(bitA, bitB)) return typeError;
  return !(bitA || bitB);
};

const xor = function (bitA, bitB) {
  //parameter type check
  //   if (!paramsBooleanCheck(bitA, bitB)) return typeError;
  //   return !(bitA && bitB) && (bitA || bitB);
  //   console.log(bitA, bitB, )
  return bitA !== bitB;
};

exports.typeError = typeError;
exports.booleanCheck = booleanCheck;
exports.arrayCheck = arrayCheck;

exports.paramsBooleanCheck = paramsBooleanCheck;
exports.paramsBooleanArrayCheck = paramsBooleanArrayCheck;

exports.nand = nand;
exports.nor = nor;
exports.xor = xor;
