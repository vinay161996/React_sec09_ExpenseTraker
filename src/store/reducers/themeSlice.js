import { createSlice } from "@reduxjs/toolkit";

const themeIntialState = {
  isDark: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: themeIntialState,
  reducers: {
    toggle(state) {
      state.isDark = !state.isDark;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
