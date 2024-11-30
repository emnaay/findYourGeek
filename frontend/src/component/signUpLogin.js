import React, { useState } from 'react';
 //import '../styles/signUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ username: '', password: '', email: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //alert(`${isSignUp ? 'Sign Up' : 'Sign In'} successful!`);

  //   const {username , password, email} = formData;
  //   axios.post('http://localhost:8081/users' , { username , password})
  //   .then(res =>console.log(res))
  //   .catch(err => console.log(err));

  //   //pasing data to the backend
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, email } = formData;
    const endpoint = isSignUp ? 'signup' : 'login';
    axios.post(`http://localhost:8081/${endpoint}`, { username, password, email })
      .then(res => {
        const response = res.data;
        if (response.status === "Login Successful") {
          alert("Login successful!");
          const Id = response.Id;
          console.log(Id);
          navigate(`/ProjectCard/${Id}`, { state: { user: response.user } }); // Pass user data to profile page
        } else if (response.status === "Sign Up Successful") {
          alert("Sign-up successful!");
          navigate('/welcome', { state: { user: response.user } }); // Redirect to welcome or profile page
        } else {
          alert(response.status); // Display "User already exists" or "Invalid credentials"
        }
      })
      .catch(err => console.log(err));
  };

  const navigate = useNavigate();

  const profiler = () => {
    // Add the path where you want to navigate when the button is clicked
    navigate(`/ProjectCard/${Id}`); // Replace with your actual target page
  };
  
  return (
    <div className="modal-overlay">
      <div className="form-container">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
        {/* ken andouch acc to5rojlou zeda mtaa el email w twali sign up */}
          {isSignUp && (  
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" >{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <p onClick={toggleForm} className="toggle-link">
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}

export default SignUpLogin;