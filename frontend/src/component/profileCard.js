import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import profileAvatar from "../img/profileAvatar.jpg";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"; // Add social media icons
import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "../styles/profileCard.css";

function ProfileCard({ Id }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8081/users/${Id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data); // Update the state with the fetched data
      })
      .catch((err) => console.log(err));
  }, [Id]); // Dependency array should include Id

  if (!data) {
    return <div>Loading...</div>; // lezma bc menghirha el prog mayestanech chwaya lin tji el data soo error
  }

  return (
    <div>
      {data.map((d, i) => (
        <Card className="profile_card" key={i}>
          <Card.Img variant="top" src={profileAvatar} />
          <Card.Body>
            <div className="profilecard_body">
              <Card.Title className="profilecard_title">
                {d.userName}
              </Card.Title>

              <a href="#" className="profilecard_link" >
                {" "}
                <AiFillEdit size={24} />{" "}
              </a>
            </div>
            <Card.Text className="profilecard_description" >{d.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>{d.email}</ListGroup.Item>
            <ListGroup.Item>26 715 985</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>

          <Card.Body className="profilecard_body" >
            <div className="profile_card_footer" >
              <a className="profile_card_social_media_icon" href="#" >
                <FaLinkedin size={24} />
              </a>
              <a className="profile_card_social_media_icon" href="#" >
                <FaFacebook size={24} />
              </a>
              <a className="profile_card_social_media_icon" href="#" >
                <FaTwitter size={24} />
              </a>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProfileCard;
