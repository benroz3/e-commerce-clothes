"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTransition from "@/components/style/PageTransition";
import Loader from "@/components/style/Loader";
import CartElement from "@/components/cartElements/CartElement";
import { fetchAllCartItems } from "@/utils/apiCalls/cart";
import { setCartItems } from "@/redux/slices/cartSlice";
import { RootState } from "@/utils/types";

const Cart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const fetchCartItems = async () => {
    if (user) {
      const res = await fetchAllCartItems(user?.id);

      if (res.success) {
        dispatch(setCartItems(res.data));
        localStorage.setItem("cartItems", JSON.stringify(res.data));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={loading} size={30} />
        </div>
      ) : (
        <PageTransition>
          <CartElement cartItems={cartItems} fetchCartItems={fetchCartItems} />
        </PageTransition>
      )}
    </>
  );
};

export default Cart;
