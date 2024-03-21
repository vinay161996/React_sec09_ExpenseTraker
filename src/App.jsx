import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Expense from "./pages/expense/Expense";
import Login from "./pages/auth/Login";
import RootLayout from "./pages/RootLayout";
import SignUp from "./pages/auth/SignUp";
import AuthRootLayout from "./pages/auth/AuthRootLayout";
import ContactDetail from "./pages/updateProfile/ContactDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/reducers/authSlice";
import getEmailAndToken from "./features/getEmailAndToken";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/updateProfile",
        element: <ContactDetail />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { email, token } = getEmailAndToken();
    if (!!email && !!token) {
      dispatch(authActions.login({ email, token }));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
