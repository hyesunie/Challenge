const fs = require("fs");
const path = require("path");

class Dashboard {
  constructor(myEmitter) {
    this.myEmitter = myEmitter;
    this.initEventListener();
  }

  initEventListener() {
    this.myEmitter.on("CafeInfo:updateInfo", (orderList) => {
      const message = orderList.reduce((acc, cur) => {
        acc += `<h2>${cur.id}-${cur.nickname}의 주문 현황</h2>
          <h4>아메리카노 주문 : ${this.makeDrinkState(cur.order[1])}</h4>
          <h4>라떼 주문 : ${this.makeDrinkState(cur.order[2])}</h4>
          <h4>프라푸치노 주문 : ${this.makeDrinkState(cur.order[3])} </h4>
          <br>
          <h3>주문 완성 여부 : ${cur.completion}</h3>
          <br>`;
        return acc;
      }, "");

      this.updateView(message);
    });
  }

  updateView(message) {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cafe Result</title>
      </head>
      <body>
        <h1>Cafe Dashboard</h1>
        <div class="log">
          ${message}
        </div>
      </body>
    </html>
    `;

    const pathname = path.resolve(__filename, "../../../html/index.html");
    // sync 랑 async 차이 왜있는지... 시간나면 어쓍크 해보쎄여!
    fs.writeFileSync(pathname, html, function (err) {
      console.log(err);
    });
  }

  makeDrinkState(arr) {
    if (arr === undefined) return "no order";
    arr = arr.map((e) => {
      if (e === "success") {
        return "○";
      } else if (e === "start") {
        return "△";
      } else {
        return "X";
      }
    });

    return arr;
  }
}

module.exports = Dashboard;
