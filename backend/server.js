const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.mongo_link);
}

app.get("/", (req, res) => {
  res.send("HOME PAGE")
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(8080, () => {
  console.log("Listening on Port 8000");
});
