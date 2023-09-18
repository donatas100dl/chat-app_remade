import "./css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.js"
import Navbar from "./components/navbar";
import dashboard from "./pages/dashboard";
import Login from "./pages/login";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/user/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
