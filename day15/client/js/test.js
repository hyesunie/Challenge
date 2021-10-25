const EventEmitter = require("events");
const readline = require("readline");

const Cashier = require("./cashier.js");
const Order = require("./order.js");
const Manager = require("./manager.js");
const Barista = require("./barista.js");

class MyEmitter extends EventEmitter {}

function init() {
  const myEmitter = new EventEmitter();
  const cashier = new Cashier(myEmitter);
  const order = new Order(myEmitter);
  const manager = new Manager(myEmitter);
  const barista = new Barista(myEmitter);

  cashier.run();
}

init();
// myEmitter.on("event", (a, b) => {
//   console.log(a, b, this);
// });
// myEmitter.once("hello", (a, b) => {
//   console.log("hello", a, b, this);
// });

// myEmitter.emit("event", "(a)", "(b)");
// myEmitter.emit("event", "(a)", "(b)");
// myEmitter.emit("hello", "(a)", "(b)");

// console.log(myEmitter.getMaxListeners());
