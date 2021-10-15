export default class CafeManager {
  _orderNum = 0;
  _worker = [];
  _orderList = [];
  constructor() {}
  addOrderList(orderInfo) {
    this._orderList.push(orderInfo);

    this._work();
  }
  manageWork([baristaCnt, { ame, latte, fra }, resultDom]) {
    let orderQueue = [];
    this._createWorker(baristaCnt);

    orderQueue = [
      ...this._makeOrder(ame, "ame"),
      ...this._makeOrder(latte, "latte"),
      ...this._makeOrder(fra, "fra"),
    ];

    this._workBaristas(orderQueue, this._orderNum, resultDom);
    this._orderNum++;
  }
  _work() {
    this.manageWork(this._orderList.shift());
  }
  _createWorker(cnt) {
    this._worker = [];
    for (let i = 0; i < cnt; i++) {
      this._worker.push(new Worker("./cafe_barista.js"));
    }
  }
  _makeOrder(cnt, menu) {
    const tmp = [];
    for (let i = 0; i < cnt; i++) {
      tmp.push(menu);
    }
    return tmp;
  }
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
