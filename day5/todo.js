const readline = require("readline");

// 모델?
// 얘의 역할은 데이터만 가지고, 데이터의 조작에 관련된 역할 수행함.
// 얘가 자신의 상태를 출력하는게 어색하진않음
// 근데 출력에 관한 기능을 가지는게 싫다면?
// 생성할 때, 로그 인스턴스를 주입받아라(Dependency injection, 의존성 주입)
// 의존성이란? 어렵게생각하지말고, 그냥 나한테 없는데 남꺼 쓰는거
class State {
  // constructor(logger) {
  // this.needPrint = false;
  // }
  constructor() {
    // 오브젝트 배열로 가져가면 좋을 듯.
    // 왜냐하면, 새로운 상태가 생기면 변수가 또 생겨서, 다른 코드 수정도 필요할 수 있기때문
    this.info = {};
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.tag = {};
  }

  // print(){
  //   logger.print();
  // }

  // 쓰는 쪽, res.todo;
  // {todo:[], }
  // getSOME(list){
  //   return list.reduce(name=>this.info[name]);
  // }

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

    // 컨디션 변수로 빼면 좋음
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
    // 위험하긴하나, 잘 알아보고 쓰기!
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

    // TODO:
    let needPrint = false;

    // 만약 무조건 출력해야되면
    // try{
    //
    // }catch(){
    //
    // }finally {
    //
    // }

    switch (action) {
      case "add":
        // 함수형 프로그래밍 할 때, 많이 나오는 패턴
        state = addData(state, id, inputData)
        // state.print();

        // print 가 리턴을 하는게 어색하긴함.
        // 그냥 참조! 눈으로고 보고 흘리셈
        // const state = addData(state,id,inputData).print();
        // 1번. 요롷게 하던지.
        // state.addData(id, inputData).print();

        // addData()

        // 함수 내부적으로 새로운 객체를 생성하는데
        // addData(state, id, inputData): 이렇게 힌트를 안주면 새롭게 만드는지 아닌지 알기 힘듬 // 사이드 이펙트가 있는지 알 수 없다.
        // 그래서, 늘 새로운 객체를 만드는(즉, 순수함수. 사이드이펙트를 안만드는 함수) 라면
        // state.addData(id, inputData).print();
        // 이게 아니고, 그냥 여러 줄의 함수를 합친 함수라면
        // 리턴 값 없이. addData(state, id, inputData);
        // 근데, 쭈야는 한번 쓰는 함수는 콜백 아닌 이상 안만드려고 함.

        // print
        id++;
        break;
      case "show":
        state = showData(state, inputData);
        needPrint =true;
        break;
      case "update":
        state = updateData(state, inputData);
        break;
      case "delete":
        state = deleteData(state, inputData[0]);
        break;
    }

    // TODO:
    // if(needPrint){
    //   state.print();
    // }

    recieveCommandInput(state, id, rl);
  });
}

// SRP: Single responsibility principle (단일 책임 원칙)
// 주의!: 기능이 하나라는 소리가 절대 아님
// 변경 요인이 하나여야한다는 소리
function addData(state, id, todoAndTag) {
  state.addTodo(id, todoAndTag);

  const printMsg = `${todoAndTag[0]} 추가했습니다. (id : ${id})`;
  console.log(printMsg);

  _printData(state);

  // 이렇게 할 거면 내부적으로 그냥 갱신하는게 맞다.
  return state;

  // return new State();
}

function updateData(state, idAndAction) {
  const [id, action] = idAndAction;
  let printMsg = "";
  const  str =action === "doing" || action === "done" ? '상태가' : '할 일이';

  if (action === "doing" || action === "done") {
    state.updateAction(Number(id), action);
    printMsg = ` => ${action}으로 상태가 변경 됐습니다.`;
  } else {
    state.updateTodo(Number(id), action);
    printMsg = ` => ${action}으로 할 일이 변경 됐습니다.`;
  }

  // TODO: 수정해봐여!
  // const printMSGG = ``


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

todo();
