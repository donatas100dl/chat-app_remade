/// import "../css/room.css";
import { ID } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLECTION_ID_MESSAGES,
} from "../appWriteConfig.js";
import { useEffect, useState } from "react";

function Room({ room_id }) {
  return (
    <div>
        {"rooom: " + room_id}
    </div>
  );
}

export default Room;
