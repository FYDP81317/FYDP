import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import NavbarCompPatient from "../NavbarCompPatient";

const ManageRequest = () => {
  // Sample data for allowed doctors (You can fetch this from your database)
  const [allowedDoctors, setAllowedDoctors] = useState([
    { id: 1, name: 'Dr. Ghaniya', email: 'dr.ghaniya@gamil.com' },
    { id: 2, name: 'Dr. Tuba', email: 'dr.tuba@gmail.com' },
  ]);

  const handleRemoveAccess = (id) => {
    // Handle removing access for the doctor with the given ID
    const updatedAllowedDoctors = allowedDoctors.filter((doctor) => doctor.id !== id);
    setAllowedDoctors(updatedAllowedDoctors);
  };

  return (
    <div>
        <NavbarCompPatient/>
    <div className="container my-4">
      <h1 className="text-center">Manage Access Requests</h1>
      {allowedDoctors.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Doctor Name</th>
              <th>Doctor Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allowedDoctors.map((doctor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveAccess(doctor.id)}>
                    Remove Access
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No doctors have access at the moment.</p>
      )}
      </div>
    </div>
  );
};

export default ManageRequest;
