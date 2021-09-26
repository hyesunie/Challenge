const express = require("express");
const fs = require("fs");

const app = express();
const port = 8090;

app.listen(port, () => {
  console.log(`listening port ${port}`);
});

app.use(express.static("public"));
app.use(express.json());

app.post("/answer", (req, res) => {
  console.log(req.body);
  const data = JSON.parse(fs.readFileSync("./response.json", "utf8"));
  res.json(data);
});
