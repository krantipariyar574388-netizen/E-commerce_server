import { Request, Response, NextFunction } from "express";
import WishList from "../models/wishList.model";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";

export const getUserWishlist = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?._id;

    const wishlist = await WishList.find({ user: userId }).populate("product");

    sendResponse(res, {
      statusCode: 200,
      message: "Wishlist fetched successfully",
      data: {
        count: wishlist.length,
        wishlist: wishlist,
      },
    });
  },
);

export const addToWishList = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productID } = req.body;
    const userID = (req as any).user?._id;

    if (!productID) throw new AppError("Product Id is required", 400);

    const isExisting = await WishList.findOne({
      user: userID,
      product: productID,
    });

    if (isExisting) {
      throw new AppError("Product already exists in your wishlist", 400);
    }

    const newWishListItem = new WishList({
      user: userID,
      product: productID,
    });

    await newWishListItem.save();

    sendResponse(res, {
      statusCode: 201,
      message: "Product added to wishlist successfully!",
      data: newWishListItem,
    });
  },
);

export const removeFromWishlist = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user?._id;

    const wishlistItem = await WishList.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!wishlistItem)
      throw new AppError("Wishlist item not found or unauthorized", 404);

    sendResponse(res, {
      statusCode: 200,
      message: "Product removed from wishlist successfully!",
      data: null,
    });
  },
);
