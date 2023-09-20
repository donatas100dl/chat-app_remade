import "../css/navbar.css";
import Logo from "./logo.js";
import logOut from "../assets/logout.svg";
import { useAuth } from "../uttils/authContext";
function Navbar() {
  const {handleUserLogout} = useAuth();
  return (
    <div className="navbar">
      <Logo className="navbar-logo" />
      <div className="navbar-help" onClick={ (e) => handleUserLogout(e)}>
        <img src={logOut} alt="help icon" />
      </div>
    </div>
  );
}

export default Navbar;
