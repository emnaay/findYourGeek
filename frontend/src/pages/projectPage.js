import React from "react";
import '../styles/projectCardStyle.css'
import NavigationBar from "../component/NavigationBar";
import { useState, useEffect } from "react";


const ProjectCard = ({Id}) => {


  const [data, setData] = useState([]) //useState([]) initializes data as an empty array.
    //to display el projects el mawjoudin
  useEffect( () =>{
      fetch('http://localhost:8081/projects')
      .then(res=>res.json())
      .then(data => {
          console.log(data);
          setData(data);  // Update the state with the fetched data
         
      })      
      .catch(err => console.log(err));
  }, []);


  // to display el user name

  const [name, setname] = useState([]) //useState([]) initializes name as an empty array.
    //to display el projects el mawjoudin
  useEffect( () =>{
      fetch(`http://localhost:8081/users/${Id}`)
      .then(res=>res.json())
      .then(name => {
          console.log(name);
          setname(name);  // Update the state with the fetched data
         
      })      
      .catch(err => console.log(err));
  }, []);

    return (
      <>
      <NavigationBar/>

      {name.map((n,i) => (

      <h1 key={i} style={{ color: '#202258' , fontFamily: 'Arial, sans-serif', font:2 , marginTop: '50px' }}> Welcome {n.userName}, here are some projects you can work on!</h1> 

      ))}
      <div style={{display: "flex" , flexWrap: "wrap"}}>
      {data.map((d,i) => (
           <div class="cards">
           <div class="card">
           <div class="card-profile-icon">👤</div>
           <div class="card-name">{d.userName}</div>
           <div class="card-description">{d.projectName}</div>
           <div class="">{d.skills_needed}</div> 
           <a href="#" class="card-price-button">{d.price} DT</a>
         </div>
         
        
         </div>
        ))}

</div>
                
       
      </>
    )
}

export default ProjectCard;