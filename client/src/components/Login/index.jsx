import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
          <h1>Login</h1>
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="control-group">
              <div className="mb-3">
                <label className="form-label">Email Id</label>
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
                <label className="form-label">Password</label>
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
            {error && <div className="error">{error}</div>}
            <div className="control-group">
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-3">
          <div className="col-12">
            <Link to="/signup">
              <button type="button" className="btn btn-primary">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
