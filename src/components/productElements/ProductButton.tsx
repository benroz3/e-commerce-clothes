"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../style/Loader";
import { setShowCartModal } from "@/redux/slices/cartModalSlice";
import { setProduct } from "@/redux/slices/productSlice";
import { deleteProduct } from "@/utils/apiCalls/products";
import { addToCart } from "@/utils/apiCalls/cart";
import { ProductType, RootState, UpdateProductType } from "@/utils/types";

const ProductButton: React.FC<{ product: ProductType | UpdateProductType }> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
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

  const addToCartHandler = async (product: ProductType) => {
    setLoading(true);
    if (user) {
      const data = await addToCart({ userID: user.id, productID: product._id });

      if (data.success) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

      setLoading(false);
      dispatch(setShowCartModal());
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
      <button onClick={() => addToCartHandler(product as ProductType)}>
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
    </>
  );
};

export default ProductButton;
