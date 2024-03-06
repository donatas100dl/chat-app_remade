import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import AvatarSelector from "../components/avatar_selcet";
import { useAuth } from "../uttils/authContext";
export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [avatarPath, setAvatarPath] = useState("profile_placeholder_2.jpg"); //default avatar
  const [avatarSelection, setAvatarSelection] = useState(false);
  const { isEmailTaken, handleRegister, isUsernameTaken } = useAuth();
  const [isSuccess, setSuccess] = useState({
    email: true,
    password: true,
    confirmPassword: true,
    username: true,
    verifyEmail: true,
    emailFormat: true,
  });
  const [user, setUsers] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    avatar: avatarPath,
    verifyEmail: "",
  });

  useEffect(() => {
    console.log("isSuccess", isSuccess)
    console.log("user", user)
    console.log("avatar ", avatarPath)
  }, [isSuccess, avatarPath, user]);

  const nextStep = async (e) => {
    e.preventDefault();
    setSuccess((prevSuccess) => {
      console.log("Previous state:", prevSuccess);
      return {
        ...prevSuccess,
        email: true,
        password: true,
        confirmPassword: true,
        username: true,
        verifyEmail: true,
        emailFormat: true,
      };
    });
    switch (step) {
      case 1:
        if (user.email === "" || !user.email.includes("@") || !user.email.split("@")[1].includes(".")) {
          setSuccess((prevSuccess) => ({ ...prevSuccess, emailFormat: false }));
          return;
        }
        if ((await isEmailTaken(user.email))) {
          setSuccess((prevSuccess) => ({ ...prevSuccess, email: false }));
          return;
        }
        if (user.password.length < 8) {
          setSuccess((prevSuccess) => ({ ...prevSuccess, password: false }));
          return;
        }
        if (
          user.confirmPassword !== user.password &&
          user.confirmPassword !== ""
        ) {
          setSuccess((prevSuccess) => ({
            ...prevSuccess,
            confirmPassword: false,
          }));
          return;
        }
        setStep(step + 1);
        return;
      case 2:
        if ((await isUsernameTaken(user.username)) || user.username.length < 4) {
          setSuccess((prevSuccess) => ({ ...prevSuccess, username: false }));
          return;
        }
        setUsers((prevUser) => ({ ...prevUser, avatar:avatarPath }));
        setStep(step + 1);
        return;
      case 3:
        console.log(user)
        if (user.verifyEmail !== user.email || user.verifyPassword === "") {
          console.error("failed to verify email")
          setSuccess((prevSuccess) => ({ ...prevSuccess, verifyEmail: false }));
          return;
        }
        if(user.username !== "" && user.password !== "" && user.email !== ""){
          handleRegister(user)
        }
        return;
      default:
        return;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name + "   " + e.target.value )
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

  const handleToggle = (imgPath) => {
    setAvatarSelection(!avatarSelection);
    console.log(imgPath, "imgPath");
    if (typeof imgPath === "string") {
      const parts = imgPath.split("assets/");
      setAvatarPath(parts[1]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form>
            <div className="register-email">
              <span>Email</span>
              <div className="input">
                <input
                  type="email"
                  placeholder="enter your email"
                  name="email"
                  onChange={handleChange}
                />
                <span id="error" className={isSuccess.email ? "d-none" : ""}>
                  Email already exist
                </span>
                <span id="error" className={isSuccess.emailFormat ? "d-none" : ""}>
                  Please enter a valid email
                </span>
              </div>
            </div>
            <div className="register-password">
              <span>Password</span>
              <div className="input">
                <input
                  type="password"
                  placeholder="enter your password"
                  name="password"
                  onChange={handleChange}
                />
                <span id="error" className={isSuccess.password ? "d-none" : ""}>
                  Passwords must be 8 characters long
                </span>
              </div>
            </div>
            <div className="confirm-password">
              <span>Confirm Password</span>
              <div className="input">
                <input
                  type="password"
                  placeholder="renter your password"
                  name="confirmPassword"
                  onChange={handleChange}
                />
                <span
                  id="error"
                  className={isSuccess.confirmPassword ? "d-none" : ""}
                >
                  Emails do not match
                </span>
              </div>
            </div>
            <button onClick={(e) => nextStep(e, 1)}>Next Step</button>
          </form>
        );
      case 2:
        return (
          <form>
            <div className="register-profile" onClick={handleToggle}>
              <img
                src={require(`../assets/${avatarPath}`)}
                alt="choose profile image"
              />
              <span className="text">SELECT AVATAR</span>
            </div>
            {avatarSelection ? (
              <AvatarSelector handleClose={handleToggle} />
            ) : null}

            <div className="register-email">
              <span>Username</span>
              <div className="input">
                <input
                  type="text"
                  placeholder="enter your username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
                <span id="error" className={isSuccess.username ? "d-none" : ""}>
                  Username is already in use
                </span>
              </div>

              {/* <p className={isSuccess ? "d-none" : "invalid"}>Invalid Email</p> */}
            </div>
            <button onClick={(e) => nextStep(e)}>Next Step</button>
          </form>
        );
      case 3:
        return (
          <form>
            <div className="verify-email">
              <span className="text">
                {`Renter email: ${user.email.replace(/(?<=.{4})[^@](?=.*@)/g, '*')}`}
                {}
              </span>
              <section>
                <div className="input">
                  <input
                    type="email"
                    placeholder="confirm your email"
                    name="verifyEmail"
                    onChange={handleChange}
                  />
                  <span
                    id="error"
                    className={isSuccess.verifyEmail ? "d-none" : ""}
                  >
                    Emails do not match
                  </span>
                </div>
                <p>
                  Did not get email press <span>here</span>
                </p>
              </section>

              {/* <p className={isSuccess? "d-none" : "invalid"}>Invalid Email</p> */}
            </div>
            <button onClick={(e) => nextStep(e)}>Verify</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-main">
        <h1>Register</h1>
        <section>
          <div className=" current step next">1</div>
          <div className={step >= 2 ? "current step next" : "step"}>2</div>
          <div className={step >= 3 ? "current step next" : "step"}>3</div>
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
