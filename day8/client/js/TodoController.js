const util = require("./util.js");
const readline = require("readline");

class TodoController {
  constructor(TodoModel) {
    this.TodoModel = TodoModel;
  }

  runTodo() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this._recieveCommandLine(rl, this.TodoModel);
  }

  _recieveCommandLine(rl, todoModel) {
    rl.question("명령하세요 : ", (commandLine) => {
      let printMsg = "";
      if (commandLine === "q") {
        printMsg = "프로그램을 종료합니다.";
        this.TodoModel.printInputMsg(printMsg);
        return rl.close();
      }
      const arg = commandLine.split("$$");
      const command = arg.shift();

      switch (command) {
        case "add":
          todoModel.add(0, arg);
          printMsg = `${arg[0]} 추가 했습니다. (id : 0)`;
          todoModel.printInputMsg(printMsg);
          todoModel.printCurrentState();
          break;

        case "show":
          const command = arg[0];
          const isAction =
            command === "todo" || command === "doing" || command === "done";

          if (command === "current") {
            todoModel.printCurrentState();
          } else if (isAction) {
            todoModel.printSelectAction(command);
            todoModel.printCurrentState();
          } else todoModel.printInputError();
          break;

        case "update":
          const [updateId, action] = arg;
          todoModel.update(updateId, action);

          const updateTodo = todoModel.getMatchedIdInfo(updateId);
          printMsg = `${updateTodo.todo} => ${updateTodo.action}으로 상태가 변경됐습니다.`;

          todoModel.printInputMsg(printMsg);
          todoModel.printCurrentState();
          break;

        case "delete":
          const deleteId = arg[0];
          const deleteTodo = todoModel.getMatchedIdInfo(deleteId);
          printMsg = `${deleteTodo.todo} => ${deleteTodo.action}목록에서 삭제됐습니다.`;

          todoModel.delete(deleteId);
          todoModel.printInputMsg(printMsg);
          todoModel.printCurrentState();
          break;
      }

      this._recieveCommandLine(rl, todoModel);
    });
  }
}

module.exports = TodoController;
