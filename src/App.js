import "./css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.js"
import Navbar from "./components/navbar";
import dashboard from "./pages/dashboard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
