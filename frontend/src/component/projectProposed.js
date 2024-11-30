import Button from 'react-bootstrap/Button';
import { useState, useEffect} from 'react';

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import AddProjectButton from './addProjectButton';


// pop upp li feha el propositions
function MyVerticallyCenteredModal(props) {  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        You have 3 propositions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display:"flex" , justifyContent:"space-between"}}>
            <h4>bomo choula</h4>
            <p> 300£ </p>
            <a href="#" style={{ color: '#387373', margin: '0 10px' }}>
                            <FaFacebookMessenger size={24} />
                        </a>
        </div>
        
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


    return(
        <div>

          {data.map((d, i) => (
                <Card key={i} style={{width: '100%'}}>
                <Card.Header as="h5" style={{display:"flex", justifyContent: "space-between"}}>
                  <div>{d.projectName}</div>
                  <div>{d.price} DT</div>

                <Button style={{background:"none" , border:"none" , color:"black" , width:"10%"}} onClick={handleShow}> <MdDelete size={30} /> </Button>
                </Card.Header>

                <Card.Body>
                    <Card.Title>{d.price} DT</Card.Title> 
                    <Card.Text>
                    {d.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                     Proposition
                    </Button>
                    

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
      />
                </Card.Body>
            </Card>
            ))}
           
            <AddProjectButton/>
           

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
          <Button variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>


        </div>
    )
}

export default ProjectProposed;