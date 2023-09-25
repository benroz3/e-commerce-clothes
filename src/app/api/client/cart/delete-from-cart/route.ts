import { NextResponse } from "next/server";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/app/api/models/Cart";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Item ID is required!",
        });

      const deletedItem = await Cart.findByIdAndDelete(id);

      if (deletedItem)
        return NextResponse.json({
          success: true,
          message: "Item deleted successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to delete item from cart!",
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
      message: "Something went wrong while deleting the cart!",
    });
  }
}
