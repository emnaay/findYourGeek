
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
} from "mdb-react-ui-kit";
import React from "react";

const Card = ({ card }) => {
  return (
    <MDBCol md="12" lg="10" xl="8">
      <MDBCard style={{ border: "15px solid #93bfb7", borderRadius: "25px" ,  height: "100%"}}>
        <MDBCardBody style={{ height: "300px" }}>
          <div className="d-flex flex-start align-items-center">
            <MDBCardImage
              className="rounded-circle shadow-1-strong me-3"
              src={card.image}
              alt="avatar"
              width="40"
              height="40"
            />
            <div>
              <h6 className="fw-bold text-black mb-1">{card.name}</h6>
              <p className="text-muted small mb-0">
                Shared publicly - {card.publishDate}
              </p>
            </div>
          </div>
          <p className="mt-3 mb-4 pb-2">{card.briefDescription}</p>
          <div className="float-end mt-2 pt-1">
            <a href="#" className="question-button" style={{ padding: "10px", color: "black" }}>
              {card.price}
            </a>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Card;
