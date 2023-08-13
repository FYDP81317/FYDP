import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";

const NavbarCompDoctor = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        toast.success("Logout Successfully!");
        window.location.href = "/";
      })
      .catch((err) => toast.error("Failed to Logout " + err));
  };

  const userEmail = localStorage.getItem("userEmail");

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/doctor-page">MedBlock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/request-access">Request Patient</Nav.Link>
          </Nav>

          <div className="mt-2">
            <SplitButton
              align={{ lg: "end" }}
              title={userEmail}
              id="dropdown-menu-align-responsive-2"
            >
              <Dropdown.Item onClick={handleSignOut} eventKey="1">
                Log Out
              </Dropdown.Item>
            </SplitButton>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCompDoctor;
