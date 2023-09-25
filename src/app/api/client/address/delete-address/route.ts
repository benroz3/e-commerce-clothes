import { NextResponse } from "next/server";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  await connectMongo();

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
      message: "There was an error deleting the address!",
    });
  }
}
