// name , description?, logo
import mongoose, {Schema} from "mongoose";
import { ImageSchema } from "./image.model";

interface IBrand extends Document {
    name : string;
    description? : string;
    logo : {
        path : string;
        public_id : string; 
    }
}

const brandSchema : Schema = new mongoose.Schema<IBrand>({
    name : {
        type : String,
        required : [true,"Name is required!"],
        unique : [true, "Brand already exits!"],
        trim : true,
    },
    description : {
        type : String,
        default : "",
        trim :true, 
    },
    logo : {
        type : ImageSchema,
        required : [true,"logo is required"],
    },
},
{
    timestamps : true,
}
);

const Brand = mongoose.model<IBrand>("Brand",brandSchema);

export default Brand;