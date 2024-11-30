import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '../styles/welcome.css';
import fields from "./Fields";

const FieldCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl: true, 
        arrows: true, 
        
      };



      return (
        <div className="carousel-container">
            <Slider {...settings}>
                {fields.map((field, index) => (
                    <div key={index} className="slick-slide">
                        <h3>{field.name}</h3>
                        {/* <p>{field.description}</p> */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FieldCarousel;