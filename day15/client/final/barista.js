class Barista {
  _menuTime = { 1: 3000, 2: 4000, 3: 10000 };
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this.initEventListener();
  }

  initEventListener() {
    this.myEmitter.on("Manager:hireBarista", (num) => {
      this.createBarista(num);
    });

    this.myEmitter.on("Manager:initBarista", (baristaIds) => {
      baristaIds.forEach((e) =>
        this.myEmitter.emit("Barista:nextMenu", { baristaId: e })
      );
    });
  }

  createBarista(num) {
    for (let i = 1; i <= num; i++) {
      this.myEmitter.on(i, ({ orderId, menuIdx, menu }) => {
        if (menu === "end") {
          this.myEmitter.emit("Barista:end", i);
          ///id 보내야함
        } else {
          this.makeOrderMenu(orderId, menuIdx, menu, i);
        }
      });
    }
  }

  makeOrderMenu(orderId, menuIdx, menu, baristaId) {
    const orderObj = { orderId, menuIdx, menu, baristaId };
    this.myEmitter.emit("Barista:startMenu", orderObj);

    setTimeout(() => {
      this.myEmitter.emit("Barista:nextMenu", orderObj);
    }, this._menuTime[menu]);
  }
}

module.exports = Barista;
