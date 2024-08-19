import React from "react";
import axios from "axios"
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
//import UpdateUser from "./Updateuser";
//import UpdateUser from "./Updateuser";
import "./displayusers.css"
const apiurl = 'http://localhost:9800/getusers'
const Displayuser = () =>{

    let [usersData,setusersData] = useState();
    let [counter,setCounter] = useState()
    // const userDetail = async() => {
    //     const udata = await axios.get(url);
    //     //console.log(udata.data)
    //     setusersData(udata.data)
    // }
    // useEffect(() => {
    //     userDetail()
    // },[]);
    useEffect(() => {
        console.log("renderComponent")
        fetch(`${apiurl}`,{method:'GET'})
        //.then(res=>console.log(res))
        .then((res) =>  res.json())
        .then((data) => {
            setusersData(data);
            let outArrya = [data.name,data.email.data.age,data.address]
            sessionStorage.setItem('userInfo',outArrya)
            console.log(outArrya)
        })
    },[])
    
    
        const renderUser = (data)=>{
                if(data){
                    return data.map((item,index)=>{
                        counter = index+1
                        // data.map(data => {
                        //     setCounter = (counter = (counter + 1)) //counter++;
                        // });
                        return(
                            <>
                               <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td id="counter">{counter}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.age}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <Link to="/updateuser">
                                                        <button onClick={updateUser(data[counter])} className="btn btn-success">Update</button>
                                                    </Link>
                                                    <button className="btn btn-danger">delete</button>
                                                </td>
                                            </tr>
                                </tbody>
                           </>  
                        )
                    })
                    
                }
            }
 const updateUser=(data)=>{
     let userData = data;
     console.log(userData)
   }      

const tablehead=()=>{
    return(
        <>
                    <thead>
                        <tr> 
                            <th></th>
                            <td>#</td>
                            <td>Name</td>
                            <td>email</td>
                            <td>age</td>
                            <td>address</td>
                            <td>action</td>                  
                        </tr>
                    </thead>
        </>
    )
        }
    
    return (
        <>
        <div className="container ">
            <div>
                <Link to={'/register'}>
                <button className="btn btn-primary">
                    Add New User
                </button>
                </Link>
                
            </div>
            <div className=" d-flex justify-content-center">
                <table className="table table-hover">
                {tablehead()}
                {renderUser(usersData)}
                </table>
                </div> 
        </div>
        </>
    )
}

export default Displayuser;