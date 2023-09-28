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
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Order ID is required!",
        });

      const order = await Order.findById(id).populate("orderItems.product");

      if (order)
        return NextResponse.json({
          success: true,
          data: order,
          message: "Fetched the order successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to fetch the order!",
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
      message: "Something went wrong while fetching the order!",
    });
  }
}
