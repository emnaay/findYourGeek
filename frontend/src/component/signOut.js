import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signOut.css"; 

export default function SignOutButton() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <>
      <div className="popup-overlay">
        {" "}
        <div className="popup-container">
          {" "}
          {/* Popup container */}
          <div className="popup-message">
            Are you sure you want to sign out?
          </div>{" "}
          {/* Message */}
          <div className="popup-actions">
            <button className="confirm" onClick={handleSignOut}>
              Yes
            </button>{" "}
            {/* Confirm button */}
            <button className="cancel" onClick={() => setShowPopup(false)}>
              No
            </button>{" "}
            {/* Cancel button */}
          </div>
        </div>
      </div>
    </>
  );
}
