const Observable = require("./Observable.js");

function TodoModel(todoList) {
  Observable.call(this);
  this.todoInfo = [...todoList];
  // this.todoInfo = todoList.slice();
}

// const ob = new Observable();

// TodoModel.prototype = Object.create(ob);
// TodoModel.prototype.constructor = TodoModel;

TodoModel.prototype = Object.create(Observable.prototype);
TodoModel.prototype.constructor = TodoModel;

// TodoModel.prototype = {
//   // get(){}
//   // this binding 문제 생김
// };
//arrow 함수 실행 시 안되는데

// function bad(str1, str2, str3);

// function intel({id, todo}){}

// intel({})

TodoModel.prototype.add = function (id, inputData) {
// TodoModel.prototype.add = function ({id, todo, tags}) {
  // 1. 자동완성(intellisense 사용 가능)ㅣ;
  // 변수 또는 함수명에 타입 넣지않도록 노력해보기!
// TodoModel.prototype.add = function (id, [todo, tags]) {
  //
  const todo = inputData[0];
  const stringTags = inputData[1] ? inputData[1] : null;
  // const [todo, stringTags] = inputData
  const newTodoInfo = [...this._getTodoInfo()];

  if (stringTags) {
    const arrTags = stringTags.replace(/[\[\]\'\"]/g, "").split(",");
    newTodoInfo.push({ id, todo, action: "todo", tags: arrTags });
  } else {
    newTodoInfo.push({ id, todo, action: "todo" });
  }

  this._setTodoInfo(newTodoInfo);

  //이 안에서 add에 해당하는 문구만 직접 프린트하는 것은 어떤지?
};

TodoModel.prototype.update = function (id, action) {
  const currentTodoInfo = this._getTodoInfo();
  const newTodoInfo = currentTodoInfo.map((e) => {
    if (e.id == id) {
      e.action = action;
    }
  });

  this._setTodoInfo(newTodoInfo);
};

TodoModel.prototype.delete = function (id) {
  const currentTodoInfo = this._getTodoInfo();
  const newTodoInfo = currentTodoInfo.filter((e) => e.id != id);

  this._setTodoInfo(newTodoInfo);
};

TodoModel.prototype.getMatchedIdInfo = function (id) {
  const currentTodoInfo = this._getTodoInfo();
  return currentTodoInfo.find((e) => e.id == id);
};

TodoModel.prototype.printInputMsg = function (msg) {
  console.log(msg, "\n"); // + this.SOMETHING
};

// todoModel.printInputMsg();
// console.log

TodoModel.prototype.printCurrentState = function () {
  const currentTodoInfo = this._getTodoInfo();

  const todo = currentTodoInfo
    .filter((e) => e.action === "todo")
    .map((e) => e.id);
  const doing = currentTodoInfo
    .filter((e) => e.action === "doing")
    .map((e) => e.id);
  const done = currentTodoInfo
    .filter((e) => e.action === "done")
    .map((e) => e.id);

  const printMsg = `현재상태 : todo:[${todo}], doing:[${doing}], done:[${done}]`;

  this.notify(printMsg);
  console.log(printMsg, "\n");
};

TodoModel.prototype.printSelectAction = function (action) {
  const currentTodoInfo = this._getTodoInfo();
  const matchedAction = currentTodoInfo.filter((e) => e.action === action);

  let printMsg = `${action}리스트 : 총 ${matchedAction.length} : `;

  matchedAction.forEach((e) => {
    printMsg += `'${e.todo}, ${e.id}번'`;
  });

  console.log(printMsg, "\n");
  // console.log(`${printMsg}\n`);

};

TodoModel.prototype.printInputError = function () {
  const printMsg = "입력이 잘못 됐습니다.";

  console.log(printMsg, "\n");
};
//////////////////////

TodoModel.prototype._setTodoInfo = function (input) {
  // array to object
  this.todoInfo = [...input];
  // this.todoInfo = [...input];
};

TodoModel.prototype._getTodoInfo = function () {
  return this.todoInfo;
};

module.exports = TodoModel;

// console.log(TodoModel.prototype.__proto__ === Observable.prototype);

//class 와 function을  프로토타입으로 연결하면 내부 인스턴스가 프로토타입 내의
//객체로 인식돼서 아래 콘솔로그 값이 같음

// const todo1 = new TodoModel();
// const todo2 = new TodoModel();

// console.log(todo1.observers === todo2.observers);

// console.log(todo.__proto__ === TodoModel.prototype);
// console.log(todo.observers === Observable.prototype.observers);
// console.log(todo.observers);
// console.log(todo.__proto__.observers);
// console.log(todo.__proto__.__proto__.observers);
// console.log(Observable.prototype.observers);
// console.log(TodoModel.prototype.observers);
// console.log(TodoModel);
// console.log(TodoModel.prototype);
// console.log(todo.subscribe === Observable.prototype.subscribe);
// console.log(todo.__proto__.subscribe === Observable.prototype.subscribe);
