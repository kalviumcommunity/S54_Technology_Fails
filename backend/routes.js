const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user.js");
const Post = require("./models/post.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Router = express.Router();
const PostRouter = express.Router();
require("dotenv").config();
Router.use(express.json());
PostRouter.use(express.json());
// main()
//   .then(() => {
//     console.log("Connection Successful!");
//   })
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.mongo_link);
// }

PostRouter.get("/", async (req, res) => {
  let resData;
  await Post.find().then((data) => {
    resData = data;
  });
  res.send(resData);
});

Router.get("/", async (req, res) => {
  let resData;
  await User.find().then((data) => {
    resData = data;
  });
  res.send(resData);
});

Router.post(
  "/",
  wrapAsync(async (req, res) => {
    let postData = new User(req.body);
    await postData.save();
    res.send("Added");
  })
);
PostRouter.post(
  "/",
  wrapAsync(async (req, res) => {
    let postData = new Post(req.body);
    await postData.save();
    res.send("Added");
  })
);

Router.put("/:username", async (req, res) => {
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

PostRouter.put("/:title", async (req, res) => {
  try {
    let { title } = req.params;
    let newData = req.body;

    let result = await Post.findOneAndUpdate({ title: title }, newData);

    if (result === null || result === undefined) {
      res.status(404).send("User not found");
    } else {
      res.send("UPDATED");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

Router.delete(
  "/",
  wrapAsync(async (req, res) => {
    let deleteUser = req.body.userName;
    // console.log(deleteUser)
    let result = await User.deleteOne({ userName: deleteUser });
    // console.log(result)
    if (result.deletedCount == 0) {
      throw new ExpressError(404, "User not found..!");
    }
    res.send("Deleted");
  })
);

PostRouter.delete(
  "/",
  wrapAsync(async (req, res) => {
    let title = req.body.title;
    // console.log(deleteUser)
    let result = await Post.deleteOne({ title: title });
    // console.log(result)
    if (result.deletedCount == 0) {
      throw new ExpressError(404, "Post not found..!");
    }
    res.send("Deleted");
  })
);

PostRouter.use((err, req, res, next) => {
    let {status=500,message="Some error occured..!"} = err
  console.log(err);
  res.status(status).send(err.message);
});

module.exports = { Router, PostRouter };
