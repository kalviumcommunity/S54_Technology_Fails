const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tagline:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    default:"Coming Soon..!"
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date()
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
