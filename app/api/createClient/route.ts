import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log(formData);

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  if (!email || !name)
    return new NextResponse("All fields are required.", { status: 400 });

  const formattedEmail = email.trim().toLowerCase();
  const formattedName = name.trim();

  try {
    await connectDB();
    const userFound = await User.findOne({ formattedEmail });

    if (userFound) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash("Password123!", 10);
    const user = new User({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
      admin: false,
      initialLogin: true,
    });
    await user.save();

    return NextResponse.json({ message: "Vehicle added successfully." });
  } catch (error) {
    return new NextResponse((error as Error).message, { status: 500 });
  }
}
