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
