import React from "react";
import { Table } from 'react-bootstrap';
import NavbarCompPatient from "../NavbarCompPatient";

const PatientPage = () => {
  // Replace this dummy data with actual medical history data fetched from the database
  const medicalHistory = [
    { date: '2023-07-30', prescribe_by: 'dr. tuba', diagnosis: 'Fever', medication: 'Paracetamol', remarks: 'Rest for two days' },
    { date: '2023-07-25', prescribe_by: 'dr. tuba', diagnosis: 'Headache', medication: 'Ibuprofen', remarks: 'Drink plenty of water' },
    // Add more medical history records here...
  ];

  const patientData = {
    fullName: 'John Doe',
    age: 30,
    gender: 'Male',
    height: 175,
    weight: 70,
    address: '123 Main Street',
    contact: '123-456-7890',
    bloodType: 'A+',
    allergy: 'Pollen',
  };

  return (
    <div>
      <NavbarCompPatient />
      <div className="container mt-4">
        <h1>Patient Profile</h1>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td><strong>Full Name</strong></td>
              <td>{patientData.fullName}</td>
            </tr>
            <tr>
              <td><strong>Age</strong></td>
              <td>{patientData.age}</td>
            </tr>
            <tr>
              <td><strong>Gender</strong></td>
              <td>{patientData.gender}</td>
            </tr>
            <tr>
              <td><strong>Height (cm)</strong></td>
              <td>{patientData.height}</td>
            </tr>
            <tr>
              <td><strong>Weight (kg)</strong></td>
              <td>{patientData.weight}</td>
            </tr>
            <tr>
              <td><strong>House Address</strong></td>
              <td>{patientData.address}</td>
            </tr>
            <tr>
              <td><strong>Contact Number</strong></td>
              <td>{patientData.contact}</td>
            </tr>
            <tr>
              <td><strong>Blood Type</strong></td>
              <td>{patientData.bloodType}</td>
            </tr>
            <tr>
              <td><strong>Allergy</strong></td>
              <td>{patientData.allergy}</td>
            </tr>
          </tbody>
        </Table>

        <h1>Medical History</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Medication</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {medicalHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.prescribe_by}</td>
                <td>{record.diagnosis}</td>
                <td>{record.medication}</td>
                <td>{record.remarks}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PatientPage;
