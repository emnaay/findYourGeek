import React from 'react';
import homepageImage from '../img/homepage.png';
import '../styles/welcome.css';
// import '../App.css'; // Adjust the import based on your file structure

import '../styles/welcome.css'
function Home() {
  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${homepageImage})` }}
    >
      <h1 className="overlay-text">FIND YOUR GEEK</h1>
      <p
        style={{
          fontSize: '22px',
          position: 'absolute',
          top: '47%',
          left: '6%',
          textAlign: 'center',
        }}
      >
        A platform that matches your energy if you are <br />
        <b>LAZY</b> or a <b>GEEK</b>
      </p>
    </div>
    
  );
}

export default Home;