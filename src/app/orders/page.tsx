"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "@/components/style/Loader";
import { PopulatedOrderType, RootState } from "@/utils/types";
import { fetchAllOrders } from "@/utils/apiCalls/orders";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<PopulatedOrderType[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user !== null) getAllOrders();
  }, [user?.id]);

  const getAllOrders = async () => {
    if (user?.id) {
      const res = await fetchAllOrders(user?.id);

      if (res.success) {
        setOrders(res.data);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={loading} size={30} />
        </div>
      ) : (
        <section>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    {orders && orders.length && (
                      <ul className="flex flex-col gap-4">
                        {orders.map((order) => (
                          <li
                            key={order._id}
                            className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                          >
                            <div className="flex">
                              <h1 className="font-bold text-lg mb-3 flex-1">
                                #Order: {order._id}
                              </h1>
                              <div className="flex items-center">
                                <p className="mr-3 text-sm font-medium text-gray-900">
                                  Paid Amount
                                </p>
                                <p className="mr-3 text-2xl font-semibold text-gray-900">
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
                            <div className="flex items-center">
                              <button
                                className="my-5 gap-5"
                                onClick={() =>
                                  router.push(`/orders/${order._id}`)
                                }
                              >
                                View Details
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
          </div>
        </section>
      )}
    </>
  );
};

export default page;
