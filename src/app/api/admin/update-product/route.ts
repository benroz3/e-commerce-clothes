import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import Product from "../../models/Product";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  await connectMongo();

  try {
    const product = await req.json();
    const {
      _id,
      name,
      description,
      price,
      priceDrop,
      imageUrl,
      category,
      sizes,
      deliveryInfo,
      onSale,
    } = product;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id },
      {
        name,
        description,
        price,
        priceDrop,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
      },
      { new: true }
    );

    if (updatedProduct)
      return NextResponse.json({
        success: true,
        message: "Product updated successfully!",
      });
    else
      return NextResponse.json({
        success: false,
        message: "There was an error updating the product!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error updating the product!",
    });
  }
}
