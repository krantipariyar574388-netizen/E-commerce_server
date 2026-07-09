import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  fullName : string;
  email : string;
  password : string;
  role : "USER" | "ADMIN",
  profile_image? : string;
}

const authSchema: Schema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true,'Name is required'],
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: [true,'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role : {
      type : String,
      enum : ["USER", "ADMIN"],
      default : "USER",
    },
    password: {
      type: String,
      required: [true,'Password is required'],
      minLength: 6,
      select : false,
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

const Authentication = mongoose.model<IUser>("Authentication", authSchema);

export default Authentication;