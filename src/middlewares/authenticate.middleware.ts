import { Request, Response, NextFunction } from "express";
import { Role } from "../@types/enum.types";
import AppError from "../utils/customError.utils";
import { verifyToken } from "../utils/jwt.util";

export const authenticate = (roles? : Role[]) => {
    return (req : Request, res : Response, next : NextFunction) => {
        try {
            // get access token
            const cookies = req.cookies;
            const access_token = cookies["access_token"];
            console.log(access_token);

            if(!access_token) {
                throw new AppError ("Anathorized.Access denied", 401);
            }

            // verify token
            const decoded_data = verifyToken(access_token);

            if(!decoded_data) {
                throw new AppError ("Invalid token.Access denied", 401);
            }

            // check role
            if (roles && !roles.includes(decoded_data.role)){
                throw new AppError("Forbidden. Can not access this resource", 403)
            }

            req.user = {
                _id : decoded_data._id,
                email : decoded_data.email,
                role : decoded_data.role,
            };

            next();
        } catch (error) {
            next (error);
        }
    };
};