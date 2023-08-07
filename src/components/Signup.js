import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { Form, Button } from "react-bootstrap";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    role: "patient", // Default role set to "patient"
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        setTimeout(() => {
          toast.success("User Created Successfully!");
        }, 200);

        // Redirect to the respective role page based on the selected role
        navigate(values.role === "doctor" ? "/DoctorPage" : "/PatientPage");
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
            <h2 className="text-center">Signup</h2>
            <Form>
              <InputControl
                type="text"
                label="Name"
                placeholder="Enter your name"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              <InputControl
                type="email"
                label="Email"
                placeholder="Enter email address"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
              <InputControl
                type="password"
                label="Password"
                placeholder="Enter password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />

              {/* Role selection */}
              <div className="d-flex justify-content-center mt-3 gap-3">
                <p className="me-3">Choose your role:</p>
                <Button
                  variant={
                    values.role === "doctor" ? "primary" : "outline-primary"
                  }
                  onClick={() =>
                    setValues((prev) => ({ ...prev, role: "doctor" }))
                  }
                >
                  Doctor
                </Button>
                <Button
                  variant={
                    values.role === "patient" ? "primary" : "outline-primary"
                  }
                  onClick={() =>
                    setValues((prev) => ({ ...prev, role: "patient" }))
                  }
                >
                  Patient
                </Button>
              </div>

              <div className="text-center mt-3">
                <b className="text-danger">{errorMsg}</b>
                <Button
                  onClick={handleSubmission}
                  disabled={submitButtonDisabled}
                >
                  Signup
                </Button>
                <p className="mt-2">
                  Already have an account?{" "}
                  <span>
                    <Link to="/login">Login</Link>
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

export default Signup;
