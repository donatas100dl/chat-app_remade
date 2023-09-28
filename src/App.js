import "./css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./uttils/pivateRoutes";
import Dashboard from "./pages/dashboard.js";
import Login from "./pages/login";
import { AuthProvider } from "./uttils/authContext";
import { io } from "socket.io-client";
import { useEffect } from "react";
const socket = io("http://localhost:4000/");





function App() {

  socket.on("connect", () => {
    console.log(socket.id);
  });

  const handleClick = (e) => {
    e.preventDefault()
    socket.emit("sendMessage", `hello world im client: ${socket.id}`,logMessage)
  }

  const logMessage = (msg) => {
    console.log(msg)
  }
  
  useEffect(() => {
  socket.on("brodcastMessage", (data) => {
    console.log(data)
  })

  }, [socket])

  return (
    <div className="App">
      <button onClick={(e ) => handleClick(e)}>PRess meeeee</button>
        <AuthProvider>
          <Routes>

            <Route path="/user/login" element={<Login />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
