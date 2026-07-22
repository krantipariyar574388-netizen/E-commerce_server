import { Request, Response, NextFunction } from "express";
import Cart from "../models/cart.model";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";


export const getCart = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = (req as any ).user?._id;

    if (!userID) {
      throw new AppError("Unauthorized access!", 401);
    }

    const cart = await Cart.findOne({ user: userID }).populate("items.product");

    sendResponse(res, {
      statusCode: 200,
      message: cart ? "Cart fetched successfully!!" : "Cart is empty",
      data: cart || { user: userID, items: [] },
    });
  }
);

export const addToCart = cathAsync(
    async(req : Request, res : Response, next : NextFunction) => {
        const userID = (req as any ).user?._id; 
        const { productID, quantity } = req.body;

        if (!userID || !productID) {
            throw new AppError("User id and product id are required!!", 400);
        }

        const itemQuantity = quantity && quantity > 0 ? Number(quantity) : 1;

        let cart = await Cart.findOne({ user : userID});

        if(!cart) {
            cart = new Cart({
                user : userID,
                items : [{ product : productID, quantity : itemQuantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productID
            );

            if(itemIndex > -1) {
                cart.items[itemIndex].quantity += itemQuantity;
            } else {
                cart.items.push({ product : productID, quantity : itemQuantity });
            }
        }

        await cart.save();
        await cart.populate("items.product");

        sendResponse(res, {
            statusCode : 200,
            message : "Item added to card successfully!!",
            data : cart,
        });
    }
);

export const updateQuantity = cathAsync(
    async(req : Request, res : Response, next : NextFunction) => {
        const userID = (req as any ).user?._id;
        const productID = req.params.id;
        const { quantity } = req.body;

        if(!userID || !productID || quantity === undefined) {
            throw new AppError("User ID, product ID and quantity are required!!", 400);
        }

        if(quantity < 1) {
            throw new AppError("Quantity must be at least 1", 400);
        }

        const cart = await Cart.findOne({ user : userID});

        if(!cart) {
            throw new AppError("Cart not found for this user", 404);
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productID
        );

        if(itemIndex === -1){
            throw new AppError("Product not found in cart", 404);
        }
        cart.items[itemIndex].quantity = quantity;

        await cart.save();
        await cart.populate("items.product");

        sendResponse(res, {
            statusCode : 200,
            message : "Cart item quantity updated successfully!!",
            data : cart,
        });
    }
);

export const removeItem = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const userID = (req as any).user?._id;
    const productID = req.params.id; 

    if (!productID) {
      throw new AppError("Product ID is required!!", 400);
    }

    const cart = await Cart.findOne({ user: userID });

    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productID
    );

    if (cart.items.length === initialLength) {
      throw new AppError("Product not found in cart", 404);
    }

    await cart.save();
    await cart.populate("items.product");

    sendResponse(res, {
      statusCode: 200,
      message: "Item removed from cart successfully!!",
      data: cart,
    });
  }
);

export const clearCart = cathAsync(
    async(req : Request, res : Response, next : NextFunction) => {
        const userID = (req as any ).user?._id;

        const cart = await Cart.findOne({ user : userID });

        if(!cart) {
            throw new AppError("Cart not found for this user!!", 404);
        }
        
        cart.items = [];
        await cart.save();

        sendResponse(res, {
            statusCode : 200,
            message : "Cart cleared successfully",
            data : cart,
        });
    }
);