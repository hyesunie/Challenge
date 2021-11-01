class Barista {
  _menuTime = { 1: 3000, 2: 4000, 3: 10000 };
  _barista = 0;
  _baristaState = [];
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._runtInitEventListener();
  }

  _runtInitEventListener() {
    this.myEmitter.on("setBarista", (num) => {
      this._barista = num;
      this._createBarista(num);
    });
    this.myEmitter.on("initBarista", () => {
      for (let i = 1; i <= this._barista; i++) {
        const state = this._baristaState[i] === "working" ? true : false;

        if (!state) {
          this._baristaState[i] = "working";
          this.myEmitter.emit("nextMenu", i, "hello", 2);
        }
      }
    });
  }

  _createBarista(num) {
    for (let i = 1; i <= num; i++) {
      this._baristaState = new Array(num).fill("notWorking");
      this.myEmitter.on(i, (id, menu, menuIdx) => {
        if (menu === "end") {
          this._baristaState[i] = "resting";
          this.myEmitter.emit("end", id);
        } else {
          this._makeOrderMenu(id, menu, menuIdx);
        }
      });
    }
  }

  _makeOrderMenu(id, menu, menuIdx) {
    this.myEmitter.emit("startMenu", id, menu, menuIdx);

    setTimeout(() => {
      this.myEmitter.emit("nextMenu", id, menu, 1, menuIdx);
    }, this._menuTime[menu]);
  }

  //   _makeMenuTime(time) {
  //     const start = new Date();

  //     while (true) {
  //       if (new Date().getSeconds() - start.getSeconds() >= time) {
  //         return;
  //       }
  //     }
  //   }
}

module.exports = Barista;
