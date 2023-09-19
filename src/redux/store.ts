import { configureStore } from "@reduxjs/toolkit";
import navModal from "./slices/navModalSlice";
import user from "./slices/userSlice";

export default configureStore({
  reducer: {
    navModal: navModal,
    user: user,
  },
});
