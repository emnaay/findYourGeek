import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import AddProjectButton from './addProjectButton';


// pop upp li feha el propositions
function MyVerticallyCenteredModal(props) { 
  const [data, setData] = useState(null);
  console.log("Props outside useEffect: ",  props );
  console.log("projectID outside useEffect: ",  props.projectID );
   

  
  useEffect(() => {
    
    console.log("Project ID fi west el useffect: ", props.projectID );
      fetch(`http://localhost:8081/applications/${props.projectID}`)
          .then(res => res.json())
          .then(data => {
             
              setData(data); // Update the state with the fetched data
              console.log("applications ID with projectID", data.applicationID)
          })
          .catch(err => console.log(err));
  }, [props.projectID]); 

  if (!data) {
      return <div>Loading...</div>; // lezma bc menghirha el prog mayestanech chwaya lin tji el data soo error
  }

  return (
    <Modal
  {...props}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      {data && data.length > 0 
        ? `You have ${data.length} propositions` 
        : "No proposition yet"}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {data && data.length > 0 ? (
      data.map((d, i) => (
        <div key={i}>
        <div  style={{ display: "flex", justifyContent: "space-between" }}>
          <div><h4>{d.userName} offer: {d.price_proposed} DT </h4><p>application letter: {d.application_letter}</p></div>
          <div>
            <a href="#" style={{ color: '#387373', margin: '0 10px' }}>
              <FaFacebookMessenger size={24} />
            </a>
            <div className="card-profile-icon">
                <Link to= {`/ProfileVisitorPage/${d.userID}`} style={{ textDecoration: 'none', color: 'inherit' }}>👤</Link>
              </div>
          </div>
          
          
          
         
        </div>
        
        </div>
      ))
    ) : (
      <p>No propositions available at the moment.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={props.onHide}>Close</Button>
  </Modal.Footer>
</Modal>
  );
}

function ProjectProposed({userID}){
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [data, setData] = useState(null);
  useEffect(() => {
      fetch(`http://localhost:8081/projects/${userID}`)
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setData(data); // Update the state with the fetched data
          })
          .catch(err => console.log(err));
  }, [userID]); // Dependency array should include Id

  if (!data) {
      return <div>Loading...</div>; // lezma bc menghirha el prog mayestanech chwaya lin tji el data soo error
  }

  

  const handelDelete  = (selectedProjectId) =>{
    console.log("dedee" , selectedProjectId);
    fetch(`http://localhost:8081/projects/${selectedProjectId}`, {
      method: 'DELETE',
  })
      .then((response) => {
          if (response.ok) {
              console.log(`Project ${selectedProjectId} deleted successfully`);
              // Update the state to remove the deleted project
              setData((prevData) =>
                  prevData.filter((project) => project.projectID !== selectedProjectId)
              );
              setShow(false); // Close the modal
          } else {
              console.error("Failed to delete the project");
          }
      })
      .catch((error) => {
          console.error("Error deleting project:", error);
      });
  }


    return(
        <div>

          {data.map((d, i) => (
                <Card key={i} style={{width: '100%'}}>
                <Card.Header as="h5" style={{display:"flex", justifyContent: "space-between"}}>
                  <div>{d.projectName}</div>
                  <div>{d.price} DT</div>

                <Button style={{background:"none" , border:"none" , color:"black" , width:"10%"}}  onClick={() => {
                      setSelectedProjectId(d.projectID); 
                      console.log("clicked on poubelle")
                      handleShow(); 
            }} > 
    
              <MdDelete  size={30} /> </Button>
                </Card.Header>

                <Card.Body>
                    <Card.Title>{d.skills_needed} DT</Card.Title> 
                    <Card.Text>
                    {d.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => {
                       setSelectedProjectId(d.projectID)
                       setModalShow(true)
                       }}>
                     Proposition
                    </Button>
                    

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() =>setModalShow(false) }
                        projectID={selectedProjectId}
      />
                </Card.Body>
            </Card>
            ))}
           
            <AddProjectButton userID ={userID}/>
           

            {/* pop upp */}

            <Modal  show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Are you sure you want to delete this project
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handelDelete(selectedProjectId)}>Delete</Button>
        </Modal.Footer>
      </Modal>


        </div>
    )
}

export default ProjectProposed;