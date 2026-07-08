import { Request, Response,NextFunction } from "express";
import Authentication from "../models/auth.model";


// 1. Register User
export const register = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { fullName, email, password, profile_image } = req.body;

    // Check if email already exists
    const existingUser = await Authentication.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User with this email already exists",
        success: false,
        data: null,
      });
      return;
    }

    const newUser = await Authentication.create({
      fullName,
      email,
      password,
      profile_image: profile_image || "",
    });

    res.status(201).json({
      message: "User registered successfully!",
      status: "success",
      success: true,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await Authentication.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid email!",
        success: false,
        data: null,
      });
      return;
    }

    if (user.password !== password) {
      res.status(400).json({
        message: "Invalid password!",
        success: false,
        data: null,
      });
      return;
    }

    res.status(200).json({
      message: "Logged in successfully!",
      status: "success",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
