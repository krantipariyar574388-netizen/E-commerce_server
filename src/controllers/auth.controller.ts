import { Request, Response,NextFunction } from "express";
import Authentication from "../models/auth.model";
import {comparePassword, hashPassword} from "../utils/bcrypt.util";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { generateJwtToken } from "../utils/jwt.util";
import ENV_CONFIG from "../config/env.config";
import { deleteFileFormCloudinary, upload } from "../utils/cloudinary.util";

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

    //* upload profile image to cloudinary
  if (file) {
    const { path, public_id } = await upload(file, "/profile_images");
    newUser.profile_image = {
      path: path,
      public_id: public_id,
    };
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

    //* generate jwt token  -> encode
  const access_token = generateJwtToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  // set cookie header
  res.cookie("access_token",access_token, {
    secure : ENV_CONFIG.NODE_ENV === "development" ? false : true,
    httpOnly : ENV_CONFIG.NODE_ENV === "development" ? false : true,
    maxAge : ENV_CONFIG.COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
    sameSite : ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
  })

  //* convert user document to object
  const { password: p, __v, ...rest } = user.toObject();


sendResponse(res, {
    message: "Login successful",
    data: { user: rest, access_token },
    statusCode: 201,
  });
});

export const update = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { fullName, email, role } = req.body;

    const auth = await Authentication.findByIdAndUpdate(
      id,
      { fullName, email, role },
      { new: true, runValidators: true }
    );

    if (!auth) {
      throw new AppError(`user with id: ${id} not found`, 404);
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Product updated successfully!",
      data: auth,
    });
  }
);

//* change profile image
// 1  -> token
// 2  /2
// auth/change-profile
export const changeProfileImage = cathAsync(async (req, res) => {
  const file = req.file;
  const userId = req.user?._id;
  if (!file) throw new AppError("image is required", 400);

  const user = await Authentication.findOne({ _id: userId });

  if (!user) throw new AppError("user not found", 404);

  const { path, public_id } = await upload(file, "/profile_images");

  if (user.profile_image) {
    deleteFileFormCloudinary(user.profile_image.public_id);
  }

  user.profile_image = {
    path,
    public_id,
  };

  await user.save();

  sendResponse(res, {
    message: "profile image updated",
    statusCode: 201,
    data: user,
  });
});
