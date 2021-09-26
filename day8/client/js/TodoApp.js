const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const TodoModel = require("./TodoModel.js");
const TodoController = require("./TodoController.js");
const TodoHtmlView = require("./TodoHtmlView.js");
//todoList 값을 서버에서 얻어와야 한다.
//const todoList = 서버에서 데이터 가져오기 코드가 필요

function init(todoList) {
  const todoModel = new TodoModel(todoList);
  const controller = new TodoController(todoModel);
  new TodoHtmlView(todoModel);
  controller.runTodo();
}

function fetchCommandJSON(url = "") {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

fetchCommandJSON("http://localhost:8090/answer").then((initJson) => {
  init(initJson);
});
