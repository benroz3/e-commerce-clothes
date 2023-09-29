"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "@/components/style/Loader";
import { fetchOrderById } from "@/utils/apiCalls/orders";
import { PopulatedOrderType, RootState } from "@/utils/types";

const page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<PopulatedOrderType>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getOrderById();
  }, []);

  const getOrderById = async () => {
    const res = await fetchOrderById(params.id);

    if (res.success) {
      setOrder(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={loading} size={30} />
        </div>
      ) : (
        <div className="py-14 px-4 md:px-6">
          <div className="flex justify-start items-start space-y-2 flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-900">
              Order #{order?._id}
            </h1>
            <p className="text-base font-medium leading-6 text-gray-600">
              {order?.createdAt.split("T")[0]} |{" "}
              {order?.createdAt.split("T")[1].split(".")[0]}
            </p>
          </div>
          <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-100 px-4 py-4 md:p-6 xl:p-8 w-full">
                <p className="font-bold text-lg">Order Summary</p>
                {order?.orderItems
                  ? order.orderItems.map((product) => (
                      <div
                        key={product.product._id}
                        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                      >
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            src={product.product.imageUrl}
                            alt="Product image"
                            className="w-full hidden md:block"
                          />
                        </div>
                        <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl font-semibold leading-6 text-gray-900">
                              {product.product.name}
                            </h3>
                          </div>
                          <div className="w-full flex justify-between items-start space-x-8">
                            <h3 className="text-xl font-semibold leading-6 text-gray-900">
                              $
                              {(product.product.onSale === "yes"
                                ? product.product.price -
                                  product.product.price *
                                    (product.product.priceDrop / 100)
                                : product.product.price
                              ).toFixed(2)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 space-y-6">
                  <h3 className="text-xl font-semibold leading-6 text-gray-900">
                    Details
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-300 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-5 text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-5 text-gray-900">
                        $
                        {order && order.orderItems
                          ? order.orderItems
                              .reduce(
                                (total, item) => item.product.price + total,
                                0
                              )
                              .toFixed(2)
                          : 0}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-5 text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-5 text-gray-900">$0</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-5 text-gray-800">Total</p>
                      <p className="text-base leading-5 text-gray-900">
                        ${order?.totalPrice.toString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-gray-100 w-full xl:w-96 flex items-center md:items-start px-4 py-6 flex-col">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                  Customer Details
                </h3>
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex flex-col justify-center w-full md:justify-start gap-5 py-8 border-b border-gray-300">
                    <p className="text-base font-semibold leading-4 text-left text-gray-500">
                      Username: {user?.username}
                    </p>
                    <p className="text-base font-semibold leading-4 text-left text-gray-500">
                      Email: {user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 px-4">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8 border-b border-gray-300 pb-6">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                      Shipping Address
                    </h3>
                    <p className="text-gray-500">
                      Address: {order?.shippingAddress.address}
                    </p>
                    <p className="text-gray-500">
                      City: {order?.shippingAddress.city}
                    </p>
                    <p className="text-gray-500">
                      Country: {order?.shippingAddress.country}
                    </p>
                    <p className="text-gray-500">
                      Postal Code: {order?.shippingAddress.postalCode}
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={() => router.push("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
