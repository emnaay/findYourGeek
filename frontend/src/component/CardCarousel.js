// CardCarousel.js
// import 'bootstrap/dist/css/bootstrap.min.css'; old
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
// import '../App.css'; old
import "../styles/Card.css";
import cardData from "./CardData.js";
import CardList from "./CardList"; // Import CardList

export default function CardCarousel() {
  return (
    <MDBContainer
      className="py-5"
          >
      <div
        id="carouselExample"
        className="carousel-vertical-slider"
        data-bs-ride="carousel"
        
      >
        <div className="carousel-inner">
          {cardData.map((card, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <CardList cards={[card]} />{" "}
              {/* Pass the single card as an array to CardList */}
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </MDBContainer>
  );
}
