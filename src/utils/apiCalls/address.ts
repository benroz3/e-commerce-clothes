import axios from "axios";
import { AddressType, UpdateAddressType } from "../types";

export const addNewAddress = async (address: AddressType) => {
  try {
    const res = await axios.post(
      `/api/client/address/add-new-address`,
      address,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const res = await axios.delete(
      `/api/client/address/delete-address?id=${id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllAddresses = async (userId: string) => {
  try {
    const res = await axios.get(
      `/api/client/address/get-all-addresses?userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (address: UpdateAddressType) => {
  try {
    const res = await axios.put(`/api/client/address/update-address`, address, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
