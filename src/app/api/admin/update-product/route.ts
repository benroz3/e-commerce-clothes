import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import Product from "../../models/Product";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (
      userInfo &&
      typeof userInfo === "object" &&
      "role" in userInfo &&
      userInfo.role === "admin"
    ) {
      await connectMongo();

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
    } else
      return NextResponse.json({
        success: false,
        message: "You are not authorized!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error updating the product!",
    });
  }
}
