import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import Product from "../../models/Product";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  await connectMongo();

  try {
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
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error deleting the product!",
    });
  }
}
