import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavbarCompDoctor from "./NavbarCompDoctor";
import { db } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

const DoctorPage = () => {
  const navigate = useNavigate();
  const [requestAccepted, setRequestAccepted] = useState([]);
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const getUsersAccepted = async () => {
      setLoading(true);
      try {
        const reqAccessDataCollectionRef = collection(db, "requestaccess");
        const querySnapshot = await getDocs(reqAccessDataCollectionRef);
        const filteredData = querySnapshot.docs
          .filter(
            (doc) =>
              doc.data().reqaccepted === true &&
              doc.data().doctoremail === userEmail
          )
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setRequestAccepted(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getUsersAccepted();
  }, []);

  const createNameFromEmail = (patientEmail) => {
    const atIndex = patientEmail.indexOf("@");
    if (atIndex !== -1) {
      return patientEmail.substring(0, atIndex);
    } else {
      return patientEmail;
    }
  };
  const createDoctorNameFromEmail = (doctorEmail) => {
    const atIndex = doctorEmail.indexOf("@");
    if (atIndex !== -1) {
      return doctorEmail.substring(0, atIndex);
    } else {
      return doctorEmail;
    }
  };

  // const patientList = [
  //   {
  //     id: 1,
  //     fullName: "John Doe",
  //     email: "john@gmail.com",
  //     contact: "123-456-7890",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Jane Smith",
  //     email: "jane@gmail.com",
  //     contact: "987-654-3210",
  //   },
  //   // Add more patients here...
  // ];

  // Replace this with the actual doctor name fetched from the database
  // const doctorName = "John Smith";

  return (
    <div>
      <NavbarCompDoctor />
      <div className="container mt-4">
        <div className="text-center">
          <h1>Welcome Dr. {createDoctorNameFromEmail(userEmail)}</h1>
        </div>
        <br />
        <h2>Patients with Access</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Patient UserName</th>
              <th>Patient Email</th>
              <th>Access Status</th>
            </tr>
          </thead>
          {loading ? (
            <ClipLoader loading={loading} color={"#0B5ED7"} />
          ) : (
            <tbody>
              {requestAccepted.map((patient, index) => (
                <tr key={patient?.id}>
                  <td>{patient?.id}</td>
                  <td>
                    {/* Use Link component to navigate to ViewRecord page with patient ID */}
                    <p
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/view-record/${patient?.patientemail}`)
                      }
                    >
                      {createNameFromEmail(patient?.patientemail)}
                    </p>
                  </td>
                  <td>{patient?.patientemail}</td>
                  <td>
                    <p
                      className={`${
                        patient?.reqaccepted === true
                          ? "badge rounded-pill bg-success"
                          : "bg-white"
                      }`}
                    >
                      {patient?.reqaccepted === true
                        ? "Have Access"
                        : "No Access"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default DoctorPage;
