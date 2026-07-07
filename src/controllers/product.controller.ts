import { Request, Response } from "express";
import Product from "../models/product.models";

export const getAll = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
        message : "Server is up and running!!",
        status : "success",
        success : true,
        data : products,
    });
    } catch (error: any) {
        res.status(500).json({
            message : error?.message ?? "Something went wrong",
            success : false,
            data : null,
        });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById({_id: id});
        
        if(!product) {
                    res.status(404).json({
        message : `Product by id: ${id} not found`,
        status : "false",
        data : null,
                    });
                    return;
        }
        res.status(200).json({
        message : "Product fetched successfully!",
        status : "true",
        data : product,
    });
} catch (error: any) { 
    res.status(500).json({
            message : error?.message ?? "Something went wrong",
            success : false,
            data : null,
        });
    }
};

export const create = async (req: Request, res: Response) => {
   try { 
    console.log(req.body);
    const {name, rate, quantity} = req.body;

    const product = await Product.create({
        name : name,
        rate : rate,
        quantity : quantity,
    });

     res.status(200).json({
        message : "Product created successfully!",
        status : "true",
        data : product,
    });
   } catch (error) {
    res.status(500).json({
            message : (error as Error)?.message ?? "Something went wrong",
            success : false,
            data : null,
        });
   }
};

export const update = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, rate, quantity} = req.body;

        const product = await Product.findByIdAndUpdate({_id: id}, {name, rate, quantity}, {new : true, runValidators: true});

        if (!product) {
            res.status(404).json({
                message : `Product by id: ${id} not updated`,
                success : false,
                data : null,
            });
            return;
        }

        res.status(200).json({
            message : "Product updated",
            success : true,
            data : product,
        });
    } catch (error: any) {
        res.status(500).json({
            message : error?.message ?? "Something went wrong",
            success : false,
            data : null,
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({
            message : "product by id: ${id} not deleted",
            status : "true",
            data : [],
            });
        } else {
            res.status(200).json({
            message : "Product are deleted.",
            status : "true",
            data : [],
            });
        }
       
    } catch (error: any) {
        res.status(500).json({
            message : error?.message ?? "Something went wrong",
            success : false,
            data : null,
        });
    }
};