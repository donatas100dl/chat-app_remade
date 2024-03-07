import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query"; // Import from React Query
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt_decode";
import Cookies from "js-cookie";
import { useAuth } from "./authContext";

const url = "http://localhost:4000";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user, userRooms } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  // Query functions for API calls
  const queryLoadRoom = async ({ user_id_1, user_id_2 }) => {
    try {
      const response = await axios.post(
        `${url}/chat/new`,
        {
          user_id_1,
          user_id_2,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data.room;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const queryGetRoomByID = async ({ roomId }) => {
    try {
      const response = await axios.get(`${url}/chat/${roomId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return response.data.room;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const queryUpdateMessages = async (message, room) => {
    try {
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
      if (res) {
        return res.data.room;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  const queryMessageRead = async (roomId) => {
    try {
      const res = await axios.put(`${url}/chat/read/messages/${roomId}`, null, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res) {
        return true;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const contextData = {
    queryLoadRoom,
    queryGetRoomByID,
    queryUpdateMessages,
    queryMessageRead,
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
