import { Request, Response, NextFunction } from "express";
import Brand from "../models/brand.model";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { upload } from "../utils/cloudinary.util";
import { deleteFileFormCloudinary } from "../utils/cloudinary.util";

export const getAll = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const brands = await Brand.find({}).sort({ createdAt: -1 });

    sendResponse(res, {
      statusCode: 200,
      message: brands.length > 0 ? "Brands fetched successfully!" : "No brands found",
      data: brands,
    });
  }
);

export const getById = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      throw new AppError(`Brand with id: ${id} not found`, 404);
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Brand fetched successfully!",
      data: brand,
    });
  }
);

export const create = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, logo } = req.body;

    const file = req.file;
    console.log(file);

    if (!name) throw new AppError("Brand name is required", 400);

    const brand = new Brand({
      name,
      description,
      logo,
    });

    if (file) {
      const { path, public_id } = await upload(file, '/brands');
      brand.logo = {
        path,
        public_id,
      };
    }

    await brand.save();

    sendResponse(res, {
      statusCode: 201,
      message: "Brand created successfully!",
      data: brand,
    });
  }
);

export const update = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    const brand = await Brand.findOne({_id : id});

    if (!brand) {
      throw new AppError(`Brand with id: ${id} not found`, 404);
    }
    if (name) brand.name = name;
    if (description) brand.description = description;

    if (file) {
      //delete old image
      deleteFileFormCloudinary(brand.logo.public_id);

      // upload new image
      const { path, public_id } = await upload(file, '/brands');
      brand.logo = {
        path,
        public_id,
      };
    }

    sendResponse(res, {
      statusCode: 200,
      message: "Brand updated successfully!",
      data: brand,
    });
  }
);

export const remove = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      throw new AppError(`Brand with id: ${id} not found`, 404);
    }

    //delete image
    await deleteFileFormCloudinary(brand.logo.public_id);

    //delete brand
    await brand.deleteOne();

    sendResponse(res, {
      statusCode: 200,
      message: "Brand deleted successfully!",
      data: null,
    });
  }
);