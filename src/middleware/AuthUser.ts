import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const dynamic = "force-dynamic";

dotenv.config();
const JWT_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";

const AuthUser = async (req: Request) => {
  const token = req.headers.get("cookie")?.substring(6);

  if (!token) return false;

  try {
    const userInfo = jwt.verify(token, JWT_KEY);
    if (userInfo) return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default AuthUser;
