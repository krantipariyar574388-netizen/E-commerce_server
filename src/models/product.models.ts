import mongoose, { Schema } from "mongoose";
import { ImageSchema } from "./image.model";


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
    cover_image : {
        type : ImageSchema,
        required : [true, "Cover image is required"],
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "brand",
        required : [true, "brand is required"],
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "category",
        required : [true, "category is required"],
    },
    images : [ImageSchema],
    is_featured : {
        type : Boolean,
        default : false,
    },
    newArrival : {
        type : Boolean,
        default : false,
    }
});

const Product = mongoose.model("product", productSchema);

export default Product;

//fullname, email, password, profile_image