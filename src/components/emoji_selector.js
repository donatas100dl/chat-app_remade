import "../css/emoji_selector.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Emoji_selector({ handleClose, show }) {
  const [emojiList, setEmojiList] = useState([]);
  const [input, setInput] = useState("");
  const [filteredEmojiList, setFilteredEmojiList] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://emoji-api.com/emojis?access_key=224492bad558993db19cb855d4e7f349d5d765b4"
      )
      .then((res) => {
        setEmojiList(res.data);
        setFilteredEmojiList(res.data); // Initialize filtered list with all emojis
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter the emoji list based on user input
    const filteredEmojis = emojiList.filter((element) =>
      element.slug.includes(input)
    );
    setFilteredEmojiList(filteredEmojis);
  }, [input, emojiList]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={show ? "" : "hide"}>
      <div className="offscreen" onClick={handleClose}></div>
      <div className="emoji-container">
        <input
          type="text"
          placeholder="Search for emojis..."
          onChange={handleChange}
        />
        <section>
          {!filteredEmojiList.length > 0
            ? "No emojis found"
            : filteredEmojiList.map((element) => (
                <div key={element.slug} className="emoji">
                  {element.character}
                </div>
              ))}
        </section>
      </div>
    </div>
  );
}

export default Emoji_selector;
