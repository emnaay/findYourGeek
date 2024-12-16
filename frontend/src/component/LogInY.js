import React, { useState } from 'react';
import axios from 'axios'; // make sure axios is imported
import logo from '../img/FYG_Logos.png';
import { Link } from 'react-router-dom'; // Import Link for routing

const title = {
  color: "#202258", 
  fontWeight: 1000,
  fontFamily: "Alfa Slab One, serif",
  fontSize: "40px", 
  fontStyle: "normal"
};

const requirement = {
  color:"#929292", 
  fontSize:"16px"
};

const loginButtonStyle = {
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

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8081/login', formData)
      .then(response => {
        if (response.data.status === "Login Successful") {
          alert("Login successful!");
          // Navigate to the desired page with user info
        } else {
          alert(response.data.status || "Invalid credentials!");
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "white" }}>
      <div className="container py-5 h-100" >
        <div className="row d-flex justify-content-center align-items-center h-100" >
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem", border: "4px solid #202258", }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://c.stocksy.com/a/aMo200/z9/670256.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img src={logo} style={{ width:"100px " }} />
                        <span style={title}>FIND YOUR GEEK</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-control form-control-lg"
                          style={{ border: "3px solid #93bfb7" }}
                        />
                        <label className="form-label" htmlFor="formid" style={requirement}>Email address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="form-control form-control-lg"
                          style={{ border: "3px solid #93bfb7" }}
                        />                        
                        <label className="form-label" style={requirement}>Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button style={loginButtonStyle} type="submit">
                          Login
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account? 
                        <Link to="/signUp" style={{ color: "#393f81" }}>
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