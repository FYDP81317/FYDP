import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";

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

  const userEmail = localStorage.getItem("userEmail");

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>MedBlock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/patient-profile/${userEmail}`}>
              Patient Profile
            </Nav.Link>
            <Nav.Link href="/basic-info">Add Basic Info</Nav.Link>
            <Nav.Link href="/manage-request">Manage Requests</Nav.Link>
            <Nav.Link href="/view-request">View Requests</Nav.Link>
          </Nav>
          <SplitButton
            align={{ lg: "end" }}
            title={userEmail}
            id="dropdown-menu-align-responsive-2"
          >
            <Dropdown.Item onClick={handleSignOut} eventKey="1">
              Log Out
            </Dropdown.Item>
          </SplitButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCompPatient;
