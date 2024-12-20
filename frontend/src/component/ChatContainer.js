import React, { useRef, useState, useEffect } from "react";
import ChatInput from "./chatInput";
import { getMessages, sendMessage } from "../api"; // Import API functions
import "../styles/chatContainer.css";

export default function ChatContainer({ currentChatId, userId }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("currentChatId" , currentChatId)
  console.log("MESSAGES", messages);
  const senderId = userId ;
  const receiverId = currentChatId;
  console.log("sender:" , senderId)

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages(senderId, receiverId);
      if (data) {
        console.log(data);
        setMessages(data);
      } else {
        console.error("Failed to fetch messages:", data.error);
      }
    };
    if (senderId) {
      fetchMessages(); // Ensure fetchMessages is called
    }
  }, []);
  console.log(messages);

  useEffect(() => {
    // Scroll to the latest message
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMsg = async (message) => {
    if (message) {
      const data = await sendMessage(senderId, receiverId, message); // Sending userId as 'from' and currentChatId as 'to'
      if (data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: true, message },
        ]);
        setNewMessage("");
      } else {
        console.error("Failed to send message:", data.error);
      }
    }
  };

  return (
    <div className="chat_container">
  <div className="chat-header">
    <div className="user-details">
      <div className="avatar">
        <img src="./img/loader.gif" alt="User Avatar" />
      </div>
      <div className="username">
        <h3>{currentChatId}</h3>
      </div>
    </div>
  </div>
  
  <div className="chat-messages">
    {messages && messages.map((message, index) => (
      <div ref={scrollRef} key={index}>
        <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
          <div className="content">
            <p>{message.message}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  {/* ChatInput will always appear, even if messages are empty */}
  <div className="chat-input-container">
    <ChatInput handleSendMsg={handleSendMsg} />
  </div>
</div>

  );
}
