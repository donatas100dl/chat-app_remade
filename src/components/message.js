import "../css/message.css";
function Message_comp({ message, isYours, handleDelete, ID }) {
  const handleClick = (e) => {
    e.preventDefault();
    handleDelete(e, ID)
  }
  return (
    <div className="message-container" >
      <div
        className={isYours ? "message your-message shadow" : "message shadow"}
        onClick={e => handleClick(e)}
      >
        <span>{message ? message : "null"}</span>
        {/* <p>02:10PM</p> */}
      </div>
    </div>
  );
}

export default Message_comp;
