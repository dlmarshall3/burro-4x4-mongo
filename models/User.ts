import mongoose, { Schema } from "mongoose";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  admin: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  initialLogin: boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    initialLogin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
