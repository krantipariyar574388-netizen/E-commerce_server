import { Request, Response, NextFunction } from "express";
import Product from "../models/product.models";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";

export const getAll = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.find({}).sort({ createdAt: -1 });

    sendResponse(res, {
      statusCode: 200,
      message: product.length > 0 ? "Product fetched successfully!" : "No products found",
      data: product,
    });
  }
);

export const getById = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new AppError(`product with id: ${id} not found`, 404);
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Product fetched successfully!",
      data: product,
    });
  }
);

export const create = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, rate, quantity } = req.body;

    const file = req.file;
    console.log(file);

    if (!name) throw new AppError("Product name is required", 400);

    const product = new Product({
      name,
      rate,
      quantity,
    });


    await product.save();

    sendResponse(res, {
      statusCode: 201,
      message: "Product created successfully!",
      data: product,
    });
  }
);

export const update = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, rate, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, rate, quantity },
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new AppError(`Product with id: ${id} not found`, 404);
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Product updated successfully!",
      data: product,
    });
  }
);

export const remove = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new AppError(`Product with id: ${id} not found`, 404);
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Product deleted successfully!",
      data: null,
    });
  }
);