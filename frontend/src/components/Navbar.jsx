import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { deleteCookie } from "../utils/cookies";
import { loginCheck } from "../utils/loginCheck";
import { AppContext } from "./Context";

export default function Navbar() {
  const {login,setLogin} = useContext(AppContext)
  const logout = () => {
    deleteCookie("username")
    deleteCookie("auth-token")
    setLogin(loginCheck());
  };
  const loginBtn = () => {
    if (login) {
      return (
        <div className="option" onClick={logout}>
          Logout
        </div>
      );
    } else {
      return (
        <Link to="/signup">
          <div className="option">Sign-Up/Log-In</div>
        </Link>
      );
    }
  };
  return (
    <div id="navbar-main">
      <div className="navbar">
        <Link to="/">
          <div className="logo">
            <span className="logo-text tech">TECH</span>
            <span className="logo-text fails">FAILS</span>
          </div>
        </Link>
        <div className="options">
          <div className="option">FAQs</div>
          {loginBtn()}
        </div>
      </div>
    </div>
  );
}
