import axios from "axios";
import dotenv from "dotenv";
import { AvailableSizesType, ProductType, UpdateProductType } from "../types";

dotenv.config();

export const addNewProduct = async (
  formData:
    | ProductType
    | {
        [key: string]: string | number | AvailableSizesType[];
      }
) => {
  try {
    const res = await axios.post(`/api/admin/add-product`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.APP_URL}/api/client/products/all-products`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  formData:
    | UpdateProductType
    | {
        [key: string]: string | number | AvailableSizesType[];
      }
) => {
  try {
    const res = await axios.put(`/api/admin/update-product`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`/api/admin/delete-product?id=${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilteredProducts = async (category: string) => {
  try {
    const res = await axios.get(
      `${process.env.APP_URL}/api/client/products/product-by-category?category=${category}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.APP_URL}/api/client/products/product-by-id?id=${id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
