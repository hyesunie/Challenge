const gate = require("./gate"); //import gate function
const typeError = "올바른 타입의 매개변수를 입력하세요";
const rangeError = "올바른 범위(0~255)의 정수를 입력하세요";
const numeral = 2;

exports.dec2bin = function (decimal) {
  //parameter check
  if (!Number.isInteger(decimal)) return typeError;
  if (decimal < 0 || decimal > 255) return rangeError;

  let result = [];
  let share = 0;
  while (decimal >= 2) {
    share = 0;
    let rest = decimal;
    while (rest >= 2) {
      rest -= 2;
      share++;
    }
    result.push(rest === 1 ? true : false);
    decimal = share;
  }
  result.push(share === 1 ? true : false);
  return result;
};

exports.bin2dec = function (binArr) {
  //parameter type check
  //   if (!gate.paramsBooleanArrayCheck(binArr)) return gate.typeError;

  let result = 0;
  let exponent = 0;
  for (bit of binArr) {
    if (bit) {
      let num = 1;
      for (let i = 0; i < exponent; i++) num *= numeral;
      result += num;
    }
    exponent++;
  }
  return result;
};
