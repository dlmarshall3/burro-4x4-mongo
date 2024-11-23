import mongoose, { Schema, model } from "mongoose";

export interface VehicleDocument {
  _id: string;
  clientId: string;
  year: string;
  make: string;
  model: string;
  imageUrl: string;
}

const VehicleSchema = new Schema<VehicleDocument>(
  {
    clientId: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
