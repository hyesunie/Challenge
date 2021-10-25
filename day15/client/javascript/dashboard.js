const fs = require("fs");
const path = require("path");

class Dashboard {
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this._runEventListener();
  }

  _runEventListener() {
    this.myEmitter.on("successMenu", () => {});
  }

  updateView(message) {
    //   const html =
  }
}

module.exports = Dashboard;
