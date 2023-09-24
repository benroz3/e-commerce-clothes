import axios from "axios";
import dotenv from "dotenv";
import { LoginUserType, UserType } from "../types";

dotenv.config();

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

export const fetchAllUsers = async (id: string) => {
  try {
    const res = await axios.get(
      `/api/admin/all-customers`,
      {
        headers: {
          body: id,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
