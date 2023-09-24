import axios from "axios";
import { CartItemType } from "../types";

export const addToCart = async (item: CartItemType) => {
  try {
    const res = await axios.post(`/api/cart/add-to-cart`, item, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCartItems = async (userId: string) => {
  try {
    const res = await axios.get(`/api/cart/all-cart-items?id=${userId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (id: string) => {
  try {
    const res = await axios.delete(`/api/cart/delete-from-cart?id=${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
