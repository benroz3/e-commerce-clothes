import axios from "axios";
import { CartItemType } from "../types";

export const addToCart = async (item: CartItemType) => {
  try {
    const res = await axios.post(`/api/client/cart/add-to-cart`, item, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCartItems = async (userId: string) => {
  try {
    const res = await axios.get(
      `/api/client/cart/all-cart-items?id=${userId}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (id: string) => {
  try {
    const res = await axios.delete(
      `/api/client/cart/delete-from-cart?id=${id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
