import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
 let token =localStorage.getItem("token")
 if(token){
    return true
 }else{
    return false
 }
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;