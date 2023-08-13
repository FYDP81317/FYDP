import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { verifier } from "../blockchain/verification_instance"
import NavbarCompPatient from "./NavbarCompPatient";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import { Form, Button } from "react-bootstrap";

const PatientPage = () => {
  const [patientData, setPatientData] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingMedical, setLoadingMedicalRecord] = useState(false);
  const [decryptData, setDecryptData] = useState("");
  // const medicalHistory = [
  //   {
  //     date: "2023-07-30",
  //     prescribe_by: "dr. tuba",
  //     diagnosis: "Fever",
  //     medication: "Paracetamol",
  //     remarks: "Rest for two days",
  //   },
  //   {
  //     date: "2023-07-25",
  //     prescribe_by: "dr. tuba",
  //     diagnosis: "Headache",
  //     medication: "Ibuprofen",
  //     remarks: "Drink plenty of water",
  //   },
    // Add more medical history records here...
  // ];

  // const patientData = {
  //   fullName: "John Doe",
  //   age: 30,
  //   gender: "Male",
  //   height: 175,
  //   weight: 70,
  //   address: "123 Main Street",
  //   contact: "123-456-7890",
  //   bloodType: "A+",
  //   allergy: "Pollen",
  // };
  // get original decrypt data from firebase
  useEffect(() => {
    const fetchMedicalRecordData = async () => {
      try {
        setLoadingMedicalRecord(true);
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
          setLoadingMedicalRecord(false);
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

  const patientDataCollectionRef = collection(db, "patientsdata");

  useEffect(() => {
    const getPatientsData = async () => {
      setLoading(true);
      const data = await getDocs(patientDataCollectionRef);
      const filteredData = data.docs
        .filter((doc) => doc.data().useremail === userEmail)
        .map((doc) => ({ ...doc.data(), id: doc.id }));
      setPatientData(filteredData);
    };
    getPatientsData();
    setLoading(false);
  }, [userEmail]);

  const handleVerify = async (doctoremail, diagnosis, medication, remarks) => {
  
    let eachRecordNewArray = [doctoremail, diagnosis, medication, remarks]
   // console.log(eachRecordNewArray);
  await verifier
    .verifyHash(eachRecordNewArray);  
  };



  return (
    <div>
      <NavbarCompPatient />
      <div className="container mt-4">
        <h1>Patient Profile</h1>
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td>
                <strong>Full Name</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.name
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Age</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.age
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.gender
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Height (cm)</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.height
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Weight (kg)</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.weight
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>House Address</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.address
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Contact Number</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.contact
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Blood Type</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.bloodtype
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Allergy</strong>
              </td>
              <td>
                {!patientData ? (
                  <ClipLoader
                    loading={loading}
                    color={"#0B5ED7"}
                    size={"12px"}
                  />
                ) : (
                  patientData[0]?.allergy
                )}
              </td>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            {decryptData ? (
            decryptData.map((item) => (
                <tr key={item?.id}>
                  {/* {console.log('item data ===>', item)} */}
                  <td>{item?.date}</td>
                  <td>{item?.doctoremail}</td>
                  <td>{item?.diagnosis}</td>
                  <td>{item?.medication}</td>
                  <td>{item?.remarks}</td>
                  <td>
                  <Button
                    variant="primary"
                     onClick={() => handleVerify(item?.doctoremail, item?.diagnosis, item?.medication, item?.remarks)} // Pass the itemId to the handleVerify function
                  >
                    Verify
                  </Button>
                </td>
                </tr>
              ))
            ) : (
              <p className="fs-4">No Medical History Found For This User..!</p>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PatientPage;
