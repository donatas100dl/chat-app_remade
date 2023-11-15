import "../css/contact_person.css";
function contact_person({ isNew, last_seen, user, handleSelect }) {

var today = new Date();

var newDate = new Date(today);
newDate.setDate(today.getDate() - last_seen.split("")[0]);

function formatDate(date) {
  var options = {day: 'numeric', month: 'short'};
   let dateWords = date.toLocaleDateString(undefined, options).split(" ")
   return `${dateWords[1]} ${dateWords[0]}`
}

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
        <div className="container">
          <h1>{user ? user.name : "name"}</h1>
          <span>Listening to Spotify</span>
        </div>
      </div>
      <div className="date">
        <span>{formatDate(newDate)}</span>
        <div className="has-new-message">
          {!isNew ? <div></div> : <div className="new-messages">9+</div>}
        </div>
      </div>
    </div>
  );
}

export default contact_person;
