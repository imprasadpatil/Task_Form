import React, { useId, useState } from "react";
import "./RegisterUser.css"
const updateurl = 'http://localhost:9800/updateuser'

const UpdateUser = (data) => {
    
//let sessionData = sessionStorage.getItem('userData');   
//let data =JSON.parse(sessionData)

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
    return (
        <>
            <div className="container ">
                <div className=" form d-flex justify-content-center">
                    <form>
                    {/* <h2>Personal  Form</h2> */}
                    <hr />
                    <h4>Update user Information</h4>
                        <div className="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" name="name" value={values.name} onChange={handleInputeChange} className="form-control" id="fullName" placeholder="Enter your full name" required />
                        </div>
                        <div className="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" value={values.email} onChange={handleInputeChange} className="form-control" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label for="age">Age</label>
                            <input type="number" name="age" value={values.age} onChange={handleInputeChange} className="form-control" id="age" placeholder="Enter your age" required />
                        </div>
                        <div className="form-group">
                            <label for="address">Address</label>
                            <input type="text" name="address" value={values.address} onChange={handleInputeChange} className="form-control" id="address" placeholder="Enter your address" required />
                        </div>
                        <button type="submit" onClick={submit} className="btn btn-primary d-flex justify-content-center">
                            Add User
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}
export default UpdateUser;

