import axios from "axios";
import dotenv from "dotenv";
import {
  AvailableSizesType,
  LoginUserType,
  ProductType,
  UpdateProductType,
  UserType,
} from "./types";

dotenv.config();

// users ========================================================
export const registerNewUser = async (
  formData: UserType | { [key: string]: string }
) => {
  try {
    const res = await axios.post(`/api/register`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (
  formData: LoginUserType | { [key: string]: string }
) => {
  try {
    const res = await axios.post(`/api/login`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get(`${process.env.APP_URL}/api/admin/all-customers`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// products ========================================================
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
      `${process.env.APP_URL}/api/admin/all-products`,
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
      `${process.env.APP_URL}/api/admin/product-by-category?category=${category}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
