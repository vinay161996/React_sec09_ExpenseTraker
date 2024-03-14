import { createSlice } from "@reduxjs/toolkit";

const authIntialState = {
  token: "",
  email: "",
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authIntialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.email = "";
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
