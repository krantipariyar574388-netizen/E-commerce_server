import { Request, Response, NextFunction } from "express";
import Category from "../models/category.model";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { upload } from "../utils/cloudinary.util";
import { deleteFileFormCloudinary } from "../config/cloudinary.config";
import path from "path";

export const getAll = cathAsync (
    async (req : Request, res : Response, next : NextFunction) => {
        const category = await Category.find({}).sort({createdAt: - 1});

        sendResponse(res, {
            statusCode : 200,
            message : category.length > 0 ? "Category fetch Successfully" : "No category found",
            data : category,
        });
    }
);

export const getById = cathAsync (async(req : Request, res : Response, next : NextFunction) =>{
        const { id } = req.params;

        const category = await Category.findOne({_id : id});

        if (!category) throw new AppError("category not found", 404);

        sendResponse(res, {
            message : `Category : ${id} fetched`,
            data : category,
            statusCode : 200,
        });
    }
);

export const create = cathAsync(async(req : Request, res : Response, next : NextFunction) => {
    const {name, description, logo} = req.body;

    const file = req.file;
    console.log(file);

    if(!name) throw new AppError("Category name is required", 400);

    const category = new Category({
        name,
        description,
        logo,
    });

    if (file){
      // upload image to cloudinary and set logo
      const { path: uploadedPath, public_id } = await upload(file, '/brands');
      category.logo = {
        path: uploadedPath,
        public_id,
      };
    }

    await category.save();

    sendResponse(res,{
        message : "category created successfully",
        statusCode : 201,
        data : category,
    });
});

export const update = cathAsync(async(req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;
        const { name, description } = req.body;
        const file = req.file;
    
        const category = await Category.findOne({_id : id});
    
        if (!category) {
          throw new AppError(`Category with id: ${id} not found`, 404);
        }
        if (name) category.name = name;
        if (description) category.description = description;
    
        if (file) {
          //delete old image
          deleteFileFormCloudinary(category.logo.public_id);
    
          // upload new image
          const { path, public_id } = await upload(file, '/brands');
          category.logo = {
            path,
            public_id,
          };
        }
    
        sendResponse(res, {
          statusCode: 200,
          message: "Brand updated successfully!",
          data: category,
        });
});

export const remove = cathAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new AppError(`Category with id: ${id} not found`, 404);
    }

    //delete image
    await deleteFileFormCloudinary(category.logo.public_id);

    //delete brand
    await category.deleteOne();

    sendResponse(res, {
      statusCode: 200,
      message: "Category deleted successfully!",
      data: null,
    });
  }
);