import { NextResponse } from "next/server";
import { connectMongo } from "../../../database/connectMongo";
import Product from "../../../models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await connectMongo();

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const filteredProducts = await Product.find(
      category === "" ? {} : { category: category }
    );

    if (filteredProducts)
      return NextResponse.json({
        success: true,
        message: "Fetched filtered products successfully!",
        data: filteredProducts,
      });
    else
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No products found!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error fetching the products!",
    });
  }
}
