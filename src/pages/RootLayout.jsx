import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../store/authContext/AuthContext";

const RootLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn && <Outlet />}
      {!isLoggedIn && <Navigate to="/auth" />}
    </>
  );
};

export default RootLayout;
