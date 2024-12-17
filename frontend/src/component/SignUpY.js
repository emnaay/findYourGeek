import React, { useState } from "react";
// import "../App.css";
import logo from "../img/FYG_Logos.png";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for routing
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Proceed with form submission logic
    console.log(formData);
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
    <section className="global_container">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="signup_card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://c.stocksy.com/a/aMo200/z9/670256.jpg"
                    alt="signup form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="fields_container">
                        <img src={logo} className="signup_logo" />
                        <span className="signup_title">FIND YOUR GEEK</span>
                      </div>

                      <h5
                        className="signup_subheader"
                      >
                        Create a new account
                      </h5>
                      <div className="fields_wrapper"
                        
                      >
                        {/* Username Input */}
                        <div className="form-outline mb-1">
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="form-controller"
                          />
                          <label className="form-label" htmlFor="formid">
                            Username
                          </label>
                        </div>

                        {/* Description Input */}
                        <div className="form-outline mb-1">
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="form-controller"
                          />
                          <label className="form-label" htmlFor="formid">
                            Description
                          </label>
                        </div>
                      </div>
                      {/* Email Input */}
                      <div className="form-outline mb-1">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-controller"
                        />
                        <label className="form-label" htmlFor="formid">
                          Email address
                        </label>
                      </div>

                      {/* Phone Number Input */}
                      <div className="form-outline mb-1">
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                          className="form-controller"
                        />
                        <label className="form-label" htmlFor="formid">
                          Phone Number
                        </label>
                      </div>

                      {/* Password Input */}
                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="form-controller"
                        />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="form-controller"
                        />
                        <label className="form-label">Confirm Password</label>
                      </div>

                      <div className="pt-1 mb-1">
                        <button className="signup_button" type="submit">
                          Sign Up
                        </button>
                      </div>

                      <p className="form_buttom" >
                        Already have an account?
                        <Link className="signin_link" to="/signIn" >
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
