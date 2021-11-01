class CafeInfo {
  barista = 0;
  orderList = [];

  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this.initEventListener();
  }

  initEventListener() {
    this.myEmitter.on("Casher:setBarista", (count) => {
      this.barista = count;
      this.myEmitter.emit("CafeInfo:sendBaristaNumber", this.barista);
    });

    this.myEmitter.on("Casher:addOrder", (order) => {
      this.orderList.push(order);
    });

    this.myEmitter.on("Manager:getNewOrder", () => {
      const idx = this.orderList.findIndex((e) => e.completion === "no");

      if (idx > -1) {
        let order = this.orderList[idx];
        this.myEmitter.emit("CafeInfo:sendNewOrder", order);
        order.completion = "proceeding";
      }
    });

    this.myEmitter.on("Manaser:successMenu", (successMenu) => {
      const { orderId, menuIdx, menu, baristaId } = successMenu;

      const order = this.orderList.find((e) => e.id === orderId);
      order.order[menu][menuIdx] = "success";

      let isSuccess = true;
      Object.keys(order.order).forEach((e) => {
        order.order[e].forEach((el) => {
          if (el !== "success") isSuccess = false;
        });
      });

      if (isSuccess) {
        order.completion = "ok";
      }

      this.myEmitter.emit("CafeInfo:updateInfo", this.orderList);
    });

    // this.myEmitter.on("Manager:startMenu",(startMenu)=>)
  }
}

module.exports = CafeInfo;
