import { NextResponse } from "next/server";
import Joi from "joi";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/app/api/models/Cart";

export const dynamic = "force-dynamic";

const schema = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const data = await req.json();
      const { productID, userID } = data;

      const { error } = schema.validate({ userID, productID });
      if (error)
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });

      const isItemAlreadyExists = await Cart.find({ productID, userID });
      if (isItemAlreadyExists?.length > 0)
        return NextResponse.json({
          success: false,
          message: "Item already in cart!",
        });

      const saveToCart = await Cart.create({ productID, userID });
      if (saveToCart)
        return NextResponse.json({
          success: true,
          message: "Item added to cart successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Something went wrong while adding the product to cart!",
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
      message: "Something went wrong while adding the product to cart!",
    });
  }
}
