import { NextResponse } from "next/server";
import Address from "@/app/api/models/Address";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  await connectMongo();

  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Address iD is required!",
        });

      const deletedAddress = await Address.findByIdAndDelete(id);

      if (deletedAddress)
        return NextResponse.json({
          success: true,
          message: "Address deleted successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to delete address!",
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
      message: "There was an error deleting the address!",
    });
  }
}
