import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="span12">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="control-group">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="control-group">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="control-group">
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="control-group">
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className="form-control"
                />
              </div>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
        <div className="mt-3">
          <div className="span12">
            <Link to="/login">
              <button type="button" className="btn btn-primary">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
