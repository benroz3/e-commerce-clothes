import { createSlice } from "@reduxjs/toolkit";

export const product = createSlice({
  name: "product",
  initialState: {
    updatedProduct: null
  },
  reducers: {
    setProduct: (state, action) => {
      state.updatedProduct = action.payload;
    },
  },
});

export const { setProduct } = product.actions;
export default product.reducer;
