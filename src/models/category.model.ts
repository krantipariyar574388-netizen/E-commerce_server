import mongoose from "mongoose";
import { ImageSchema } from "./image.model";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is required"],
        trim : true,
    },
    description : {
        type : String,
        minLength : 25,
        trim : true,
   },
   logo : {
    type : ImageSchema,
    required : [true, "Logo is required"],
    default : null,
   },
}
);

const Category = mongoose.model("category",categorySchema);
export default Category;