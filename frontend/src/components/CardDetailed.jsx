import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {BarLoader} from 'react-spinners'

export default function CardDetailed() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      axios
      .get(`https://technology-fails.onrender.com/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data == "Post not found..!") {
          toast.error("Post not found!");
        }else{
          toast.error("Server side error or wrong ID..!")
        }
      });
    }, 1000);
  }, []);
  const deletePost = () => {
    let result = confirm("Are you sure?");
    console.log(result);
    if (result) {
      axios
        .delete(`https://technology-fails.onrender.com/posts/${data._id}`)
        .then((res) => {
          console.log(res);
          toast.success("Deleted");
          setTimeout(() => {
            navigate("/listings");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const editPost = ()=>{
    navigate(`/listings/edit/${data._id}`)
  }

  return (
    <div className="detailed-card">
      
      {Object.keys(data).length==0 ? (<div className="loading"><BarLoader color="white"/></div>) : (
        <>
          <div className="details-parent">
          <ToastContainer />
          <div className="details-img">
            <img src={data.image} alt="" />
          </div>
          <div className="details-text">
            <div className="details-title">{data.title}</div>
            <div className="details-tagline">{data.tagline}</div>
            <div className="details-description">{data.description}</div>
          </div>
        </div>
        <div className="details-btns">
          <Button onClick={editPost} colorScheme={"red"}>Edit</Button>
          <Button onClick={deletePost} colorScheme={"red"}>
            Delete
          </Button>
        </div>
        </>
      )}
    </div>
  );
}
