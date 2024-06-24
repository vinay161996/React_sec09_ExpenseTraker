import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../components/Navbar";

const RootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isPremiumActivated = useSelector(
    (state) => state.expenses.isPremiumActivated
  );
  const isPremium = useSelector((state) => state.expenses.isPremium);
  const isDark = useSelector((state) => state.theme.isDark);

  const classes =
    isPremium && isPremiumActivated && isDark ? "bg-black text-white" : "";

  return (
    <div style={{ minHeight: "100vh" }} className={`${classes} pb-5`}>
      <NavBar />
      {isLoggedIn && <Outlet />}
      {!isLoggedIn && <Navigate to="/auth" />}
    </div>
  );
};

export default RootLayout;
