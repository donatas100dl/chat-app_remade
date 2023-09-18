import "../css/message.css";
function Message_comp({ message, isYours }) {

  return (
    <div className="message-container">
      <div
        className={isYours ? "message your-message shadow" : "message shadow"}
      >
        <span>{message ? message : "null"}</span>
        {/* <p>02:10PM</p> */}
      </div>
    </div>
  );
}

export default Message_comp;
