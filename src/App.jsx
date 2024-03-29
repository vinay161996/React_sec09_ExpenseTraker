import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import RootLayout from "./pages/RootLayout";
import SignUp from "./pages/auth/SignUp";
import AuthRootLayout from "./pages/AuthRootLayout";
import ContactDetail from "./pages/ContactDetail";
import ContextProviders from "./store/ContextProviders";

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
  return (
    <ContextProviders>
      <RouterProvider router={router} />
    </ContextProviders>
  );
}

export default App;
