import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../components/Navbar";

const RootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <NavBar />
      {isLoggedIn && <Outlet />}
      {!isLoggedIn && <Navigate to="/auth" />}
    </>
  );
};

export default RootLayout;
