import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // console.log("inrootlayout", isLoggedIn);
  return <>{isLoggedIn ? <Navigate to="/" /> : <Outlet />}</>;
};

export default AuthRootLayout;
