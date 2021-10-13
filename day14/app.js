const express = require("express");
const app = express();

app.listen(7070, () => {
  console.log("port open");
});

app.use(express.static("js"));
app.use(express.static("html"));
// app.use(express.json());

app.get("/", (req, res) => {
  console.log("get");
  res.render("index");
});
