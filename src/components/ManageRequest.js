import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import NavbarCompPatient from "./NavbarCompPatient";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  // Sample data for allowed doctors (You can fetch this from your database)
  // const [allowedDoctors, setAllowedDoctors] = useState([
  //   { id: 1, name: "Dr. Ghaniya", email: "dr.ghaniya@gamil.com" },
  //   { id: 2, name: "Dr. Tuba", email: "dr.tuba@gmail.com" },
  // ]);

  const userEmail = localStorage.getItem("userEmail");

  const handleRemoveAccess = async (id) => {
    try {
      const reqAccDoc = doc(db, "requestaccess", id);
      await deleteDoc(reqAccDoc);
      toast.success("Request Rejected Successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error occured rejecting request access!");
    }
  };

  const reqAccessDataCollectionRef = collection(db, "requestaccess");

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
        <h1 className="text-center">Manage Access Requests</h1>
        {requests.length > 0 ? (
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
              {requests.map((item, index) =>
                userEmail === item?.patientemail ? (
                  <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.doctorname}</td>
                    <td>{item.doctoremail}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveAccess(item.id)}
                      >
                        Remove Access
                      </Button>
                    </td>
                  </tr>
                ) : null
              )}
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
