import { NextResponse } from "next/server";
import Address from "@/app/api/models/Address";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  await connectMongo();

  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const { _id, fullName, city, address, country, postalCode } =
        await req.json();

      const updatedAddress = await Address.findOneAndUpdate(
        { _id },
        { fullName, city, address, country, postalCode },
        { new: true }
      );

      if (updatedAddress)
        return NextResponse.json({
          success: true,
          message: "Address updated successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to update the address!",
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
      message: "There was an error updating the address!",
    });
  }
}
