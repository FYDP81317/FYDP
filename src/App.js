import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DoctorPage from "./components/DoctorPage";
import PatientPage from "./components/PatientPage";
import Basicinfo from "./components/Basicinfo";
import MedicalRecordRequests from "./components/ViewRequest";
import ManageRequest from "./components/ManageRequest";
import RequestAccess from "./components/RequestAccess";
import ViewRecord from "./components/ViewRecord";
import AddRecord from "./components/AddRecord";
import { Toaster } from "react-hot-toast";

import { auth } from "./firebase";

import "./App.css";
import UserType from "./components/UserType";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/doctor-page" element={<DoctorPage />} />
          <Route path="/patient-profile/:id" element={<PatientPage />} />
          <Route path="/view-request" element={<MedicalRecordRequests />} />
          <Route path="/manage-request" element={<ManageRequest />} />
          <Route path="/request-access" element={<RequestAccess />} />
          <Route path="/view-record/:id" element={<ViewRecord />} />
          <Route path="/user-type" element={<UserType />} />
          <Route path="/basic-info" element={<Basicinfo />} />
          <Route path="/add-record/:id" element={<AddRecord />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
