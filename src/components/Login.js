import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { Form, Button } from "react-bootstrap";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const rolesCollectionRef = collection(db, "roles");

  localStorage.setItem("userEmail", values.email);

  const getRolesOfUsers = async () => {
    const data = await getDocs(rolesCollectionRef);
    const requests = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const matchingRequest = requests.find((request) => {
      if (request.useremail === values?.email) {
        if (request.role === "patient") {
          navigate("/view-request");
        } else if (request.role === "doctor") {
          navigate("/doctor-page");
        }
        return true;
      }
      return false;
    });
  };

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    getRolesOfUsers();
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        setTimeout(() => {
          toast.success("Login Successfully!");
        }, 200);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <>
      <header className="bg-dark text-white text-center py-5">
        <h1>MedBlock</h1>
        <p>Securing Medical Records on the Blockchain</p>
      </header>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Login</h2>
            <Form>
              <InputControl
                type="email"
                label="Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Enter email address"
              />

              <InputControl
                type="password"
                label="Password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
                placeholder="Enter Password"
              />

              <div className="text-center mt-3">
                <div className="text-danger">{errorMsg}</div>
              </div>

              <div className="text-center mt-3">
                <br />
                <Button
                  disabled={submitButtonDisabled}
                  onClick={handleSubmission}
                  size="lg"
                >
                  Login
                </Button>
                <p className="mt-2">
                  Don't have an account?
                  <span>
                    <Link to="/">Sign up</Link>
                  </span>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-5">
        <p>&copy; 2023 MedBlock. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Login;
