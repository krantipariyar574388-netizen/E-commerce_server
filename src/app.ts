import express from "express";
import productRouter from './routes/product.route';
import {errorHandler} from './middlewares/errorHandler.middleware';
import authRouter from './routes/auth.route';

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
app.use("/auth", authRouter);


// path not found
app.use((req, res, next) => {
    const message = `Can not ${req.method} on ${req.path}`;

    const error : any =new Error(message);
    error.status = "fail";
    error.statusCode = 404;

    next(error);
});

//error handling middleware
app.use(errorHandler);

export default app;