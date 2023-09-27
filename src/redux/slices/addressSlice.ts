import { createSlice } from "@reduxjs/toolkit";

export const address = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    updatedAddress: {
      fullName: "",
      city: "",
      country: "",
      postalCode: "",
      address: "",
      userID: "",
    },
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setUpdatedAddress: (state, action) => {
      state.updatedAddress = action.payload;
    },
  },
});

export const { setAddresses, setUpdatedAddress } = address.actions;
export default address.reducer;
