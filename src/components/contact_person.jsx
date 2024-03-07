import "../css/contact_person.css";
function contact_person({ user, handleSelect, room }) {
  var userMessages, lastMessage;
  if (room) {
    userMessages =
      room.messages.length > 0
        ? room.messages.filter((message) => message.user_id === user._id)
        : [];
    lastMessage = userMessages[userMessages.length - 1];
  }

  var today = new Date();
  var newDate = new Date(today);

  function getUnreadMessages() {
    if (room) {
      if (userMessages.length > 0) {
        const unreadMessages = userMessages.filter(
          (message) => message.read === false
        );
        return `+${unreadMessages.length}`;
      }
    }
    return null;
  }

  function getTime() {
    if (lastMessage) {
      var newDate = new Date(lastMessage.date);
      var options = { day: "numeric", month: "short" };
      let dateWords = newDate.toLocaleDateString(undefined, options).split(" ");
      return `${dateWords[1]} ${dateWords[0]}`;
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    handleSelect(user);
  };
  return (
    <div className="contact_person" onClick={handleClick}>
      <div className="logo-name">
        <div className="croppted-img">
          {/* <img src={ img_link !== "" ? require(`${img_link}`) : require("../assets/profile_placeholder_2.jpg") } alt="logo"/> */}
          <img
            src={
              (user && typeof user.avatarUrl === "string"
                ? (() => {
                    try {
                      return require(`../assets/${user.avatarUrl}`);
                    } catch (error) {
                      return null;
                    }
                  })()
                : null) || require("../assets/profile_placeholder_2.jpg")
            }
            alt="logo"
          />
        </div>
        <div className="container">
          <h1>{user ? user.name : "name"}</h1>
          <span>Listening to Spotify</span>
        </div>
      </div>
      <div className="date">
        <span>{getTime()}</span>
        <div className="has-new-message">
          {getUnreadMessages() !== null && getUnreadMessages() > 0 ? (
              <div className="new-messages">{getUnreadMessages()}</div>        
          ) : (
           <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default contact_person;
