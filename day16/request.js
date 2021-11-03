const URL = require("./url");

class Request {
  header = {
    Method: "GET",
    Accept: "text/html",
  };

  constructor(url, header) {
    this.url = new URL(url);
    this.header["Host"] = this.url.host;

    if (header !== undefined) this.addHeader(header);
  }

  addHeader(input) {
    const newHeader = { ...this.header };

    Object.keys(input).forEach((e) => {
      newHeader[e] = input[e];
    });

    this._setHeader(newHeader);
  }

  stringfy() {
    const pathAndQuery =
      this.url.path + (this.url.query === "" ? "" : `?${this.url.query}`);
    let message = `${this.header.Method} /${pathAndQuery} HTTP/1.1\r\n`;

    message = Object.keys(this.header).reduce((acc, cur) => {
      if (cur === "Method") return acc;
      acc += `${cur}: ${this.header[cur]}\r\n`;
      return acc;
    }, message);

    message += "\r\n";

    return message;
  }

  _setHeader(newHeader) {
    this.header = { ...newHeader };
  }
}

module.exports = Request;
