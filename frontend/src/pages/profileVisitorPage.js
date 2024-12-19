import NavigationBar from "../component/NavigationBarY";
import ProfileCard from "../component/profileCard";
import Portfolio from "../component/portfolio";

function ProfileVisitorPage({Id}){

  console.log(Id);
  return(
    <div>
      <NavigationBar/>
    <div style={{ display: "flex" , marginTop:"6%" }}>
      <div style={{ flex: "0 0 auto" }}> {/* Fixed width for ProfileCard */}
      
        <ProfileCard Id ={Id} />
      </div>
      <div style={{ flex: "1" }}> {/* Takes up the remaining space */}
       
       <Portfolio userID ={Id} />
      </div>
    </div>
  </div>
  )
}

export default ProfileVisitorPage;