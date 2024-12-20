import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { FaFacebookMessenger } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import AddProjectButton from "./addProjectButton";
import "../styles/profilePage.css";

// Modal Component for displaying project propositions
function MyVerticallyCenteredModal({ projectID, ...props }) { 
  const [data, setData] = useState(null);

  useEffect(() => {
    if (projectID) {
      fetch(`http://localhost:8081/application/${projectID}`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }
  }, [projectID]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {data.length > 0 
            ? `You have ${data.length} propositions` 
            : "No proposition yet"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.length > 0 ? (
          data.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <div>
                <h4>{d.userName} offer: {d.price_proposed} DT</h4>
                <p>Application letter: {d.application_letter}</p>
              </div>
              <div>
                <a href="#" style={{ color: '#387373', margin: '0 10px' }}>
                  <FaFacebookMessenger size={24} />
                </a>
                <Link to={`/ProfileVisitorPage/${d.userID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  👤
                </Link>
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

// Main Component to display projects
function ProjectProposed({ userID }) {
  const [data, setData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/projects/${userID}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.log(err));
  }, [userID]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleDelete = (projectID) => {
    fetch(`http://localhost:8081/projects/${projectID}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setData(prevData => prevData.filter(project => project.projectID !== projectID));
          setDeleteModalShow(false);
        } else {
          console.error("Failed to delete the project");
        }
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  return (
    <div>
      {data.map((project) => (
        <Card key={project.projectID} style={{ width: '100%', marginBottom: '20px' }}>
          <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{project.projectName}</div>
            <Button
              style={{ background: "none", border: "none", color: "black" }}
              onClick={() => {
                setSelectedProjectId(project.projectID);
                setDeleteModalShow(true);
              }}
            >
              <MdDelete size={30} />
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{project.price} DT</Card.Title>
            <Card.Text>{project.description}</Card.Text>
            <Button 
              variant="primary" 
              onClick={() => {
                setSelectedProjectId(project.projectID);
                setModalShow(true);
              }}
            >
              Propositions
            </Button>
          </Card.Body>
        </Card>
      ))}
      <AddProjectButton userID={userID} />

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        projectID={selectedProjectId}
      />

      <Modal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedProjectId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectProposed;
