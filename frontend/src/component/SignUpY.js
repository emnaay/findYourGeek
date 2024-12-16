import React, { useState } from "react";
// import "../App.css";
import logo from "../img/FYG_Logos.png";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for routing

const title = {
  color: "#202258",

  fontWeight: 1000,
  fontFamily: "Alfa Slab One, serif",
  fontSize: "40px",
  fontStyle: "normal",
};

const requirement = {
  color: "#929292",
  fontSize: "16px",
};

const signupButtonStyle = {
  border: "3px solid #202258",
  padding: "12px",
  backgroundColor: "white",
  fontFamily: '"Open Sauce One", sans-serif',
  fontWeight: "bold",
  color: "#202258",
  borderRadius: "10px",
  fontSize: "18px",
  width: "auto",
};

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
    <section className="vh-100" style={{ backgroundColor: "white" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="card"
              style={{ borderRadius: "1rem", border: "4px solid #202258" }}
            >
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://c.stocksy.com/a/aMo200/z9/670256.jpg"
                    alt="signup form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div
                    className="card-body p-4 p-lg-5 text-black"
                    style={{ paddingBottom: "0rem" }}
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-1 pb-1">
                        <img src={logo} style={{ width: "100px" }} />
                        <span style={title}>FIND YOUR GEEK</span>
                      </div>

                      <h5
                        className="fw-normal mb-1 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create a new account
                      </h5>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          gap: "20px",
                        }}
                      >
                        {/* Username Input */}
                        <div className="form-outline mb-1">
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="form-control form-control-lg"
                            style={{ border: "3px solid #93bfb7" }}
                          />
                          <label
                            className="form-label"
                            htmlFor="formid"
                            style={requirement}
                          >
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
                            className="form-control form-control-lg"
                            style={{ border: "3px solid #93bfb7" }}
                          />
                          <label
                            className="form-label"
                            htmlFor="formid"
                            style={requirement}
                          >
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
                          className="form-control form-control-lg"
                          style={{ border: "3px solid #93bfb7" }}
                        />
                        <label
                          className="form-label"
                          htmlFor="formid"
                          style={requirement}
                        >
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
                          className="form-control form-control-lg"
                          style={{ border: "3px solid #93bfb7" }}
                        />
                        <label
                          className="form-label"
                          htmlFor="formid"
                          style={requirement}
                        >
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
                          className="form-control form-control-lg"
                          style={{ border: "3px solid #93bfb7" }}
                        />
                        <label className="form-label" style={requirement}>
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="form-control form-control-lg"
                          style={{ border: "3px solid #93bfb7" }}
                        />
                        <label className="form-label" style={requirement}>
                          Confirm Password
                        </label>
                      </div>

                      <div className="pt-1 mb-1">
                        <button style={signupButtonStyle} type="submit">
                          Sign Up
                        </button>
                      </div>

                      <p className="mb-0 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have an account?
                        <Link to="/signIn" style={{ color: "#393f81" }}>
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
