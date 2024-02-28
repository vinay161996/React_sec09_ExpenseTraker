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

  const authCtx = {
    email: userEmail,
    token: userIdToken,
    isLoggedIn,
    login: loginHandler,
    logout: () => {},
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const email = JSON.parse(localStorage.getItem("email"));
    if (token && email) {
      setUserEmail(email);
      setUserIdToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
