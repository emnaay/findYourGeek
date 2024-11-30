// CardCarousel.js
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import '../styles/Card.css';

import cardData from "./CardData.js";
import CardList from "./CardList"; // Import CardList

export default function CardCarousel() {
  return (
    <MDBContainer className="py-5" style={{ maxWidth: "500px", height: "500px"}}>
      <div id="carouselExample" className="carousel slide carousel-vertical" data-bs-ride="carousel" style={{ height: "100%" }}>
        <div className="carousel-inner" style={{ height: "100%" }}>
          {cardData.map((card, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <CardList cards={[card]} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
      </div>
    </MDBContainer>
  );
}
