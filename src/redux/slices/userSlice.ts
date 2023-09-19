import { UserStateType } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    isAuthUser: false,
    user: null,
  } as UserStateType,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthUser = state?.user?.role === "admin" || false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthUser = false;
    },
  },
});

export const { setUser, removeUser } = user.actions;
export default user.reducer;
