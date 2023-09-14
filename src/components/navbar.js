import "../css/navbar.css"
import Logo from "./logo.js";
import helpSvg from "../assets/help.svg"
function navbar() {
    return (
      <div className="navbar">
        <Logo className="navbar-logo"/>
        <div className="navbar-help"> 
        <img src={helpSvg} alt="help icon"/>
      </div>
      </div>
    );
  }
  
  export default navbar;
  