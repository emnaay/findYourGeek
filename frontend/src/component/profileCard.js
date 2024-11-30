import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import profileAvatar from '../img/profileAvatar.jpg';
import {FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa'; // Add social media icons
import { AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from 'react';




function ProfileCard({Id}){

    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8081/users/${Id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data); // Update the state with the fetched data
            })
            .catch(err => console.log(err));
    }, [Id]); // Dependency array should include Id

    if (!data) {
        return <div>Loading...</div>; // lezma bc menghirha el prog mayestanech chwaya lin tji el data soo error
    }


    return(
        <div>
              

{data.map((d, i)  => (
            <Card style={{ width: '18rem' , border:"solid" , borderBlockColor:"#387373" }} key={i}>
                <Card.Img variant="top" src={profileAvatar} />
                <Card.Body >
                    <div style={{display:'flex' ,  alignItems: 'center', justifyContent: 'space-between'}}>
                        <Card.Title style={{display:'flex' ,justifyContent:'center' ,color:'#13334D' , fontWeight: 'bold', textAlign: 'center' }}>{d.userName}</Card.Title>
                    
                        <a href="#" style={{ color: '#387373', marginRight: '10px' }}> <AiFillEdit size={24} /> </a>
                    </div>
                    <Card.Text style={{display:'flex' }}>
                    {d.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{d.email}</ListGroup.Item>
                    <ListGroup.Item>26 715 985</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                
                <Card.Body style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <a href="#" style={{ color: '#387373', margin: '0 10px' }}>
                            <FaLinkedin size={24} />
                        </a>
                        <a href="#" style={{ color: '#387373', margin: '0 10px' }}>
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" style={{ color: '#387373', margin: '0 10px' }}>
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </Card.Body>
            </Card> 

))} 
        </div>
    );
}

export default ProfileCard;