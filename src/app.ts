import express, {Request, Response } from "express";
import productRouter from './routes/product.route';
import {errorHandler} from './middlewares/errorHandler.middleware';
import authRouter from './routes/auth.route';
import brandRouter from './routes/brand.route'
import AppError from "./utils/customError.utils";

const app = express();

// using middleware
app.use(express.json());

// health route
app.get("/",(req : Request, res : Response) => {
    res.status(200).json({
        message : "Server is up and running!!",
        status : "success",
        success : true,
        data : [],
    });
});

app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/brand",brandRouter);


// path not found
app.use((req, res, next) => {
    const message = `Can not ${req.method} on ${req.path}`;
    next(new AppError(message, 400));
});

//error handling middleware
app.use(errorHandler);

export default app;