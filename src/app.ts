import express, {Request, Response, NextFunction } from "express";

const app = express();

// using middleware
app.use(express.json());

// health route
app.get("/", (req, res) => {
    res.status(200).json({
        message : "Server is up and running!!",
        status : "success",
        success : true,
        data : null,
    });
});

// path not found
app.use((req:Request, res:Response, next : NextFunction) => {
    const message = `Can not ${req.method} on ${req.path}`;

    res.status(404).json({
        message,
        status : "fail",
        success : false,
        data : null,
    });
});

//database connect
//crud
//error handling middleware

export default app;