const mongoose = require("mongoose");
const User = require("../models/user");
require('dotenv').config({ path: '../.env' });

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

User.insertMany(usersData)
  .then((result) => {
    console.log("Data inserted successfully:", result);
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });
