import NavigationBar from "../component/NavigationBarY";
import ProfileCard from "../component/profileCard";
import ProfileProject from "../component/profileProject";

function ProfilePage({Id}){

  console.log(Id);
  return(
    <div>
      <NavigationBar/>
    <div style={{ display: "flex" , marginTop:"6%" }}>
      <div style={{ flex: "0 0 auto" }}> {/* Fixed width for ProfileCard */}
      
        <ProfileCard Id ={Id} />
      </div>
      <div style={{ flex: "1" }}> {/* Takes up the remaining space */}
       <ProfileProject userID ={Id}/> 
      </div>
    </div>
  </div>
  )
}

export default ProfilePage;