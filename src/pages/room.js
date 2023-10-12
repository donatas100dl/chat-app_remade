/// import "../css/room.css";
import { ID } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLECTION_ID_MESSAGES,
} from "../appWriteConfig.js";
import { useEffect, useState } from "react";
import Message from "../components/message.js";
function Room({ room, messages }) {
  
  return (
    <div className="chat-main">
      <>{`room id: ${room._id}`}</>
      {room && messages.length > 0
        ? messages.map((msg) => <Message message={msg} key={msg._id}/>)
        : " no messages found"}
    </div>
  );
}

export default Room;
