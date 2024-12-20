import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import CardCarousel from "./CardCarousel";
import '../img/homepage.png';
import '../styles/welcomePage.css';

function AboutUs() {
    
  return (
    <div className="container mt-5" id="aboutus">
    <div className="row">
      
      <div className="col-md-6">
        <CardCarousel />
      </div>
      
      
      <div className="col-md-6 d-flex align-items-center">
        <div>
          <h2 className='welcomepagetitle'>Welcome to Find Your Geek!</h2>
          <p>
            
             Our platform is designed to connect people with skills and people with needs. Whether you're a student looking for help with an essay, a business needing a quick design, or simply someone with a task that requires an extra hand, Find Your Geek is here to match you with talented freelancers ready to lend their expertise. We're more than just a job marketplace – we’re a community that values creativity, flexibility, and making connections.
          </p>
          <p>
            Whether you're looking for new products or just browsing, we're here to help
            you find exactly what you need. Enjoy your shopping experience!
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AboutUs