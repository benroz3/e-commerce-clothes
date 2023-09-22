"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "../style/PageTransition";
import ProductButton from "./ProductButton";
import ProductTile from "./ProductTile";
import { ProductType } from "@/utils/types";

const ProductsListing: React.FC<{ products: ProductType[] }> = ({
  products,
}) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <PageTransition>
      <section className="bg-white py-12 sm:py-16 ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {products && products.length
              ? products.map((product) => (
                  <article
                    key={product._id}
                    onClick={() => router.push(`/product/${product._id}`)}
                    className="relative flex flex-col overflow-hidden border cursor-pointer"
                  >
                    <ProductTile product={product} />
                    <ProductButton product={product} />
                  </article>
                ))
              : null}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ProductsListing;
