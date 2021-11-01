const readline = require("readline");

class Casher {
  orderId = 0;
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this.initEventListener();
  }

  initEventListener() {}

  run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("바리스타 수를 입력해주세요.\n", (input) => {
      console.log(`${input}명의 바리스타가 근무를 합니다.\n`);
      this.myEmitter.emit("Casher:setBarista", input);
      this._recieveCommandLine(rl);
    });
  }

  _recieveCommandLine(rl) {
    rl.question(
      `메뉴를 주문하세요. \n 고객명: 1.아메리카노 2.라떼 3.프라프치노 (ex) sunny: 1-2, 2-1, 3-2 \n`,
      (commandLine) => {
        const [nickname, rawOrder] = commandLine.split(":");
        const orderObj = rawOrder
          .replace(/\s/g, "")
          .split(",")
          .reduce((acc, cur) => {
            const [menu, count] = cur.split("-");
            acc[menu] = new Array(Number(count)).fill("waiting");
            return acc;
          }, {});

        const orderInfo = {
          id: this.orderId,
          nickname,
          order: orderObj,
          completion: "no",
        };

        this.orderId++;
        this.myEmitter.emit("Casher:addOrder", orderInfo);
        this._recieveCommandLine(rl);
      }
    );
  }
}

module.exports = Casher;
