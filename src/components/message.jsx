import "../css/message.css";
import { useEffect, useState } from "react";
import { useAuth } from "../uttils/authContext";
function Message({ message, handleDelete }) {
  const { user } = useAuth();
  const [isYours, setIsYours] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
      setIsYours(user._id === message.user_id);
  }, []);
  return (
    <div className="message-container">
      <div
        className={ isYours ? "message your-message shadow" : "message shadow"}  onClick={(e) => handleClick(e)} >
        <span>{message.body ? message.body : "null"}</span>
        {/* <p>02:10PM</p> */}
      </div>
    </div>
  );
}

export default Message;
