import { configureStore } from "@reduxjs/toolkit";
import navModal from "./slices/navModalSlice";
import cartModal from "./slices/cartModalSlice";
import user from "./slices/userSlice";
import product from "./slices/productSlice";

export default configureStore({
  reducer: {
    navModal: navModal,
    cartModal: cartModal,
    user: user,
    product: product,
  },
});
