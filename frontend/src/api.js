import axios from "axios";

const API_URL = "http://localhost:8081"; // Backend URL

export const getContacts = async (user_id) => {
  try {
    const response = await axios.post(`http://localhost:8081/contacts/get`, {
      user_id: user_id, // Send `user_id` in the body
    });

    return response.data; // Return the data for further use
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return null;
  }
};

export const getMessages = async (receiver_id, sender_id) => {
  try {
    // Use template literals to pass the receiver_id and sender_id in the URL path
    const response = await axios.get(`http://localhost:8081/messages/get/${receiver_id}/${sender_id}`);
    
    return response.data;  // Return the data for further use
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
};

   
export const sendMessage = async (from, to, message) => {
  try {
    const response = await fetch("http://localhost:8081/messages/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, message }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, data };  // Return success with response data
    } else {
      return { success: false, error: data.msg };  // Return failure with error message
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Server error" };
  }
};

export const getMessagesForReceiver = async (receiver_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/messages/get/${receiver_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching receiver's messages:", error);
    return { success: false, error: error.message };
  }
};
