import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import NavbarCompPatient from "./NavbarCompPatient";

function Basicinfo() {
  return (
    <>
      <NavbarCompPatient />
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="nameBox">
              <Form.Label column sm="2">
                Full Name
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder="Enter your name" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="ageBox">
              <Form.Label column sm="2">
                Age
              </Form.Label>
              <Col sm="12">
                <Form.Control type="number" placeholder="Enter your Age" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Height (cm)
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="number"
                  placeholder="Enter your height in centimeters"
                />
              </Col>
            </Form.Group>

            {/* Weight */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Weight (kg)
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  type="number"
                  placeholder="Enter your weight in kilograms"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="addressBox">
              <Form.Label sm="2">House Address</Form.Label>
              <Col sm="12">
                <Form.Control
                  type="textarea"
                  placeholder="Enter your address"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="contactBox">
              <Form.Label sm="2">Contact Number</Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder="Enter your number" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="allergyBox">
              <Form.Label column sm="2">
                Allergy
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder="Enter allergy if any" />
              </Col>
            </Form.Group>
            {/* Gender */}
            <Form.Group as={Row} className="mb-3" controlId="genderBox">
              <Form.Label column sm="2">
                Gender
              </Form.Label>
              <Col sm="12">
                <div className="d-flex gap-3">
                  <div>
                    <input type="radio" name="gender" value="male" />
                    <label className="form-check-label">Male</label>
                  </div>
                  <div>
                    <input type="radio" name="gender" value="female" />
                    <label className="form-check-label">Female</label>
                  </div>
                  <div>
                    <input type="radio" name="gender" value="other" />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>
              </Col>
            </Form.Group>

            {/* Blood Type */}
            <Form.Group as={Row} className="mb-3" controlId="bloodTypeBox">
              <Form.Label column sm="2">
                Blood Type
              </Form.Label>
              <Col sm="12">
                <Form.Control as="select">
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            controlId="insBtn"
          >
            Submit
          </Button>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            controlId="updBtn"
          >
            Edit
          </Button>
        </Col>
      </Row>
    </>
  );
}
export default Basicinfo;
