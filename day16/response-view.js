const fs = require("fs");
const path = require("path");

class ResponseView {
  constructor(html) {
    this.html = html;
  }

  updateView() {
    const pathname = path.resolve(__filename, "../index.html");
    // sync 랑 async 차이 왜있는지... 시간나면 어쓍크 해보쎄여!
    fs.writeFileSync(pathname, this.html, function (err) {
      console.log(err);
    });
  }
}

module.exports = ResponseView;
