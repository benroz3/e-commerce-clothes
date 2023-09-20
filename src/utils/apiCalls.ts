import axios from "axios";
import {
  AvailableSizesType,
  LoginUserType,
  ProductType,
  UserType,
} from "./types";

export const registerNewUser = async (
  formData: UserType | { [key: string]: string }
) => {
  try {
    const res = await axios.post("/api/register", formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (
  formData: LoginUserType | { [key: string]: string }
) => {
  try {
    const res = await axios.post("/api/login", formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewProduct = async (
  formData:
    | ProductType
    | {
        [key: string]: string | number | AvailableSizesType[];
      }
) => {
  try {
    const res = await axios.post("/api/admin/add-product", formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
