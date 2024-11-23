import { connectDB } from "@/lib/mongodb";
import Vehicle from "../../../models/Vehicle";
import { NextRequest, NextResponse } from "next/server";
import VehicleUpdate from "@/models/VehicleUpdate";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 400 });
    }

    const vehicleUpdates = await VehicleUpdate.find({
      vehicleId: vehicle._id,
    });

    // okay if there are no vehicle updates

    const vehicleObject = {
      vehicle,
      vehicleUpdates,
    };

    return NextResponse.json(vehicleObject);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
