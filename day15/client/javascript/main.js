const EventEmitter = require("events");

const Cashier = require("./cashier.js");
const Manager = require("./manager.js");
const Barista = require("./barista.js");
const Dashboard = require("./dashboard.js");

class MyEmitter extends EventEmitter {}

function init() {
  const myEmitter = new EventEmitter();
  const cashier = new Cashier(myEmitter);
  const barista = new Barista(myEmitter);
  const dashboard = new Dashboard(myEmitter);
  const manager = new Manager(myEmitter);

  cashier.run();
}

init();
