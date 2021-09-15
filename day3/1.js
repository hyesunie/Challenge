const fs = require("fs");
const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));

function getMatchedType(data, str) {
  const correctNames = recursiveMatchedType(data, str, []);

  let resultMsg = `${str} 타입 데이터는 총 ${correctNames.length}개이며, ${correctNames} 입니다.`;
  console.log(resultMsg);
}

// recurLog => result .. 추천
// data => input or target .. 추천
// condition => type .. 추천
// condition 같은 경우에는 진짜 조건을 의미하기 때문에 혼란이 올 수 도 있다.
// function _recursiveMatchedType({data, condition, recurLog}) {
function recursiveMatchedType(data, condition, recurLog) {
  const { type, name, childNode } = data;
  let resultLog = [];

  // recursiveLog
  if (type === condition) recurLog.push(name);

  childNode.forEach((e) => {
    // 배열이 하나만 있어도 되는데, 불필하게 2개가 되고, 연산도 중복이되어서 수정 추천!
    resultLog = [...resultLog, ...recursiveMatchedType(e, condition, [])];
  });

  resultLog = [...recurLog, ...resultLog];

  return resultLog;
  // [...recurLog, ...resultLog]
}

getMatchedType(jsonData, "sk");
