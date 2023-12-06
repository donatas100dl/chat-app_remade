import "../css/dashboard.css";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar.jsx";
import dotsSvg from "../assets/dots.svg";
import searchSvg from "../assets/search.svg";
import Contact_person from "../components/contact_person.jsx";
import Dropdown from "../components/dropdown.jsx";
import Message from "../components/message.jsx";
import smileSvg from "../assets/smile-face.svg";
import Emoji_selector from "../components/emoji_selector.jsx";
import ThemeSelector from "../components/ThemeSelector.jsx";
import { ID } from "appwrite";
import client, {
  databases,
  DATABASE_ID,
  COLECTION_ID_MESSAGES,
  COLECTION_ID_ROOMS,
} from "../appWriteConfig.js";
import { useAuth } from "../uttils/authContext.js";
import { useRoom } from "../uttils/roomContext.js";
import { useNavigate } from "react-router-dom";
import Room from "./room.jsx";
import { useSwipeable } from "react-swipeable";
function Dashboard({ socket }) {
  const [isShown, setIsShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [lastestMassage, setLastestMassage] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [expandContactList, setExpandContactList] = useState(false);
  const { user, url, loading, getAllUsers, users, userRooms, getUserRooms } = useAuth();
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

    if (userSearch != "" || !userSearch.toLowerCase().includes(" ")) {
      //reset to all users except your self
      var possibleUsers = null;
      if (users.length !== 0 && users) {
        possibleUsers = users.filter(
          (selectedUser) => selectedUser._id !== user._id
        );
      }
      //try find user with given name
      if (possibleUsers != null) {
        let data = possibleUsers.filter((selectedUser) =>
          selectedUser.name.toLowerCase().startsWith(userSearch.toLowerCase())
        );
        console.log("all users", data);
        setAllUsers(data);
      }
    }
    if (room) {
      setMessages(room.messages);
    }
  }, [users, room, userSearch]);

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

  const loadMessageCallback = (msg) => {
    console.log("loadMessageCallback: ", msg)
  };

  const getSelectedUser = async (user_1) => {
    await getUserRooms()
    setSelectedUser(user_1);
    console.log(user_1);
    console.log(user);
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
      console.log("Swiped Left");
      setExpandContactList(false);
      // You can add other logic when swiped left here
    },
    onSwipedRight: () => {
      console.log("Swiped right");
      setExpandContactList(true);
      // You can add other logic when swiped right here
    },
  });

  const handleUserSearch = (e) => {
    setUserSearch(e.target.value);
  };

  return (
    <div className="dashboard" {...handlers}>
      <div className="dashboard-main theme-change">
        <div
          className={
            expandContactList
              ? "contact theme-change"
              : "contact collapsed-contact theme-change"
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
                <Dropdown pos="center">
                  <li data-nav="user/settings">Setting</li>
                  <li data-nav="user/settings">2Setting</li>
                  <li data-nav="user/settings">1Setting</li>
                  <li data-nav="user/settings">3Setting</li>
                </Dropdown>
            </div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={userSearch}
              onChange={handleUserSearch}
            />
            {/* <img src={searchSvg} alt="search" /> */}
            <div className="search-icon">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  sketchType="MSPage"
                >
                  <g
                    id="Icon-Set"
                    sketchType="MSLayerGroup"
                    transform="translate(-256.000000, -1139.000000)"
                    fill="rgba(59, 59, 59, 0.471)"
                  >
                    <path
                      d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                      id="search"
                      sketchType="MSShapeGroup"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="contact-people-list">
            {!allUsers || allUsers.length === 0  && userRooms.length === 0 ? (
              <span id="error">
                No user found <p>{userSearch}</p>{" "}
              </span>
            ) : (
              allUsers.map((user_1, index) => (
                <Contact_person
                  isNew={true}
                  room={userRooms.find(
                    (room) =>
                      room.user_id_1 === user_1._id || room.user_id_2 === user_1._id
                  )}
                  last_seen={lastestMassage}
                  user={user_1}
                  key={user_1._id}
                  handleSelect={getSelectedUser}
                />
              ))
            )}
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
              <ThemeSelector />
              <div id="search">
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlnsSketch="http://www.bohemiancoding.com/sketch/ns"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    sketchType="MSPage"
                  >
                    <g
                      id="Icon-Set"
                      sketchType="MSLayerGroup"
                      transform="translate(-256.000000, -1139.000000)"
                      fill="rgba(59, 59, 59, 0.471)"
                    >
                      <path
                        d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                        id="search"
                        sketchType="MSShapeGroup"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div id="dots">
              <Dropdown pos="right">
                  <li data-nav="user/settings">Not setting1</li>
                  <li data-nav="user/settings">Not setting5</li>
                  <li data-nav="user/settings">Not setting3</li>
                  <li data-nav="user/settings">Not setting2 </li>
                </Dropdown>
              </div>
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
            <div className="emoji-btn" onClick={toggleEmoji}>
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
