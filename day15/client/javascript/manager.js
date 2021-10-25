class Manager {
  orderList = [];
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._runEventListener();
  }

  _runEventListener() {
    this.myEmitter.on("setBarista", (num) => {});

    this.myEmitter.on("addOrder", async (order) => {
      order = await this._runOrder(order);
      this._manageOrder(order);
    });

    this.myEmitter.on("nextMenu", async (id, menu) => {
      console.log(`#Barista${id} : 완료 ${menu}`);
      const nextMenu = await this.getNextMenu();
      console.log(nextMenu);
      this.myEmitter.emit(id, id, nextMenu);
    });

    // this.myEmitter.on("nextMenu2", async (id, menu) => {
    //   const nextMenu = this.getNextMenu();
    //   console.log(nextMenu);
    //   await this.myEmitter.emit(id, id, nextMenu);
    // });

    this.myEmitter.on("end", () => {
      console.log("메뉴 제작 종료");
    });
  }

  _runOrder(order) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(order);
      }, 1000);
    });
  }

  async _manageOrder(order) {
    this._makeOrderList(1, order[1]);
    this._makeOrderList(2, order[2]);
    this._makeOrderList(3, order[3]);

    await this.myEmitter.emit("initBarista");
  }

  _makeOrderList(menu, cnt) {
    for (let i = 0; i < cnt; i++) {
      this.orderList.push(menu);
    }
  }

  getNextMenu() {
    return this.orderList.length === 0 ? "end" : this.orderList.shift();
  }
}

module.exports = Manager;
