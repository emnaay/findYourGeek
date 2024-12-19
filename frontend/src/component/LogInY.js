import React, { useState } from "react";
import axios from "axios"; // make sure axios is imported
import logo from "../img/FYG_Logos.png";
import { Link } from "react-router-dom"; // Import Link for routing
import "../styles/logIn.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/signin", formData,()=>{console.log("aaaaaaaa", formData);
      })
      .then((response) => {
        if (response.data.status === "Login Successful") {
          alert("Login successful!");
          // Navigate to the desired page with user info
        } else {
          alert(response.data.status || "Invalid credentials!");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      });
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
            <div className="logincard">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://c.stocksy.com/a/aMo200/z9/670256.jpg"
                    alt="login form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img className="login_image" src={logo} />
                        <span className="logintitle">FIND YOUR GEEK</span>
                      </div>

                      <h5 className="signin_wrapper">Sign into your account</h5>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                           name="email"
                          //value={email}
                          //onChange={(e) => setEmail(e.target.value)}
                          value={formData.email}
                          onChange={handleInputChange}
                          // value={formData.email}
                          // onChange={handleInputChange}
                          required
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="formid">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          //onChange={(e) => setPassword(e.target.value)}
                          // value={formData.password}
                          // onChange={handleInputChange}
                          required
                          className="form-control"
                          
                        />
                        <label className="requirement">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="loginButtonStyle" type="submit">
                          Login
                        </button>
                      </div>

                      <p className="accountfieldWrapper" >
                        Don't have an account?
                        <Link to="/signUp" className="sign-up" >
                          Sign Up
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

export default Login;
