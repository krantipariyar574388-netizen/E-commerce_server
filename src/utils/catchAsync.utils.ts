import { NextFunction, Request, Response, RequestHandler } from "express";

export const cathAsync = (fn : RequestHandler) => {
    return (req : Request, res : Response, next : NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
};