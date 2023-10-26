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
  const [theme, setTheme] = useState("dark");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUserOnLoad();
  }, []);

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
        };
        !userData ? navigate("/user/login") : setUser(userData);
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      //console.error(error);
    }
    setLoading(false);
  };

  const getToken = async () => {
    return await Cookies.get("userToken");
  };
  const handleGetTheme = async () => {
    return await Cookies.get("userTheme");
  }
  const handleSetTheme = async (theme) => {
    Cookies.set("userTheme",theme);
    handleGetTheme()
  }

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
      };
      setUser(userData);
      navigate("/");
    } catch (err) {
      console.log("error: ", err);
      return { err: true };
    }
  };
  const handleUserLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    Cookies.remove("userToken");
    navigate("/user/login");
  };

  const getAllUsers = async () => {
    const res = await axios.get(`${url}/user/all`).then((res) => {
      if (res.data.users.length !== 0) {
        setUsers(res.data.users);
      }
    });
  };

  const contextData = useMemo(
    () => ({
      user,
      users,
      url,
      loading,
      handleLogin,
      handleUserLogout,
      getToken,
      getAllUsers,
    }),
    [user, users, url, handleLogin, handleUserLogout, getToken, getAllUsers]
  );
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="spinner-wrapper">
          <p className="loader-spinner">
            <p className="loader-spinner-inner"></p>
            <p className="loader-spinner-inner2"></p>
          </p>
        </div>
      ) : (
        children
      )}
              {/* <div className="spinner-wrapper">
          <p className="loader-spinner">
            <p className="loader-spinner-inner"></p>
            <p className="loader-spinner-inner2"></p>
          </p>
        </div> */}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
