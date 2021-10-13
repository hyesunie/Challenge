export default class CafeManager {
  _orderQueue = [];
  _worker = [];
  _makingTime = {
    ame: 3,
    latte: 4,
    fra: 10,
  };

  constructor() {}

  manageWork(currentWorker, { ame, latte, fra }) {
    this._setWorker(currentWorker);
    this._makeOrder(ame, "ame");
    this._makeOrder(latte, "latte");
    this._makeOrder(fra, "fra");

    this._workBaristas();
  }

  _workBaristas() {
    let complete = 0;
    let orderCnt = this._orderQueue.length;

    while (orderCnt > complete) {
      const startTime = new Date();
      this._worker.map((e) => {
        console.log(e);
        if (e.state === "notWorking") {
          e = this._divideOrder(e, startTime);
          console.log(e);
          return e;
        } else {
          e = this._checkOrderTime(e, startTime);
          complete += e.state === "notWorking" ? 1 : 0;
          console.log(e);
          return e;
        }
      });
    }
    // while (this._orderQueue.length > 0) {
    //   const startTime = new Date();
    //   for (let i = 0; i < this._worker.length; i++) {
    //     if (this._worker[i].state === "notWorking") {
    //       this._worker[i].menu = this._orderQueue.shift();
    //       this._worker[i].state = "working";
    //       this._worker[i].time = startTime;
    //       console.log(this._worker);
    //     } else {
    //       const second =
    //         (this._worker[i].time.getTime() - startTime.getTime()) / 1000;
    //       this._worker[i].state =
    //         second > this._makingTime[this._worker[i].menu]
    //           ? "notWorking"
    //           : "working";
    //       console.log(this._worker);
    //       this._worker[i].state === "notWorking"
    //         ? this._log(
    //             this._worker[i].id,
    //             this._worker[i].menu,
    //             this._worker[i].time
    //           )
    //         : 0;
    //     }
    //   }
    // }
  }

  _log(barista, menu, time) {
    console.log(barista, menu, time);
  }

  _divideOrder(worker, time) {
    worker.state = "working";
    worker.menu = this._orderQueue.shift();
    worker.time = time;

    return worker;
  }

  _checkOrderTime(worker, time) {
    const second = (worker.time.getTime() - time.getTime()) / 1000;
    console.log(worker, second);
    if (second > this._makingTime[worker.menu]) {
      this._log(worker.id, worker.menu, worker.time);
      worker.state = "notWorking";
      worker.menu = "";
    }

    return worker;
  }

  _setWorker(cnt) {
    for (let i = 0; i < cnt; i++) {
      this._worker.push({
        id: i,
        state: "notWorking",
        menu: "",
        time: new Date(),
      });
    }
  }

  _makeOrder(cnt, menu) {
    for (let i = 0; i < cnt; i++) {
      this._orderQueue.push(menu);
    }
  }
}
