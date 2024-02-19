import React, { useContext, useEffect } from "react";
import AllRoutes from "./components/Routes/AllRoutes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div id="container">
      <div id="test-1"></div>
      <div id="test-2"></div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}
