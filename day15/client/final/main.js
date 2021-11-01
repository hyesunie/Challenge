const MyEmitter = require("events");

const Casher = require("./casher");
const Manager = require("./manager");
const Barista = require("./barista");
const Dashboard = require("./dashboard");
const CafeInfo = require("./cafe_info");

function main() {
  const myEmitter = new MyEmitter();
  const casher = new Casher(myEmitter);
  const cafeInfo = new CafeInfo(myEmitter);
  const manager = new Manager(myEmitter);
  const barista = new Barista(myEmitter);
  const dashboard = new Dashboard(myEmitter);

  casher.run();
}

main();
