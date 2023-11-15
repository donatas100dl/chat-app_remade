import { useState, useEffect, useRef } from "react";
import "../css/themeSelector.css";
export default function ThemeSelector() {
  //possible: 
  const [theme, setTheme] = useState("light");
  const [index, setIndex] = useState(1);
  const currentRef = useRef(null);
  const newRef = useRef(null);
  const themes = [
    "dark-blue",
    "dark-yell",
    "light"
  ]
  useEffect(() => {
    document.body.setAttribute("data-theme", themes[index-1]);
    setTheme(themes[index-1]);
    console.log(currentRef)
  }, [index]);


const handleClick = () => {
  setIndex(index === 3 ? 1 : index+1)
  //select curent theme
   var current_theme = currentRef.current.children[index-1]
   current_theme.className = current_theme.className + " enter"
   //select prev theme
   var prev_theme = currentRef.current.children[index !== 3 ? index : 0 ]
   prev_theme.className = prev_theme.className.split(" ")[0] + " leave"
}

  return (
    <div className="theme-selector-container" onClick={handleClick} ref={currentRef}>
      <div className={"moon leave"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="moon"
          data-name="moon"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path d="M12,12c0-3.146,1.446-5.925,4.421-8.494,.47-.405,.679-1.014,.562-1.628-.118-.614-.538-1.101-1.124-1.303C14.22,.01,12.008-.153,10.083,.152,4.827,.987,.613,5.432,.066,10.723c-.657,6.352,3.744,12.117,10.017,13.125,.656,.105,1.321,.15,1.999,.153,1.362,0,2.701-.204,3.777-.576,.585-.202,1.005-.689,1.124-1.303,.118-.614-.092-1.223-.562-1.628-2.975-2.569-4.421-5.347-4.421-8.494Zm3.533,10.479c-.975,.336-2.197,.521-3.453,.521-.62-.005-1.235-.043-1.839-.14C4.491,21.937,.458,16.65,1.061,10.826,1.562,5.978,5.423,1.904,10.24,1.14c.597-.095,1.223-.141,1.847-.141,1.23,0,2.456,.179,3.446,.521,.243,.084,.418,.288,.467,.546,.05,.259-.037,.514-.232,.683-3.208,2.77-4.768,5.796-4.768,9.25s1.56,6.48,4.768,9.25c.195,.169,.282,.424,.232,.683-.049,.258-.224,.462-.467,.546Z" />
          <circle cx="17" cy="15" r="1" />
          <circle cx="23" cy="19" r="1" />
          <path d="M23.658,8.974c.204-.068,.342-.259,.342-.474s-.138-.406-.342-.474l-1.263-.421-.421-1.263c-.136-.408-.812-.408-.948,0l-.419,1.257-1.256,.393c-.205,.064-.347,.252-.351,.468s.13,.409,.333,.48l1.27,.449,.423,1.269c.068,.204,.259,.342,.474,.342s.406-.138,.474-.342l.421-1.263,1.263-.421Z" />
        </svg>
      </div>
      <div className={"light"}>
        <div className="light-wrapper">
          <img src={require("../assets/bulb-off.png")} id="off" />
          <img
            src={require("../assets/bulb-on.png")}
            id="on"
          />
        </div>
      </div>
      <div className={"drop"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="drop"
          data-name="drop"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path d="M10,24c-2.671,0-5.183-1.04-7.071-2.929S0,16.67,0,14C0,8.581,6.715,1.654,7.001,1.362c.739-.857,1.842-1.362,3.005-1.362h.002c1.164,0,2.268,.506,3.028,1.388,.264,.27,6.964,7.193,6.964,12.61,0,2.672-1.04,5.184-2.929,7.072-1.89,1.889-4.4,2.929-7.071,2.929Zm.006-23c-.872,0-1.699,.378-2.27,1.038-.088,.092-6.736,6.95-6.736,11.962,0,2.403,.937,4.664,2.636,6.364,1.7,1.7,3.96,2.636,6.364,2.636s4.664-.936,6.364-2.636,2.636-3.96,2.636-6.365c0-5.011-6.634-11.866-6.7-11.935-.592-.684-1.42-1.063-2.293-1.064h0Zm11.494,4c-1.379,0-2.5-1.122-2.5-2.5s1.121-2.5,2.5-2.5,2.5,1.122,2.5,2.5-1.121,2.5-2.5,2.5Zm0-4c-.827,0-1.5,.673-1.5,1.5s.673,1.5,1.5,1.5,1.5-.673,1.5-1.5-.673-1.5-1.5-1.5Z" />
        </svg>
      </div>
    </div>
  );
}
