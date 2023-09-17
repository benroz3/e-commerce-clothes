import { configureStore } from "@reduxjs/toolkit";
import navModal from "./slices/navModal";

export default configureStore({
  reducer: {
    navModal: navModal,
  },
});
