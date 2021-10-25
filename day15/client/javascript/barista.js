class Barista {
  _menuTime = { 1: 3000, 2: 4000, 3: 10000 };
  _barista = 0;
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
        this.myEmitter.emit("nextMenu", i, "hello");
      }
    });
  }

  _createBarista(num) {
    for (let i = 1; i <= num; i++) {
      this.myEmitter.on(i, (id, menu) => {
        if (menu === "end") {
          this.myEmitter.emit("end");
        } else {
          this._makeOrderMenu(id, menu);
        }
      });
    }
  }

  _makeOrderMenu(id, menu) {
    // console.log(`barista${id} : Start ${menu}`);
    setTimeout(() => {
      this.myEmitter.emit("nextMenu", id, menu);
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
