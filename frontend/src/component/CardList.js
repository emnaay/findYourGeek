import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBRow } from "mdb-react-ui-kit";
import React from "react";
import '../styles/Card.css';
import Card from "./Card";

const CardList = ({ cards = [] }) => { 
  return (
    <MDBRow className="justify-content-center">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </MDBRow>
  );
};

export default CardList;
