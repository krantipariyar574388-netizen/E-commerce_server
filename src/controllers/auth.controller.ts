import { Request, Response,NextFunction } from "express";
import Authentication from "../models/auth.model";
import {comparePassword, hashPassword} from "../utils/bcrypt.util";

// 1. Register User
export const register = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if email already exists
    // const User = await Authentication.findOne({ email });

    // if (existingUser) {
    //   res.status(400).json({
    //     message: "User with this email already exists",
    //     success: false,
    //     data: null,
    //   });
    //   return;
    // }

    if(!fullName) {
      const error : any = new Error("Full name is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    if(!email) {
      const error : any = new Error("Email is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    if(!password) {
      const error : any = new Error("password is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    const newUser = new Authentication({
      fullName,
      email,
      password,
    });

    // hash password
    const hash = await hashPassword(password);
    newUser.password = hash;

    //save user
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      status: "success",
      success: true,
      data: {
        _id : newUser._id,
        email : newUser.email,
        fullName : newUser.fullName,
        role : newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { email, password } = req.body;

    // const user = await Authentication.findOne({ email });

    // if (!user) {
    //   res.status(400).json({
    //     message: "Invalid email!",
    //     success: false,
    //     data: null,
    //   });
    //   return;
    // }

    // if (user.password !== password) {
    //   res.status(400).json({
    //     message: "Invalid password!",
    //     success: false,
    //     data: null,
    //   });
    //   return;
    // }

    if(!email) {
      const error : any = new Error("Email is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    if(!password) {
      const error : any = new Error("password is required");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    const user = await Authentication.findOne({email}).select("+password");

    if(!user) {
      const error : any = new Error("invalid credentials");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    // check password
    const isPasswordMatched = await comparePassword(password, user.password);

    //password not matched
    if (!isPasswordMatched) {
      const error : any = Error("invalid credentials");
      error.status = "fail";
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: "Logged in successfully!",
      status: "success",
      success: true,
      data: {
        _id : user._id,
        email : user.email,
        fullName : user.fullName,
        role : user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
