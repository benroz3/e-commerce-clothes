import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserStateType } from "@/utils/types";

export const user = createSlice({
  name: "user",
  initialState: {
    isAuthUser: false,
    user: null,
  } as UserStateType,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthUser = Cookies.get("token") !== undefined;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthUser = false;
    },
  },
});

export const { setUser, removeUser } = user.actions;
export default user.reducer;
