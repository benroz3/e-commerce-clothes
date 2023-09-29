import { NextResponse } from "next/server";
import { connectMongo } from "../../../database/connectMongo";
import Product from "../../../models/Product";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (
      userInfo &&
      typeof userInfo === "object" &&
      "role" in userInfo &&
      userInfo.role === "admin"
    ) {
      await connectMongo();

      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Product ID is required!",
        });

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct)
        return NextResponse.json({
          success: true,
          message: "Product deleted successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "There was an error deleting the product!",
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
