import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const [message, setMessage] = useState(""); 

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message); 
      setMessage(""); 
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value); // Correct the state update to `setMessage`
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill />
        </div>
      </div>
      <form className="input-container" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10% 90%;
  background-color: #4f2e7;
  padding: 1rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 0.5rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.8rem;
        color: #ffdf00;
        cursor: pointer;
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #4f2e7;
    padding: 0.5rem 1rem;
      box-shadow: 0 4px 8px rgba(88, 87, 87, 0.6); 


    input {
      width: 100%;
      background-color: transparent;
      color: grey;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;
      font-family: "Arial", sans-serif;

      &::selection {
        background-color: #4f2e7;
      }

      &:focus {
        outline: none;
        border-bottom: 2px solid #e4f2e7 ;
      }
    }

    button {
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e4f2e7 ;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #7a67cc;
      }

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
