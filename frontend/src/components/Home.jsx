import React from "react";
import computerImg from "../assets/computer.png";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div style={{padding:"5vmin 0vmin",flex:"1",display:"flex",flexDirection:"column",alignItems:"center",gap:"2vmin"}}>
        <div className="home-parent">
          <img className="computer-img" src={computerImg} alt="broken-computer" />
          <div className="home-text">
            <div style={{fontSize:"2vmax"}}>Witness the</div>
            <div style={{fontSize:"6vmax"}}>STUPIDEST</div>
            <div style={{fontSize:"4vmax"}}>Tech Fails</div>
            <div style={{fontSize:"2vmax"}}>of all time!</div>
          </div>
        </div>
          <Link to="/listings"><Button colorScheme="red">Dive In!</Button></Link>
    </div>
  );
}
