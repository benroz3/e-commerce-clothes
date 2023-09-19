import { NextResponse } from "next/server";
import dotenv from "dotenv";
import Joi from "Joi";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import User from "../models/User";
import { connectMongo } from "../database/connectMongo";

dotenv.config();
const JWT_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectMongo();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });
  if (error)
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });

  try {
    const userExists = await User.findOne({ email });
    if (!userExists)
      return NextResponse.json({
        success: false,
        message: "Account not found!",
      });

    const validPassword = await compare(password, userExists.password);
    if (!validPassword)
      return NextResponse.json({
        success: false,
        message: "Wrong email of password!",
      });

    const token = jwt.sign(
      { id: userExists._id, email: userExists.email, role: userExists.role },
      JWT_KEY,
      { expiresIn: "1d" }
    );

    const completeToken = {
      token,
      user: {
        id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        role: userExists.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login successful!",
      token: completeToken,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error logging in!",
    });
  }
}
