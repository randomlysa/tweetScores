const express = require("express");
const cors = require("cors");
const writeJson = require("write-json");

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
    else console.log(`Write successfu - ${req.params.gameId}`);
  });
});

app.get("/game/:gameId/json", (req, res) => {
  console.log(req.params.gameId);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
