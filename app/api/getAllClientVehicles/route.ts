import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Vehicle from "../../../models/Vehicle";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json(
        { error: "ClientId is required" },
        { status: 400 },
      );
    }

    const clientVehicles = await Vehicle.find({ clientId });

    return NextResponse.json(clientVehicles);
  } catch (error) {
    console.log(error);
  }
}
