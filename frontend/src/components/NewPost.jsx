import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../utils/cookies";

export default function NewPost() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // console.log(watch())
  const username = getCookie("username")
  useEffect(()=>{
    setValue("user",username)
  })
  const token = getCookie("auth-token")
  const FormSubmitHandler = (formData) => {
    const id = toast.loading("Adding");
    console.log(formData)
    setTimeout(() => {
      axios
        .post("https://technology-fails.onrender.com/posts", formData,{"authorization":token})
        .then(() => {
          console.log("ADDED");
          toast.update(id, {
            render: "Added",
            type: "success",
            isLoading: false,
          });
          setTimeout(() => {
            navigate("/listings");
          }, 1200);
        })
        .catch((err) => {
          console.log(err);
          if(err.response.status==403){
            toast.update(id, {
              render: "Auth Error",
              type: "error",
              isLoading: false,
            });
          }
          toast.update(id, {
            render: "Some error occurred",
            type: "error",
            isLoading: false,
          });
        });
    }, 1000);
  };

  return (
    <div className="form-parent">
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          New Post
        </Text>
        <Text as="i" fontSize="1vmax">
          Enter the following details!
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Username
          </FormLabel>
          <Input
          // value={username}
          isDisabled
            type="text"
            borderColor="black"
            {...register("user")}
          />
          {/* <p className="err">{errors.user?.message}</p> */}
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Title
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 40, message: "Max 40 Chars" },
            })}
          />
          <p className="err">{errors.title?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Tagline
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("tagline", {
              required: "Tagline is required",
            })}
          />
          <p className="err">{errors.tagline?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Image Link
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("image", {
              required: "Provide a valid image url",
            })}
          />
          <p className="err">{errors.image?.message}</p>
        </FormControl>
        <Button type="submit" colorScheme="red">
          Submit
        </Button>
      </form>
    </div>
  );
}
