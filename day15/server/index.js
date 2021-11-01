const express = require("express");
const app = express();

app.listen(8080, () => {
  console.log("8080 port Listening");
});

app.use(express.static("../html"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.html");
});

// app.post("")
