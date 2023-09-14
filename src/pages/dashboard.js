import "../css/dashboard.css";
import { useState } from "react";
import Navbar from "../components/navbar";
import dotsSvg from "../assets/dots.svg";
import searchSvg from "../assets/search.svg";
import Contact_person from "../components/contact_person";
import Message from "../components/message";
import smileSvg from "../assets/smile-face.svg";
import Emoji_selector from "../components/emoji_selector";

function Dashboard() {  
  const [isShown, setIsShown] = useState(false);
  const toggleEmoji = () => {
    setIsShown(!isShown);
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
            <Contact_person isNew={true} last_seen={"Now"} />
            <Contact_person isNew={false} last_seen={"Nov 29"} />
            <Contact_person isNew={true} last_seen={"Now"} />
            <Contact_person isNew={false} last_seen={"Dec 13"} />
            <Contact_person isNew={true} last_seen={"Now"} />
            <Contact_person isNew={false} last_seen={"Nov 29"} />
            <Contact_person isNew={true} last_seen={"Now"} />
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
              <img src={require("../assets/profile_placeholder_2.jpg")} alt="logo" />
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
          <div className="chat-main">
            <Message isYours={true} message={"Throughout history, humans have embarked on incredible journeys of discovery. From the age of exploration, when brave sailors charted uncharted waters, to the age of space exploration, where astronauts ventured beyond Earth's atmosphere, our thirst for knowledge has known no bounds. With each new frontier we conquer, we uncover the secrets of the universe and inch closer to understanding our place within it."}/>
            <Message message={"Art, too, has been a vessel for human expression. Paintings, sculptures, music, and literature have transcended time and culture, speaking to the deepest corners of the human soul. They evoke emotions, provoke thought, and ignite the flames of inspiration."}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on"}/>
            <Message isYours={true}  message={"Throughout history,"}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on incredible journeys of discovery. From the age of exploration, when brave sailors charted uncharted waters, to the age of space exploration, where astronauts ventured beyond Earth's atmosphere, our thirst for knowledge has known no bounds. With each new frontier we conquer, we uncover the secrets of the universe and inch closer to understanding our place within it."}/>
            <Message message={"Art, too, has been a vessel for human expression. Paintings, sculptures, music, and literature have transcended time and culture, speaking to the deepest corners of the human soul. They evoke emotions, provoke thought, and ignite the flames of inspiration."}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on"}/>
            <Message isYours={true}  message={"Throughout history,"}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on incredible journeys of discovery. From the age of exploration, when brave sailors charted uncharted waters, to the age of space exploration, where astronauts ventured beyond Earth's atmosphere, our thirst for knowledge has known no bounds. With each new frontier we conquer, we uncover the secrets of the universe and inch closer to understanding our place within it."}/>
            <Message message={"Art, too, has been a vessel for human expression. Paintings, sculptures, music, and literature have transcended time and culture, speaking to the deepest corners of the human soul. They evoke emotions, provoke thought, and ignite the flames of inspiration."}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on"}/>
            <Message isYours={true}  message={"Throughout history,"}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on incredible journeys of discovery. From the age of exploration, when brave sailors charted uncharted waters, to the age of space exploration, where astronauts ventured beyond Earth's atmosphere, our thirst for knowledge has known no bounds. With each new frontier we conquer, we uncover the secrets of the universe and inch closer to understanding our place within it."}/>
            <Message message={"Art, too, has been a vessel for human expression. Paintings, sculptures, music, and literature have transcended time and culture, speaking to the deepest corners of the human soul. They evoke emotions, provoke thought, and ignite the flames of inspiration."}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on"}/>
            <Message isYours={true}  message={"Throughout history,"}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on incredible journeys of discovery. From the age of exploration, when brave sailors charted uncharted waters, to the age of space exploration, where astronauts ventured beyond Earth's atmosphere, our thirst for knowledge has known no bounds. With each new frontier we conquer, we uncover the secrets of the universe and inch closer to understanding our place within it."}/>
            <Message message={"Art, too, has been a vessel for human expression. Paintings, sculptures, music, and literature have transcended time and culture, speaking to the deepest corners of the human soul. They evoke emotions, provoke thought, and ignite the flames of inspiration."}/>
            <Message isYours={true} message={"Throughout history, humans have embarked on"}/>
            <Message isYours={true}  message={"Throughout history,"}/>
            <Message message={"ok,"}/>

          </div>
          <div className="chat-toolbar">
            <div className="input-container">
              <input type="text" placeholder="Start Typing..."/>
            </div>
            <div className="emoji" onClick={toggleEmoji}>
              <img src={smileSvg} alt="emojis"/>
            </div>
            <Emoji_selector show={isShown} handleClose={toggleEmoji} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
