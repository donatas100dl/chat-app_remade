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
import axios from "axios";

function Dashboard() {
  const [isShown, setIsShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [input, setInput] = useState("");
  const { user, url, getAllUsers, users } = useAuth();
  const { createRoom, loadRoom } = useRoom();
  const navigate = useNavigate();
  const messageRef = useRef(null);

  const rooms = [
    {
      user_id_1: "650883979ffda95ad7b6",
      user_id_2: "6509dda83038c79d45db",
      room_id: "the cooret room with deividas and me",
      messages_obj_array: null,
    },
    {
      user_id_1: "650883979ffda95ad7b6",
      user_id_2: "sad785gf9sa894",
      room_id: "sda897g5dsagf58s",
      messages_obj_array: null,
    },
    {
      user_id_1: "safdasfasdfsadfsdaf",
      user_id_2: "asdsadasdas",
      room_id: "sda897g5dsagf58s",
      messages_obj_array: null,
    },
    {
      user_id_1: "asdasfdasfsadgfsd",
      user_id_2: "asdasdasdasdas",
      room_id: "sda897g5dsagf58s",
      messages_obj_array: null,
    },
  ];

  const yourFriend = {
    user_id: "651d948a41a26571d077587b",
    name: "deividas",
  };
  const toggleEmoji = () => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    if (!user) {
      navigate("/user/login");
    }
    getAllUsers();
    console.log(users);
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
    
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("udated users", users)
    if (users.length !== 0 && users) {
      const data =  users.filter((selectedUser) => selectedUser._id !== user._id)

      console.log(data);
      setAllUsers(data)
    }
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
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
      postMessage(input);
    } catch (err) {
      console.error(err);
    }
  };

  const postMessage = (input) => {
    // createRoom(user.id, yourFriend.id, messages)
    setInput("");
  };

  const getSelectedUser = (user_1) => {
    console.log(user._id, user_1._id);
    loadRoom(user._id, user_1._id);
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

  const getMessages = async () => {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLECTION_ID_MESSAGES
    );
    setMessages(res.documents);
  };

  //rooms

  const chooseEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
  };
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-main">
        <div className="contact">
          <div className="profile">
            <div className="profile-info">
              <span>{user.name}</span>
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
            {!users || users.length === 0 ? (
              <Contact_person isNew={false} last_seen={"Dec 13"} />
            ) : (
              users.map((user_1) => (
                <Contact_person
                  isNew={true}
                  last_seen={"Dec 13"}
                  user={user_1}
                  key={user_1._id}
                  handleSelect={getSelectedUser}
                />
              ))
            )}
          </div>
        </div>
        <div className="chat">
          {/* {loadRoom()}
          <Room room_id="73453475437" /> */}
          <div className="chat-nav">
            <div className="profile">
              <div className="profile-img">
                <img
                  src={require("../assets/profile_placeholder_2.jpg")}
                  alt="logo"
                />
              </div>
              <section>
                <span>Priya Sharma</span>
                <p>Today at 2:30pm</p>
              </section>
            </div>
            <div className="icons-container">
              <img src={searchSvg} alt="search" id="search" />
              <img src={dotsSvg} alt="otions" id="dots" />
            </div>
          </div>
          <div className="chat-main" ref={messageRef}>
            {messages.length < 0 || messages.length === undefined ? (
              <Message
                isYours={true}
                key={324535}
                message={"Loading messages..."}
              />
            ) : (
              messages.map((message) => (
                <Message
                  isYours={message.user_id === user.$id ? true : false}
                  key={message.$id}
                  ID={message.$id}
                  message={message.body}
                  handleDelete={deleteMessage}
                />
              ))
            )}
          </div>

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
