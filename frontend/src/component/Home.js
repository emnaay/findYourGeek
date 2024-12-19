import React from "react";
import homepageImage from "../img/homepage.png";
import "../styles/welcomePage.css";
import "../styles/homePage.css";
// import '../App.css'; // Adjust the import based on your file structure

import "../styles/welcomePage.css";


function Home() {
  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${homepageImage})` }}
    >
      <h1 className="overlay-text">FIND YOUR GEEK</h1>
      <p className="subtext">
        A platform that matches your energy if you are <br />
        <b>LAZY</b> or a <b>GEEK</b>
      </p>
    </div>
  );
}

export default Home;
