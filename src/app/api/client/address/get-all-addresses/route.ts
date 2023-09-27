import { NextResponse } from "next/server";
import Address from "@/app/api/models/Address";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectMongo();

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

      const addresses = await Address.find({ userID: userId });

      if (addresses)
        return NextResponse.json({
          success: true,
          message: "Fetched addresses successfully!",
          data: addresses,
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to fetch your addresses!",
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
      message: "There was an error fetching the address!",
    });
  }
}
