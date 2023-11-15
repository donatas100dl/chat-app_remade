import "../css/logo.css"
function logo() {
    return (
      <div className="logo">
            <img src={require("../assets/logo.png")} alt="logo"/>
            <h1>B<span>u</span>z<span>z</span></h1>
      </div>

    );
  }
  
  export default logo;
  