const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const TodoModel = require("./TodoModel.js");
const TodoController = require("./TodoController.js");
const TodoHtmlView = require("./TodoHtmlView.js");

function init(todoList) {
  const todoModel = new TodoModel(todoList);
  const controller = new TodoController(todoModel);
  new TodoHtmlView(todoModel);
  controller.runTodo();
}

function fetchCommandJSON(url = "") {
  // REST API: 일반적으로 많이 쓰는 패턴
  // 실제 REST 하냐고 물으면, 완벽하게 REST 하지는 않지만, 일반적으로 이렇게 부르고 사용함
  // REST (https://ko.wikipedia.org/wiki/REST)
  // 데이터를 조회하기 위해서 하는 요청은
  // HTPP method "GET" 을 사용하는 것을 원칙으로 하고있고 R
  // "POST": 등록, 생성 C
  // "PUT" vs "PATCH": 멱등성의 차이. 수정. (hint, 전체수정, 일부수정) U
  // "DELETE" : 지우는거 D
  return fetch(url, {
    method: "POST", // GET
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

fetchCommandJSON("http://localhost:8090/answer").then((initJson) => {
  init(initJson);
});
