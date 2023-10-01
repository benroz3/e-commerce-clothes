import { NextResponse } from "next/server";
import { connectMongo } from "../../../database/connectMongo";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/app/api/models/Order";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (
      userInfo &&
      typeof userInfo === "object" &&
      "role" in userInfo &&
      userInfo.role === "admin"
    ) {
      await connectMongo();

      const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = await req.json();

      const updatedOrder = await Order.findByIdAndUpdate(
        { _id },
        {
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        { new: true }
      );

      if (updatedOrder)
        return NextResponse.json({
          success: true,
          message: "Updated order successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to update the order!",
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
      message: "There was an error deleting the product!",
    });
  }
}
