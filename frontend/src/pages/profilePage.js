import NavigationBar from "../component/NavigationBarIn";
import ProfileCard from "../component/profileCard";
import ProfileProject from "../component/profileProject";
import "../styles/profilePage.css";

function ProfilePage({ Id }) {
  console.log(Id);
  return (
    <div>
      <NavigationBar />
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
