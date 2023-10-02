import { NextResponse } from "next/server";
import dotenv from "dotenv";
import AuthUser from "@/middleware/AuthUser";

export const dynamic = "force-dynamic";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const userInfo = await AuthUser(req);

    if (userInfo) {
      const data = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: data,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?status=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?status=cancel`,
      });

      return NextResponse.json({
        success: true,
        message: "Payment successful!",
        id: session.id,
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
      message: "Something went wrong in the payment process!",
    });
  }
}
