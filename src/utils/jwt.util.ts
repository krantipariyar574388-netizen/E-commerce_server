import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Role } from "../@types/enum.types";

interface IJwtPayload {
  _id: mongoose.Types.ObjectId;
  email: string;
  role: Role;
}

export const generateJwtToken = (payload: IJwtPayload) => {
  try {
    return jwt.sign(payload, "ksdfnjn8943y8hfn9q84hnwhfe9824yr23t2whf", {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};