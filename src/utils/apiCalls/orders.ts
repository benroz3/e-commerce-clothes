import axios from "axios";
import { OrderType, StripeSessionItemType, PopulatedOrderType } from "../types";

export const callStripeSession = async (formData: StripeSessionItemType[]) => {
  try {
    const res = await axios.post(`/api/client/orders/stripe`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (formData: OrderType) => {
  try {
    const res = await axios.post(`/api/client/orders/create-order`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllOrders = async (userId: string) => {
  try {
    const res = await axios.get(
      `/api/client/orders/get-all-orders?userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderById = async (id: string) => {
  try {
    const res = await axios.get(`/api/client/orders/get-order-by-id?id=${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllOrdersForAdmin = async () => {
  try {
    const res = await axios.get(`/api/admin/orders/get-all-orders`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (formData: PopulatedOrderType) => {
  try {
    const res = await axios.put(`/api/admin/orders/update-order`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
