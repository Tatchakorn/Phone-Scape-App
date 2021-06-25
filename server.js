const express = require("express");
const path = require("path");
const app = express();
const parser = require("./parser.js");

app.use(express.static(path.resolve("public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

let priceResult = {
  binance_sell: null,
  binance_buy: null,
  bitkub_sell: null,
  bitkub_buy: null,
}

async function updateBinace() {
  const result = await parser.getDataBinance();
  priceResult.binance_buy = result[0];
  priceResult.binance_sell = result[1];
};

const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const minute = (num) => num * 60000;
(function loopRandInterval() {
  let duration = randNum(minute(5), minute(10));
  setTimeout(() => {
    updateBinace();
  }, duration);
})();


app.get("/", (req, res) => {
  res.render("index", priceResult);
});

app.listen(process.env.port || 3000, () => {
  console.log("Server started on port 3000")
});