import { NextResponse } from "next/server";
import Joi from "Joi";
import Address from "@/app/api/models/Address";
import { connectMongo } from "@/app/api/database/connectMongo";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";

const schema = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      await connectMongo();

      const { fullName, address, city, country, postalCode, userID } =
        await req.json();

      const { error } = schema.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });

      if (error)
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });

      const newAddress = await Address.create({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });

      if (newAddress)
        return NextResponse.json({
          success: true,
          message: "Address added successfully!",
        });
      else
        return NextResponse.json({
          success: false,
          message: "Failed to add address!",
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
      message: "There was an error adding the address!",
    });
  }
}
