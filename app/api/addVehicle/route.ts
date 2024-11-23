import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import { connectDB } from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const supabase = createClient();
  const formData = await req.formData();

  const year = formData.get("year") as string;
  const make = formData.get("make") as string;
  const model = formData.get("model") as string;
  const clientId = formData.get("clientId") as string;
  const clientName = formData.get("clientName") as string;
  const file = formData.get("file") as File;

  if (!year || !make || !model || !clientId || !file || !clientName) {
    return new Response("All fields are required.", { status: 400 });
  }

  try {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("vehicles")
      .upload(`public/${clientId}/${file.name}`, file.stream(), {
        contentType: file.type,
        duplex: "half",
      });

    if (storageError) {
      throw new Error(storageError.message);
    }

    const {
      data: { publicUrl: imageUrl },
    } = supabase.storage.from("vehicles").getPublicUrl(storageData.path);

    await connectDB();

    const vehicle = new Vehicle({
      year,
      make,
      model,
      clientId,
      clientName,
      imageUrl,
    });

    vehicle.save();

    return NextResponse.json({ message: "Vehicle added successfully." });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
