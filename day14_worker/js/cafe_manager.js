export default class CafeManager {
  _orderNum = 0;
  _worker = [];
  _orderList = [];

  constructor() {}

  // acceptOrder()
  addOrderList(orderInfo) {
    this._orderList.push(orderInfo);

    this._work();
  }

  // 중요!: 매개변수가 배열일 이유가 없다.
  // 코드 오류내기 쉽다. 그냥 3개 넣는게 [] 보단 낫다.
  // 근데, 오브젝트였으면 더 좋다. 단, typescript 에선 제외
  // resultDom => 다른 이름 이쁜거 바꾸면 더 좋아여!
  manageWork([baristaCnt, { ame, latte, fra }, resultDom]) {
    let orderQueue = [];
    this._createWorker(baristaCnt);

    // const orderQueue = [
    orderQueue = [
      // 이름 좀 더 명확하게 ame => americano, ,,,,
      ...this._makeOrder(ame, "ame"),
      ...this._makeOrder(latte, "latte"),
      ...this._makeOrder(fra, "fra"),
    ];

    this._workBaristas(orderQueue, this._orderNum, resultDom);
    this._orderNum++;
  }
  // resultDom 에 바로 접근하지 않고, 결과 로그나 데이터를 app 에게 메시지로 전달하고
  // app 에서 이 데이터를 돔에 반영하는게 좀 더 이상적이다.

  _work() {
    this.manageWork(this._orderList.shift());
  }

  _createWorker(cnt) {
    this._worker = [];

    // 도 할 수 있다.
    // Array(cnt).fill(0).forEach(()=>{
    //   this._worker.push(new Worker("./cafe_barista.js"));
    // })

    for (let i = 0; i < cnt; i++) {
      this._worker.push(new Worker("./cafe_barista.js"));
    }
  }

  _makeOrder(cnt, menu) {
    // 변수이름 temp 이런거 비추!
    const tmp = [];
    for (let i = 0; i < cnt; i++) {
      tmp.push(menu);
    }
    return tmp;
    // 사실이거는 맵이죠
  }

  // resultDom 같은 애들은 여기서 쓰기로 마음 먹었으면 그냥 맴버변수로 가지는게 낫다.
  // 근데, 처음부터 여기 안들어오는게 베스트긴함.
  _workBaristas(orderQueue, orderNum, resultDom) {
    this._worker.forEach((e, idx) => {
      e.postMessage([orderQueue.shift(), idx]);
    });

    this._worker.forEach((el, idx) => {
      el.onmessage = (e) => {
        const [menu, id] = e.data;
        const date = new Date();
        const li = document.createElement("li");
        li.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} #barista${id} : ${menu} 완료됐습니다.`;
        resultDom.appendChild(li);
        if (orderQueue.length === 0) return;
        el.postMessage([orderQueue.shift(), idx]);
      };
    });
  }
}
