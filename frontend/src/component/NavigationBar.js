<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/FYG_Logos.png';
import { Link } from 'react-router-dom'; // Correctly import Link
=======
// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo from "../img/FYG_Logos.png";
// import { Link } from "react-router-dom";
// //emna
// function NavigationBar() {
//   const linkStyle = {
//     margin: "0 40px ",
//   };
>>>>>>> origin/yassinebranch

//   return (
//     <>
//       <Navbar fixed="top" style={{ backgroundColor: "#e4f2e7" }}>
//         <Container style={{ display: "flex", justifyContent: "space-around" }}>
//           <div>
//             <img
//               src={logo}
//               width="22%"
//               height="auto"
//               //className="d-inline-block align-top"
//               alt="logo"
//             />
//           </div>

<<<<<<< HEAD
function NavigationBar() {
  const linkStyle = {
    margin:"0 40px ",
    textDecoration: "none", // Remove underline
    color:"black",
    display: "flex",          // Flexbox for vertical centering

    alignItems: "center",     // Align content vertically

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
              //className="d-inline-block align-top"
              alt="logo"/>
              </div>
            
          <div>
          <Nav className="me-auto" style={{ fontSize: '20px' }}>
              {/* Use Link for navigation */}
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
=======
//           <div>
//             <Nav className="me-auto" style={{ fontSize: "20px" }}>
//               <Nav.Link as={Link} to="" style={linkStyle}>
//                 LOGIN
//               </Nav.Link>
//               <Nav.Link as={Link} to="/signup" style={linkStyle}>
//                 SIGN UP
//               </Nav.Link>
//               <Nav.Link
//                 as={Link}
//                 to="/ProjectCard"
//                 className="question-button"
//                 style={linkStyle}
//               >
//                 ABOUT US
//               </Nav.Link>
//             </Nav>
//           </div>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default NavigationBar;
>>>>>>> origin/yassinebranch
