import React, { useState, useId } from "react";
import "./RegisterUser.css"
//import { useNavigate } from "react-router-dom";
const posturl = 'http://localhost:9800/adduser'

const RegisterUser = () => {
    
//let navigate = useNavigate() 
//let sessionData = sessionStorage.getItem('userInfo');   
//let data =JSON.parse(sessionData)

const initialValues = {
    _id:useId,
    name:"",
    email:"",
    age:"",
    address:""
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
    fetch(`${posturl}`,
    {method:'POST',
    headers:{
        'accept':'application/json',
        'Content-Type':'application/json'
    },
    body:JSON.stringify(values)
    })
    //alert("User registered Succssesfully....!!")
    //.then(navigate('/'))
}
    return (
        <>
            <div className="container ">
                <div className=" form d-flex justify-content-center">
                    <form>
                    <h2>Personal Information Form</h2>
                    <hr />
                    <h4>new user registration</h4>
                        <div className="form-group">
                            <label for="fullName">Full Name</label>
                            <input required type="text" name="name" value={values.name} onChange={handleInputeChange} className="form-control" placeholder="Enter your full name" />
                        </div>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input required type="email" name="email" value={values.email} onChange={handleInputeChange} className="form-control" placeholder="Enter your email"/>
                        </div>
                        <div className="form-group">
                            <label for="age">Age</label>
                            <input required type="number" name="age" value={values.age} onChange={handleInputeChange} className="form-control" placeholder="Enter your age"/>
                        </div>
                        <div className="form-group">
                            <label for="address">Address</label>
                            <input required type="text" name="address" value={values.address} onChange={handleInputeChange} className="form-control" placeholder="Enter your address"/>
                        </div>
                        <button type="submit" onClick={submit} className="btn btn-primary d-flex justify-content-center" >
                            Add User
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}
export default RegisterUser;

