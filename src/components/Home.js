import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat, faShieldAlt, faLock } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header-section text-center py-5" style={{ backgroundColor: "#212529", color: "white" }}>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1 className="display-3">MedBlock</h1>
        <p className="lead">Securing Medical Records on the Blockchain</p>
        <Link to="/Signup" className="btn btn-primary btn-lg">
          Get Started
        </Link>
      </div>
    </div>
  </div>
</header>


      {/* About Us */}
      <section className="about-us-section py-5">
        <div className="container text-center">
          <h2>About Us</h2>
          <br/>
          <p>
          MedBlock is a pioneering blockchain-based Electronic Medical Records (EMR) platform that revolutionizes medical data storage and access. By leveraging blockchain technology, MedBlock ensures secure, transparent, and decentralized storage of patient records, empowering patients to control their data while enabling healthcare providers to access comprehensive patient histories for accurate diagnoses and personalized treatments. With a focus on trust, security, and innovation, MedBlock is reshaping the future of medical record-keeping and advancing the healthcare industry.
          </p>
        </div>
        <div className="container d-flex justify-content-center mt-5">
          <div className="icon-box me-4 ">
            <FontAwesomeIcon icon={faHeartbeat} className="icon" size="3x" />
            <h4>Healthcare</h4>
            <p>Providing top-notch healthcare services.</p>
          </div>
          <div className="icon-box me-4">
            <FontAwesomeIcon icon={faShieldAlt} className="icon" size="3x"/>
            <h4>Security</h4>
            <p>Highly secure and encrypted medical records.</p>
          </div>
          <div className="icon-box">
            <FontAwesomeIcon icon={faLock} className="icon" size="3x"/>
            <h4>Privacy</h4>
            <p>Ensuring patient data privacy and confidentiality.</p>
          </div>
          <br/>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-5 text-center" style={{ backgroundColor: "#212529", color: "white" }}>
        <p>&copy; 2023 MedBlock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
