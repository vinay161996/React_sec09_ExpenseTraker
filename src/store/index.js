import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./reducer/uiSlice";
import cartSlice from "./reducer/cartSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    cart: cartSlice,
  },
});

export default store;
