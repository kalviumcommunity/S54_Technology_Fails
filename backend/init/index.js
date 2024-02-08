const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
require("dotenv").config({ path: "../.env" });

// console.log(process.env)

main()
  .then(() => {
    console.log("Connection Successful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongo_link);
}

const usersData = [
  new User({
    userName: "user123",
    name: "Nitin-1",
    joiningDate: new Date(),
    followers: 2,
    following: 1,
    posts: 1,
  }),
  new User({
    userName: "user124",
    name: "Nitin-2",
    joiningDate: new Date(),
    followers: 3,
    following: 34,
    posts: 1,
  }),
  new User({
    userName: "user125",
    name: "Nitin-3",
    joiningDate: new Date(),
    followers: 60,
    following: 1,
    posts: 7,
  }),
  new User({
    userName: "user126",
    name: "Nitin-4",
    joiningDate: new Date(),
    followers: 76,
    following: 14,
    posts: 56,
  }),
  new User({
    userName: "user127",
    name: "Nitin-5",
    joiningDate: new Date(),
    followers: 38,
    following: 1,
    posts: 25,
  }),
  new User({
    userName: "user128",
    name: "Nitin-6",
    joiningDate: new Date(),
    followers: 40,
    following: 45,
    posts: 22,
  }),
  new User({
    userName: "user129",
    name: "Nitin-7",
    joiningDate: new Date(),
    followers: 43,
    following: 1,
    posts: 66,
  }),
  new User({
    userName: "user130",
    name: "Nitin-8",
    joiningDate: new Date(),
    followers: 69,
    following: 31,
    posts: 85,
  }),
  new User({
    userName: "user131",
    name: "Nitin-9",
    joiningDate: new Date(),
    followers: 59,
    following: 52,
    posts: 95,
  }),
  new User({
    userName: "user132",
    name: "Nitin-10",
    joiningDate: new Date(),
    followers: 239,
    following: 32,
    posts: 35,
  }),
];

const postData = [
  new Post({
    title: "Twiiter / X ..?",
    tagline: "How to destroy a Social Media App..?",
    image: "https://th.bing.com/th/id/OIG4.SpUTu0nJ5H7MUV6GYBoW?pid=ImgGn",
    user: "Rikhil",
  }),
  new Post({
    title: "Apple Newton: Visionary but flawed",
    tagline: "An overpriced MessagePad",
    image: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2023/08/apple-newton-messagepad-pda.jpg",
    user: "Rikhil",
  }),
  new Post({
    title: "BlackBerry Storm",
    tagline: "A gimmicky touchscreen",
    image: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2023/08/blackberry-storm.jpg",
    user: "Rikhil",
  }),
  new Post({
    title: "Google Glass",
    tagline: "Too soon to be good",
    image: "https://th.bing.com/th/id/OIG4.SpUTu0nJ5H7MUV6GYBoW?pid=ImgGn",
    user: "Rikhil",
  }),
  new Post({
    title: "Microsoft Band",
    tagline: "Software Company trying Hardware...nice!",
    image: "https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/828x552/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/2447948/microsoft-band-012-2040.0.jpg",
    user: "Rikhil",
  }),
  new Post({
    title: "Samsung Bixby",
    tagline: "*Not* so intelligent Voice Assistant",
    image: "https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/828x552/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/10457665/akrales_180319_2395_0032.jpg",
    user: "Rikhil",
  }),
];

// User.insertMany(usersData)
//   .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });

// Post.insertMany(postData)
//   .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });


