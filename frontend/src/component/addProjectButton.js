import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function AddProjectButton({userID}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectData, setprojectData] = useState({
    projectName: "",
    userID: userID,
    description: "",
    skills_needed: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setprojectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting project data:", projectData);

    const { projectName, userID, description, skills_needed, price } = projectData;
    
    axios.post("http://localhost:8081/projects", { projectName, userID, description, skills_needed, price })
      .then((res) =>  {
        console.log("Server response:", res.data);
        if (res.data.status === "Project Title alredy used") {
            alert("Project title already exists!");
        } else {
            alert("Project added successfully!");
            handleClose();
        }
    })
    .catch((err) => console.error(err));
  };
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <button onClick={handleShow}>+ Add Project</button>{" "}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
              
                name="projectName"
                value={projectData.projectName}
                onChange={handleInputChange}
                required
                type="text"
                placeholder="Title of project"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ProjectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control as="textarea" rows={3}
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              required
              type="text"
              // placeholder="Project Description"
              autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Skill needed</Form.Label>
              <Form.Control
                name="skills_needed"
                value={projectData.skills_needed}
                onChange={handleInputChange}
                placeholder="Skill needed"
        
              />
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                value={projectData.price}
                onChange={handleInputChange}
                placeholder="Estimated Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProjectButton;
