import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Navbar from './Navbar';
import Footer from './Footer';
import RegisterUser from './RegisterUser';
import UpdateUser from "./Updateuser";
import DisplayUser from "./Displayusers";
import Admin from "./Admin";
//import SampleUser from "./SampleUser";
const Router  = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element ={<Main/>}/>
                <Route index element={<DisplayUser/>}/>
                <Route path="/register" element={<RegisterUser />}/>
                <Route path="/updateuser/:id" element={<UpdateUser/>}/>
                <Route path="/admin" element ={<Admin/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
export default Router;