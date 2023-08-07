import React, { useState } from "react";
import MedicalRecordRequestsTable from "./MedicalRecordRequestsTable";
import NavbarCompPatient from "./NavbarCompPatient";

const ViewRequest = () => {
  const [requests, setRequests] = useState([
    { doctorName: "Dr. Ghaniya", doctorEmail: "dr.ghaniya@gamil.com" },
    { doctorName: "Dr. Tuba", doctorEmail: "dr.tuba@gmail.com" },
    // Add more requests here...
  ]);

  const handleAccept = (index) => {
    // Handle accepting the request and update the state accordingly
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  const handleReject = (index) => {
    // Handle rejecting the request and update the state accordingly
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  return (
    <div>
      <NavbarCompPatient />
      <div className="container my-4">
        <br />
        <h2 className="text-center">Available Requests</h2>
        <br />
        {requests.length > 0 ? (
          <MedicalRecordRequestsTable
            requests={requests}
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        ) : (
          <p className="text-center">No requests at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ViewRequest;
