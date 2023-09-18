import "../css/login.css";
// import { ID } from "appwrite";
// import {
//   databases,
//   DATABASE_ID,
//   COLECTION_ID_MESSAGES,
// } from "../appWriteConfig.js";
// import { useEffect, useState } from "react";
function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-main">
        <h1>Login</h1>
        <form>
          <div className="login-email">
            <span>Email</span>
            <input type="text" placeholder="enter your email" />
          </div>
          <div className="login-password">
            <span>Password</span>
            <input type="password" placeholder="enter your password" />
          </div>
          <button>Login</button>
        </form>
            <a href="#" className="forgot-password">Forgot Password?</a>
            <div className="login-options">
                <div className="google">
                    <img src={require("../assets/google.png")}/>
                </div>
                <div className="facebook">
                <img src={require("../assets/facebook.png")}/>
                </div>
                <div className="instagram">
                <img src={require("../assets/instagram.png")}/>
                </div>
            </div>
            <p>Already a user? <a href="#">LOGIN</a></p>
      </div>
    </div>
  );
}

export default Login;
