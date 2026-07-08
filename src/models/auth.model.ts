import mongoose, { Schema } from "mongoose";

const authSchema: Schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profile_image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Authentication = mongoose.model("Authentication", authSchema);

export default Authentication;