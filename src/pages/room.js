/// import "../css/room.css";
import { ID } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLECTION_ID_MESSAGES,
} from "../appWriteConfig.js";
import { useEffect, useState, useRef} from "react";
import Message from "../components/message.js";

function Room({ room, messages, handleGetDate }) {
  const messageRef = useRef(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
    if(messages.length > 0) {
      handleGetDate(messages[messages.length-1 ].date)
    }

  }, [messages]);

  return (
    <div className="chat-main" ref={messageRef}>
      {room && messages.length > 0
        ? messages.map((msg) => <Message message={msg} key={msg._id}/>)
        : " no messages found"}
    </div>
  );
}

export default Room;
