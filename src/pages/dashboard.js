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
import { useNavigate } from "react-router-dom";
import Room from "./room";

function Dashboard() {
  const [isShown, setIsShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useAuth();
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
    user_id: "6509dda83038c79d45db",
    name: "deividas",
  };
  const toggleEmoji = () => {
    setIsShown(!isShown);
  };

  useEffect(() => {
    if (!user) {
      navigate("/user/login");
    }
    // getAllMessages()
    getMessages();
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }

    client.subscribe(
      [
        `databases.${DATABASE_ID}.collections.${COLECTION_ID_MESSAGES}.documents`,
      ],
      (response) => {
        // Callback will be executed on changes for documents A and all files.
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prev) => [...prev, response.payload]);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input:", input)
    try{
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
    }
    catch(err){
      console.error(err);
    }
  };

  const postMessage = (input) => {
    const res = databases.createDocument(
      DATABASE_ID,
      COLECTION_ID_MESSAGES,
      ID.unique(),
      {
        body: input,
        user_id: user.$id,
        user_name: user.name,
      }
    );
    setInput("");
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
  // const loadRoom = () => {
  //   var your_rooms = rooms.filter(
  //     (room) => room.user_id_1 === user.$id || room.user_id_2 === user.$id
  //   );
  //   if (your_rooms.length === 0) {
  //     createRoom(user.$id, yourFriend.user_id);
  //   } else {
  //     var room = your_rooms.find(
  //       (room) =>
  //         room.user_id_1 === yourFriend.user_id ||
  //         room.user_id_2 === yourFriend.user_id
  //     );

  //     if (!room) {
  //       createRoom(user.$id, yourFriend.user_id);
  //     } else {
  //       console.log("loading room", room);
  //     }
  //   }
  // };
  // const createRoom = (user_id_1, user_id_2) => {
  //   console.log(COLECTION_ID_ROOMS);

  //   const test ={test:"Room created"};
  //   const user_id = user.$id;
  //   const user_name = user.name;
  //   //const bodyEnum = {
  //   //   body: body,
  //   //   user_id: user_id,
  //   //   user_name: user_name
  //   // };
  //   const roomData = {
  //     user_id_1: user_id_1,
  //     user_id_2: user_id_2,
  //     iwhantodie: test,
  //   };
  //   const res = databases.createDocument(
  //     DATABASE_ID,
  //     "65086c3e0c17b752430f",
  //     ID.unique(),
  //     roomData
  //   );
  // };
  const chooseEmoji = (emoji) => {
    console.log("choosen ",emoji + " ")
    setInput((prev) => prev + emoji);
  }
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
            <Contact_person
              isNew={true}
              last_seen={"Now"}
              img_link={"../assets/profile_placeholder.png"}
            />
            <Contact_person isNew={false} last_seen={"Nov 29"} />
            <Contact_person
              isNew={true}
              last_seen={"Now"}
              img_link={"../assets/profile_placeholder.png"}
            />
            <Contact_person isNew={false} last_seen={"Dec 13"} />
            <Contact_person
              isNew={true}
              last_seen={"Now"}
              img_link={"../assets/profile_placeholder.png"}
            />
            <Contact_person isNew={false} last_seen={"Nov 29"} />
            <Contact_person
              isNew={true}
              last_seen={"Now"}
              img_link={"../assets/profile_placeholder.png"}
            />
            <Contact_person isNew={false} last_seen={"Dec 13"} />
            <Contact_person isNew={true} last_seen={"Now"} />
            <Contact_person isNew={false} last_seen={"Nov 29"} />
            <Contact_person isNew={true} last_seen={"Now"} />
            <Contact_person isNew={false} last_seen={"Dec 13"} />
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
                  ID = {message.$id}
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
            <Emoji_selector show={isShown} handleClose={toggleEmoji} handleChoose={chooseEmoji}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
