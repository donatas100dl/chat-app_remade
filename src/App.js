import "./css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./uttils/pivateRoutes";
import Dashboard from "./pages/dashboard.js";
import Login from "./pages/login";
import { AuthProvider } from "./uttils/authContext";
import { RoomProvider } from "./uttils/roomContext";
import { useEffect } from "react";
import RoomRouting from "./components/roomRouting";
// import { io } from "socket.io-client";

function App() {
  console.log("loading... app");
  // const socket = io("http://localhost:4000/");
  const socket = null;
  return (
    <div className="App">
        <AuthProvider>
          <RoomProvider>
          <Routes>
            <Route path="/user/login" element={<Login />} />
              <Route path="/" element={<Dashboard socket={socket} />} />
          </Routes>
          </RoomProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
