import { Request, Response, NextFunction } from "express";
import Product from "../models/product.models";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { deleteFileFormCloudinary, upload } from "../utils/cloudinary.util";

const folder = "/products";

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
    const { name, rate, quantity, description, brand, category, is_featured, newArrival } = req.body;
    
    const { cover_image, images } = req.files as {
      cover_image: Express.Multer.File[];
      images: Express.Multer.File[];
    };

    if (!name) throw new AppError("Product name is required", 400);
    if (!rate) throw new AppError("Rate is required", 400);
    if (!quantity) throw new AppError("Quantity is required", 400);
    if (!cover_image) throw new AppError("Cover image is required", 400);
    if (!category) throw new AppError("Category is required", 400);

    const product = new Product({
      name,
      rate,
      quantity,
      description,
      cover_image,
      brand,
      category,
      is_featured,
      newArrival
    });

    //cover images
    const { path, public_id } = await upload(cover_image[0], folder);
    product.cover_image= {
      path,
      public_id,
    };

    // images
    if (images && images.length > 0) {
      const promises = images.map((file) => upload(file, folder));
      const files = await Promise.allSettled(promises);
      const successImages = files
      .filter((file) => file.status == "fulfilled")
      .map((file) => file.value);

      product.set("images",successImages);
    }

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
    const { name, rate, quantity, description, brand, category, is_featured, newArrival } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      throw new AppError(`Product with id: ${id} not found`, 404);
    }

    if (name) product.name = name;
    if (rate) product.rate = rate;
    if (quantity) product.quantity = quantity;
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (is_featured !== undefined) product.is_featured = is_featured;
    if (newArrival !== undefined) product.newArrival = newArrival;

    const files = req.files as {
      cover_image?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    if (files && files.cover_image && files.cover_image.length > 0) {

      if (product.cover_image && product.cover_image.public_id) {
        await deleteFileFormCloudinary(product.cover_image.public_id);
      }

      const { path, public_id } = await upload(files.cover_image[0], folder);
      product.cover_image = { path, public_id };
    }

    if (files && files.images && files.images.length > 0) {
      
      const promises = files.images.map((file) => upload(file, folder));
      const uploadResults = await Promise.allSettled(promises);
      
      const successImages = uploadResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<any>).value);

      const currentImages = product.get("images") || [];
      product.set("images", [...currentImages, ...successImages]);
    }

    await product.save();

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

// get by category

// get by brand

// get featured product

// get new arrivals