class Order {
  _orderList = [];
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._addEventListener();
  }

  addOrderList(order) {
    // this.myEmitter.emit("orderList", order);

    const newOrderList = this.getOrderList();
    newOrderList.push(order);
    this.setOrderList(newOrderList);
  }

  // getOrderList() {
  //   return this._orderList;
  // }

  // setOrderList(newOrderList) {
  //   this._orderList = [...newOrderList];
  // }

  // _addEventListener() {
  //   this.myEmitter.on("addOrder", (order) => {
  //     this.addOrderList(order);
  //   });
  // }
}

module.exports = Order;
