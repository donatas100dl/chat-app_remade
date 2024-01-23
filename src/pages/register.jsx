import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const renderStep = () => {
    console.log("step " + step )
    switch (step) {
      case 1:
        return (
          <form>
          <div className="register-email">
            <span>Email</span>
            <input
              type="text"
              placeholder="enter your email"
              name="email"
            />
            {/* <p className={isSuccess ? "d-none" : "invalid"}>Invalid Email</p> */}
          </div>
          <div className="register-password">
            <span>Password</span>
            <input
              type="password"
              placeholder="enter your password"
              name="password"
            />
            {/* <p className={isSuccess ? "d-none" : "invalid"}>Invalid Password</p> */}
          </div>
          <button onClick={(e) => nextStep(e)}>Next Step</button>
        </form>

        )
      case 2:
        return (
          <form>
          <div className="register-profile">
            <img src={require("../assets/profile_placeholder_2.jpg")} alt="choose profile image" />
            <span className="text">SELECT AVATAR</span>
          </div>
          <div className="register-email">
            <span>Username</span>
            <input
              type="text"
              placeholder="enter your username"
              name="email"
            />
            {/* <p className={isSuccess ? "d-none" : "invalid"}>Invalid Email</p> */}
          </div>
          <button onClick={(e) => nextStep(e)}>Next Step</button>
        </form>
        )
      case 3:
        return (
          <form>
          <div className="verify-email">
            <span className="text">{"Renter email: emai*****@gmail.com"}</span>
            <section>
            <input
              type="text"
              placeholder="enter email"
              name="email"
            />
            <p>Did not get email press <span>here</span></p>
            </section>

            {/* <p className={isSuccess? "d-none" : "invalid"}>Invalid Email</p> */}
          </div>
          <button onClick={ () => setStep(1)}>Verify</button>
        </form>
        )
      default:
        return null;
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-main">
      <h1>Register</h1>
        <section>
          <div className=" current step next">1</div>
          <div className={step >= 2 ? "current step next" : "step"} >2</div>
          <div className={step >= 3 ? "current step next" : "step"} >3</div>
        </section>

        {renderStep()}
        <footer>
        <div className="register-options">
          <div className="google">
            <img src={require("../assets/google.png")} />
          </div>
          <div className="facebook">
            <img src={require("../assets/facebook.png")} />
          </div>
          <div className="instagram">
            <img src={require("../assets/instagram.png")} />
          </div>
        </div>
        <p className="nav-register">
          Already a user?{" "}
          <span id="navigate" onClick={() => navigate("/user/login")}>
            login
          </span>
        </p>
        </footer>

      </div>
    </div>
  );
}