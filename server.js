const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
let connectionStatus;
main()
  .then(() => {
    connectionStatus = true;
    console.log("Connection Successful!");
  })
  .catch((err) => {
    connectionStatus = false
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.mongo_link);
}

app.get("/", (req, res) => {
  if(connectionStatus){
    res.send("Connected to MongoDB successfully!")
  }else{
    res.send("A problem occured while connecting to DataBase!")
  }
});

app.get("/ping", (req, res) => {
  res.send("RIKHIL");
});

app.listen(8080, () => {
  console.log("Listening on Port 8000");
});
