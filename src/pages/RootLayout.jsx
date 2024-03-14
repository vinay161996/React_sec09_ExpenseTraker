import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn && <Outlet />}
      {!isLoggedIn && <Navigate to="/auth" />}
    </>
  );
};

export default RootLayout;
