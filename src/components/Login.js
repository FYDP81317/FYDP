import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from "./InputControl";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { Form, Button } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
    role: "patient", // Set the default role to "patient"
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        setTimeout(() => {
          toast.success("Login Successfully!");
        }, 200);

        if (values.role === "doctor") {
          // If role is "doctor", navigate to the doctor main page
          navigate("/DoctorPage");
        } else if (values.role === "patient") {
          // If role is "patient", navigate to the patient main page
          navigate("/PatientPage");
        } else {
          // If role is neither "doctor" nor "patient", navigate to the default main page
          navigate("/");
        }
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

              {/* Role selection */}
              <div className="d-flex justify-content-center mt-3 gap-3">
                <p className="mt-2 me-3">Choose your role:</p>
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
                  Don't have an account?{" "}
                  <span>
                    <Link to="/signup">Sign up</Link>
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
