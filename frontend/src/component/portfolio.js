import React,{ useEffect, useState } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import "../styles/profilePage.css";



const Portfolio = ({userID}) => {
    const works = [
        {
            id: 1,
            title: "Project Title 1",
            description: "Brief description of the project and what was achieved.",
            image: "data:image/jpeg;base64,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",
            skills: ["React", "JavaScript", "CSS"],
            link: "https://project-link1.com"
        },
        {
            id: 2,
            title: "Project Title 2",
            description: "Brief description of the project and what was achieved.",
            image: "link-to-image2.jpg",
            skills: ["Node.js", "Express", "MongoDB"],
            link: "https://project-link2.com"
        },
        {
            id: 2,
            title: "Project Title 2",
            description: "Brief description of the project and what was achieved.",
            image: "link-to-image2.jpg",
            skills: ["Node.js", "Express", "MongoDB"],
            link: "https://project-link2.com"
        },
        {
            id: 2,
            title: "Project Title 2",
            description: "Brief description of the project and what was achieved.",
            image: "link-to-image2.jpg",
            skills: ["Node.js", "Express", "MongoDB"],
            link: "https://project-link2.com"
        },
        // Add more projects as needed
    ];

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
            {/* {data.map((d, i) => (
                <div key={i}>
                    <h1>{d.userID}</h1>
                    <h1>{d.portfolioID}</h1>
                    <h1>{d.project_name}</h1>
                    <h1>{d.description}</h1>
                    <h1>{d.domain}</h1>
                </div>
            ))} */}
            <h2 className="portfolio_header" >Previous Work</h2>
            <Row>
                    {data.map((d, i) => (
                    <Col md={4} key={i} className="mb-4">
                        <Card>
                            <Card.Img variant="top" className='portfoliocard_img'  />
                            <Card.Body>
                                <Card.Title>{d.project_name}</Card.Title>
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
