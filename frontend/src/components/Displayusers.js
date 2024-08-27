import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./displayusers.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Variable: baseUrl that gets the value of API-url from .env 
const baseUrl = process.env.REACT_APP_API_URL; //const baseUrl = 'http://localhost:9800'

//function component : that have logic and returns the component
const DisplayUser = () => {
    const [usersData, setUsersData] = useState([]); //Variable : mutable global that hold userData
    const [currentPage, setCurrentPage] = useState(1); //pagination variable
    const recordsPerPage = 10; //no of records perpage is defined
    
    //Hook : useEffect that renders the displayuser component 
    useEffect(() => {
        fetchUsers();
    }, []);

    //function : fetchUser that feches the data from backend
    const fetchUsers = () => {
        fetch(`${baseUrl}/getusers`,                //API call : fetch 
            { method: 'GET' })                      //Method : HTTP GET is defined for fetch call
            .then((res) => res.json())             //Method : handles the response from API and convert it to json object
            .then((data) => setUsersData(data))     //Method : sets data  recived from response to setUserData
            .catch((error) => console.error('Error fetching users:', error));       //Method : handles the errors 
    };
    //function : deleting the user
    const handleDeleteUser = (userId) => {  //parameter : userId is passed from function call 

        fetch(`${baseUrl}/deleteuser/${userId}`, {              // API call : Fetch
            method: 'DELETE',                                   // Method : DELETE that deletes the record from DataBase
            headers: { 'Content-Type': 'application/json' }     // Sets the content type header to application/json.
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete user');
                return response.json();
            })
            .then(() => {
                console.log('User Deleted with Id : ',userId)
                toast.error("User deleted successfully!", 
                    {
                        //autoClose: 1000,
                        theme: "colored",
                        position: "top-center"
                    });
                fetchUsers(); // Refresh user list after deletion
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message , {theme: "colored"});
            });
    };

    // Calculate the index of the first and last records on the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = usersData.slice(indexOfFirstRecord, indexOfLastRecord);

    //function : that renders user in table row 
    const renderUsers = () => {
        return currentRecords.map((item, index) => (
            <tbody>
                <tr key={item._id}>
                    <td>{indexOfFirstRecord + index + 1}</td> {/* Adjust index for pagination */}
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>
                        <Link to={`./Updateuser/${item._id}`}>
                            <button className="btn btn-success">Update</button>
                        </Link>
                        <button className="btn btn-danger"
                            onClick={() => handleDeleteUser(item._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        ));
    };

    // Calculate total pages
    const totalPages = Math.ceil(usersData.length / recordsPerPage);

    //function : handles the pagination 
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //function : returns the pagination
    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`btn ${currentPage === i ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ margin: '0 5px' }}
                >{i}</button> 
            );
        }
        return pages;
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    //function : returns table head
    const renderTableHead = () => {
        return (
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Actions.</th>
                </tr>
            </thead>
        )
    }

    // renders the actual UI content 
    return (
        <div className="container">
            <div>
                <Link to="/register">
                    <button className="btn btn-primary">Add New User</button>
                </Link>
            </div>
            <div className="d-flex justify-content-center">
                <table className="table table-hover">
                    {renderTableHead()}
                    {renderUsers()}
                </table>
            </div>
            <div className="pagination d-flex justify-content-center">
                <button
                    onClick={handlePrevPage}
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    style={{ margin: '0 5px' }}
                >
                    Prev
                </button>
                {renderPagination()}
                <button
                    onClick={handleNextPage}
                    className="btn btn-secondary"
                    disabled={currentPage === totalPages}
                    style={{ margin: '0 5px' }}
                >
                    Next
                </button>
            </div>
            <ToastContainer/>
        </div>
    );
};



export default DisplayUser;
