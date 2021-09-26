const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function init(a) {
  console.log(a);
}

function fetchCommandJSON(url = "") {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

fetchCommandJSON("http://localhost:8090/answer").then((initJson) =>
  init(initJson)
);
