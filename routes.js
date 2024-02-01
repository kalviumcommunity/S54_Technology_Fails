const mongoose = require("mongoose")
const express = require("express")
const app = express()
const User = require("./models/user.js")
require("dotenv").config();
app.use(express.json())
main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));
  

async function main() {
  await mongoose.connect(process.env.mongo_link);
}


app.get("/", async (req,res)=>{
    let resData
    await User.find().then( (data)=>{
        resData = data
    })
    res.send(resData)
})

app.post("/", async (req,res)=>{
    let postData = new User(req.body)
    await postData.save().then((result)=>{
        res.send("ADDED")   
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

app.put("/:username", async (req, res) => {
    try {
        let { username } = req.params;
        let newData = req.body;

        let result = await User.findOneAndUpdate({ userName: username }, newData);

        if (result === null || result === undefined) {
            res.status(404).send("User not found");
        } else {
            res.send("UPDATED");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.delete("/", async (req,res)=>{
    let deleteUser = req.body.userName
    // console.log(deleteUser)
    try{
        let result = await User.deleteOne({userName:deleteUser})
        // console.log(result)
        if (result.deletedCount==0){
            res.status(404).send("User not found..!")
        }else{
            res.send("DELETED")
        }
    }catch{
        res.status(500).send(err.message)
    }
})

const port = 8080
app.listen(port,()=>{
    console.log(`App is Listening on PORT : ${port}`)
})