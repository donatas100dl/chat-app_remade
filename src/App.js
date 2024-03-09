import "./css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/login";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx"; 
import VerifyEmail from "./pages/verifyEmail.jsx";
import { AuthProvider } from "./uttils/authContext";
import { RoomProvider } from "./uttils/roomContext";
import { useEffect } from "react";
import RoomRouting from "./components/roomRouting";
import { io } from "socket.io-client";

function App() {
  //const socket = io("http://localhost:4000/");
  const socket = io("https://chat-app-backend-shool-project.glitch.me");
  return (
    <div className="App">
      <AuthProvider>
        <RoomProvider>
          <Routes>
            <Route path="/user/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard socket={socket} />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/user/verify" element={<VerifyEmail />} />
           </Routes>
        </RoomProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
