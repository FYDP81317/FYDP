import React, { useState } from "react";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarCompDoctor from "../NavbarCompDoctor";

const DoctorPage = () => {
  // Replace this dummy data with actual patient data fetched from the database
  const patientList = [
    { id: 1, fullName: 'John Doe', email: 'john@gmail.com', contact: '123-456-7890' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@gmail.com', contact: '987-654-3210' },
    // Add more patients here...
  ];

  // Replace this with the actual doctor name fetched from the database
  const doctorName = 'John Smith';

  return (
    <div>
      <NavbarCompDoctor />
      <div className="container mt-4">
        <div className="text-center">
          <h1>Welcome Dr. {doctorName}</h1>
        </div>
        <br />
        <h2>Patients with Access</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {patientList.map((patient, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {/* Use Link component to navigate to ViewRecord page with patient ID */}
                  <Link to={`/ViewRecord`}>
                    {patient.fullName}
                  </Link>
                </td>
                <td>{patient.email}</td>
                <td>{patient.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DoctorPage;
