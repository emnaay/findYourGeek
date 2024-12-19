import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../img/FYG_Logos.png";
import { Link } from "react-router-dom"; // Correctly import Link
import "../styles/navigationBar.css";

function NavigationBar() {
  return (
    <>
      <Navbar className="navbar_container" fixed="top">
        <Container className="navbar_subcontainer">
          <div>
            <img
              src={logo}
              width="22%"
              height="auto"
              //className="d-inline-block align-top"
              alt="logo"
            />
          </div>

          <div>
            <Nav className="buttons_container">
              {/* Use Link for navigation */}
              <Link to="/signin" className="navbar_button">
                LOGIN
              </Link>
              <Link to="/signUp" className="navbar_button">
                SIGN UP
              </Link>
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
