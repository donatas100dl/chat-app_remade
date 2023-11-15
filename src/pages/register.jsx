import React from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-main">
        <h1>Register</h1>
        <form>
          <div className="login-email">
            <span>Email</span>
            <input
              type="text"
              placeholder="enter your email"
              name="email"
            />
            {/* <p className={isSuccess ? "d-none" : "invalid"}>Invalid Email</p> */}
          </div>
          <div className="login-password">
            <span>Password</span>
            <input
              type="password"
              placeholder="enter your password"
              name="password"
            />
            {/* <p className={isSuccess ? "d-none" : "invalid"}>Invalid Password</p> */}
          </div>
          <button>Login</button>
        </form>
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <div className="login-options">
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
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
