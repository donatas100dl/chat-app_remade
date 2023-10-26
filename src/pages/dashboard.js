import "../css/dashboard.css";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import dotsSvg from "../assets/dots.svg";
import searchSvg from "../assets/search.svg";
import Contact_person from "../components/contact_person";
import Message from "../components/message";
import smileSvg from "../assets/smile-face.svg";
import Emoji_selector from "../components/emoji_selector";
import { ID } from "appwrite";
import client, {
  databases,
  DATABASE_ID,
  COLECTION_ID_MESSAGES,
  COLECTION_ID_ROOMS,
} from "../appWriteConfig.js";
import { useAuth } from "../uttils/authContext";
import { useRoom } from "../uttils/roomContext";
import { useNavigate } from "react-router-dom";
import Room from "./room";
import { useSwipeable } from "react-swipeable";
function Dashboard({ socket }) {
  const [isShown, setIsShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [lastestMassage, setLastestMassage] = useState("");
  const [expandContactList, setExpandContactList] = useState(false);

  const { user, url, loading, getAllUsers, users } = useAuth();
  const { loadRoom, updateMessages } = useRoom();
  const navigate = useNavigate();
  const real_time = new Date();
  useEffect(() => {
    if (!loading) {
      socket.on("gottenMessage", (data) => {
        const message = {
          user_id: data.user._id,
          _id: Math.floor(Math.random() * 999999),
          body: data.message,
          date: real_time,
        };
        setMessages((prev) => [...prev, message]);
      });
    }
    if (!user) {
      navigate("/user/login");
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users.length !== 0 && users) {
      const data = users.filter(
        (selectedUser) => selectedUser._id !== user._id
      );
      setAllUsers(data);
    }
    if (room) {
      setMessages(room.messages);
    }
  }, [users, room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let input_array = input.split("");
    if (
      input_array.length > 200 ||
      input === "" ||
      input === undefined ||
      input === null
    ) {
      alert("Invalid");
      setInput("");
      return;
    }
    postMessage(input, room);
  };

  const toggleEmoji = () => {
    setIsShown(!isShown);
  };

  const postMessage = (message, room) => {
    if (room) {
      updateMessages(input, room); // send to database
      const newMessage = {
        body: message,
        user_id: user._id,
        _id: Math.floor(Math.random() * 999999),
        date: real_time,
      };
      setMessages((prev) => [...prev, newMessage]); // update client side
      const data = {
        room_id: room._id,
        message: message,
        user: user,
      };
      socket.emit("newMessage", data, loadMessageCallback);
      setInput("");
    }
  };

  const loadMessageCallback = (msg) => {};

  const getSelectedUser = async (user_1) => {
    setSelectedUser(user_1);
    console.log(user_1);
    const loadedRoom = await loadRoom(user._id, user_1._id);
    socket.emit("joinRoom", { id: loadedRoom._id }, loadMessageCallback);
    setRoom(loadedRoom);
  };

  const deleteMessage = (e, id) => {
    e.preventDefault();
    const res = databases.deleteDocument(
      DATABASE_ID,
      COLECTION_ID_MESSAGES,
      id
    );
    const updatedMessages = messages.filter((message) => message.$id !== id);
    setMessages(updatedMessages);
  };

  const chooseEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
  };
  function calculateTimeAgo(timestamp) {
    const currentTimestamp = Date.now();
    const messageTimestamp = new Date(timestamp).getTime();
    const differenceInMilliseconds = currentTimestamp - messageTimestamp;
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  }

  const getLatestMessageDate = (date) => {
    setLastestMassage(calculateTimeAgo(date));
  };

  const handleExpandContact = () => {
    setExpandContactList(!expandContactList);
    console.log(!expandContactList);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log('Swiped Left');
      setExpandContactList(false);
      // You can add other logic when swiped left here
    },
    onSwipedRight: () => {
      console.log('Swiped right');
      setExpandContactList(true);
      // You can add other logic when swiped right here
    },
  });

  return (
    <div
      className="dashboard"
      {...handlers}
    >
      <Navbar />
      <div className="dashboard-main">
        <div
          className={
            expandContactList ? "contact" : "contact collapsed-contact"
          }
          onClick={handleExpandContact}
        >
          <div className="profile">
            <div className="profile-info">
              <span>{user && user.name.length > 0 ? user.name : ""}</span>
              <div className="profile-icon">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/user--v1.png"
                  alt="user--v1"
                />
              </div>
            </div>

            <div className="options">
              <div className="dots"></div>
              <img src={dotsSvg} alt="otions" />
            </div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <img src={searchSvg} alt="search" />
          </div>
          <div className="contact-people-list">
            {!allUsers || allUsers.length === 0
              ? "no user found"
              : allUsers.map((user_1) => (
                  <Contact_person
                    isNew={true}
                    last_seen={"Dec 13"}
                    user={user_1}
                    key={user_1._id}
                    handleSelect={getSelectedUser}
                  />
                ))}
          </div>
        </div>
        <div className="chat">
          <div className="chat-nav">
            <div className="profile">
              <div className="profile-img">
                <img
                  src={require("../assets/profile_placeholder_2.jpg")}
                  alt="logo"
                />
              </div>
              <section>
                <span>
                  {selectedUser && selectedUser.name.length > 0
                    ? selectedUser.name
                    : ""}
                </span>
                <p>{lastestMassage}</p>
              </section>
            </div>
            <div className="icons-container">
              <img src={searchSvg} alt="search" id="search" />
              <img src={dotsSvg} alt="otions" id="dots" />
            </div>
          </div>
          {!room ? (
            <>{"no room loaded"}</>
          ) : (
            <Room
              room={room}
              messages={messages}
              handleGetDate={getLatestMessageDate}
            />
          )}
          <div className="chat-toolbar">
            <div className="input-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Start Typing..."
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
              </form>
            </div>
            <div className="emoji" onClick={toggleEmoji}>
              <img src={smileSvg} alt="emojis" />
            </div>
            <Emoji_selector
              show={isShown}
              handleClose={toggleEmoji}
              handleChoose={chooseEmoji}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
