import { Request, Response,NextFunction } from "express";
import Brand from "../models/brand.model";

export const getAll = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const brand = await Brand.find({});
        res.status(200).json({
        message : "Server is up and running!!",
        status : "success",
        success : true,
        data : brand,
    });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById({_id: id});

        if(!brand) {
            res.status(404).json({
            message : `Brand by id: ${id} not found`,
            status : "false",
            data : null,
        });
        return;
        }
        res.status(200).json({
        message : "Brand fetched successfully!",
        status : "true",
        data : brand,
    });
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next : NextFunction) => {
   try { 
    console.log(req.body);
    const {name, description, logo} = req.body;

    const brand = new Brand({
        name ,
        description ,
        logo ,
    });

    await brand.save();

     res.status(200).json({
        message : "Brand created successfully!",
        status : "true",
        data : brand,
    });
   } catch (error) {
    next(error);
   }
};

export const update = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const {id} = req.params;
        const {name, description, logo} = req.body;

        const brand = await Brand.findByIdAndUpdate({_id: id}, {name, description, logo}, {new : true, runValidators: true});

        if (!brand) {
            res.status(404).json({
                message : `Brand by id: ${id} not updated`,
                success : false,
                data : null,
            });
            return;
        }

        res.status(200).json({
            message : "Brand updated",
            success : true,
            data : brand,
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const {id} = req.params;

        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
            res.status(404).json({
            message : "Brand by id: ${id} not deleted",
            status : "true",
            data : [],
            });
        } else {
            res.status(200).json({
            message : "Brand are deleted.",
            status : "true",
            data : [],
            });
        }
       
    } catch (error) {
        next(error);
    }
};