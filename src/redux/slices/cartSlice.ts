import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    showCartModal: false,
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  },
  reducers: {
    setShowCartModal: (state) => {
      state.showCartModal = !state.showCartModal;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setShowCartModal, setCartItems } = cart.actions;
export default cart.reducer;
