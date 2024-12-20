import React, { useState, useEffect } from "react";
import ProfilePage from "./pages/profilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpLoginPage from "./pages/signUpLoginPage";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectCard from "./pages/projectPage";
import SignupPage from "./pages/SignUpPageY";
import LoginPage from "./pages/LogInPageY";
import Contacts from "./component/Contacts"
import ProfileVisitorPage from "./pages/profileVisitorPage";
import Dashboard from "./pages/DashboardPage";
import SignOutButton from "./component/signOut";
import PrivateRoute from "./component/PrivateRoute"

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data); // Update state with fetched data
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signUp" element={<SignupPage />} />
          {/* <Route path="/signup" element={<SignUpLoginPage />} /> */}
          {/* <Route path="/ProjectCard" element={<ProjectCard />} /> */}
          { <Route path="/profile/:id" element={<ProfilePage />} /> }
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signout" element={<SignOutButton />} />

          
          <Route path="/signIn" element={<LoginPage />} />

          <Route path="/dashboard" element={<PrivateRoute allowedRoles={['admin']}><Dashboard /></PrivateRoute>} />
          {
            data.map((d, i) => (
              <Route
                key={i}
                path={`/profile/${d.Id}`}
                element={<ProfilePage Id={d.Id} />}
              />
            ))
          }

          {
            //el page loula li bch todherlou ki yconecti feha des proj
            data.map((d, i) => (
              <Route
                key={i}
                path={`/ProjectCard/${d.Id}`}
                element={<ProjectCard Id={d.Id} />}
              />
            ))
          }

{
            //tu visites profile abd e5er
            data.map((d, i) => (
              <Route
                key={i}
                path={`/ProfileVisitorPage/${d.Id}`}
                element={<ProfileVisitorPage Id={d.Id} />}
              />
            ))
          }
        </Routes>
      </Router>
      {/* <SignUpLoginPage/> */}
      {/* <ProfilePage/> */}
    </div>
  );
}

export default App;


