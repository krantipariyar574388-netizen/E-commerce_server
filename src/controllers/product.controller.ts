import { Request, Response, NextFunction } from "express";
import Product from "../models/product.models";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { deleteFileFormCloudinary, upload } from "../utils/cloudinary.util";

const folder = "/products";

export const getAll = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter : Record<string, any> = {};
    const { query } = req.query;
    if(query){
      // filter.name = {
      //   $regex : query,
      //   $options : "i",
      // };
      filter.$or = [
        {
          name : {
            $regex : query, // search
            $options : "i", //case sensitive
          },
        },
        {
          description : {
            $regex : query,
            $options : "i",
          },
        },
      ];
    }
    const product = await Product.find(filter);

    sendResponse(res, {
      statusCode: 200,
      message:
        product.length > 0
          ? "Product fetched successfully!"
          : "No products found",
      data: product,
    });
  },
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
  },
);

export const create = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      rate,
      quantity,
      description,
      brand,
      category,
      is_featured,
      newArrival,
    } = req.body;

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
      newArrival,
    });

    //cover images
    const { path, public_id } = await upload(cover_image[0], folder);
    product.cover_image = {
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

      product.set("images", successImages);
    }

    await product.save();

    sendResponse(res, {
      statusCode: 201,
      message: "Product created successfully!",
      data: product,
    });
  },
);

export const update = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
      name,
      rate,
      quantity,
      description,
      brand,
      category,
      is_featured,
      newArrival,
      deleted_images,
    } = req.body;

    const product = await Product.findOne({ _id: id });
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

    const { cover_image, images } = req.files as {
      cover_image?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    if (cover_image && cover_image.length > 0) {
      deleteFileFormCloudinary(product.cover_image.public_id);
      const { path, public_id } = await upload(cover_image[0], folder);
      product.cover_image = { path, public_id };
    }

    if (
      deleted_images &&
      Array.isArray(deleted_images) &&
      deleted_images.length > 0
    ) {
      //deleted image from cloud
      //filter product images
    }
    if (images && images.length > 0) {
      // upload new images to cloud
      // add images pn product.images
    }

    await product.save();

    sendResponse(res, {
      statusCode: 200,
      message: "Product updated successfully!",
      data: product,
    });
  },
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
  },
);

// get by category

// get by brand

// get featured product

// get new arrivals
