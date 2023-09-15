import "../css/message.css"
function message({message, isYours}) {
    return (
      <div className="message-container ">
        <div className={isYours ? "message your-message shadow" : "message shadow"}>
        <span>{message ? message : "no text"}</span>
        {/* <p>02:10PM</p> */}
        </div>
      </div>

    );
  }
  
  export default message;
  