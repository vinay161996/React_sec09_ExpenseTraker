import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext/AuthContext";

const AuthRootLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);
  return <>{!isLoggedIn && <Outlet />}</>;
};

export default AuthRootLayout;
