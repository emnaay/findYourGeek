import React, { useRef, useState, useEffect } from "react";
import ChatInput from "./chatInput";
import { getMessages, sendMessage } from "../api"; // Import API functions
import "../styles/chatContainer.css";

export default function ChatContainer({ selectedContact, userID }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("selectedContact", selectedContact);
  console.log("userId", userID);
  console.log("MESSAGES", messages);
  const senderId = userID;
  const receiverId = selectedContact;
  console.log("sender:", senderId);
  console.log("receiver:", receiverId);

    useEffect(() => {
      const fetchMessages = async () => {
        const data = await getMessages(senderId, receiverId);
        if (data && Array.isArray(data)) {
          console.log("Messages fetched:", data);
          setMessages(data);
        } else {
          console.error("Failed to fetch messages: No data returned or incorrect format", );
        }
      };
    
      if (senderId && receiverId) {
        fetchMessages(); // Ensure fetchMessages is called with both sender and receiver IDs
      }
    }, [senderId, receiverId]);
     // Depend on senderId and receiverId to refetch messages when these change

  useEffect(() => {
    // Scroll to the latest message
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMsg = async (message) => {
    if (message) {
      const data = await sendMessage(senderId, receiverId, message); // Sending userId as 'from' and selectedContact as 'to'
      if (data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: true, message, timestamp: new Date().toISOString() }, // Add timestamp if needed
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
            <h3>{selectedContact}</h3>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages && messages.map((message, index) => (
          <div ref={scrollRef} key={index}>
            <div className={`message ${message.sender_id === userID ? "sended" : "recieved"}`}>
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
