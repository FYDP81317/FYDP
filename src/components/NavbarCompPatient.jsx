import React , {useState , useEffect} from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap'
import { auth, app } from "../firebase";
import { signOut } from "firebase/auth";
import { getAuth} from "firebase/auth";
import toast from "react-hot-toast";


const NavbarCompPatient = () => {
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        toast.success("Logout Successfully!");
        window.location.href = "/";
      })
      .catch((err) => console.log("Failed to Logout"));
  };


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/PatientPage">MedBlock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Basicinfo">Add Basic Info</Nav.Link>
            <Nav.Link href="/ViewRequest">View Requests</Nav.Link>
            <Nav.Link href="/ManageRequest">Manage Requests</Nav.Link>            
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">
              Sign Up
            </Nav.Link>
            <Button onClick={handleSignOut}>
            Sign Out
            </Button>
            {/* <Navbar.Link >{auth.currentUser.displayName ? `Signed in as - ${auth.currentUser.displayName}` : "Login please"}</Navbar.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavbarCompPatient