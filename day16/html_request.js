const dns = require("dns");
const net = require("net");
const URL = require("./url");

function main(inputUrl) {
  const url = new URL(inputUrl);
  let urlAddress = "";

  dns.lookup(url.host, (err, address, family) => {
    console.log("address: %j family: IPv%s", address, family);
    net.connect({ port: 80, host: address }, () => {
      console.log("connected");
    });
  });
}

main("http://zum.com");
