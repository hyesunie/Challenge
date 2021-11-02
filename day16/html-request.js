const dns = require("dns");
const net = require("net");
const URL = require("./url");

function main(inputUrl) {
  const url = new URL(inputUrl);
  let urlAddress = "";

  dns.lookup(url.host, (err, address, family) => {
    console.log("address: %j family: IPv%s", address, family);
    const client = new net.Socket();
    client.setEncoding("utf-8");
    try {
      client.connect({ port: 80, host: address }, () => {
        console.log("connected");
        manage(client, url);
      });
    } catch (e) {
      console.log("catch ", e);
    }
  });
}

function manage(client, url) {
  // const Request = new Request(url.host, { method: "GET" });
  // console.log(Request);

  // const request = "GET / http/1.1";
  client.on("error", function (err) {
    console.log("client Socket Error: " + err);
  });
  client.on("data", (data) => {
    console.log(data);
  });
  const req =
    "GET / HTTP/1.1\r\nAccept: */*\r\nHost: zum.com\r\nUser-Agent: Mozilla/5.0\r\nConnection: keep-alive\r\n\r\n";

  const suc = client.write(req);
  console.log(suc);
}

main("http://zum.com");
