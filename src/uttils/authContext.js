import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
const url = "http://localhost:4000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setLoading(false);
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

      navigate("/");
    } catch (error) {
      //console.error(error);
    }
    setLoading(false);
  };

  const getToken = async () => {
    return await Cookies.get("userToken");
  };

  const handleLogin = async (e, loginInfo) => {
    e.preventDefault();
    try {
      axios
        .post(`${url}/user/login`, {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.token !== "") {
            Cookies.set("userToken", res.data.token);
          }
          const userData = {
            email: res.data.email,
            name: res.data.name,
            _id: res.data._id,
            token: res.data.token,
          };
          setUser(userData);
          navigate("/");
        });
    } catch (err) {
      console.error(err);
    }
  };
  const handleUserLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    Cookies.remove("userToken");
    navigate("/user/login");
  };

  const getAllUsers = async () => {
    const res = await axios.get(`${url}/user/all`).then(res => {
      if( res.data.users.length !== 0 ){
        setUsers(res.data.users)
        console.log(users)
      }
    })
  }

  const contextData = {
    user,
    users,
    url,
    handleLogin,
    handleUserLogout,
    getToken,
    getAllUsers,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
