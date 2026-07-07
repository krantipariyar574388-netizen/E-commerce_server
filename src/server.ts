import app from "./app.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/e-commerce_db",{autoCreate : true}).then(() => {
    console.log("Database connected successfully!");
})
.catch((error) => {
    console.log("Database cannot connect!");
    console.log(error);
});

app.listen(8002,() => {
    console.log("Server is start at http://localhost:8002");
});