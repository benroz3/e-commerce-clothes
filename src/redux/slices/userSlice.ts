import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "@/utils/types";

export const user = createSlice({
  name: "user",
  initialState: {
    isAuthUser: false,
    user: null,
  } as UserStateType,
  reducers: {
    setIsAuthUser: (state, action) => {
      state.isAuthUser = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthUser = false;
    },
  },
});

export const { setUser, removeUser, setIsAuthUser } = user.actions;
export default user.reducer;
