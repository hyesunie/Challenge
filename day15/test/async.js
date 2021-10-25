const EventEmitter = require("events");
const myEmitter = new EventEmitter();

const getDogs = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(order);
    }, 500);
  });
};

// const pr = new Promise((resolve, reject) => {
//   const h = "hi";
//   setTimeout(() => {
//     resolve(h);
//   }, 500);
// });

// myEmitter.on("event", (order) => {
//   const dogs = getDogs();
//   dogs.then((val) => {
//     console.log(val);
//   });
//   console.log(dogs);
// });
myEmitter.on("event", async (order) => {
  const pr = await getDogs(order);
  //   pr.then((val) => {
  //     console.log(val);
  //   });
  console.log(pr);
});

myEmitter.emit("event", "hello");
