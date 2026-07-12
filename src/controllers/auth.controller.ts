import { Request, Response,NextFunction } from "express";
import Authentication from "../models/auth.model";
import {comparePassword, hashPassword} from "../utils/bcrypt.util";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";

// 1. Register User
export const register = cathAsync(async (req: Request, res: Response, next : NextFunction) => {

    const { fullName, email, password } = req.body;

    const file = req.file;
    console.log(file);

     if(!fullName) throw new AppError ("Full name is required",400);

    if(!email) throw new AppError ("Email is required",400);

    if(!password) throw new AppError ("Password is required", 400);

    const newUser = new Authentication({
      fullName,
      email,
      password,
    });

    // hash password
    const hash = await hashPassword(password);
    newUser.password = hash;

    // upload profile image
    if (file) {
      newUser.profile_image = file.path;
    }

    //save user
    await newUser.save();

    // success response
    sendResponse(res, {
      message: "User registered successfully!",
      data: {
        _id : newUser._id,
        email : newUser.email,
        fullName : newUser.fullName,
        role : newUser.role,
        profile_image : newUser.profile_image,
      },
      statusCode : 201,
    });
    });

export const login = cathAsync(async (req: Request, res: Response, next : NextFunction) => {
    const { email, password } = req.body;

    if(!email) throw new AppError ("Email is required", 400);

    if(!password) throw new AppError ("Password is required", 400);
    const user = await Authentication.findOne({email}).select("+password");

    if(!user) throw new AppError ("Invalid credentials", 400);

    // check password
    const isPasswordMatched = await comparePassword(password, user.password);

    //password not matched
    if (!isPasswordMatched) throw new AppError ("Invalid credentials", 400);

//     res.status(200).json({
//       message: "Logged in successfully!",
//       status: "success",
//       success: true,
//       data: {
//         _id : user._id,
//         email : user.email,
//         fullName : user.fullName,
//         role : user.role,
//       },
//     });
//   }
// )

sendResponse(res, {
      message: "Logged in successfully!",
      data: {
        _id : user._id,
        email : user.email,
        fullName : user.fullName,
        role : user.role,
      },
      statusCode : 201,
    });
});