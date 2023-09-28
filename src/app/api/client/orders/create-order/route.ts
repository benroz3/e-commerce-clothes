import { NextResponse } from "next/server";
import Joi from "Joi";
import AuthUser from "@/middleware/AuthUser";
import { connectMongo } from "@/app/api/database/connectMongo";
import Order from "@/app/api/models/Order";
import Cart from "@/app/api/models/Cart";

export const dynamic = "force-dynamic";

const schema = Joi.object({});

export async function POST(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const order = await req.json();
      const newOrder = await Order.create(order);
      const { user } = order;

      if (newOrder) {
        await Cart.deleteMany({ userID: user });

        return NextResponse.json({
          success: true,
          message: "Order is successful!",
        });
      } else
        return NextResponse.json({
          success: false,
          message: "Failed to create an order!",
        });
    } else
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while creating the order!",
    });
  }
}
