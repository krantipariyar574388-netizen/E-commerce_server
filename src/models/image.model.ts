import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: [true, "image path is required"],
    },
    public_id: {
      type: String,
      required: [true, "image public_id is required"],
    },
  },
  { _id: false },
);