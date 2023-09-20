
import { Outlet, Navigate } from "react-router-dom";
import {useAuth} from "./authContext.js"
function PrivateRoutes() {
  const {user} = useAuth();
  return <div  className="protected-routes">{user ? <Outlet /> : <Navigate to="/user/login" />}</div>;
}

export default PrivateRoutes;
