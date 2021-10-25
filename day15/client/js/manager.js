class Manager {
  _barista = [];
  _orderMenu = [];
  _order = "";
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._addEventListener();
  }

  _preapareBarista(num) {
    for (let i = 1; i <= num; i++) {
      this._barista.push(i);
    }
  }

  _addEventListener() {
    this.myEmitter.on("setBarista", (num) => {
      this._preapareBarista(num);
    });
    // this.myEmitter.on("addOrder", (order) => {
    //   this._order = order;
    //   setTimeout(() => {
    //     this._manageOrder(this._order);
    //   }, 1000);
    // });

    this.myEmitter.on("addOrder", async (order) => {
      const promise = await this.testPromise(order);
      console.log(typeof promise);
    });

    this.myEmitter.on("success", (baristaId, menu) => {
      //대시보드에 데이터 전달
      //다음 작업ㄱㄱ
      console.log(`바리스타${baristaId} : ${menu}를 완성했습니다.`);
      if (this._orderMenu.length > 0) this._devideAddJob(baristaId);
    });
    this.myEmitter.on("endOrder", () => {
      console.log("모든 음료가 완성 됐습니다.");
    });
  }

  // _manageOrder(order) {
  //   for (let i = 1; i < 4; i++) {
  //     if (order[i] === undefined) continue;
  //     this._addOrderMenu(i, order[i]);
  //   }

  //   this._devideInitJob();
  // }

  // _addOrderMenu(menu, count) {
  //   for (let i = 0; i < count; i++) {
  //     this._orderMenu.push(menu);
  //   }
  // }

  // _devideInitJob() {
  //   this._barista.forEach((e) => {
  //     console.log(e);
  //     this.myEmitter.emit(`${e}`, e, this._orderMenu.shift());
  //   });
  // }

  // _devideAddJob(baristaId) {
  //   if (this._orderMenu.length > 0) {
  //     this.myEmitter.emit(`${baristaId}`, baristaId, this._orderMenu.shift());
  //   }
  // }

  testPromise(val) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(val);
      }, 500);
    });
  }
}

module.exports = Manager;
