"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toast } from "react-toastify";
import PageTransition from "@/components/style/PageTransition";
import TileComponent from "@/components/formElements/TileComponent";
import InputComponent from "@/components/formElements/InputComponent";
import SelectComponent from "@/components/formElements/SelectComponent";
import Loader from "@/components/style/Loader";
import { adminAddProductFormControls } from "@/utils/data/formControls";
import { uploadImageToFirebase } from "@/utils/firebase";
import { AvailableSizes } from "@/utils/data/sizes";
import { addNewProduct, updateProduct } from "@/utils/apiCalls/products";
import { setProduct } from "@/redux/slices/productSlice";
import {
  AdminProductFormControlsType,
  AvailableSizesType,
  RootState,
  UpdateProductType,
} from "@/utils/types";

const page = () => {
  const initialProduct:
    | {
        [key: string]: string | number | AvailableSizesType[];
      }
    | UpdateProductType = {
    name: "",
    description: "",
    price: 0,
    priceDrop: 0,
    category: "men",
    sizes: [],
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(initialProduct);
  const { updatedProduct } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (updatedProduct) {
      const adaptedProduct: {
        [key: string]: string | number | AvailableSizesType[];
      } = {
        _id: updatedProduct._id || "",
        name: updatedProduct.name || "",
        description: updatedProduct.description || "",
        price: updatedProduct.price || 0,
        priceDrop: updatedProduct.priceDrop || 0,
        category: updatedProduct.category || "men",
        sizes: updatedProduct.sizes || [],
        deliveryInfo: updatedProduct.deliveryInfo || "",
        onSale: updatedProduct.onSale || "no",
        imageUrl: updatedProduct.imageUrl || "",
      };

      setProductData(adaptedProduct);
    }
  }, [updatedProduct]);

  const tileClickHandler = (size: AvailableSizesType) => {
    let sizes = [...(productData.sizes as AvailableSizesType[])];
    const index = sizes.findIndex((item) => item.id === size.id);

    if (index === -1) sizes.push(size);
    else sizes = sizes.filter((item) => item.id !== size.id);

    setProductData({
      ...productData,
      sizes,
    });
  };

  const imageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let imageFirebaseUrl;
    if (event && event.target && event.target.files)
      imageFirebaseUrl = await uploadImageToFirebase(event?.target?.files[0]);

    if (imageFirebaseUrl)
      setProductData({
        ...productData,
        imageUrl: imageFirebaseUrl.toString(),
      });
  };

  const addProductHandler = async () => {
    setLoading(true);
    const data = updatedProduct
      ? await updateProduct(productData)
      : await addNewProduct(productData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setProductData(initialProduct);
      dispatch(setProduct(null));
      setLoading(false);

      router.push("/admin-view/all-products");
    } else {
      setLoading(false);
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <PageTransition>
      <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
        <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
            <input
              className="hidden file:bg-black "
              accept="image/*"
              max="1000000"
              type="file"
              id="img"
              onChange={imageHandler}
            />
            <label
              htmlFor="img"
              className="bg-black text-white border-none outline-none p-2 cursor-pointer hover:bg-gray-300 hover:text-black hover:border-black hover:transition hover:ease-in hover:duration-150"
            >
              Choose Product Image
            </label>
            <div className="flex gap-2 flex-col">
              <label>Available sizes</label>
              <TileComponent
                data={AvailableSizes}
                selectedData={productData.sizes as AvailableSizesType[]}
                onClick={tileClickHandler}
              />
            </div>
            {adminAddProductFormControls.map(
              (control: AdminProductFormControlsType) =>
                control.componentType === "input" ? (
                  <InputComponent
                    key={control.id}
                    label={control.label}
                    placeholder={control.placeholder}
                    type={control.type}
                    value={productData[control.id]?.toString() || ""}
                    onChange={(event) =>
                      setProductData({
                        ...productData,
                        [control.id]: event.target.value,
                      })
                    }
                  />
                ) : control.componentType === "select" ? (
                  <SelectComponent
                    key={control.id}
                    label={control.label}
                    value={productData[control.id]?.toString() || ""}
                    options={
                      control.options
                        ? control.options
                        : [{ id: "", label: "" }]
                    }
                    onChange={(event) =>
                      setProductData({
                        ...productData,
                        [control.id]: event.target.value,
                      })
                    }
                  />
                ) : null
            )}
            <button
              onClick={addProductHandler}
              className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            >
              {loading ? (
                <Loader
                  text={
                    updatedProduct ? "Updating Product" : "Adding New Product"
                  }
                  color="#ffffff"
                  loading={loading}
                  size={10}
                />
              ) : updatedProduct ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default page;
