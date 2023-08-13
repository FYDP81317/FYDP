import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserType = () => {
  const navigate = useNavigate();
  const rolesDataCollectionRef = collection(db, "roles");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    role: "",
  });
  //   console.log(values.role);
  const userEmail = localStorage.getItem("userEmail");

  const rolesCollectionRef = collection(db, "roles");

  const handleAddRoleSelection = async (userRole) => {
    try {
      await addDoc(rolesCollectionRef, {
        role: userRole,
        useremail: userEmail,
      });
      toast.success(`Your role is set to: ${userRole}`);
    } catch (error) {
      toast.error("Error setting your role: ", error);
    }
  };

  const handleDoctorRole = () => {
    setValues({ role: "doctor" });
    localStorage.setItem("userType", "doctor");
    handleAddRoleSelection(localStorage.getItem("userType"));
    navigate("/login");
  };
  const handlePatientRole = () => {
    setValues({ role: "patient" });
    localStorage.setItem("userType", "patient");
    handleAddRoleSelection(localStorage.getItem("userType"));
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mt-3 gap-3">
        <p className="mt-2 me-3">Choose your role:</p>
        <button
          variant={values.role === "doctor" ? "primary" : "outline-primary"}
          onClick={handleDoctorRole}
        >
          Doctor
        </button>
        <button
          variant={values.role === "patient" ? "primary" : "outline-primary"}
          onClick={handlePatientRole}
        >
          Patient
        </button>
      </div>
    </React.Fragment>
  );
};

export default UserType;
