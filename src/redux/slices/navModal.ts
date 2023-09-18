import { createSlice } from "@reduxjs/toolkit";

export const navModal = createSlice({
  name: "navModal",
  initialState: {
    showNavModal: false,
  },
  reducers: {
    setShowNavModal: (state) => {
      state.showNavModal = !state.showNavModal
    },
  },
});

export const { setShowNavModal } = navModal.actions;
export default navModal.reducer;
