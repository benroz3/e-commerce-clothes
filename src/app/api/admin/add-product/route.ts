import { NextResponse } from "next/server";
import Joi from "Joi";
import Product from "../../models/Product";
import { connectMongo } from "../../database/connectMongo";

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  priceDrop: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectMongo();

  try {
    const user = "admin"; //! dummy data

    if (user === "admin") {
      const {
        name,
        description,
        price,
        priceDrop,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
      } = await req.json();

      const { error } = schema.validate({
        name,
        description,
        price,
        priceDrop,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
      });
      if (error)
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });

      const newProduct = await Product.create({
        name,
        description,
        price,
        priceDrop,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
      });
      if (newProduct)
        return NextResponse.json({
          success: true,
          message: "Product created successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to add product! Please try again.",
        });
    } else
      return NextResponse.json({
        success: false,
        message: "You are not authorized to create a product!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error creating a product!",
    });
  }
}
