import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavbarCompDoctor from "./NavbarCompDoctor";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RequestAccess = () => {
  const [values, setValues] = useState({
    patientEmail: "",
    doctorName: "",
  });

  const doctorEmail = localStorage.getItem("userEmail");

  const reqAccessDataCollectionRef = collection(db, "requestaccess");

  const handleReqAccess = async (e) => {
    e.preventDefault();
    if (values.patientEmail && values.doctorName) {
      try {
        await addDoc(reqAccessDataCollectionRef, {
          doctoremail: doctorEmail,
          doctorname: values?.doctorName,
          patientemail: values?.patientEmail,
          reqaccepted: false,
        });
        toast.success("Request has been sent to patient!");
      } catch (error) {
        toast.error("Error adding patient data:", error);
      }
    } else {
      toast.error("Fill all fields!");
    }
  };

  return (
    <div>
      <NavbarCompDoctor />
      <Container className="mt-4">
        <h1 className="text-center">Request Access</h1>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <Form onSubmit={handleReqAccess}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Patient Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter patient email"
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      patientEmail: e.target.value,
                    }))
                  }
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Doctor Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name as a doctor!"
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      doctorName: e.target.value,
                    }))
                  }
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
