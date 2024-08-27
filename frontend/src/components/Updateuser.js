import "./RegisterUser.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9800';
// Component that Updates User Data
const UpdateUser = () => {  
    const navigate = useNavigate();
    const { id: userId } = useParams(); // Destructure directly
        
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        address: ''
    }); // Initialize with empty strings

    useEffect(() => {
        console.log("Fetching user data for ID:", userId);
        // Fetch the user data by ID and populate the form
        fetch(`${baseUrl}/getuserbyid/${userId}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setValues(data); // Set the fetched data as the initial values
                console.log("User Details are : ",data);
            })
            .catch((error) => console.error('Error fetching user data:', error));
    },[userId]);
    console.log(values)
    // Update the form values when the input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();  // Prevent form submission refresh

        fetch(`${baseUrl}/updateuser/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            toast.warn('User updated successfully!',
                {
                    autoClose: 100,
                    position: "top-center",
                    theme: "colored",
                    onClose: () => navigate('/'),
                });
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error('Failed to update user');
        });
    };

    return (
        <div className="container">
            <div className="form d-flex justify-content-center">
                <form onSubmit={submit}>
                    <hr />
                    <h4>Update User Information</h4>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            className="form-control"
                            id="fullName"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={values.age}
                            onChange={handleInputChange}
                            className="form-control"
                            id="age"
                            placeholder="Enter your age"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={handleInputChange}
                            className="form-control"
                            id="address"
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <div>
                    <button type="submit" className="btn btn-warning d-flex justify-content-center">
                        Update User
                    </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
        
    );
};

export default UpdateUser;
