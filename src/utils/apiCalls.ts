import axios from "axios";
import { LoginUserType, UserType } from "./types";

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

export const loginUser = async (formData: LoginUserType) => {
  try {
    const res = await axios.post("/api/login", formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
