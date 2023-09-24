"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ProductType, UpdateProductType } from "@/utils/types";
import { setProduct } from "@/redux/slices/productSlice";
import { deleteProduct } from "@/utils/apiCalls/products";
import Loader from "../style/Loader";

const ProductButton: React.FC<{ product: ProductType | UpdateProductType }> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const isAdminView = pathname.includes("admin-view");

  const deleteProductHandler = async (id: string) => {
    setLoading(true);
    const data = await deleteProduct(id);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setLoading(false);
      router.refresh();
    } else {
      setLoading(false);
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          dispatch(setProduct(product));
          router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button onClick={() => deleteProductHandler(product._id)}>
        {loading ? (
          <Loader
            text={"Deleting Product"}
            color="#ffffff"
            loading={loading}
            size={10}
          />
        ) : (
          "Delete"
        )}
      </button>
    </>
  ) : (
    <>
      <button>Add To Cart</button>
    </>
  );
};

export default ProductButton;
