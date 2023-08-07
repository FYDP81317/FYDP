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
          <Route path="/signup" element={<Signup />} />
          <Route path="/DoctorPage" element={<DoctorPage />} />
          <Route path="/PatientPage" element={<PatientPage />} />
          <Route path="/ViewRequest" element={<MedicalRecordRequests />} />
          <Route path="/ManageRequest" element={<ManageRequest />} />
          <Route path="/RequestAccess" element={<RequestAccess />} />
          <Route path="/ViewRecord" element={<ViewRecord />} />
          <Route path="/Basicinfo" element={<Basicinfo />} />
          <Route path="/AddRecord" element={<AddRecord />} />

          <Route path="/" element={<Home name={userName} />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
