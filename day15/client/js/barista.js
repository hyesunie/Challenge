class Barista {
  _menuTime = { 1: 3, 2: 4, 3: 10 };
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._addEventListener();
  }

  _makeDrinkMenu(id, menu) {
    this._makeMenuTime(menu, this._menuTime[menu]);
    this.myEmitter.emit("success", id, menu);
  }

  _setNumberOfBarista(num) {
    for (let i = 1; i <= num; i++) {
      this.myEmitter.on(`${i}`, (id, menu) => {
        console.log("barista : ", id, menu);
        if (menu === undefined) this.myEmitter.emit("endOrder");
        this._makeDrinkMenu(id, menu);
      });
    }
  }

  _addEventListener() {
    this.myEmitter.on("setBarista", (num) => {
      this._setNumberOfBarista(num);
    });
  }

  _makeMenuTime(menu, time) {
    const start = new Date();

    while (true) {
      if (new Date().getSeconds() - start.getSeconds() >= time) {
        return;
      }
    }
  }
}

module.exports = Barista;
