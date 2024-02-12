import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import Listings from '../Listings';
import NewPost from '../NewPost';


export default function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings/>} />
        <Route path="/listings/new" element={<NewPost/>} />
    </Routes>
  )
}
