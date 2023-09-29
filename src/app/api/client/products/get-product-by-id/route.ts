import { NextResponse } from "next/server";
import { connectMongo } from "../../../database/connectMongo";
import Product from "../../../models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectMongo();

  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId)
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Product ID is required!",
      });

    const product = await Product.findById(productId);

    if (product)
      return NextResponse.json({
        success: true,
        message: "Fetched product successfully!",
        data: product,
      });
    else
      return NextResponse.json({
        success: false,
        message: "No product found!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error fetching the product!",
    });
  }
}
