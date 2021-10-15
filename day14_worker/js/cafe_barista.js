// class CafeBarista {
//   constructor() {}
//   test(e) {
//     console.log(e);
//   }
// }
onmessage = function (e) {
  const [menu, id] = e.data;
  const makingTime = { ame: 3, latte: 4, fra: 10 };

  console.log(`barista${id} : ${menu}를 만드는 중입니다.`);
  makeOrderMenu(menu, id, makingTime[menu]);
};

function makeOrderMenu(menu, id, time) {
  const start = new Date();

  while (true) {
    if (new Date().getSeconds() - start.getSeconds() >= time) {
      postMessage([menu, id]);
      break;
    }
  }
}
