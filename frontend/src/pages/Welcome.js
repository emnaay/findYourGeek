import React from 'react';
import AboutUs from '../component/AboutUs';
import FieldCarousel from '../component/FieldCarousel';
import Home from '../component/Home';

import NavigationBar from '../component/NavigationBar';
import '../styles/welcome.css';
import '../styles/carousel.css';

const Welcome = () => {
  return (
    <div>
       <NavigationBar />
      <Home /> 
      <FieldCarousel /> 
       <AboutUs />
    </div>
  );
};

export default Welcome;
