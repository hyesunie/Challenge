const readline = require("readline");

class Cashier {
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
  }

  run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("바리스타 수를 입력해주세요.\n", (input) => {
      console.log(`${input}명의 바리스타가 근무를 합니다.\n`);
      this.myEmitter.emit("setBarista", input);
      this._recieveCommandLine(rl);
    });
  }

  _recieveCommandLine(rl) {
    rl.question(
      `메뉴를 주문하세요. \n  1.아메리카노 2.라떼 3.프라프치노 (ex) 1-2, 2-1, 3-2 \n`,
      (commandLine) => {
        const orderObj = commandLine
          .replace(/\s/g, "")
          .split(",")
          .reduce((acc, cur) => {
            const [menu, count] = cur.split("-");
            acc[menu] = Number(count);
            return acc;
          }, {});

        this.myEmitter.emit("addOrder", orderObj);
        this._recieveCommandLine(rl);
      }
    );
  }
}

module.exports = Cashier;
