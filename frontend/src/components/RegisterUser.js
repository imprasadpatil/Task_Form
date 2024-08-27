import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.REACT_APP_API_URL;

const RegisterUser = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    const initialValues = {
        name: "",
        email: "",
        age: "",
        address: ""
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const submit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log(values);

        fetch(`${baseUrl}/adduser`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                toast.success("User registered successfully!",
                    {
                        autoClose: 100,
                        position: "top-center",
                        theme: "colored",
                        onClose: () => navigate('/'),  // Navigate to the Display Users page
                        
                    });     
                    //navigate('/');      
                setValues(initialValues); // Reset the form after successful submission      
            })
            .catch(error => {
                console.error('Error registering user:', error);
                toast.error('Failed to register user.',error);
            });
    };

    return (
        <>
            <div className="container">
                <div className="form d-flex justify-content-center">
                    <form onSubmit={submit}>
                        <h2>Personal Information Form</h2>
                        <hr />
                        <h4>New User Registration</h4>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={(e) => {
                                    // expression to allow only letters and spaces
                                    const condition = /^[A-Za-z\s]*$/;
                                    const name = e.target.value;
                              
                                    // If the input matches the condition, update the state
                                    if (condition.test(name)) {
                                      handleInputChange({ target: { name: e.target.name, value: name } });
                                      if (!condition.test(values.name)) {  
                                        return false;
                                    }
                                    return true;
                                    }}}
                                className="form-control"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                required
                                type="number"
                                name="age"
                                value={values.age}
                                onChange={(e) => { //function : onchange event that restrics user to enter value between 0 and 100
                                    const age = Math.max(0, Math.min(100, e.target.value));
                                    handleInputChange({ target: { name: e.target.name, value: age } });
                                }}
                                className="form-control"
                                placeholder="Enter your age"
                                min="0"
                                max="100"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                required
                                type="text"
                                name="address"
                                value={values.address}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter your address"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary d-flex justify-content-center">
                            Add User
                        </button>
                    </form>
                </div>
                <ToastContainer/>
            </div>
        </>
    );
};

export default RegisterUser;
