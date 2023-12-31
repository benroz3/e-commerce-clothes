"use client";
import { useRouter } from "next/navigation";
import { ProductType } from "@/utils/types";

const ProductTile: React.FC<{ product: ProductType }> = ({ product }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/product/${product._id}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
        <img
          src={product.imageUrl}
          alt="Product image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {product.onSale === "yes" && (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      )}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p
            className={`mr-3 text-sm font-semibold ${
              product.onSale === "yes" && "line-through"
            }`}
          >{`$${product.price}`}</p>
          {product.onSale === "yes" && (
            <>
              <p className="text-sm font-bold text-red-600">{`$${(
                product.price -
                product.price * (product.priceDrop / 100)
              ).toFixed(2)}`}</p>
              <p className="text-sm font-bold ml-1">{`(${product.priceDrop}% off)`}</p>
            </>
          )}
        </div>
        <h3 className="mb-2 text-gray-400 text-sm">{product.name}</h3>
      </div>
    </div>
  );
};

export default ProductTile;
