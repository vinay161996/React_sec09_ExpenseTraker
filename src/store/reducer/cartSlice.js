import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    isChange: false,
  },
  reducers: {
    replaceCartData(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addToCart(state, action) {
      const newitem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newitem.id
      );
      state.totalQuantity++;
      state.isChange = true;
      if (!existingItem) {
        state.items.push({
          itemId: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalprice: newitem.price,
          name: newitem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalprice += newitem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.itemId === id);
      state.totalQuantity--;
      state.isChange = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalprice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
