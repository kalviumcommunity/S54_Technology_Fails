const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Root Path")
})

app.get("/ping",(req,res)=>{
    res.send("PONG")
})

app.listen(8080,()=>{
    console.log("Listening on Port 8000")
})