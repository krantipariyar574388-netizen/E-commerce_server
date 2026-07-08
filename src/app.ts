import express, {Request, Response, NextFunction } from "express";
import productRouter from './routes/product.route';

const app = express();

// using middleware
app.use(express.json());

// health route
app.get("/",(req, res) => {
    res.status(200).json({
        message : "Server is up and running!!",
        status : "success",
        success : true,
        data : [],
    });
});

app.use("/products", productRouter);


// path not found
app.use((req, res, next) => {
    const message = `Can not ${req.method} on ${req.path}`;

    next({
        message,
        status : "fail",
        statusCode : 404,
    })
});

//error handling middleware
app.use((error : any, req : Request, res : Response,next : NextFunction ) =>{
    const message = error?.status ?? "Something went wrong!";
    const status = error?.status ?? "error";
    const statusCode = error?.statusCode ?? 500;

    console.log(error);

    res.status(statusCode).json({
        message,
        status,
        success : false,
        data : null,
    });
});

export default app;