import { configureStore } from "@reduxjs/toolkit";
import navModal from "./slices/navModalSlice";
import user from "./slices/userSlice";
import product from "./slices/productSlice";

export default configureStore({
  reducer: {
    navModal: navModal,
    user: user,
    product: product,
  },
});
