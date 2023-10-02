"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageTransition from "@/components/style/PageTransition";
import Loader from "@/components/style/Loader";
import { PopulatedOrderType, RootState } from "@/utils/types";
import {
  fetchAllOrdersForAdmin,
  updateOrderStatus,
} from "@/utils/apiCalls/orders";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [allOrders, setAllOrders] = useState<PopulatedOrderType[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) getAllOrders();
  }, [user?.id]);

  const getAllOrders = async () => {
    const res = await fetchAllOrdersForAdmin();

    if (res.success) {
      setAllOrders(
        res.data && res.data.length && user
          ? res.data.filter(
              (order: PopulatedOrderType) => order.user._id !== user.id
            )
          : []
      );
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

    setPageLoading(false);
  };

  const updateOrderStatusHandler = async (order: PopulatedOrderType) => {
    setLoading(true);
    const res = await updateOrderStatus({ ...order, isProcessing: false });

    if (res.success) getAllOrders();
    setLoading(false);
  };

  return (
    <>
      {pageLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={pageLoading} size={30} />
        </div>
      ) : (
        <PageTransition>
          <section>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div>
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    {allOrders && allOrders.length && (
                      <ul className="flex flex-col gap-4">
                        {allOrders.map((order) => (
                          <li
                            key={order._id}
                            className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                          >
                            <div className="flex-col">
                              <h1 className="font-bold text-lg mb-3 flex-1">
                                #Order: {order._id}
                              </h1>
                              <div className="flex items-center">
                                <p className="mr-3 text-sm font-medium text-gray-900">
                                  Username:
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {order.user.username}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <p className="mr-3 text-sm font-medium text-gray-900">
                                  Email:
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {order.user.email}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <p className="mr-3 text-sm font-medium text-gray-900">
                                  Paid Amount:
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                  ${order.totalPrice.toString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {order.orderItems.map((product, index) => (
                                <div key={index} className="shrink-0">
                                  <img
                                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                                    src={product.product.imageUrl}
                                    alt="Product image"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex">
                              <button
                                className="my-5 gap-5"
                                disabled={!order.isProcessing}
                                onClick={() => updateOrderStatusHandler(order)}
                              >
                                {loading ? (
                                  <Loader
                                    text="Changing Status"
                                    color="#ffffff"
                                    loading={loading}
                                    size={10}
                                  />
                                ) : (
                                  "Update Order Status"
                                )}
                              </button>
                              <div
                                className={`my-5 gap-5 ml-10 px-3 py-2 text-white ${
                                  order.isProcessing
                                    ? "bg-red-700"
                                    : "bg-green-700"
                                }`}
                              >
                                {order.isProcessing
                                  ? "Processing"
                                  : "Delivered"}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </PageTransition>
      )}
    </>
  );
};

export default page;
