import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BarLoader,
  ClimbingBoxLoader,
  ClockLoader,
  MoonLoader,
  PacmanLoader,
  PuffLoader,
  PulseLoader,
  RiseLoader,
} from "react-spinners";
import Card from "./Card";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { getCookie } from "../utils/cookies";
import { AppContext } from "./Context";

export default function Listings() {
  let [posts, setPosts] = useState([]);
  let loadersArray = [
    <BarLoader color="white" />,
    <ClimbingBoxLoader color="white" />,
    <ClockLoader color="white" />,
    <MoonLoader color="white" />,
    <PuffLoader color="white" />,
    <PacmanLoader color="white" />,
    <PulseLoader color="white" />,
    <RiseLoader color="white" />,
  ];
  let randomLoader = Math.floor(Math.random() * 8);

  const username = getCookie("username");
  const {login,setLogin} = useContext(AppContext)
  // console.log(username)
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8080/posts")
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
        <Link to="/listings/new">
          <Button colorScheme="red">
            <FaPlus />
          </Button>
        </Link>
      </div>
      {posts.length == 0 ? (
        <div className="loading">{loadersArray[randomLoader]}</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7vmin",
            alignItems: "center",
          }}
        >
          <div className="username">
            Hello, {login ? username : "Guest"}!
          </div>
          <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
            {posts.map((e, i) => {
              return <Card data={posts[i]} key={i} />;
            })}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
