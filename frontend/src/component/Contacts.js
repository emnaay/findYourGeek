import React, { useState } from "react";
import styled from "styled-components";
import "../styles/chatContacts.css";
import ChatContainer from "../component/ChatContainer.js";

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState(null);

  const staticContacts = [
    { _id: 1, username: "John Doe"},
    { _id: 2, username: "Jane Smith" },
    { _id: 3, username: "Sam Wilson"},
  ];

  const staticCurrentUser = {
    username: "Current User",
    
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Set the selected contact
  };

  return (
    <Container>
      {selectedContact ? (
        <ChatContainer />
      ) : (
        <>
          <div className="brand">
            <h3>My contacts:</h3>
          </div>
          <div className="contacts">
            {staticContacts.map((contact) => (
              <div
                key={contact._id}
                className="contact"
                onClick={() => handleContactClick(contact)}
              >
                <div className="avatar">
                  
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user"> 
            <div className="username">
              <h2>{staticCurrentUser.username}</h2>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    h3 {
      color: grey;
      font-size: 1.8rem;
      font-weight: bold;
    }
  }

  .contacts {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 1rem;
    padding: 1rem;

    .contact {
      background-color: #e4f2e7 ;
      min-height: 4rem;
      width: 85%;
      border-radius: 0.5rem;
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #2c5f34;
        transform: scale(1.05);
      }

      .username h3 {
        color: grey;
        font-size: 1.2rem;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-top: 2px solid #111184;

    .username h2 {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  > div:first-child {
    flex: 1;
    width: 100%;
  }
`;

//display: flex;
//justify-content: center;
    //align-items: center;