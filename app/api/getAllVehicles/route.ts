import { connectDB } from "@/lib/mongodb";
import Vehicle from "../../../models/Vehicle";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({});
    return NextResponse.json(vehicles);
  } catch (error) {}
}
