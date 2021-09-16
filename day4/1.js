function nand(paramA, paramB) {
  return !paramA || !paramB;
}

function nor(paramA, paramB) {
  return !paramA && !paramB;
}

function xor(paramA, paramB) {
  return paramA !== paramB;
}

// let result1 = nand(true, true);
// let result2 = nor(false, true);
// let result3 = xor(false, false);

function halfAdder(paramA, paramB) {
  const sum = (inputA, inputB) => {
    return xor(inputA, inputB);
  };

  const carry = (inputA, inputB) => {
    return inputA && inputB;
  };

  const result = [carry(paramA, paramB), sum(paramA, paramB)];

  //   console.log(result);

  return result;
}

// halfAdder(true, true);

function fullAdder(paramA, paramB, paramC) {
  const [carry1, sum1] = halfAdder(paramA, paramB);
  const [carry2, sum2] = halfAdder(sum1, paramC);

  const carry = carry1 || carry2;
  const result = [carry, sum2];

  return result;
}

// fullAdder(true, true, false);

function byteadder(byteA, byteB) {
  let roundedNum = false;
  const result = [];
  const length = byteA.length > byteB.length ? byteA.length : byteB.length;

  for (let i = 0; i < length; i++) {
    let inputA = byteA === undefined ? 0 : Boolean(byteA[i]);
    let inputB = byteB === undefined ? 0 : Boolean(byteB[i]);

    const [carry, sum] = fullAdder(inputA, inputB, roundedNum);

    roundedNum = carry;

    result.push(Number(sum));
  }
  result.push(Number(roundedNum));

  console.log(result);
}

byteadder([1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 1, 1, 1]);
//000110110
// byteadder([1, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 1, 1, 0, 0, 1]);

function dec2bin(decimal) {
  let answer = [];

  while (decimal > 1) {
    const remainder = decimal % 2;
    answer.push(remainder);

    decimal = (decimal - remainder) / 2;
  }

  answer.push(decimal);

  return answer;
}

// dec2bin(null);

function bin2dec(bin) {
  let answer = 0;
  let i = 1;

  while (bin.length > 0) {
    answer += bin.shift() * i;
    i = i * 2;
  }

  return answer;
}

// bin2dec([0, 1, 1, 1]);

// function bin2hex(bin) {
//   let hexChar = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };
//   let answer = "";

//   let length = Math.ceil(bin.length / 4);

//   while (bin.length > 0) {
//     let dec = bin2dec(bin);
//     answer += dec > 9 ? hexChar[dec] : dec;
//   }

//   console.log(length);
// }

// bin2hex([0, 1, 1, 1, 1]);

//올림 => 몇개로 나누어 지는지 나옴
