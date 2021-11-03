class Response {
  constructor(data) {
    const [rawHeader, rawBody] = data.split("\r\n\r\n");
    this.body = Buffer.from(rawBody, "utf-8");
    this.header = rawHeader;
    this.processHeaderInfo(rawHeader);
  }

  processHeaderInfo(header) {
    let newHeaders = header.split("\r\n");

    this.statusCode = Number(newHeaders.shift().split(" ")[1]);

    let idx = newHeaders.findIndex((e) => {
      return e.includes("Content-Length");
    });

    this.contentLength =
      idx > -1 ? Number(newHeaders[idx].match(/\d+/)[0]) : this.body.length;
    this.headers = [...newHeaders];
  }

  getHeader() {
    return this.header;
  }

  getBody() {
    return this.body.toString("utf8");
  }
}

module.exports = Response;
