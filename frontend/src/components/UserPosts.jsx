import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BarLoader, ClimbingBoxLoader, ClockLoader, MoonLoader, PacmanLoader, PuffLoader, PulseLoader, RiseLoader } from "react-spinners";
import Card from "./Card";
import { ToastContainer, toast } from "react-toastify";

export default function UserPosts() {
  let { user } = useParams();
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
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`https://technology-fails.onrender.com/posts/user/${user}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.status);
        if(err.response.status==404){
            toast.error("No posts associated with this user found... Redirecting..!",{
                autoClose: 2000000, position: "top-center"
            })
            setTimeout(() => {
                navigate("/users")
            }, 3000);
        }
      });
  }, []);
  return (
    <div id="listings-parent">
        <ToastContainer/>
      {data.length == 0 ? (
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
          <SimpleGrid columns={[2, 2, 3, 4]} spacing={10}>
            {data.map((e, i) => {
              return <Card data={data[i]} key={i} />;
            })}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
}
