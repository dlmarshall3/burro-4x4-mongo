import { connectDB } from "@/lib/mongodb";
import Vehicle from "../../../models/Vehicle";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const vehicles = await Vehicle.find({});
    return NextResponse.json(vehicles);
  } catch (error) {
    console.log(error);
  }
}
