"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import PageTransition from "@/components/style/PageTransition";
import Loader from "@/components/style/Loader";
import { getAllProducts } from "@/utils/apiCalls/products";
import { setCartItems } from "@/redux/slices/cartSlice";
import { ProductType, RootState } from "@/utils/types";
import { fetchAllCartItems } from "@/utils/apiCalls/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  mainImg,
  kidsImg,
  womenImg,
  menImage,
} from "@/utils/data/landingPageImages";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
    if (!Cookies.get("token")) localStorage.clear();
  }, [user?.id]);

  const fetchProducts = async () => {
    const res = await getAllProducts();

    if (res.success) setProducts(res.data);
    setLoading(false);
  };

  const fetchCartItems = async () => {
    if (user) {
      const res = await fetchAllCartItems(user?.id);
      if (res.success) dispatch(setCartItems(res.data));
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Loader text={""} color="#000000" loading={loading} size={30} />
        </div>
      ) : (
        <PageTransition>
          <section>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                  Best Fashion Collection
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                  Elevate your wardrobe with our exquisite range of clothing,
                  where fashion meets comfort. Explore now and redefine your
                  style journey with us!
                </p>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                >
                  Explore Shop Collection
                </button>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src={mainImg} alt="Clothing-X" />
              </div>
            </div>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                  <div className="max-w-md mx-auto text-center lg:text-left">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        End Of Season Sale
                      </h2>
                    </div>
                    <button className="w-full">Show All</button>
                  </div>
                </div>
                <div className="lg:col-span-2 lg:py-8">
                  <ul className="grid grid-cols-2 gap-4">
                    {products &&
                      products.length &&
                      products
                        .filter((product) => product.onSale === "yes")
                        .splice(0, 2)
                        .map((onSaleProduct) => (
                          <li
                            key={onSaleProduct._id}
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(`/product/${onSaleProduct._id}`)
                            }
                          >
                            <div>
                              <img
                                src={onSaleProduct.imageUrl}
                                alt="Product image"
                                className="object-cover w-full rounded aspect-square"
                              />
                            </div>
                            <div className="mt-3">
                              <h3 className="font-medium text-gray-900">
                                {onSaleProduct.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-800">
                                $
                                {(
                                  onSaleProduct.price -
                                  onSaleProduct.price *
                                    (onSaleProduct.priceDrop / 100)
                                ).toFixed(2)}{" "}
                                <span className="text-red-700">{`- ${onSaleProduct.priceDrop}% OFF`}</span>
                              </p>
                            </div>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
                  SHOP BY CATEGORY
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
                <li>
                  <div className="relative block group">
                    <img
                      src={kidsImg}
                      alt="Clothing-X"
                      className="object-cover w-full aspect-square"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">KIDS</h3>
                      <button
                        onClick={() => router.push(`/product/listing/kids`)}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative block group">
                    <img
                      src={menImage}
                      alt="Clothing-X"
                      className="object-cover w-full aspect-square"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">MEN</h3>
                      <button
                        onClick={() => router.push(`/product/listing/men`)}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </li>
                <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                  <div className="relative block group">
                    <img
                      src={womenImg}
                      alt="Clothing-X"
                      className="object-cover w-full aspect-square"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">WOMEN</h3>
                      <button
                        onClick={() => router.push(`/product/listing/women`)}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </PageTransition>
      )}
    </>
  );
}
