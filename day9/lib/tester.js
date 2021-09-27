const { filter } = require("lodash");

//test, assert, equal, notEqual, detailEqual를 구현
function test(title, fn) {
  let result = "";
  try {
    fn();
    result = "PASS";
  } catch (e) {
    result = "\x1b[31mFAIL\x1b[0m";
  }
  console.log(`${title} :`, result);
}

const assert = {
  equal: function () {
    const args = [...arguments];
    const firstArg = args.shift();

    for (let arg of args) {
      if (firstArg !== arg) throw "false";
    }

    return true;
  },

  notEqual: function () {
    const args = [...arguments];
    const set = new Set(args);

    if (set.size === args.length) return true;

    throw "false";
  },

  detailEqual: function () {
    //재귀?
    const [arg1, arg2] = [...arguments];
    if (arg1.length !== arg2.length) throw "false";

    const result = recur(arg1, arg2);

    if (result) return true;
    throw "false";

    // object 지원하도록
    function recur(data1, data2) {
      if (typeof data1 !== typeof data2 || data1.length !== data2.length)
        return false;

      for (let i = 0; i < data1.length; i++) {
        const isEqual = data1[i] === data2[i] ? true : false;
        // const isEqual = data1[i] === data2[i];

        if (isEqual) continue;

        // if 안 if 하나로 만들기.
        // return !A || B
        if (typeof data1[i] === "object" || typeof data2[i] === "object") {
          if (!recur(data1[i], data2[i])) return false;
        } else {
          return false;
        }
      }
      return true;
    }
  },
};

module.exports = { test, assert };
