import React from "react";
import Logout from "../Logout";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="conatiner">
        <nav className="d-flex justify-content-between mt-3">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/add-product" className="nav-link">
            Add Product
          </Link>
          <Logout />
        </nav>
      </div>
    </>
  );
};

export default Header;
