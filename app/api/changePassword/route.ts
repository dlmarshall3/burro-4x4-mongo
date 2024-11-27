import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const clientId = formData.get("clientId") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!clientId || !password) {
      return NextResponse.json(
        { error: "Client ID and new password are required!" },
        { status: 400 },
      );
    }

    // Connect to the database
    await connectDB();

    // Find the user by clientId
    const user = await User.findById(clientId);
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and reset the initial login flag
    user.password = hashedPassword;
    user.initialLogin = false;
    await user.save();

    // Return success response
    return NextResponse.json(
      { success: "Password has been successfully reset!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while resetting the password." },
      { status: 500 },
    );
  }
}
