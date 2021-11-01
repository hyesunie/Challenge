// const URL = require("./url");
// const url = require("url");

function main() {
  const rUrl = new URL(
    "http://user_name:pass-word@boostcamp.connect-foundation.or.kr/first/second/last?query=ab&param=12"
  );

  console.log(rUrl.host);
  console.log(rUrl.lastPathComponent);
  console.log(rUrl.pathComponents);
  console.log(rUrl.port);
  console.log(rUrl.query);
  console.log(rUrl.scheme);
  console.log(rUrl.isFileUrl);
  console.log(rUrl.user);
  console.log(rUrl.password);
  console.log(rUrl.absoluteString);

  //   rUrl.appendPathComponent("hello");

  //   var zumurl = new URL("<http://admin@zum.com/#!/home?query=zum>");

  //   var naverurl = new URL("<http://m.naver.com>");
  //   console.log(zumurl.isEqual(naverurl));

  //   var url1 = new URL("<http://admin@zum.com/#!/home?query=zum>");
  //   console.log(zumurl.isEqual(url1));

  //   var url2 = new URL("<http://admin@zum.com/#!/home>");
  //   console.log(zumurl.isEqual(url2));

  //   var url3 = new URL("<http://admin@zum.com/?param=zum>");
  //   console.log(zumurl.isEqual(url3));

  //   var url4 = new URL("<http://zum.com/#!/home>");
  //   console.log(zumurl.isEqual(url4));
}

main();
