import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import profileAvatar from "../img/profileAvatar.jpg";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import "../styles/profileCard.css";

function ProfileCard({ Id }) {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user data on component mount or when Id changes
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
        setData(data);
        setFormData({
          userName: data.userName || "",
          description: data.description || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          rank: data.rank || "",
        });
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, [Id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle editing mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Save updated data to the backend
  const handleSave = () => {
    fetch(`http://localhost:8081/users/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedData) => {
        console.log("Updated Data:", updatedData);
        setData(updatedData); // Update local state with updated data
        setFormData({
          userName: updatedData.userName || "",
          description: updatedData.description || "",
          email: updatedData.email || "",
          phone_number: updatedData.phone_number || "",
          rank: updatedData.rank || "",
        });
        setIsEditing(false); // Exit editing mode
      })
      .catch((err) => console.error("Update Error:", err));
  };

  // Render loading state if data is null
  if (!data) {
    return <div>Loading...</div>;
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
          {isEditing ? (
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              style={{
                flex: 1,
                marginRight: "10px",
                border: "1px solid #387373",
                borderRadius: "4px",
              }}
            />
          ) : (
            <Card.Title
              style={{
                color: "#13334D",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {data.userName}
            </Card.Title>
          )}
          <a
            className="editOption"
            href="#"
            style={{ color: "#387373", marginRight: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <AiFillEdit size={24} />
          </a>
        </div>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: "60px",
              border: "1px solid #387373",
              borderRadius: "4px",
            }}
          />
        ) : (
          <Card.Text style={{ color: "#555" }}>{data.description}</Card.Text>
        )}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                border: "1px solid #387373",
                borderRadius: "4px",
              }}
            />
          ) : (
            data.email
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          {isEditing ? (
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              style={{
                width: "100%",
                border: "1px solid #387373",
                borderRadius: "4px",
              }}
            />
          ) : (
            data.phone_number
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          {isEditing ? (
            <input
              type="text"
              name="rank"
              value={formData.rank}
              onChange={handleInputChange}
              style={{
                width: "100%",
                border: "1px solid #387373",
                borderRadius: "4px",
              }}
            />
          ) : (
            data.rank
          )}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body style={{ textAlign: "center", paddingBottom: "1rem" }}>
        {isEditing && (
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#387373",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        )}
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
