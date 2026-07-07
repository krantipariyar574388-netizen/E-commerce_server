import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 3,
    },
    rate : {
        type : String,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
});

const Product = mongoose.model("product", productSchema);

export default Product;