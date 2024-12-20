import NavigationBar from "../component/NavigationBarIn";
import ProfileCard from "../component/profileCard";
import ProfileProject from "../component/profileProject";
import "../styles/profilePage.css";
import { useLocation } from "react-router-dom";


function ProfilePage( {Id} ) {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <div>
      <NavigationBar Id={Id} />
      <div className="profilepagecontainer" >
        <div className="profilecardcontainer">
          {" "}
          {/* Fixed width for ProfileCard */}
          <ProfileCard Id={Id} />
        </div>
        <div className="profiledetails" >
          {" "}
          {/* Takes up the remaining space */}
          <ProfileProject userID={Id} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
