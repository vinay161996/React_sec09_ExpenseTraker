import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import RootLayout from "./pages/RootLayout";
import SignUp from "./pages/auth/SignUp";
import AuthRootLayout from "./pages/AuthRootLayout";
import ContactDetail from "./pages/ContactDetail";
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
        path: "/contactDetail",
        element: <ContactDetail />,
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
