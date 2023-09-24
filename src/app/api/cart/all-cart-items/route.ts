import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import AuthUser from "@/middleware/AuthUser";
import Cart from "../../models/Cart";

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
          message: "Please log in to access cart!",
        });

      const cartItems = await Cart.find({ userID: id })
        .populate("userID")
        .populate("productID");

      if (cartItems)
        return NextResponse.json({
          success: true,
          message: "Fetched cart successfully!",
          data: cartItems,
        });
      else
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No cart items found!",
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
      message: "Something went wrong while fetching the cart!",
    });
  }
}
