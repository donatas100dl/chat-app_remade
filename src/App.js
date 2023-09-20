import "./css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./uttils/pivateRoutes";
import Dashboard from "./pages/dashboard.js";
import Login from "./pages/login";
import { AuthProvider } from "./uttils/authContext";
function App() {
  return (
    <div className="App">
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
