const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user.js");
const Post = require("./models/post.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { postValidation } = require("./utils/postValidation.js");
const Router = express.Router();
const PostRouter = express.Router();
var jwt = require("jsonwebtoken");
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

const validatePost = (req, res, next) => {
  let { error } = postValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const jwtVerify = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let result = jwt.verify(authorization, process.env.JWT_PASS);
    console.log(result.username);
    next();
  } catch (err) {
    throw new ExpressError(
      403,
      "Not authorised to access this route without correct auth token"
    );
  }
};

PostRouter.get("/", async (req, res) => {
  let resData;
  await Post.find().then((data) => {
    resData = data;
  });
  res.send(resData);
});

PostRouter.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let result = await Post.findById(id);
    if (result == null) {
      throw new ExpressError(404, "Post not found..!");
    }
    console.log(result);
    res.send(result);
  })
);

PostRouter.get(
  "/user/:user",
  wrapAsync(async(req,res)=>{
    let {user} = req.params
    let result = await Post.find({user:user})
    if(result.length==0){
      throw new ExpressError(404,"No posts associated with this user found")
    }
    res.send(result)
  })
)

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
    let token = jwt.sign({ username: req.body.userName }, process.env.JWT_PASS);
    res.send(token);
  })
);
Router.post(
  "/login",
  wrapAsync(async (req, res) => {
    let { userName, password } = req.body;
    let result = await User.find({ userName: userName });
    if (result.length == 0) {
      throw new ExpressError(404, "User not found!");
    } else {
      let savedPassword = result[0].password;
      if (savedPassword != password) {
        throw new ExpressError(401, "Wrong Password");
      } else {
        let token = jwt.sign(
          { username: req.body.userName },
          process.env.JWT_PASS
        );
        res.send(token);
      }
    }
  })
);
PostRouter.post(
  "/",
  jwtVerify,
  validatePost,
  wrapAsync(async (req, res) => {
    console.log(req.body);
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

PostRouter.put(
  "/:id",
  validatePost,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newData = req.body;

    let result = await Post.findByIdAndUpdate(id, newData);

    if (result === null || result === undefined) {
      throw new ExpressError(404, "Post not found..!");
    } else {
      res.send("UPDATED");
    }
  })
);

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
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let result = await Post.findByIdAndDelete(id);
    // console.log(result)
    if (result.deletedCount == 0) {
      throw new ExpressError(404, "Post not found..!");
    }
    res.send("Deleted");
  })
);

PostRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  // console.log(err);
  res.status(status).send(err.message);
});

module.exports = { Router, PostRouter };
