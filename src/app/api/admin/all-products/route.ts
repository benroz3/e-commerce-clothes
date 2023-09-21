import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import Product from "../../models/Product";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();

  try {
    const user = "admin"; //! dummy data

    if (user === "admin") {
      const products = await Product.find({});

      if (products)
        return NextResponse.json({
          success: true,
          message: "Products fetched successfully!",
          data: products,
        });
      else
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No products found!",
        });
    } else
      return NextResponse.json({
        success: false,
        message: "You are not authenticated!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error fetching the products!",
    });
  }
}
