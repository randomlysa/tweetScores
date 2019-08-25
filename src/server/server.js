const express = require("express");
const cors = require("cors");
const writeJson = require("write-json");
const fs = require("fs");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies

app.get("/", (req, res) => {
  res.send("You probably want /game/:gameId");
});

app.post("/game/:gameId", (req, res) => {
  console.log("12", req.params);
  writeJson(`gameinfo-${req.params.gameId}.json`, req.body.data, function(err) {
    if (err) console.log("Error writing gameinfo to json file: ", err);
    else console.log(`Write successful - ${req.params.gameId}`);
  });
});

app.get("/game/:gameId/json", (req, res) => {
  console.log(req.params.gameId);
  fs.readFile(`gameinfo-${req.params.gameId}.json`, "utf8", function(
    err,
    data
  ) {
    if (err) throw err;
    console.log(data);
    res.send(JSON.parse(data));
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
