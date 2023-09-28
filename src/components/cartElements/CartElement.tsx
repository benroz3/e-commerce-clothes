"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../style/Loader";
import { deleteItemFromCart } from "@/utils/apiCalls/cart";
import { PopulatedCartItemType } from "@/utils/types";

const CartElement: React.FC<{
  cartItems: PopulatedCartItemType[];
  fetchCartItems: () => void;
}> = ({ cartItems, fetchCartItems }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto p-8  max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="my-8">
                    {cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            src={item && item.productID.imageUrl}
                            alt="Product image"
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {item && item.productID.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center justify-center">
                              <p
                                className={`shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right ${
                                  item.productID.onSale === "yes" &&
                                  "line-through"
                                }`}
                              >
                                ${item && item.productID.price}
                              </p>
                              {item.productID.onSale === "yes" ? (
                                <p className="text-sm font-bold text-red-600">{`$${(
                                  item.productID.price -
                                  item.productID.price *
                                    (item.productID.priceDrop / 100)
                                ).toFixed(2)}`}</p>
                              ) : null}
                            </div>
                            <button
                              onClick={() => deleteFromCartHandler(item._id)}
                            >
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
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="text-gray-400 w-[100%] text-center">
                    Cart is empty
                  </h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems
                          .reduce(
                            (total, item) => item.productID.price + total,
                            0
                          )
                          .toFixed(2)
                      : 0}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg text-black font-semibold">$0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems
                          .reduce(
                            (total, item) =>
                              item.productID.onSale === "yes"
                                ? item.productID.price -
                                  item.productID.price *
                                    (item.productID.priceDrop / 100)
                                : item.productID.price + total,
                            0
                          )
                          .toFixed(2)
                      : 0}
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={cartItems && cartItems.length === 0}
                    className="group inline-flex w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartElement;
