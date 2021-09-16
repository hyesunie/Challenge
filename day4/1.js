// import * as Book from "./book.js"
// import * as Table from "./table.js"
//
// Book.getLog();
// Table.getLog();

function nand(paramA, paramB) {
  // 긍정형으로!
  // 쉽게말하면 ! 로 묶이면 묶어라!!
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

  return result;
  // return [carry(paramA, paramB), sum(paramA, paramB)]
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
// function byteAdder(byteA, byteB) {
  let roundedNum = false;
  const result = [];
  const length = byteA.length > byteB.length ? byteA.length : byteB.length;

  // while 로 고쳐보기
  for (let i = 0; i < length; i++) {
    // falsy를 사용하고 싶지만, null 은 내가 일부러 넣은 값이여서 구분하고 싶다면,
    // 다른 사람이 헷갈리지 않도록 변수명을 예쁘게 지어서 넣어둔다.
    // const isByteAInitiated = byteA !== undefined
    // let inputA = !isByteAInitiated ? 0 : Boolean(byteA[i]);



    let inputA = byteA === undefined ? 0 : Boolean(byteA[i]);
    // let inputA = byteA ?  Boolean(byteA[i]):0;
    let inputB = byteB === undefined ? 0 : Boolean(byteB[i]);

    const [carry, sum] = fullAdder(inputA, inputB, roundedNum);

    roundedNum = carry;

    // reduce 활용해보기
    result.push(Number(sum));
  }
  result.push(Number(roundedNum));

  console.log(result);
}

byteadder([1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 1, 1, 1]);
//000110110
// byteadder([1, 1, 0, 0, 1, 0, 1, 0], [1, 1, 0, 1, 1, 0, 0, 1]);

// 함수들을 역할별로 나누는게 좋음
// 파일을 나눠서 함수 자체를 export 하게되면 완전 전역이 되기때문에,
// 실수로 비슷한 함수명인 다른 함수를 import 하게 되는 실수가 생긴다.
// 그래서, 객체나 클래스등으로 한번 더 감싸서 안전장치를 만드는게 디테일!
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

// 단순 배열 순회 => forEach
// 배열 중에서 추리기 => filter
// 배열 값 전체 바꾸기 => map
// 배열 값 합치기 => reduce

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

// 아래의 코드를 객체(클래스, 함수 포함)로 감싸게 되면은, _critical 을 숨길 수 있다.
// const _critical = 0;
//
// function getFn(){
//   return function (){
//     return _critical + 1;
//   }
// }

// 호이스팅
// function a(){
//   _b();
// }
//
//
//
//
//
//
//
//
//
//
// function _b(){
//
// }
