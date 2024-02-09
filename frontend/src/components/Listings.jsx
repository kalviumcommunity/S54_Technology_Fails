import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {BarLoader,ClimbingBoxLoader,ClockLoader,MoonLoader,PacmanLoader,PuffLoader,PulseLoader,RiseLoader} from "react-spinners";
import Card from "./Card";
import {Link} from "react-router-dom"
import { FaPlus } from "react-icons/fa";

export default function Listings() {
  let [posts, setPosts] = useState([]);
  let loadersArray = [<BarLoader color="white"/>,<ClimbingBoxLoader color="white"/>,<ClockLoader color="white"/>,<MoonLoader color="white"/>,<PuffLoader color="white"/>,<PacmanLoader color="white"/>,<PulseLoader color="white"/>,<RiseLoader color="white"/>]
  let randomLoader = Math.floor(Math.random()*8)
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://technology-fails.onrender.com/posts")
        .then((data) => {
          console.log(data.data);
          setPosts(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);
  return (
    <div id="listings-parent">
        <div className="newPostBtn">
          <Link to="/listings/new"><Button colorScheme="red"><FaPlus /></Button></Link>
        </div>
      {posts.length == 0 ? (
        <div className="loading">
          {loadersArray[randomLoader]}
        </div>
      ) : (
        <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
          {posts.map((e, i) => {
            return (
              <Card data={posts[i]} key={i}/>
            );
          })}
        </SimpleGrid>
      )}
    </div>
  );
}
