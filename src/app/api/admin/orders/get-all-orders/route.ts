import { NextResponse } from "next/server";
import { connectMongo } from "../../../database/connectMongo";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/app/api/models/Order";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (
      userInfo &&
      typeof userInfo === "object" &&
      "role" in userInfo &&
      userInfo.role === "admin"
    ) {
      await connectMongo();

      const orders = await Order.find({})
        .populate("orderItems.product")
        .populate("user", "-password");

      if (orders)
        return NextResponse.json({
          success: true,
          message: "Orders fetched successfully!",
          data: orders,
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to fetch orders!",
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
      message: "There was an error fetching the orders!",
    });
  }
}
