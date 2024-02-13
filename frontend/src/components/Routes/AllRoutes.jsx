import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import Listings from '../Listings';
import NewPost from '../NewPost';
import CardDetailed from '../CardDetailed';
import Edit from '../Edit';


export default function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings/>} />
        <Route path="/listings/new" element={<NewPost/>} />
        <Route path="/listings/details/:id" element={<CardDetailed/>} />
        <Route path="/listings/edit/:id" element={<Edit/>} />
    </Routes>
  )
}
