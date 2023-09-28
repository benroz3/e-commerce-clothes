"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import Loader from "@/components/style/Loader";
import { setAddresses } from "@/redux/slices/addressSlice";
import { fetchAllAddresses } from "@/utils/apiCalls/address";
import { callStripeSession, createOrder } from "@/utils/apiCalls/orders";
import { RootState, UpdateAddressType } from "@/utils/types";
import { fetchAllCartItems } from "@/utils/apiCalls/cart";
import { setCartItems } from "@/redux/slices/cartSlice";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";
const stripePromise = loadStripe(stripeKey);

const Checkout = () => {
  const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: "",
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true,
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { addresses } = useSelector((state: RootState) => state.address);

  useEffect(() => {
    if (user) getAllAddresses();
    setPageLoading(false);
    fetchCartItems();
  }, [user]);

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      const isStripe = JSON.parse(localStorage.getItem("stripe") || "false");

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0 &&
        user?.id
      ) {
        setIsOrderProcessing(true);

        const checkoutData = JSON.parse(
          localStorage.getItem("checkoutFormData") || "null"
        );

        const orderData = {
          user: user?.id,
          shippingAddress: checkoutData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            quantity: 1,
            product: item.productID._id,
          })),
          paymentMethod: "Stripe",
          totalPrice: parseInt(
            cartItems
              .reduce(
                (total, item) =>
                  item.productID.onSale === "yes"
                    ? item.productID.price -
                      item.productID.price * (item.productID.priceDrop / 100)
                    : item.productID.price + total,
                0
              )
              .toFixed(2)
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const res = await createOrder(orderData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);

          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);

          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    createOrderAfterPayment();
  }, [params.get("status"), cartItems]);

  const fetchCartItems = async () => {
    if (user) {
      const res = await fetchAllCartItems(user?.id);

      if (res.success) {
        dispatch(setCartItems(res.data));
        localStorage.setItem("cartItems", JSON.stringify(res.data));
      }
    }
  };

  const getAllAddresses = async () => {
    if (user?.id) {
      const data = await fetchAllAddresses(user?.id);

      if (data.success) dispatch(setAddresses(data.data));
    }
  };

  const selectAddressHandler = (address: UpdateAddressType) => {
    if (address._id === selectedAddress) {
      setSelectedAddress("");
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }

    setSelectedAddress(address._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: address.fullName,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        address: address.address,
      },
    });
  };

  const checkoutHandler = async () => {
    const stripe = await stripePromise;
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount:
          item.productID.onSale === "yes"
            ? Math.floor(
                item.productID.price -
                  item.productID.price * (item.productID.priceDrop / 100)
              ) * 100
            : Math.floor(item.productID.price * 100),
      },
      quantity: 1,
    }));

    const res = await callStripeSession(lineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", "true");
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId: res.id });
      if (error) {
        console.log(error);
      }
    }
  };

  if (orderSuccess)
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg text-gray-500">
                  Thank you!
                </h1>
                <button className="my-5 w-full px-6 py-4 text-lg">
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  if (isOrderProcessing)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader
          text={""}
          color="#000000"
          loading={isOrderProcessing}
          size={30}
        />
      </div>
    );

  return (
    <>
      {pageLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={pageLoading} size={30} />
        </div>
      ) : (
        <div>
          <div className="grid mt-6 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <p className="font-medium text-xl">Cart Summary</p>
              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
                {cartItems && cartItems.length ? (
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col rounded-lg bg-white sm:flex-row"
                    >
                      <img
                        src={item?.productID?.imageUrl}
                        alt="Product image"
                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      />
                      <div className="flex w-full flex-col p-4">
                        <span className="font-bold">{item.productID.name}</span>
                        <span
                          className={`font-semibold ${
                            item.productID.onSale === "yes" && "line-through"
                          }`}
                        >
                          ${item.productID.price}
                        </span>
                        {item.productID.onSale === "yes" ? (
                          <p className="text-sm font-bold text-red-600">{`$${(
                            item.productID.price -
                            item.productID.price *
                              (item.productID.priceDrop / 100)
                          ).toFixed(2)}`}</p>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">Cart is empty.</div>
                )}
              </div>
            </div>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Shipping Address</p>
              <p className="text-gray-400">
                Complete your order by selecting your preferred address
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
                {addresses && addresses.length ? (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`border p-6 ${
                        address._id === selectedAddress && "border-gray-900"
                      }`}
                    >
                      <p>Name: {address.fullName}</p>
                      <p>Country: {address.country}</p>
                      <p>City: {address.city}</p>
                      <p>Address: {address.address}</p>
                      <p>Postal Code: {address.postalCode}</p>
                      <button
                        onClick={() => selectAddressHandler(address)}
                        disabled={address._id === selectedAddress}
                        className="mt-5 mr-5"
                      >
                        Select Address
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No addresses registered.</p>
                )}
              </div>
              <button
                onClick={() => router.push("/account")}
                className="my-5 w-full"
              >
                Add New Address
              </button>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="text-lg font-bold text-gray-900">
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
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="text-lg font-bold text-gray-900">Free</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-gray-900">
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
                <div className="pb-10">
                  <button
                    onClick={checkoutHandler}
                    className="my-5 w-full"
                    disabled={
                      (cartItems && cartItems.length === 0) ||
                      Object.keys(checkoutFormData.shippingAddress).length === 0
                    }
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
