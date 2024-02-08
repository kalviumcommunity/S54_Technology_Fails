import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import Listings from '../Listings';


export default function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings/>} />
    </Routes>
  )
}
