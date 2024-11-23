import mongoose, { Schema, model } from "mongoose";

export interface VehicleUpdate {
  _id: string;
  clientId: string;
  update: string;
  date: string;
  imageUrls: Array<string>;
}

const VehicleUpdateSchema = new Schema<VehicleUpdate>(
  {
    clientId: {
      type: String,
      required: true,
    },
    update: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VehicleUpdate =
  mongoose.models.VehicleUpdate ||
  mongoose.model("VehicleUpdate", VehicleUpdateSchema);
export default VehicleUpdate;
