
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
} from "mdb-react-ui-kit";
import '../styles/Card.css';

import React from "react";
const Card = ({ card }) => {
  return (
    <MDBCol md="12" lg="10" xl="8">
      <MDBCard className="mdb-card">
        <MDBCardBody className="mdb-card-body">
          <div className="d-flex flex-start align-items-center">
            <MDBCardImage
              className="mdb-card-image"
              src={card.image}
              alt="avatar"
            />
            <div>
              <h6 className="card-header">{card.name}</h6>
              <p className="card-subtext">
                Shared publicly - {card.publishDate}
              </p>
            </div>
          </div>
          <p className="card-description">{card.briefDescription}</p>
          <div className="float-end">
            <a href="#" className="question-button">
              {card.price}
            </a>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Card;
