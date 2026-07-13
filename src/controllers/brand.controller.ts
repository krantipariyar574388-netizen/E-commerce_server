// import { Request, Response,NextFunction } from "express";
// import Brand from "../models/brand.model";

// export const getAll = async (req : Request, res : Response, next : NextFunction) => {
//     try {
//         const brand = await Brand.find({});
//         res.status(200).json({
//         message : "Server is up and running!!",
//         status : "success",
//         success : true,
//         data : brand,
//     });
//     } catch (error) {
//         next(error);
//     }
// };

// export const getById = async (req : Request, res : Response, next : NextFunction) => {
//     try {
//         const { id } = req.params;
//         const brand = await Brand.findById({_id: id});

//         if(!brand) {
//             res.status(404).json({
//             message : `Brand by id: ${id} not found`,
//             status : "false",
//             data : null,
//         });
//         return;
//         }
//         res.status(200).json({
//         message : "Brand fetched successfully!",
//         status : "true",
//         data : brand,
//     });
//     } catch (error) {
//         next(error);
//     }
// };

// export const create = async (req: Request, res: Response, next : NextFunction) => {
//    try { 
//     console.log(req.body);
//     const {name, description, logo} = req.body;

//     const brand = new Brand({
//         name ,
//         description ,
//         logo ,
//     });

//     await brand.save();

//      res.status(200).json({
//         message : "Brand created successfully!",
//         status : "true",
//         data : brand,
//     });
//    } catch (error) {
//     next(error);
//    }
// };

// export const update = async (req: Request, res: Response, next : NextFunction) => {
//     try {
//         const {id} = req.params;
//         const {name, description, logo} = req.body;

//         const brand = await Brand.findByIdAndUpdate({_id: id}, {name, description, logo}, {new : true, runValidators: true});

//         if (!brand) {
//             res.status(404).json({
//                 message : `Brand by id: ${id} not updated`,
//                 success : false,
//                 data : null,
//             });
//             return;
//         }

//         res.status(200).json({
//             message : "Brand updated",
//             success : true,
//             data : brand,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// export const remove = async (req: Request, res: Response, next : NextFunction) => {
//     try {
//         const {id} = req.params;

//         const brand = await Brand.findByIdAndDelete(id);
//         if (!brand) {
//             res.status(404).json({
//             message : "Brand by id: ${id} not deleted",
//             status : "true",
//             data : [],
//             });
//         } else {
//             res.status(200).json({
//             message : "Brand are deleted.",
//             status : "true",
//             data : [],
//             });
//         }
       
//     } catch (error) {
//         next(error);
//     }
// };

import { Request, Response, NextFunction } from "express";
import Brand from "../models/brand.model";
import AppError from "../utils/customError.utils";
import { cathAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";

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

    if (!name) throw new AppError("Brand name is required", 400);

    const brand = new Brand({
      name,
      description,
      logo,
    });

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
    const { name, description, logo } = req.body;

    const brand = await Brand.findByIdAndUpdate(
      id,
      { name, description, logo },
      { new: true, runValidators: true }
    );

    if (!brand) {
      throw new AppError(`Brand with id: ${id} not found`, 404);
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

    sendResponse(res, {
      statusCode: 200,
      message: "Brand deleted successfully!",
      data: null,
    });
  }
);