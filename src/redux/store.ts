import { configureStore } from "@reduxjs/toolkit";
import navModal from "./slices/navModalSlice";
import cart from "./slices/cartSlice";
import user from "./slices/userSlice";
import product from "./slices/productSlice";

export default configureStore({
  reducer: {
    navModal: navModal,
    cart: cart,
    user: user,
    product: product,
  },
});
