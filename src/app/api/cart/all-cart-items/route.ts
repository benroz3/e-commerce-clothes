import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import AuthUser from "@/middleware/AuthUser";
import Cart from "../../models/Cart";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();
    } else
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong while adding the product to cart!",
    });
  }
}
