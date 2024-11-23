import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    const nonAdminUsers = users.filter((user) => !user.admin);
    return NextResponse.json(nonAdminUsers);
  } catch (error) {}
}
