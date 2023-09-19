import { NextResponse } from "next/server";
import Joi from "Joi";
import bcrypt from "bcrypt";
import User from "../models/User";
import { connectMongo } from "../database/connectMongo";

//request validator
const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectMongo();
  const { username, email, password, role } = await req.json();

  const { error } = schema.validate({ username, email, password, role });
  if (error)
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return NextResponse.json({
        success: false,
        message: "User already exists!",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser)
      return NextResponse.json({
        success: true,
        message: "Account created.",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error registering!",
    });
  }
}
