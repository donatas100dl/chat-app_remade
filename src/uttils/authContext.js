import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import "../css/loader.css";

const url = "http://localhost:4000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark-yell");
  const [users, setUsers] = useState([]);
  const [userRooms, setUsersRooms] = useState([]);
  useEffect(() => {
    getUserOnLoad();
    if(!Cookies.get("theme")){
      Cookies.set("theme","black")
    }
    else{
      setTheme(Cookies.get("theme"))
    }


  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    console.log("theme", theme);
  },[theme])

  const getUserOnLoad = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${url}/user/`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (res) {
        console.log(res)
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
      getUserRooms();
      navigate("/");
    } catch (error) {
      //console.error(error);
    }
    setLoading(false);
  };

  const getUserRooms = async () => {
    const token = await getToken();
    const res = await axios.get(`${url}/user/`, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res) {
      setUsersRooms(res.data.rooms);
      console.log("gotten all rooms ", res.data.rooms);
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
      const apiRes = await axios.post(`${url}/user/login`, {
        email: loginInfo.email,
        password: loginInfo.password,
      });

      if (apiRes.data.token !== "") {
        Cookies.set("userToken", apiRes.data.token);
      }

      const userData = {
        email: apiRes.data.email,
        name: apiRes.data.name,
        _id: apiRes.data._id,
        token: apiRes.data.token,
        avatarUrl: apiRes.data.avatarUrl,
      };
      setUser(userData);
      navigate("/");
    } catch (err) {
      console.log("error: ", err);
      return { err: true };
    }
  };
  const handleRegister = async (registerInfo) => {
    try {
      const res = await axios.post(`${url}/user/`, {
        name: registerInfo.username,
        email: registerInfo.email,
        password: registerInfo.password,
        avatar: registerInfo.avatar,
        
      });

      if (res.data.token !== "") {
        Cookies.set("userToken", res.data.token);
      }

      const userData = {
        email: res.data.email,
        name: res.data.name,
        _id: res.data._id,
        token: res.data.token,
        avatarUrl: res.data.avatarUrl,
      };
      setUser(userData);
      navigate("/");
    }
    catch (err) {
      console.log("error: ", err);
      return { err: true };
    }
}
  const handleUserLogout = async (e) => {
    e.preventDefault();
    console.log("logged out")
    setUser(null);
    Cookies.remove("userToken");
    navigate("/user/login");
  };

  const getAllUsers = async () => {
    await axios.get(`${url}/user/all`).then((res) => {
      if (res.data.users.length !== 0) {
        setUsers(res.data.users);
        console.log(res.data.users);
      }
    });
  };

  const isEmailTaken = async (email) => {
    try {
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

  const contextData = useMemo(
    () => ({
      user,
      users,
      url,
      loading,
      userRooms,
      handleLogin,
      handleRegister,
      handleUserLogout,
      getToken,
      getAllUsers,
      getUserRooms,
      isEmailTaken,
      isUsernameTaken,
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
