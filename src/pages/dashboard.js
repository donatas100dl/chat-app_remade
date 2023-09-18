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
} from "../appWriteConfig.js";
function Dashboard() {
  const [isShown, setIsShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageRef = useRef(null);
  const toggleEmoji = () => {
    setIsShown(!isShown);
  };
  useEffect(() => {
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
          console.log("before: ", messages);
          console.log("payload: ", response.payload);
          // setMessages([...messages, ...response.payload])
          // setMessages((prevMessages) => [...prevMessages, response.payload]);
          setMessages(prev => [ ...prev, response.payload]);
          console.log("after: ", messages);
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
  };

  const postMessage = (input) => {
    const res = databases.createDocument(
      DATABASE_ID,
      COLECTION_ID_MESSAGES,
      ID.unique(),
      {
        body: input,
      }
    );
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { body: input, $id: ID.unique() },
    // ]);
    setInput("");
  };

  const deleteMessage = (id) => {
    const res = databases.deleteDocument(
      DATABASE_ID,
      COLECTION_ID_MESSAGES,
      id
    );
    const updatedMessages = messages.filter((message) => message.$id !== id);
    setMessages(updatedMessages);
    console.log("deleteMessage: ", res);
  };

  const getMessages = async () => {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLECTION_ID_MESSAGES
    );
    console.log(res.documents);
    setMessages(res.documents);
  };

  function getRandomBoolean() {
    return Math.random() < 0.5; 
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-main">
        <div className="contact">
          <div className="profile">
            <div className="profile-info">
              <span>Your Name</span>
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
                  isYours={getRandomBoolean()}
                  key={message.$id}
                  message={message.body}
                  // onClick={deleteMessage(message.$id)}
                />
              ))
            )}

            {/* <Message isYours={true}  message={"Throughout history,"}/>
            <Message message={"ok,"}/> */}
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
            <Emoji_selector show={isShown} handleClose={toggleEmoji} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
