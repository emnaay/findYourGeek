import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/FYG_Logos.png";
import "../styles/signUp.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    description: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:8081/signup", formData)
      .then((response) => alert("Sign-Up Successful!"))
      .catch((error) => console.error("Error during sign-up:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
          <div className="card signupCard">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://c.stocksy.com/a/aMo200/z9/670256.jpg"
                    alt="signup form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                  <div className="d-flex align-items-center mb-1 pb-1">
                        <img src={logo} className="signup_image" alt="Logo" />
                        <span className="signupTitle">FIND YOUR GEEK</span>
                      </div>
                    <form onSubmit={handleSubmit}>
                      

                      <h5 className="fw-normal mb-1 pb-3 signinWrapper">
                        Create a new account
                      </h5>

                      <div className="d-flex justify-content-around gap-3">
                        <div className="form-outline mb-1">
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                          <label className="requirement">Username</label>
                        </div>

                        <div className="form-outline mb-1">
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                          />
                          <label className="requirement">Description</label>
                        </div>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                        <label className="requirement">Email address</label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                        <label className="requirement">Phone Number</label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                        <label className="requirement">Password</label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                        <label className="requirement">Confirm Password</label>
                      </div>

                      <div className="pt-1 mb-1">
                        <button className="signupButtonStyle" type="submit">
                          Sign Up
                        </button>
                      </div>

                      <p className="mb-0 pb-lg-2 accountFieldWrapper">
                        Already have an account?{" "}
                        <Link to="/signIn" className="sign-up">
                          Sign In
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;

