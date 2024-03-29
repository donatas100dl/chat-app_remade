import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../css/loader.css";

// const url = "http://localhost:4000";
const url = "https://chat-app-backend-shool-project.glitch.me";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark-blue");
  const [users, setUsers] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  useEffect(() => {
    getUserOnLoad();
    if(!Cookies.get("theme")){
      Cookies.set("theme","dark-blue")
    }
    else{
      setTheme(Cookies.get("theme"))
    }


  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  },[theme])

  const getUserOnLoad = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${url}/user/`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res) {
        const userData = {
          email: res.data.email,
          name: res.data.name,
          _id: res.data._id,
          token: token,
          avatarUrl: res.data.avatarUrl,
        };
        !userData ? navigate("/user/login") : setUser(userData);
      }
      setLoading(false);
      getAllUsers();
      getUserRooms();
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getUserRooms = async () => {
    const token = await getToken();
    console.log("calling api");
    const res = await axios.get(`${url}/user/`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res) {
      setUserRooms(res.data.rooms);
    }
  };

  const getToken = async () => {
    return await Cookies.get("userToken");
  };
  const handleGetTheme = async () => {
    return await Cookies.get("userTheme");
  };
  const handleSetTheme = async (theme) => {
    Cookies.set("userTheme", theme);
    handleGetTheme();
  };

  const handleLogin = async (e, loginInfo) => {
    e.preventDefault();
    try {
      console.log("calling api");
      const apiRes = await axios.post(`${url}/user/login`, {
        email: loginInfo.email,
        password: loginInfo.password,
      });

      if(apiRes.data.message.includes("notverified")) {
        console.log("user is not authenticated")
        navigate("/user/verify")
      }

      if (apiRes.data.token !== "" && apiRes.data.token) {
        Cookies.set("userToken", apiRes.data.token);
        const userData = {
          email: apiRes.data.email,
          name: apiRes.data.name,
          _id: apiRes.data._id,
          token: apiRes.data.token,
          avatarUrl: apiRes.data.avatarUrl,
        };
        setUser(userData);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("error: ", err);
      return { err: true };
    }
  };
  const handleRegister = async (registerInfo) => {
    try {
      console.log("calling api");
      const res = await axios.post(`${url}/user/`, {
        name: registerInfo.username,
        email: registerInfo.email,
        password: registerInfo.password,
        avatar: registerInfo.avatar,
        
      });
      navigate("/user/login");
    }
    catch (err) {
      console.log("error: ", err);
      return { err: true };
    }
}
  const handleUserLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    Cookies.remove("userToken");
    navigate("/user/login");
  };

  const getAllUsers = async () => {
    console.log("calling api");
    await axios.get(`${url}/user/all`).then((res) => {
      if (res.data.users.length !== 0) {
        setUsers(res.data.users);
      }
    });
  };

  const isEmailTaken = async (email) => {
    try {
      console.log("calling api");
      const res = await axios.post(`${url}/user/exist/email`, {
        email:email
      });
      if (res) {
        return res.data.isTaken;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const isUsernameTaken = async (username) => {
    try {
      console.log("calling api");
      const res = await axios.post(`${url}/user/exist/username`, {
        name:username
      });
      if (res) {
        return res.data.isTaken;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEmailVerification = async (email) => {
    try {
      console.log("calling api");
      const res = await axios.post(`${url}/user/verify/email`, {
        email: email
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  
  const handleSetUserRooms = async (rooms) => {
    setUserRooms(rooms)
  }
  const contextData = useMemo(
    () => ({
      user,
      users,
      url,
      loading,
      userRooms,
      handleSetUserRooms,
      handleLogin,
      handleRegister,
      handleUserLogout,
      getToken,
      getAllUsers,
      getUserRooms,
      isEmailTaken,
      isUsernameTaken,
      handleSetUserRooms,
      handleEmailVerification,
    })
  );
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
      <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
      ) : (
        children
      )}
      {/* <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
