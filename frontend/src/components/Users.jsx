import { List, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import { transform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://technology-fails.onrender.com/users")
        .then((res) => {
          //   console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);
  const userClick = (username) => {
    navigate(`/posts/${username}`);
  };
  return (
    <div className="users-parent">
      {data.length == 0 ? (
        <div className="loading">{loadersArray[randomLoader]}</div>
      ) : (
        <>
          <Text fontSize="4vmax" color="white" textDecoration="underline">
            All Users
          </Text>
          <UnorderedList className="users">
            {data.map((e, i) => {
              return (
                <ListItem
                  fontSize="1.5vmax"
                  key={i}
                  onClick={() => {
                    userClick(e.userName);
                  }}
                  cursor="pointer"
                  color="white"
                >
                  {e.userName}
                </ListItem>
              );
            })}
          </UnorderedList>
        </>
      )}
    </div>
  );
}
