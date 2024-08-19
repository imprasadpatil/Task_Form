import React from "react";
//import axios from "axios"
import { useState, useEffect, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./displayusers.css"
const baseUrl = 'http://localhost:9800'
const apiurl = 'http://localhost:9800/getusers'
const updateurl = 'http://localhost:9800/updateuser'
const deleteturl = 'http://localhost:9800/deleteuser'
const Displayuser = () =>{

    let [usersData,setusersData] = useState();
    let [count,setCount] = useState()
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
        fetch(`${baseUrl}/getusers`,
            {method:'GET'}) 
        //.then(res=>console.log(res.json))
        .then((res) =>  res.json())
        .then((data) => {
            setusersData(data);
            //let outArrya = [data.name,data.email.data.age,data.address]
            //sessionStorage.setItem('userInfo',outArrya)
            //console.log(outArrya)
        })
    },[])
    
    //function that renders the user
        const renderUser = (data)=>{
                if(data){
                    return data.map((item,index)=>{
                        count = index+1
                        return(
                            <>
                               <tbody>
                                            <tr>
                                                <th scope="row"></th>
                                                <td>{count}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.age}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    
                                                    <button className="btn btn-success" onChange={HandelUpdateUser}>Update</button>
                                                    
                                                    <button className="btn btn-danger" onClick={()=>handelDeleteUser(data,index,count)}>delete</button>
                                                </td>
                                            </tr>
                                </tbody>
                           </>  
                        )
                    })
                    
                }
            }
    //Update user
    const HandelUpdateUser = () => {
    
        let sessionData = sessionStorage.getItem('userData');   
        let data =JSON.parse(sessionData)
        
         const initialValues = {
             _id:useId,
             name:"data.name",
             email:"data.email",
             age:"data.age",
             address:"data.address"
         }
         const [values,setValues] = useState(initialValues);
         const handleInputeChange = (e) =>{
             const {name,value} = e.target;
             setValues({
                 ...values,
                 [name]:value
             })
         }
        
         const submit = () =>{
             console.log(values)
             fetch(`${updateurl}`,
             {method:'PUT',
             headers:{
                 'accept':'application/json',
                 'Content-Type':'application/json'
             },
             body:JSON.stringify(values)
             })
         }
            // return (
            //     <>
            //         <div className="container ">
            //             <div className=" form d-flex justify-content-center">
            //                 <form>
            //                 {/* <h2>Personal  Form</h2> */}
            //                 <hr />
            //                 <h4>Update user Information</h4>
            //                     <div className="form-group">
            //                         <label for="fullName">Full Name</label>
            //                         <input type="text" name="name" value={values.name} onChange={handleInputeChange} className="form-control" id="fullName" placeholder="Enter your full name" required />
            //                     </div>
            //                     <div className="form-group">
            //                         <label for="email">Email</label>
            //                         <input type="email" name="email" value={values.email} onChange={handleInputeChange} className="form-control" id="email" placeholder="Enter your email" required />
            //                     </div>
            //                     <div className="form-group">
            //                         <label for="age">Age</label>
            //                         <input type="number" name="age" value={values.age} onChange={handleInputeChange} className="form-control" id="age" placeholder="Enter your age" required />
            //                     </div>
            //                     <div className="form-group">
            //                         <label for="address">Address</label>
            //                         <input type="text" name="address" value={values.address} onChange={handleInputeChange} className="form-control" id="address" placeholder="Enter your address" required />
            //                     </div>
            //                     <button type="submit" onClick={submit} className="btn btn-primary d-flex justify-content-center">
            //                         Add User
            //                     </button>
            //                 </form>
            //             </div>
            //         </div>
        
            //     </>
           //  )

            return(
                <>
                    <h1>Update User</h1>
                </>
            )
        }
    //Delete user
    const handelDeleteUser = (data,index) => {
        console.log(data[index])
        fetch(`${baseUrl}/deleteuser`,
            {
                method: 'DELETE',
                /*headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },*/
                body: JSON.stringify(data[index]._id)
            })
            .then(response=>response.json())
            .then(response =>{
                console.log(response)
                if (!response.ok) {
                    alert (new Error('Failed to delete user'))    
                }
            })
            
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

