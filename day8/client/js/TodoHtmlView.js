const fs = require("fs");
const path = require("path");

class TodoHtmlView {
  constructor(TodoModel) {
    this.TodoModel = TodoModel;
    this.TodoModel.subscribe(this.update.bind(this));
  }

  update(msg) {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TodoList Result</title>
      </head>
      <body>
        <h1>todolist</h1>
        <div class="log">
          ${msg}
        </div>
      </body>
    </html>
    `;
    // 경로 수정해보쎼요!
    const pathname = path.resolve(__filename, "../../../html/log.html");
    // sync 랑 async 차이 왜있는지... 시간나면 어쓍크 해보쎄여!
    fs.writeFileSync(pathname, html, function (err) {
      console.log(err);
    });
  }
}

module.exports = TodoHtmlView;
