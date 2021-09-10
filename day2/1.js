let log = [];
const errorMsg = {
  type: "인자의 타입이 맞지 않습니다.",
  cnt: "인자의 개수가 맞지 않습니다.",
  fig: "도형명이 잘못됐습니다.",
};

function areaTrapezoid(upper, lower, height) {
  if (arguments.length !== 3) {
    return "trapezoid " + errorMsg.cnt;
  }
  if (
    typeof upper !== "number" ||
    typeof lower !== "number" ||
    typeof height !== "number"
  )
    return "trapezoid " + errorMsg.type;
  return ((upper + lower) / 2) * height;
}

function areaParallelogram(base, height) {
  if (arguments.length !== 2) {
    return "parallelogram " + errorMsg.cnt;
  }
  if (typeof base !== "number" || typeof height !== "number")
    return "parallelogram" + errorMsg.type;

  return base * height;
}

function areaCircle(radius, pi = 3.14) {
  if (arguments.length < 1 || arguments.length > 2) {
    return "circle " + errorMsg.cnt;
  }
  if (typeof radius !== "number" || typeof pi !== "number")
    return "circle " + errorMsg.type;

  return radius * radius * pi;
}

function getArea(figure, num1, num2, num3 = -1) {
  if (arguments.length < 3 || arguments > 4) return errorMsg.cnt;
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    typeof num3 !== "number"
  )
    return errorMsg.type;
  let check = ["circle", "parallelogram", "trapezoid"];
  if (!check.includes(figure)) return errorMsg.fig;
  let obj = {
    circle: (num1, num2, num3) => areaCircle(num1, num2),
    parallelogram: (num1, num2, num3) => areaParallelogram(num1, num2),
    trapezoid: (num1, num2, num3) => areaTrapezoid(num1, num2, num3),
  };
  log.push(figure);
  return obj[figure](num1, num2, num3);
}

function getAreaAvg(figure, start, end) {
  if (arguments.length < 3) return errorMsg.cnt;
  if (figure !== "circle") return errorMsg.fig;
  if (typeof start !== "number" || typeof end !== "number")
    return errorMsg.type;

  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += areaCircle(i);
  }
  return sum / (end - start + 1);
}

function printExecutionSequence() {
  let str = "계산 수행 순서 : ";
  for (let i = 0; i < log.length; i++) {
    str += log[i];
    if (i < log.length - 1) str += " > ";
  }
  return str;
}

console.log(getArea("trapezoid", 10, 15, 12));
console.log(getArea("parallelogram", 10, 15));
console.log(getArea("circle", 10, 3.14));
console.log(getAreaAvg("circle", 5, 11));

console.log(printExecutionSequence());
