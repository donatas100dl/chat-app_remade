import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(false);
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const userData = await account.get();
      !userData ? navigate("/user/login") : setUser(userData);
      navigate("/")
      console.log(userData)
    } catch (error) {
      //console.error(error);
    }
    setLoading(false);
  };

  const handleLogin = async (e, loginInfo) => {
    e.preventDefault();
    try {
      const res = await account.createEmailSession(
        loginInfo.email,
        loginInfo.password
      );
      if(res){
        const userData = await account.get();
        setUser(userData);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleUserLogout = async (e) => {
    e.preventDefault()
    console.log("User logged out")
    setUser(null)
    await account.deleteSessions("current");
    navigate("/user/login");
  };
  const contextData = {
    user,
    handleLogin,
    handleUserLogout,
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
