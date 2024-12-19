import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import profileAvatar from "../img/profileAvatar.jpg";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import "../styles/profileCard.css";

function ProfileCard({ Id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/users/${Id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(data); // Update state with fetched data
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, [Id]); // Ensure Id is in dependency array

  if (!data) {
    return <div>Loading...</div>; // Display loading while waiting for data
  }

  return (
    <Card
      className="profile_card"
      style={{ width: "18rem", border: "solid", borderBlockColor: "#387373" }}
    >
      <Card.Img variant="top" src={profileAvatar} />
      <Card.Body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card.Title
            style={{
              color: "#13334D",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {data.userName}
          </Card.Title>
          <a href="#" style={{ color: "#387373", marginRight: "10px" }}>
            <AiFillEdit size={24} />
          </a>
        </div>
        <Card.Text style={{ color: "#555" }}>{data.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{data.email}</ListGroup.Item>
        <ListGroup.Item>26 715 985</ListGroup.Item> {/* Replace with dynamic phone if available */}
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body style={{ textAlign: "center", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="#" style={{ color: "#387373", margin: "0 10px" }}>
            <FaLinkedin size={24} />
          </a>
          <a href="#" style={{ color: "#387373", margin: "0 10px" }}>
            <FaFacebook size={24} />
          </a>
          <a href="#" style={{ color: "#387373", margin: "0 10px" }}>
            <FaTwitter size={24} />
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
