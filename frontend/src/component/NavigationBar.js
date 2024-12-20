import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/FYG_Logos.png';
import { Link } from 'react-router-dom'; 


function NavigationBar() {
  const linkStyle = {
    margin:"0 40px ",
    textDecoration: "none",
    color:"black",
    display: "flex",          

    alignItems: "center",    

  };
  

  return (
    <>
    <Navbar fixed="top" style={{backgroundColor:"#e4f2e7"}}>
        <Container style={{display:"flex", justifyContent:"space-around"}} >
            <div>
                <img
              src={logo}
              width="22%"
              height="auto"
              alt="logo"/>
              </div>
            
          <div>
          <Nav className="me-auto" style={{ fontSize: '20px' }}>
             
              <Link to="/signIn" style={linkStyle}>LOGIN</Link>
              <Link to="/signUp" style={linkStyle}>SIGN UP</Link>
              <Nav.Link href="#aboutus" className="question-button">
                ABOUT US
              </Nav.Link>
            </Nav>
          </div>
          
        </Container>
      </Navbar>
      </>
    
  );
}

export default NavigationBar;
