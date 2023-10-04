import "../css/login.css";
import { ID } from "appwrite";
import axios from "axios";
import {
  databases,
  DATABASE_ID,
  COLECTION_ID_MESSAGES,
} from "../appWriteConfig.js";
import { useEffect, useState } from "react";
import { useAuth } from "../uttils/authContext";
import { useNavigate } from "react-router-dom";
function Login() {
const [loginInfo, setLoginInfo] = useState({
  email: "",
  password: "",
})
const {user, handleLogin} = useAuth();
const navigate = useNavigate();

useEffect( () => {
  if(user){
    navigate("/")
  }
},[])

const handleOnchange = (e) => {
  const data = e.target.value
  const name = e.target.name
  setLoginInfo({...loginInfo, [name]:data} )
}

  return (
    <div className="login-wrapper">
      <div className="login-main">
        <h1>Login</h1>
        <form onSubmit={(e) => handleLogin(e, loginInfo)}>
          <div className="login-email">
            <span>Email</span>
            <input type="text" placeholder="enter your email" name="email" onChange={handleOnchange} />
          </div>
          <div className="login-password">
            <span>Password</span>
            <input type="password" placeholder="enter your password" name="password" onChange={handleOnchange}/>
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
