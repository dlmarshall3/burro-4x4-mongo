"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, name } = values;
  const formattedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  try {
    await connectDB();
    const userFound = await User.findOne({ formattedEmail });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    // setting temporary password which they will reset upon login
    const hashedPassword = await bcrypt.hash("Password123!", 10);
    const user = new User({
      name: trimmedName,
      email: formattedEmail,
      password: hashedPassword,
      admin: false,
      initialLogin: true,
    });
    await user.save();
  } catch (e) {
    // determine error handling
  }
};
