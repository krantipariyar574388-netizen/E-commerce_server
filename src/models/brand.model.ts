// name , description?, logo
import mongoose, {Schema} from "mongoose";

interface IBrand extends Document {
    name : String;
    description? : String;
    logo : String;
}

const brandSchema : Schema = new mongoose.Schema<IBrand>({
    name : {
        type : "String",
        required : [true,"Name is required!"],
        unique : [true, "Brand already exits!"],
        trim : true,
    },
    description : {
        type : "String",
        default : "",
        trim :true, 
    },
    logo : {
        type : "String",
        required : true,
    },
},
{
    timestamps : true,
}
);

const Brand = mongoose.model<IBrand>("Brand",brandSchema);

export default Brand;