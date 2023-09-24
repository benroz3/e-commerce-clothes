import { createSlice } from "@reduxjs/toolkit";

export const cartModal = createSlice({
  name: "cartModal",
  initialState: {
    showCartModal: false,
  },
  reducers: {
    setShowCartModal: (state) => {
      state.showCartModal = !state.showCartModal;
    },
  },
});

export const { setShowCartModal } = cartModal.actions;
export default cartModal.reducer;
