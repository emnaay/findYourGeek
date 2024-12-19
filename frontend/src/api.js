import axios from "axios";

const API_URL = "http://localhost:8081"; // Backend URL

export const getMessages = async (from, to) => {
  try {
    const response = await axios.post(`http://localhost:8081/messages/get`, {
      from: from,
      to: to,  // Send `from` and `to` in the body, not as query parameters.
    });

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

export const getMessagesForReceiver = async (receiverId) => {
  try {
    const response = await axios.get(
      `${API_URL}/messages/receiver/${receiverId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching receiver's messages:", error);
    return { success: false, error: error.message };
  }
};
