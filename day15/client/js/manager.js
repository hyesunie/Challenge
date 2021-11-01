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

    this.myEmitter.on("addOrder", async (order) => {
      const promise = await this.testPromise(order);
      console.log(typeof promise);
    });

    this.myEmitter.on("success", (baristaId, menu) => {
      console.log(`바리스타${baristaId} : ${menu}를 완성했습니다.`);
      if (this._orderMenu.length > 0) this._devideAddJob(baristaId);
    });
    this.myEmitter.on("endOrder", () => {
      console.log("모든 음료가 완성 됐습니다.");
    });
  }
}

module.exports = Manager;
