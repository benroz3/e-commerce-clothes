import { NextResponse } from "next/server";
import AuthUser from "@/middleware/AuthUser";
import { connectMongo } from "@/app/api/database/connectMongo";
import Order from "@/app/api/models/Order";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");

      if (!userId)
        return NextResponse.json({
          success: false,
          message: "You need to be logged in!",
        });

      const allOrders = await Order.find({ user: userId }).populate(
        "orderItems.product"
      );

      if (allOrders)
        return NextResponse.json({
          success: true,
          data: allOrders,
          message: "Fetched orders successfully!",
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
      message: "Something went wrong while fetching all orders!",
    });
  }
}
