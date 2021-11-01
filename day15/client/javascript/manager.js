class Manager {
  historyIdx = 0;
  orderHistory = [];
  orderMenuList = [];
  baristaCount = 0;
  successBarista = {};
  isCurrnetOrder = false;

  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._runEventListener();
  }

  _runEventListener() {
    this.myEmitter.on("setBarista", (num) => {
      this.baristaCount = Number(num);
      for (let i = 1; i <= num; i++) {
        this.successBarista[i] = 0;
      }
    });

    this.myEmitter.on("addOrder", (orderInfo) => {
      this.isCurrnetOrder = true;
      this.orderHistory.push(orderInfo);
      const idx = this.orderHistory.length - 1;

      setTimeout(() => {
        this._manageOrder(orderInfo, idx);
      }, 500);
    });

    this.myEmitter.on("nextMenu", (id, menu, num, idx) => {
      if (menu !== "hello") {
        // console.log(
        //   `#Barista${id} : ${
        //     this.orderHistory[this.historyIdx].nickname
        //   }의 ${menu}가 완성됐습니다.`
        // );

        this.orderHistory[this.historyIdx].order[menu][idx] = "success";

        this.myEmitter.emit("successMenu", this.orderHistory);
      }

      setTimeout(() => {
        for (let i = 0; i < num; i++) {
          const [nextMenu, menuIdx] = this.getNextMenu().split(".");

          this.myEmitter.emit(id, id, nextMenu, menuIdx);
        }
      }, 300);
    });

    this.myEmitter.on("startMenu", (id, menu, idx) => {
      // console.log(
      //   `>Barista${id} : ${
      //     this.orderHistory[this.historyIdx].nickname
      //   }의 ${menu}를 만들기 시작했습니다.`
      // );
      // console.log("startMenu", this.orderHistory, this.historyIdx);

      this.orderHistory[this.historyIdx].order[menu][idx] = "start";
    });

    this.myEmitter.on("end", (id) => {
      const endOrder = true;
      this.successBarista[id]++;

      Object.keys(this.successBarista).forEach((e) => {
        if (this.successBarista[e] !== 2) this.endOrder = false;
      });

      if (endOrder) {
        this.isCurrnetOrder = false;
        this._checkEndProgram(1);
      }
    });
  }

  _runOrder(order) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(order);
      }, 1000);
    });
  }

  async _manageOrder(orderInfo, idx) {
    this.historyIdx = idx;
    const currentOrder = orderInfo;

    // console.log(orderInfo, this.orderHistory);

    Object.keys(currentOrder.order).forEach((e) => {
      // console.log(currentOrder[e]);
      this._makeOrderList(e, currentOrder.order[e].length);
    });

    this.myEmitter.emit("initBarista");
  }

  _makeOrderList(menu, cnt) {
    for (let i = 0; i < cnt; i++) {
      this.orderMenuList.push(`${menu}.${i}`);
    }
  }

  _checkEndProgram(num) {
    setTimeout(() => {
      if (this.isCurrnetOrder === true || num > 3) return;
      if (num < 3) {
        this._checkEndProgram(++num);
      } else if (num === 3) {
        this.myEmitter.emit("processEnd");
      }
    }, 1000);
  }

  getNextMenu() {
    return this.orderMenuList.length === 0 ? "end" : this.orderMenuList.shift();
  }
}

module.exports = Manager;
