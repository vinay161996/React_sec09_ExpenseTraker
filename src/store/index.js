import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authActions } from "./reducers/authSlice";
import expensesReducer from "./reducers/expenseSlice";
// import getEmailAndToken from "../features/getEmailAndToken";

const authMiddleware = () => (next) => (action) => {
  if (authActions.login.match(action)) {
    localStorage.setItem("email", JSON.stringify(action.payload.email));
    localStorage.setItem("token", JSON.stringify(action.payload.token));
  }
  if (authActions.logout.match(action)) {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }
  return next(action);
};

// const preloadedState = () => {
//   const { email, token } = getEmailAndToken();
//   const defaultStore = {
//     auth: {
//       token: "",
//       email: "",
//       isLoggedIn: false,
//     },
//     expenses: {
//       isLoading: false,
//       expenses: [],
//       updatingExpense: {},
//       error: null,
//     },
//   };
//   if (!!email && !!token) {
//     defaultStore.auth.email = email;
//     defaultStore.auth.token = token;
//   }
//   return defaultStore;
// };

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
  },
  // preloadedState: preloadedState(),
  middleware: (defaultMiddleware) => defaultMiddleware().concat(authMiddleware),
});

export default store;
