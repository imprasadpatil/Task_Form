import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <>
        
        <div className=" navbar bg-light">
          <h3 className="">User Form</h3>
          <Link to={'/'}>
                <button className="btn btn-primary">
                    Show User's
                </button>
                </Link>
        </div>
        
        
<hr />
        </>
    )
}
export default Navbar;
