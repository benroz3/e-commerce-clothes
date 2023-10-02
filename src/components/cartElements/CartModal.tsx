"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CommonModal from "../navElements/CommonModal";
import Loader from "../style/Loader";
import { setShowCartModal, setCartItems } from "@/redux/slices/cartSlice";
import { deleteItemFromCart, fetchAllCartItems } from "@/utils/apiCalls/cart";
import { RootState } from "@/utils/types";

const CartModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { showCartModal, cartItems } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const fetchCartItems = async () => {
    if (user) {
      const res = await fetchAllCartItems(user?.id);

      if (res.success) {
        dispatch(setCartItems(res.data));
        localStorage.setItem("cartItems", JSON.stringify(res.data));
      }
    }
  };

  const deleteFromCartHandler = async (id: string) => {
    setLoading(true);
    const res = await deleteItemFromCart(id);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      fetchCartItems();
    } else
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

    setLoading(false);
  };

  return (
    <CommonModal
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="my-6 divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.productID && item.productID.imageUrl}
                    alt="Product image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="">{item.productID && item.productID.name}</a>
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <p
                        className={`mt-1 mr-2 text-sm text-gray-600 ${
                          item.productID.onSale === "yes" && "line-through"
                        }`}
                      >
                        ${item.productID && item.productID.price}
                      </p>
                      {item.productID.onSale === "yes" && (
                        <p className="text-sm font-bold text-red-600">{`$${(
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)}`}</p>
                      )}
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <button onClick={() => deleteFromCartHandler(item._id)}>
                        {loading ? (
                          <Loader
                            text={"Removing from cart"}
                            color="#ffffff"
                            loading={loading}
                            size={10}
                          />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full text-center text-gray-400">Cart is empty.</div>
        )
      }
      buttonComponent={
        <div className="flex items-center justify-center flex-col w-full">
          <button
            className="w-full"
            onClick={() => {
              dispatch(setShowCartModal());
              router.push("/cart");
            }}
          >
            Go To Cart
          </button>
          <button
            onClick={() => {
              dispatch(setShowCartModal());
              router.push("/checkout");
            }}
            disabled={cartItems && cartItems.length === 0}
            className="disabled:opacity-50 w-[100%]"
          >
            Checkout
          </button>
          <div
            onClick={() => {
              dispatch(setShowCartModal());
              router.push("/product/listing/all-products");
            }}
            className="mt-6 flex justify-center text-center text-sm text-gray-600 cursor-pointer"
          >
            Continue Shopping
            <span aria-hidden={true}>&rarr;</span>
          </div>
        </div>
      }
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      dispatch={dispatch}
    />
  );
};

export default CartModal;
