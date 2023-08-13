import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import NavbarCompPatient from "./NavbarCompPatient";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Basicinfo() {
  const [values, setValues] = useState({
    address: "",
    age: "",
    allergy: "",
    bloodtype: "",
    contact: "",
    gender: "",
    height: "",
    name: "",
    weight: "",
  });
  const patientDataCollectionRef = collection(db, "patientsdata");
  const userEmail = localStorage.getItem("userEmail");

  const handleAddPatientData = async (e) => {
    e?.preventDefault();
    if (
      values.address &&
      values.age &&
      values.allergy &&
      values.bloodtype &&
      values.contact &&
      values.gender &&
      values.height &&
      values.name &&
      values.weight &&
      userEmail
    ) {
      try {
        await addDoc(patientDataCollectionRef, {
          address: values?.address,
          age: Number(values?.age),
          allergy: values?.allergy,
          bloodtype: values?.bloodtype,
          contact: Number(values?.contact),
          gender: values?.gender,
          height: Number(values?.height),
          name: values?.name,
          useremail: userEmail,
          weight: Number(values?.weight),
        });
        toast.success("Your info has been saved successfully!");
      } catch (error) {
        toast.error("Error adding patient data:", error);
      }
    } else {
      toast.error("Fill all fields!");
    }
  };

  return (
    <>
      <NavbarCompPatient />
      <Row className="justify-content-center mt-4 mb-4">
        <Col xs={12} sm={12} md={6}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="nameBox">
              <Form.Label column sm="2">
                Full Name
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Enter your name"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="ageBox">
              <Form.Label column sm="2">
                Age
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      age: e.target.value,
                    }));
                  }}
                  type="number"
                  placeholder="Enter your Age"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Height (cm)
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      height: e.target.value,
                    }));
                  }}
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
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      weight: e.target.value,
                    }));
                  }}
                  type="number"
                  placeholder="Enter your weight in kilograms"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="addressBox">
              <Form.Label sm="2">House Address</Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      address: e.target.value,
                    }));
                  }}
                  type="textarea"
                  placeholder="Enter your address"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="contactBox">
              <Form.Label sm="2">Contact Number</Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      contact: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Enter your number"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="allergyBox">
              <Form.Label column sm="2">
                Allergy
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      allergy: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Enter allergy if any"
                />
              </Col>
            </Form.Group>

            {/*Gender*/}
            <Form.Group as={Row} className="mb-3" controlId="allergyBox">
              <Form.Label column sm="2">
                Gender
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      gender: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Enter gender"
                />
              </Col>
            </Form.Group>

            {/* Blood Type */}
            <Form.Group as={Row} className="mb-3" controlId="allergyBox">
              <Form.Label column sm="2">
                Blood Group
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => {
                    setValues((prevState) => ({
                      ...prevState,
                      bloodtype: e.target.value,
                    }));
                  }}
                  type="text"
                  placeholder="Enter bloodtype"
                />
              </Col>
            </Form.Group>
          </Form>
          <Button
            type="button"
            className="btn btn-primary"
            onClick={handleAddPatientData}
          >
            Save Info
          </Button>
        </Col>
      </Row>
    </>
  );
}
export default Basicinfo;
