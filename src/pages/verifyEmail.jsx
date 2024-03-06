import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/verifyEmail.css";
import { useAuth } from "../uttils/authContext";
import EmailValidator  from "email-validator"
export default function VerifyEmail() {
  const navigate = useNavigate();
  const { handleEmailVerification } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EmailValidator.validate(email)) {
      alert("Invalid email");
      return;
    } else {
        handleEmailVerification(email)
    }
  };

  return (
    <div className="verifyEmail-wrapper">
      <div className="verifyEmail-main">
        <h1>Verify email</h1>
        <form>
            <div className="verify-email">
              <span className="text">
                {`Please enter your email`}
              </span>
              <section>
                <div className="input">
                  <input
                    type="email"
                    placeholder="enter email"
                    name="verifyEmail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p>
                  Did not get email press <span>here</span>
                </p>
              </section>

              {/* <p className={isSuccess? "d-none" : "invalid"}>Invalid Email</p> */}
            </div>
            <button onClick={handleSubmit}>send email</button>
          </form>
      </div>
    </div>
  );
}
