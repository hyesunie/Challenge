const fs = require("fs");
const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));

// _type
function getMatchedType(data, str) {
  const correctNames = recursiveMatchedType(data, str, []);

  let resultMsg = `${str} 타입 데이터는 총 ${correctNames.length}개이며, ${correctNames} 입니다.`;
  console.log(resultMsg);
}

function recursiveMatchedType(data, condition, recurLog) {
  const { type, name, childNode } = data;
  let resultLog = [];

  if (type === condition) recurLog.push(name);

  childNode.forEach((e) => {
    resultLog = [...resultLog, ...recursiveMatchedType(e, condition, [])];
  });

  resultLog = [...recurLog, ...resultLog];

  return resultLog;
}

getMatchedType(jsonData, "sk");
