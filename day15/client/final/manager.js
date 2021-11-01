class Manager {
  menuList = [];
  baristaNum = 0;
  barista = [];

  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this.initEventListener();
  }

  initEventListener() {
    this.myEmitter.on("CafeInfo:sendNewOrder", (order) => {
      this.manageOrder(order);
    });

    this.myEmitter.on("CafeInfo:sendBaristaNumber", (num) => {
      this.myEmitter.emit("Manager:hireBarista", num);
      this.baristaNum = num;
      for (let i = 1; i <= num; i++) {
        this.barista.push(i);
        this.barista.push(i);
      }
      this.getNewOrder(1);
    });

    this.myEmitter.on("Barista:nextMenu", (successOrder) => {
      const { orderId, menuIdx, menu, baristaId } = successOrder;

      if (orderId !== undefined) {
        this.myEmitter.emit("Manaser:successMenu", successOrder);
      }

      // console.log(`barista${baristaId}: 주문${orderId}, 메뉴${menu}`);
      this.assignJobToBarista(baristaId);
    });

    this.myEmitter.on("Barista:startMenu", (StartMenu) => {
      this.myEmitter.emit("Manager:startMenu", StartMenu);
    });

    this.myEmitter.on("Barista:end", (baristaId) => {
      this.barista.push(baristaId);

      if (this.barista.length === this.baristaNum * 2) {
        this.exitManager(0);
      }
    });
  }

  manageOrder({ id, nickname, order, completion }) {
    this.createMenuOrder(id, order);
    this.initBarista();
  }

  createMenuOrder(id, order) {
    Object.keys(order).forEach((e) => {
      order[e].forEach((el, idx) => {
        this.menuList.push({ orderId: id, menuIdx: idx, menu: e });
      });
    });

    console.log(this.menuList);
  }

  assignJobToBarista(baristaId) {
    const orderMenu =
      this.menuList.length === 0 ? { menu: "end" } : this.menuList.shift();

    this.myEmitter.emit(baristaId, orderMenu);
  }

  initBarista() {
    this.myEmitter.emit("Manager:initBarista", this.barista);
    this.barista = [];
  }

  getNewOrder() {
    setTimeout(() => {
      this.myEmitter.emit("Manager:getNewOrder");
      this.getNewOrder();
    }, 1000);
  }

  exitManager(num) {
    if (num === 3) process.exit();
    setTimeout(() => {
      if (this.menuList.length === 0) {
        this.exitManager(++num);
      } else {
        return;
      }
    }, 1000);
  }
}

module.exports = Manager;
