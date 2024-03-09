import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./authContext";

// const url = "http://localhost:4000";
const url = "https://chat-app-backend-shool-project.glitch.me";
const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const { user, userRooms, handleSetUserRooms } = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {}, [room]);

  // Query functions for API calls
  const loadRoom = async (user_id_2) => {
    try {
      if (user && userRooms) {
        var data = null;
        var room = null;
        if (userRooms) {
          room = userRooms.find(
            (room) =>
              room.user_id_1 === user_id_2 || room.user_id_2 === user_id_2
          );
        }
        if (room) {
          handleSetUserRooms((prevRooms) => {
            if (!prevRooms.some((room) => room._id === room._id)) {
              return [...prevRooms, room];
            }
            return prevRooms;
          });
          setRoom(room);
          return room;
        }
        if (!room) {
          // create new room
          setLoading(true);
          console.log("calling api");
          const res = await axios.post(
            `${url}/chat/new`,
            {
              user_id_1: user._id,
              user_id_2: user_id_2,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (res) {
            room = res.data.room;
            data = res.data;
          }
        }
        setLoading(false);
        if (room) {
          setRoom(room);
          handleSetUserRooms((prevRooms) => {
            if (!prevRooms.some((room) => room._id === room._id)) {
              return [...prevRooms, room];
            }
            return prevRooms;
          });

          return room;
        }
        return room;
      }
    } catch (err) {
      console.log("there is and eer :", err);
    }
  };

  const updateMessages = async (message, room) => {
    try {
      console.log("calling api");
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
  const messageRead = async (roomId) => {
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
    room,
    loadRoom,
    updateMessages,
    messageRead,
  };

  return (
    <RoomContext.Provider value={contextData}>
      {loading ? (
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        children
      )}
    </RoomContext.Provider>
  );
};
export const useRoom = () => {
  return useContext(RoomContext);
};
export default RoomContext;
