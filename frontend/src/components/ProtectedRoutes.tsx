import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let auth = sessionStorage.getItem("accessToken");
  //   let auth = true;
  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
