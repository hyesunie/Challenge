const dns = require("dns");
const net = require("net");
const URL = require("./url");
const Request = require("./request");
const Response = require("./response");
const ResponseView = require("./response-view");

function main(inputUrl) {
  const url = new URL(inputUrl);
  let urlAddress = "";

  dns.lookup(url.host, (err, address, family) => {
    console.log("address: %j family: IPv%s", address, family);
    const client = new net.Socket();
    client.setEncoding("utf-8");
    try {
      client.connect({ port: 80, host: address }, () => {
        manage(client, inputUrl);
      });
    } catch (e) {
      console.log("catch ", e);
    }
  });
}

function manage(client, url) {
  let test = [];
  client.on("error", function (err) {
    console.log("client Socket Error: " + err);
  });
  client.on("data", (data) => {
    test.push(data);
    const response = new Response(data);
    const view = new ResponseView(response.getBody());
    view.updateView();
  });

  const request = new Request(url, {
    "User-Agent": "PostmanRuntime/7.28.3",
    Connection: "keep-alive",
  });
  console.log(request.stringfy());

  client.write(request.stringfy());
}

main("http://www.naver.com/");
