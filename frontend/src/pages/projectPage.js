import axios from 'axios';
import React, { useEffect, useState } from "react";

//import '../styles/projectCardStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBCard,
  MDBCardBody
} from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NavigationBar from "../component/NavigationBarY";
import "../styles/Card.css";

const ProjectCard = ({ Id }) => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [dataUser, setDataUser] = useState({}); // User data state

  const [show, setShow] = useState(false); // Modal state

  // Modal toggle functions
  const [selectedProject, setSelectedProject] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (project) => {
    setSelectedProject(project); // Store the selected project data
    console.log("handelshow" , project)
    setFormData({
      ...formData,
      projectID: project.projectID, // Update formData with selected project
    });
    setShow(true);
  };
  

  // Fetch project data
  useEffect(() => {
    fetch('http://localhost:8081/projects')
      .then((res) => res.json())
      .then((data) => {
        console.log("projects: ", data);
        setData(data); // Update state with the fetched data
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch user data
  useEffect(() => {
    fetch(`http://localhost:8081/users/${Id}`)
      .then((res) => res.json())
      .then((user) => {
        console.log("User data: ", user);
        setDataUser(user); // Update state with fetched user data
      })
      .catch((err) => console.log(err));
  }, [Id]);

  //application post 
  const [formData, setFormData] = useState({
    userID: Id,
    projectID: "",
    price_proposed: "",
    application_letter: "",
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proceed with form submission logic
    console.log("formdata in handle submit:", formData);
    axios
      .post("http://localhost:8081/applications", formData)
      .then((response) => alert("application added"))
      .catch((error) => console.log("Error in the application:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <NavigationBar />
      <h1>matfas5ouheech</h1>

      <h1 style={{ color: '#202258', fontFamily: 'Arial, sans-serif', font: 2, marginTop: '50px' }}>
        Welcome {dataUser.userName}, here are some projects you can work on!
      </h1>

      <div style={{ 
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px', // Adjust the gap to 20px
  margin: '0 auto',
  maxWidth: '1200px', // Restrict the width of the container
  justifyContent: 'center',
}}>
  {data.map((d, i) => (
    <div 
      key={i} 
      style={{ 
        flex: '1 1 calc(50% - 20px)', // Takes 50% of the row minus the gap
        maxWidth: 'calc(50% - 20px)', // Ensure cards don't stretch too much
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column', // Ensure consistent alignment within each card
      }}
    >
      <MDBCard className="sizecard">
        <MDBCardBody className="mdb-card-body">
          <div className="d-flex flex-start align-items-center">
            <div className="head">
              <h6 className="card-header">{d.projectName}</h6>
              <div className="card-profile-icon">👤</div>
              <p className="card-subtext">Lazy - {d.userName}</p>
            </div>
          </div>
          <p className="card-description">{d.description}</p>

          <Button 
            variant="primary" 
            onClick={() => handleShow(d)}
            style={{ marginTop: 'auto' }} // Push the button to the bottom of the card
          >
            Admission
          </Button>

          <div className="float-end">
            <a href="#" className="question-button">
              {d.price}
            </a>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  ))}
</div>


      {/* Modal */}
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admission Form</Modal.Title>
          
        </Modal.Header><Form.Label><h3 style={{margin:"10px", fontWeight:"bold"}}>{selectedProject.projectName}</h3> </Form.Label>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Email address</Form.Label>
              <Form.Control
              //el email la 3ale9a bel proj ama just mise en page bch enajem naadi el data mtaa el proj men ghadi el ghadi
                type="email"
                placeholder="name@example.com"
                
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price prop</Form.Label>
              <Form.Control
                type="text"
                placeholder="price"
                name="price_proposed"
                value={formData.price_proposed}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Application</Form.Label>
              <Form.Control as="textarea" rows={3}
              name="application_letter"
              value={formData.application_letter}
              onChange={handleInputChange}
              />
            </Form.Group>
          
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit"  >
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default ProjectCard;
