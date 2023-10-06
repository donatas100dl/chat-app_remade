import "../css/contact_person.css";
function contact_person({ isNew, last_seen, user, handleSelect }) {
  const handleClick = (e) => {
    e.preventDefault()
    handleSelect(user)
  }
  return (
    <div className="contact_person" onClick={handleClick} >
      <div className="logo-name">
        <div className="croppted-img">
          {/* <img src={ img_link !== "" ? require(`${img_link}`) : require("../assets/profile_placeholder_2.jpg") } alt="logo"/> */}
          <img
            src={require("../assets/profile_placeholder_2.jpg")}
            alt="logo"
          />
        </div>
        <container>
          <h1>{user ? user.name : "name"}</h1>
          <span>Listening to Spotify</span>
        </container>
      </div>
      <div className="date">
        <span>{last_seen}</span>
        <div className="has-new-message">
          {!isNew ? <div></div> : <div className="new-messages">9+</div>}
        </div>
      </div>
    </div>
  );
}

export default contact_person;
