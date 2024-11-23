import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import VehicleUpdate from "@/models/VehicleUpdate";

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const formData = await request.formData();

  const update = formData.get("update") as string;
  const files = formData.getAll("files") as File[];
  const date = formData.get("date") as string;
  const clientId = formData.get("clientId") as string;
  const vehicleId = formData.get("vehicleId") as string;

  if (!update || !date) {
    return new NextResponse("All fields are required", { status: 400 });
  }

  console.log(formData);

  try {
    const imageUrls = [];
    const folderFriendlyDate = date.replace(/\//g, '');
    for (const file of files) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("vehicles")
        .upload(
          `public/${clientId}/${vehicleId}/${folderFriendlyDate}/${file.name}`,
          file.stream(),
          {
            contentType: file.type,
            duplex: "half",
          }
        );

      if (storageError) throw new Error(storageError.message);

      const {
        data: { publicUrl: imageUrl },
      } = supabase.storage.from("vehicles").getPublicUrl(storageData.path);
      imageUrls.push(imageUrl);
    }

    await connectDB();

    const newUpdate = new VehicleUpdate({
      clientId,
      update,
      date,
      imageUrls,
    });

    newUpdate.save();

    return NextResponse.json({ message: "Updates added successfully" });
  } catch (error) {}
}

// for (const file of files) {
//   // Example: Upload each file to Supabase Storage
//   const { data, error } = await supabase.storage
//     .from("your-bucket-name")
//     .upload(`path/to/upload/${file.name}`, file);
