// TODO: 전역변수는 무조건 금지
let log = [];

// TODO: Magic number
// 요론 상수들은 대문자로
// const ERROR_MSG = {
//  그리고 key 의 값이 명확해야한다.
// WRONG_ARG_TYPE: '',
// WRONG_ARG_COUNT:
// WRONG_FIGURE_TYPE
// }
const errorMsg = {
  type: "인자의 타입이 맞지 않습니다.",
  cnt: "인자의 개수가 맞지 않습니다.",
  fig: "도형명이 잘못됐습니다.",
};


// TODO: 함수이름은 동사형태로 시작한다.
// getAreaTrapezoid
function _areaTrapezoid(upper, lower, height) {
  if (arguments.length !== 3) {
    return "trapezoid " + errorMsg.cnt;
  }

  // TODO: 더좋은거는 불리언변수명은 긍정형으로
  const isNotArgNumber =typeof upper !== "number" ||
    typeof lower !== "number" ||
    typeof height !== "number"

  // TODO: if(!isArgNumber)
  if (isNotArgNumber)
    return "trapezoid " + errorMsg.type;

  return ((upper + lower) / 2) * height;
}

// TODO: private 한 함수는 앞쪽에 _ 추가하면 좋다.
function _areaParallelogram(base, height) {
  if (arguments.length !== 2) {
    return "parallelogram " + errorMsg.cnt;
  }
  if (typeof base !== "number" || typeof height !== "number")
    return "parallelogram" + errorMsg.type;

  return base * height;
}

// TODO: javascript 의 경우 변수명 or 함수명 앞에 _ 붙이면 private 라고 생각
function _areaCircle(radius, pi = 3.14) {
  // TODO: 심화: 요론 예외처리는 정적분석에서 거르는편이 좋다.
  if (arguments.length < 1 || arguments.length > 2) {
    return "circle " + errorMsg.cnt;
  }

  if (typeof radius !== "number" || typeof pi !== "number")
    return "circle " + errorMsg.type;

  return radius * radius * pi;
}



// TODO:
function areNumbers(...nums){
  // nums 가 배열인거 확인하고 아니면 배열로만들어서
  // 얘들의 결과를 한번에 합쳐서 반환(&&)
}


// TODO: entry point 에서 예외처리를 해라.
// (이 entry point 는 외부에 공개되어야한다.)
// 두 번 하지마라
// 함수의 반환타입은 하나로 고정
// function getArea(figure, ...nums) {
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters
function getArea(figure, num1, num2, num3 = -1) {
  if (arguments.length < 3 || arguments > 4) return errorMsg.cnt;
  if (
    // TODO: 함수로 분리하기
    // isNumber(num1) ||
    typeof num2 !== "number" ||
    typeof num3 !== "number"
  )
    // throw Error(ERROR_MSG.WRONG....)
    return errorMsg.type;

  // TODO: 긍정문 추천
  // if(!areNumbers(num1, num2, num3)){
  //   return
  // }

  // TODO:circle, "parallelogram", trapezoid 다 매직넘버이니깐 변수로 분리
  let check = ["circle", "parallelogram", "trapezoid"];

  // TODO: 한줄짜리 if문 바디 스타일 하나로 통일
  if (!check.includes(figure)) {
    return errorMsg.fig;
  }

  // TODO: 변수명이 좀 더 명확하면 좋겠어요
  // let 이 필요없어요.
  let obj = {
    circle: (num1, num2, num3) => _areaCircle(num1, num2),
    parallelogram: (num1, num2, num3) => _areaParallelogram(num1, num2),
    trapezoid: (num1, num2, num3) => _areaTrapezoid(num1, num2, num3),
  };

  // TODO: example
  // const myMap = {
  //   CIRCLE: _areaCircle,
  //
  // }

  // TODO: destructing
  // const result = myMap[figure](...nums)

  // TODO: log 는 주입받는다.
  // bind도 있을 수 있고, *클로저도 쓸 수 있을거고===(객체가 함수를 리턴하는 방법도 있을 거다).
  log.push(figure);

  // 1. 매개변수 쓸 때,
  return obj[figure](num1, num2, num3);
}

// TODO: 개인적으로 이게 더 머리가 덜 아파
// const calculator = {
// 꿀팁: 비어있는 값을 초기화할 때는 우선적으로 null 을 생각한다.
// log:null,
// init(log){
//   this.log =log;
// },
// calculate(){
//   this._calculate();
//   this.log.print();
// },
// _calculate(){}
// }

// calculator.calculate(num)

// 이 때, this 조심
// const calculate = calculator.calculate;

function getAreaAvg(figure, start, end) {
  if (arguments.length < 3) return errorMsg.cnt;
  if (figure !== "circle") return errorMsg.fig;
  if (typeof start !== "number" || typeof end !== "number")
    return errorMsg.type;

  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += _areaCircle(i);
  }
  return sum / (end - start + 1);
}


// TODO: 함수명이 print 인데, 값을 출력하지않고 리턴한다
// 리턴하는 함수따로 출력 따로하던지. 여기서 바로 찍던지.
function printExecutionSequence() {
  let str = "계산 수행 순서 : ";

  for (let i = 0; i < log.length; i++) {
    str += log[i];
    if (i < log.length - 1) str += " > ";
  }

  return str;
}

// TODO: 전역변수를 피하기 위해 역할을 수행하는 객체를 만든다.
const Logger = {
  queue: [],
  printExecutionSequence(){
    this.queue.forEach(log => console.log(log))
  },
  _getFormattedLog(){
    return this.queue.map(()=>{});
  }
}

// try{
//
// }catch(e){
//   console.error(e.message)
// }


console.log(getArea("trapezoid", 10, 15, 12));
console.log(getArea("parallelogram", 10, 15));
console.log(getArea("circle", 10, 3.14));
console.log(getAreaAvg("circle", 5, 11));

console.log(printExecutionSequence());
