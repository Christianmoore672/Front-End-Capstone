import { useNavigate } from "react-router-dom"
import "./NavBar.css"
// import {logo} from "../logo.png"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
    const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
        {/* <a className="logo" href="#"><img src={logo} alt="logo..."/></a> */}
      <Container>
        <Navbar.Brand href="#home">Grocery Calculator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar_link">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Profile</Nav.Link>
            <Nav.Link href="#link">Saved Carts</Nav.Link>
            <Nav.Link className="navbar_link" to="" onClick={() => {
                            localStorage.removeItem("grocery_user")
                            navigate("/", {replace: true})
                        }}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
