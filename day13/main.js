function init() {
  const str = "[1, [2, , [3]],'hello world', null]";
  //   const result =
  const result = ArrayParser(str);
  console.log(JSON.stringify(result));
}

function ArrayParser(str) {
  const lexical = findNextArray(str);
  const result = parser(lexical);
  return result;
}

function findNextArray(str) {
  const tokens = tokenizer(str);
  const lexical = lexer(tokens);
  return lexical;
}

function tokenizer(str) {
  const tokens = str.replace(/^\[/g, "").replace(/\]$/g, "").split(",");
  const result = [];
  let stack = [];
  let rigntCnt = 0;
  let leftCnt = 0;

  while (tokens.length > 0) {
    let token = tokens.shift();
    token = token.replace(/^\s+/g, "").replace(/\s+$/g, "");
    stack.push(token);

    const matched1 = token.match(/[\[]/g) || [];
    const matched2 = token.match(/[\]]/g) || [];

    const isArray = matched1.length + leftCnt === matched2.length + rigntCnt;

    if (isArray) {
      result.push(stack.join());
      stack = [];
      rigntCnt = 0;
      leftCnt = 0;
    } else {
      rigntCnt += matched2.length;
      leftCnt += matched1.length;
    }
  }
  return result;
}

function lexer(tokens) {
  const result = [];
  const TYPE_VALUE = ["string", "array", "number", "null", "undefined"];
  const TYPE_CHECK = {
    checkstring: (token) => /^[\'\"]/.test(token) && /[\'\"]$/.test(token),
    checkarray: (token) => /^\[/.test(token) && /\]$/.test(token),
    checknumber: (token) => !isNaN(Number(token)),
    checknull: (token) => token.toLowerCase() === "null",
    checkundefined: (token) => token.toLowerCase() === "undefined",
  };
  while (tokens.length > 0) {
    let token = tokens.shift();
    const tokenObg = {};
    token = token === "" ? "undefined" : token;

    for (let i = 0; i < TYPE_VALUE.length; i++) {
      const isTrue = TYPE_CHECK[`check${TYPE_VALUE[i]}`](token);

      if (isTrue) {
        let value = TYPE_VALUE[i] === "array" ? findNextArray(token) : token;

        tokenObg.type = TYPE_VALUE[i];
        tokenObg.value = value;
        break;
      }
    }

    result.push(tokenObg);
  }
  return result;
}

function parser(lexical) {
  const result = { type: "array", child: [] };

  while (lexical.length > 0) {
    const lexObj = lexical.shift();
    let parseObj = {};

    if (lexObj.type === "array") {
      parseObj = parser(lexObj.value);
    } else {
      parseObj = { ...lexObj };
      parseObj.child = [];
    }

    result.child.push(parseObj);
  }
  return result;
}

init();
