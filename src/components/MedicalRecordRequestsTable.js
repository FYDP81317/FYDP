import React from 'react';
import { Table, Button } from 'react-bootstrap';

const MedicalRecordRequestsTable = ({ requests, handleAccept, handleReject }) => {
  return (
    
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
        {requests.map((request, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{request.doctorName}</td>
            <td>{request.doctorEmail}</td>
            <td>
              <Button variant="success" onClick={() => handleAccept(index)}>
                Accept
              </Button>{' '}
              <Button variant="danger" onClick={() => handleReject(index)}>
                Reject
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MedicalRecordRequestsTable;
