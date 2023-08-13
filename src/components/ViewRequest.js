import React, { useEffect, useState } from "react";
import MedicalRecordRequestsTable from "./MedicalRecordRequestsTable";
import NavbarCompPatient from "./NavbarCompPatient";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Table } from "react-bootstrap";

const ViewRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const reqAccessDataCollectionRef = collection(db, "requestaccess");

  const userEmail = localStorage.getItem("userEmail");

  const handleAccept = async (id) => {
    // Handle accepting the request and update the state accordingly
    try {
      const reqAccDoc = doc(db, "requestaccess", id);
      const updatedRequestAccess = { reqaccepted: true };
      await updateDoc(reqAccDoc, updatedRequestAccess);
      toast.success("Request Granted Successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error occured accepting request access!");
    }
  };

  const handleReject = async (id) => {
    // Handle rejecting the request and update the state accordingly
    try {
      const reqAccDoc = doc(db, "requestaccess", id);
      await deleteDoc(reqAccDoc);
      toast.success("Request Rejected Successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error occured rejecting request access!");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const data = await getDocs(reqAccessDataCollectionRef);
      setRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getUsers();
  }, []);

  return (
    <div>
      <NavbarCompPatient />
      <div className="container my-4">
        <br />
        <h2 className="text-center">Available Requests</h2>
        <br />
        {requests.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Unique Id.</th>
                <th>Doctor Name</th>
                <th>Doctor Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) =>
                userEmail === request?.patientemail ? (
                  <tr key={index}>
                    <td>{request?.id}</td>
                    <td>
                      {userEmail === request?.patientemail
                        ? request?.doctorname
                        : null}
                    </td>
                    <td>{request.doctoremail}</td>
                    <td className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => handleAccept(request?.id)}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => handleReject(request?.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No requests at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ViewRequest;
