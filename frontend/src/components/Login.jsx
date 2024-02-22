import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../utils/cookies";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginCheck";

export default function Login() {
  const navigate = useNavigate();
  const {login,setLogin} = useContext(AppContext)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(watch())
  const FormSubmitHandler = (formData) => {
    // console.log(formData);
    const id = toast.loading("Logging In...");
    setTimeout(() => {
      axios
        .post("https://technology-fails.onrender.com/users/login", formData)
        .then((result) => {
          console.log("ADDED");
          toast.update(id, {
            render: "Logged In!",
            type: "success",
            isLoading: false,
          });
          setCookie("username", formData.userName, 365);
          setCookie("auth-token",result.data,365)
          setLogin(loginCheck())
          setTimeout(() => {
            navigate("/listings");
          }, 1200);
        })
        .catch((err) => {
          console.log(err.response.status);
          if(err.response.status==404){
              toast.update(id, {
                render: "Username not found",
                type: "error",
                isLoading: false,
              });    
          }else if(err.response.status==401){
            toast.update(id, {
                render: "Incorrect Password",
                type: "error",
                isLoading: false,
              });
          }else{
            toast.update(id, {
                render: "Server Error. Contact admin",
                type: "error",
                isLoading: false,
              });
          }
        });
    }, 1000);
  };

  return (
    <div className="form-parent">
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <Text as="b" fontSize="2.3vmax">
          Welcome Back..!
        </Text>
        <Text as="i" fontSize="1vmax">
          Enter the following details!
        </Text>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Username
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("userName", {
              required: "Username is required",
            })}
          />
          <p className="err">{errors.userName?.message}</p>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
            Password
          </FormLabel>
          <Input
            type="password"
            borderColor="black"
            {...register("password", {
              required: "Password Required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password Not Valid (Use Special Characters & Numbers)",
              },
            })}
          />
          <p className="err">{errors.password?.message}</p>
        </FormControl>
        <Button type="submit" colorScheme="red">
          Submit
        </Button>
      </form>
      <Link to="/signup" style={{fontSize:"2vmin",color:"lightblue",textDecoration:"underline"}}>Not a member? Signup here...</Link>
    </div>
  );
}
