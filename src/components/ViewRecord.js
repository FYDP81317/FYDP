import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import NavbarCompDoctor from "./NavbarCompDoctor";
import { useParams } from "react-router-dom";
import { getDocById } from "../utils/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

const ViewRecord = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [decryptData, setDecryptData] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  // get original decrypt data from firebase
  useEffect(() => {
    const fetchMedicalRecordData = async () => {
      try {
        setLoading(true);
        const medicalDataCollectionRef = collection(db, "medicalrecords");
        const q = query(medicalDataCollectionRef);

        const querySnapshot = await getDocs(q);

        const matchingDocuments = querySnapshot.docs.reduce((result, doc) => {
          const userData = doc.data();
          if (
            userData.decryptData &&
            userData.decryptData.patientemail === params?.id
          ) {
            result.push(userData.decryptData);
          }
          return result;
        }, []);

        if (matchingDocuments.length > 0) {
          setLoading(false);
          setDecryptData(matchingDocuments);
        } else {
          console.error("No matching users found!");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the documents.");
      }
    };
    fetchMedicalRecordData();
  }, [params]);

  // get original decrypt data from firebase endss here

  // getting user data by email in params
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const patientsDataCollectionRef = collection(db, "patientsdata");
        const q = query(
          patientsDataCollectionRef,
          where("useremail", "==", params?.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setLoading(false);
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        } else {
          toast.error("User not found!");
        }
      } catch (error) {
        toast.error("Document Doesn't Exixts!");
      }
    };

    fetchUserData();
  }, [params]);

  return (
    <div>
      <NavbarCompDoctor />
      <div className="container mt-4">
        <h1>Patient Profile</h1>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td>
                <strong>Full Name</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.name
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Age</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.age
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.gender
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Height (cm)</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.height
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Weight (kg)</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.weight
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>House Address</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.address
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Contact Number</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.contact
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Blood Type</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.bloodtype
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Allergy</strong>
              </td>
              <td>
                {!userData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  userData?.allergy
                )}
              </td>
            </tr>
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center">
          <h1>Medical History</h1>
          {/* Button to redirect to "Add Record" page */}
          <Link to={`/add-record/${params?.id}`} className="btn btn-primary">
            <BsPlusCircle className="me-2" /> Add New Record
          </Link>
        </div>

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
            {decryptData ? (
              decryptData?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.date}</td>
                  <td>{item?.doctoremail}</td>
                  <td>{item?.diagnosis}</td>
                  <td>{item?.medication}</td>
                  <td>{item?.remarks}</td>
                </tr>
              ))
            ) : (
              <p>No Medical Record For This User..!</p>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewRecord;
