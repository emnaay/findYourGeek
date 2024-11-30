import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBRow } from "mdb-react-ui-kit";
import React from "react";
import "../App.css";
import Card from "./Card"; // Import the Card component

const CardList = ({ cards = [] }) => { // Default to an empty array
  return (
    <MDBRow className="justify-content-center">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </MDBRow>
  );
};

export default CardList;
