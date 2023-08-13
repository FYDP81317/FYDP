import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { verifier } from "../blockchain/verification_instance"
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavbarCompDoctor from "./NavbarCompDoctor";
import { IoMdArrowBack } from "react-icons/io";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

const AddRecord = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [values, setValues] = useState({
    diagnosis: "",
    medication: "",
    remarks: "",
    date: new Date(),
    patientemail: params?.id,
    doctoremail: userEmail,
  });
  const [encrptedData, setEncrptedData] = useState("");
  const [originalData, setOriginalData] = useState("");

  const generateRandomKey = () => {
    const keyLength = 32;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomKey = "";

    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomKey += charset[randomIndex];
    }
    return randomKey;
  };

  const [secretKey, setSecretKey] = useState(generateRandomKey());
  const loggedInDoctorName = "Dr. John Smith";

  const currentDate = new Date();

  const [recordData, setRecordData] = useState({
    date: "",
    doctor: loggedInDoctorName,
    diagnosis: "",
    medication: "",
    remarks: "",
  });

  const addRecordsDataCollectionRef = collection(db, "medicalrecords");

  const handleAddNewMedicalRecord = async (e) => {
    e?.preventDefault();
    if (
      values.diagnosis &&
      values.medication &&
      values.remarks &&
      userEmail &&
      secretKey &&
      values?.date &&
      values?.patientemail
    ) {
      try {
        // encryption of data
        const cipherData = CryptoJS.AES.encrypt(
          JSON.stringify(values),
          secretKey
        ).toString();
        setEncrptedData(cipherData);

        // decryption of data
        let bytes = CryptoJS.AES.decrypt(cipherData, secretKey);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        setOriginalData(JSON.parse(originalText));
       // console.log(originalText)
        
        let eachRecordNewArray = [userEmail, values.diagnosis, values.medication, values.remarks]
        //console.log()
        await verifier
        .uploadHash(eachRecordNewArray, "0xc4323611FdD306e4E4A922D1700aAeb8e824651C");
       // console.log(originalText)

        //  send data to firebase encrypted and decrypted
        await addDoc(addRecordsDataCollectionRef, {
          encrptedData: cipherData,
          decryptData: JSON.parse(originalText),
        });
       
        toast.success("Medical record for this user is saved successfully!");
      } catch (error) {
        console.log(error)
        toast.error("Error adding medical record for this user:", error);
      }
    } else {
      toast.error("Fill all fields!");
    }
  };

  return (
    <div>
      <NavbarCompDoctor />
      <div className="container mt-4 mb-4">
        <div className="d-flex align-items-center gap-3">
          <IoMdArrowBack
            style={{
              height: "36px",
              width: "36px",
              backgrounColor: "#fafafa",
              cursor: "pointer",
            }}
            className="border border-secondary rounded-3 px-2 py-2"
            onClick={() => navigate(-1)}
          />
          <h3 className="mt-2">Add New Medical Record</h3>
        </div>

        <Form onSubmit={handleAddNewMedicalRecord}>
          <Form.Group className="mb-4 mt-4">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              disabled={"true"}
              name="date"
              value={currentDate}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Doctor Email</Form.Label>
            <Form.Control
              type="text"
              disabled={"true"}
              name="doctor"
              value={userEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              name="diagnosis"
              onChange={(e) => {
                setValues((prevState) => ({
                  ...prevState,
                  diagnosis: e.target.value,
                }));
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Medication</Form.Label>
            <Form.Control
              type="text"
              name="medication"
              onChange={(e) => {
                setValues((prevState) => ({
                  ...prevState,
                  medication: e.target.value,
                }));
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="remarks"
              onChange={(e) => {
                setValues((prevState) => ({
                  ...prevState,
                  remarks: e.target.value,
                }));
              }}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddRecord;
