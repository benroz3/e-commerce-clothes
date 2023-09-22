import { NextResponse } from "next/server";
import { connectMongo } from "../../database/connectMongo";
import User from "../../models/User";
import { UserRowType } from "@/utils/types";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectMongo();

  try {
    const users = await User.find({ role: "customer" });

    let usersWithoutPass: UserRowType[] = [];

    users.map((user) =>
      usersWithoutPass.push({
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );

    if (users)
      return NextResponse.json({
        success: true,
        message: "Users fetched successfully!",
        data: usersWithoutPass,
      });
    else
      return NextResponse.json({
        success: false,
        status: 204,
        message: "No Users found!",
      });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "There was an error fetching Users!",
    });
  }
}
