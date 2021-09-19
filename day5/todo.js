const readline = require("readline");

class State {
  constructor() {
    this.info = {};
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.tag = {};
  }
  getCurrentAllData() {
    return [this.todo, this.doing, this.done];
  }

  getSelectData(action) {
    return this[action];
  }

  getIdMatchedTodo(id) {
    return this.info[id];
  }
  addTodo(id, inputArr) {
    this.info[id] = inputArr[0];
    this.todo.push(id);

    if (inputArr.length === 2) {
      const tranArr = inputArr[1].replace(/[\[\]\'\"]/g, "").split(",");
      tranArr.forEach((e) => {
        if (!this.tag[e]) this.tag[e] = [];

        this.tag[e].push(id);
        // this.tag[e] = [...this.tag[e], id]
      });
      // const result = tranArr.reduce();
      // this.tag = {...this.tag, ...result}
    }
    console.log(this.todo, this.tag);
  }
  deleteIdMatchedData(id) {
    delete this.info[id];
    return this._deleteData(id);
  }
  updateTodo(id, newTodo) {
    //아이디 록에 있는지 확인 하기!!
    this.info[id] = newTodo;
  }
  updateAction(id, action) {
    //아이디 록에 있는지 확인 하기!!
    this._deleteData(id);
    this[action].push(id);
  }
  _deleteData(id) {
    const data = this.todo.includes(id)
      ? "todo"
      : this.doing.includes(id)
      ? "doing"
      : this.done.includes(id)
      ? "done"
      : "none";

    if (data === "none") return data;

    this[data] = this[data].filter((e) => e !== id);
    return data;
  }
}

todo();

function todo() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let state = new State();

  recieveCommandInput(state, 0, rl);
}

function recieveCommandInput(state, id, rl) {
  rl.question("명령하세요 : ", (answer) => {
    //입력에 대한 예외처리 생각해보기
    if (answer === "q") return rl.close();
    const inputData = answer.split("$$");
    const action = inputData.shift();
    switch (action) {
      case "add":
        state = addData(state, id, inputData);
        id++;
        break;
      case "show":
        state = showData(state, inputData);
        break;
      case "update":
        state = updateData(state, inputData);
        break;
      case "delete":
        state = deleteData(state, inputData[0]);
        break;
    }
    recieveCommandInput(state, id, rl);
  });
}

function addData(state, id, todoAndTag) {
  state.addTodo(id, todoAndTag);

  const pringMsg = `${todoAndTag[0]} 추가했습니다. (id : ${id})`;
  console.log(pringMsg);

  _printData(state);

  return state;
}

function updateData(state, idAndAction) {
  const [id, action] = idAndAction;
  let printMsg = "";

  if (action === "doing" || action === "done") {
    state.updateAction(Number(id), action);
    printMsg = ` => ${action}으로 상태가 변경 됐습니다.`;
  } else {
    state.updateTodo(Number(id), action);
    printMsg = ` => ${action}으로 할 일이 변경 됐습니다.`;
  }

  const todo = state.getIdMatchTodo(Number(id));
  console.log(todo, printMsg);
  _printData(state);

  return state;
}

function showData(state, arg) {
  if (arg[0] === "current") {
    _printData(state);
  } else if (arg[0] === "todo") {
    _printSelectAction(state, arg[0]);
  }
}
function deleteData(state, id) {
  const todo = state.getIdMatchedTodo(Number(id));
  const deleteAction = state.deleteIdMatchedData(Number(id));
  const printMsg = `${todo} => ${deleteAction}목록에서 삭제됐습니다.`;

  console.log(printMsg);

  _printData(state);
}

function _printSelectAction(state, action) {
  const actionData = state.getSelectData(action);
  let printMsg = `${action}리스트 : 총${actionData.length}건 :`;

  actionData.forEach((e) => {
    printMsg += `'${state.getIdMatchedTodo(e)}, ${e}번'`;
  });

  console.log(printMsg);
}

function _printData(state) {
  const [todo, doing, done] = state.getCurrentAllData();
  const printMsg = `현재상태 : todo:[${todo}], doing:[${doing}], done:[${done}]`;

  console.log(printMsg);
}
