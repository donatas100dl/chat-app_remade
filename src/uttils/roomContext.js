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
  const { user} = useAuth();
  useEffect(() => {
    setLoading(false);
  }, []);

  const loadRoom = async () => {
    const res = await axios.get(`${url}/chat/all`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res) {
      console.log(res);
    }


    // if (your_rooms.length === 0) {
    //   createRoom(user.$id, yourFriend.user_id);
    // } else {
    //   var room = your_rooms.find(
    //     (room) =>
    //       room.user_id_1 === yourFriend.user_id ||
    //       room.user_id_2 === yourFriend.user_id
    //   );

    //   if (!room) {
    //     createRoom(user.$id, yourFriend.user_id);
    //   } else {
    //     console.log("loading room", room);
    //   }
    // }
  };

  const createRoom = async (user_id_1, user_id_2) => {
    const user_id = user.$id;
    const user_name = user.name;

    const roomData = {
      user_id_1: user_id_1,
      user_id_2: user_id_2,
    };
    const res = await axios.post(`${url}/chat/create`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res) {
      console.log(res);
    }
  };

  const contextData = {
    loadRoom,
    createRoom,
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
