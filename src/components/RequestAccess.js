import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavbarCompDoctor from "./NavbarCompDoctor";

const RequestAccess = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the email and request access here
    console.log(`Requesting access for email: ${email}`);
    // You can add your logic to send the request to the backend or display a success message, etc.
    setEmail(""); // Clear the input field after submission
  };

  return (
    <div>
      <NavbarCompDoctor />
      <Container className="mt-4">
        <h1 className="text-center">Request Access</h1>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Patient Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter patient email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Request Access
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestAccess;
