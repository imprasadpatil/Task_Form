import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
//import Home from "./Home";
import Displayuser from "./Displayusers";
import RegisterUser from './RegisterUser';
import UpdateUser from "./Updateuser";
import Demo from "./Demo";
const Router =()=>{
    return(
        <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Displayuser/>}/>
                    <Route path="/register" element={<RegisterUser/>}/>
                    <Route path="/updateuser" element={<UpdateUser/>}/>
                    <Route path="/demo" element={<Demo/>}/>
                </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
export default Router;