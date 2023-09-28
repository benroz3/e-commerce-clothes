"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PageTransition from "../style/PageTransition";
import Loader from "../style/Loader";
import { addToCart } from "@/utils/apiCalls/cart";
import { setShowCartModal } from "@/redux/slices/cartSlice";
import { ProductType, RootState } from "@/utils/types";

const ProductDetails: React.FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  const addToCartHandler = async (product: ProductType) => {
    setLoading(true);
    if (user) {
      const res = await addToCart({ userID: user.id, productID: product._id });

      if (res.success)
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      else
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

      setLoading(false);
      dispatch(setShowCartModal());
    }
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4">
          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    <img
                      src={product.imageUrl}
                      className="h-full w-full max-w-full object-cover"
                      alt="Product Details"
                    />
                  </div>
                </div>
                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div className="flex flex-row items-start lg:flex-col">
                    <button
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                    >
                      <img
                        src={product.imageUrl}
                        className="h-full w-full object-cover"
                        alt="Product Details"
                      />
                    </button>
                    <button
                      type="button"
                      className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                    >
                      <img
                        src={product.imageUrl}
                        className="h-full w-full object-cover"
                        alt="Product Details"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                  <h1
                    className={`text-3xl font-bold mr-2 ${
                      product.onSale === "yes" && "line-through"
                    }`}
                  >
                    ${product.price}
                  </h1>
                  {product.onSale === "yes" ? (
                    <h1 className="text-3xl font-bold text-red-600">{`$${(
                      product.price -
                      product.price * (product.priceDrop / 100)
                    ).toFixed(2)}`}</h1>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => addToCartHandler(product)}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
                >
                  {loading ? (
                    <Loader
                      text={"Adding to cart"}
                      color="#ffffff"
                      loading={loading}
                      size={10}
                    />
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  {product.deliveryInfo}
                </li>
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  {"Cancel anytime"}
                </li>
              </ul>
              <div className="lg:col-span-3">
                <div className="border-b border-gray-400">
                  <nav className="flex gap-4">
                    <a
                      href="#"
                      className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                    >
                      Description
                    </a>
                  </nav>
                </div>
                <div className="mt-8 flow-root sm:mt-12">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProductDetails;
