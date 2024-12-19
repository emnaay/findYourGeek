import React,{ useEffect, useState } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import "../styles/profilePage.css";



const Portfolio = ({userID}) => {


    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8081/portfolio/${userID}`)
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

    return (
        <div className="container mt-5">

            <h2 className="portfolio_header" >Previous Work</h2>
            <Row>
                    {data.map((d, i) => (
                    <Col md={4} key={i} className="mb-4">
                        <Card className='cardportfolio'>
                            {/* <Card.Img variant="top" className='portfoliocard_img'  /> */}
                            <Card.Body>
                                <Card.Title><strong>{d.project_name}</strong></Card.Title>
                                <Card.Text>{d.description}</Card.Text>
                                <div className='prevwork_cont' >
                                 <div>
                                  
                                        <span className="badge bg-secondary me-1">
                                            {d.domain}
                                        </span>
                                
                                </div> 
                                <Button className='viewproj_button'  target="_blank" >View Project</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Portfolio;
