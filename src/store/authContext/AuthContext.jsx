import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const emailChanger = (str) => {
  let updatedStr = "";
  for (let s of str) {
    if (s === "@" || s === ".") continue;
    updatedStr += s;
  }
  return updatedStr;
};

let refreshFlag = true;

export const AuthContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userIdToken, setUserIdToken] = useState("");
  const isLoggedIn = !!userIdToken;

  const loginHandler = (data) => {
    const { email, idToken } = data;
    const updateEmail = emailChanger(email);
    localStorage.setItem("email", JSON.stringify(updateEmail));
    localStorage.setItem("token", JSON.stringify(idToken));
    setUserEmail(updateEmail);
    setUserIdToken(idToken);
  };

  const logoutHandler = () => {
    setUserEmail("");
    setUserIdToken("");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const authCtx = {
    email: userEmail,
    token: userIdToken,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  // if (refreshFlag) {
  //   setTimeout(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   const email = JSON.parse(localStorage.getItem("email"));
  //   console.log("refresh", !!(token && email));
  //   if (token && email) {
  //     setUserEmail(email);
  //     setUserIdToken(token);
  //   }
  //   refreshFlag = false;
  //   }, 6000);
  // }
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const email = JSON.parse(localStorage.getItem("email"));
    if (token && email) {
      setUserEmail(email);
      setUserIdToken(token);
    }
  }, []);
  console.log("Inauthco");
  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
