import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoHeart } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Card({ data }) {
  const navigate = useNavigate();
  let [like, setLike] = useState(false);
  const cardClick = () => {
    navigate(`/listings/details/${data._id}`);
  };
  return (
    <Box bg="aliceblue" padding="2vmin" borderRadius="10px">
      <ToastContainer />
      <div className="card">
        <div className="card-img" onClick={cardClick}>
          <img src={data.image} alt="twitter bird caged" />
        </div>
        <div className="card-title">
          <Text textAlign="center" fontWeight="extrabold" fontSize="1.2vmax">
            {data.title.length > 25
              ? data.tagline.substr(0, 25) + "..."
              : data.title}
          </Text>
        </div>
        <div className="card-author">
          <Text as="i" fontSize="1vmax">
            ~Rikhil
          </Text>
        </div>
        <div className="card-tagline">
          {/* <Text as="b" fontSize="1.2vmax">
                      How to destroy a Social Media App..?
                    </Text> */}
          {data.tagline.length > 35
            ? data.tagline.substr(0, 35) + "..."
            : data.tagline}
        </div>
        <div className="card-social">
          <div className="likes">
            <IoHeart
              onClick={() => {
                setLike(!like);
              }}
              size="1.5vmax"
              color={like ? "red" : "black"}
            />
            {data.likes}
          </div>
          <div className="comments">
            <VscCommentDiscussion size="1.5vmax" />
            {data.comments}
          </div>
        </div>
      </div>
    </Box>
  );
}
