import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavbarCompDoctor from "../NavbarCompDoctor";

const AddRecord = () => {
  // Replace this with the actual logged-in doctor's name fetched from the database
  const loggedInDoctorName = "Dr. John Smith";

  const { patientEmail } = useParams();

  const [recordData, setRecordData] = useState({
    date: "",
    doctor: loggedInDoctorName,
    diagnosis: "",
    medication: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the record data to the database
    console.log("Record data:", recordData);
    // Clear the form fields after submission
    setRecordData({
      date: "",
      doctor: loggedInDoctorName,
      diagnosis: "",
      medication: "",
      remarks: "",
    });
  };

  return (
    <div>
      <NavbarCompDoctor />
      <div className="container mt-4">
        <h1>Add New Medical Record</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={recordData.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Doctor</Form.Label>
            <Form.Control
              type="text"
              name="doctor"
              value={recordData.doctor}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              name="diagnosis"
              value={recordData.diagnosis}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Medication</Form.Label>
            <Form.Control
              type="text"
              name="medication"
              value={recordData.medication}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              name="remarks"
              value={recordData.remarks}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddRecord;
