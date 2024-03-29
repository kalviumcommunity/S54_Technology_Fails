const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Router, PostRouter } = require("./routes");
const cors = require("cors")

require("dotenv").config();

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_LINK);
}
app.use(cors())
app.get("/", (req, res) => {
  res.send("HOME PAGE")
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/users",Router)
app.use("/posts",PostRouter)

app.listen(8080, () => {
  console.log("Listening on Port 8080");
});
