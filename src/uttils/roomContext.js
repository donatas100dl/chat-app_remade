import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useAuth } from "./authContext";
const url = "http://localhost:4000";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    setLoading(false);
  }, []);

  const loadRoom = async (user_id_1, user_id_2) => {
    const res = await axios.post(
      `${url}/chat/`,
      {
        user_id_1: user_id_1,
        user_id_2: user_id_2,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data.room;
  };

  const getRoomByID = async (roomId) => {
    axios
      .get(`${url}/chat/${roomId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        return res.data.room;
      });
  };

  const updateMessages = async (message, room) => {
    const res = await axios.put(
      `${url}/chat/update/${room._id}`,
      {
        user_id_1: room.user_id_1,
        user_id_2: room.user_id_2,
        messages: [
          {
            user_id: user._id,
            body: message,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if(res){
     return res.data.room
    }
  };

  const contextData = {
    loadRoom,
    getRoomByID,
    updateMessages,
  };

  return (
    <RoomContext.Provider value={contextData}>
      {loading ? <p>loading...</p> : children}
    </RoomContext.Provider>
  );
};
export const useRoom = () => {
  return useContext(RoomContext);
};
export default RoomContext;
