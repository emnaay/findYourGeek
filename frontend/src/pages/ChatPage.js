/*import React, { useState } from "react";
import styled from "styled-components";
import ChatContainer from '../component/ChatContainer';
import Contacts from "../components/Contacts";
//import Welcome from "../components/Welcome";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(undefined);

  // Static contacts data
  const staticContacts = [
    { _id: "1", username: "Alice", avatarImage: "placeholder1" },
    { _id: "2", username: "Bob", avatarImage: "placeholder2" },
    { _id: "3", username: "Charlie", avatarImage: "placeholder3" },
  ];

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={staticContacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            socket={{ current: null }} // Placeholder for socket reference
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
*/