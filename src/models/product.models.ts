import mongoose, { Schema, Types, Document } from "mongoose";
import { ImageSchema } from "./image.model";

export interface IProduct extends Document {
  name: string;
  rate: string;
  quantity: number;
  description : string;
  cover_image: {
    path: string;
    public_id: string;
  };
  brand: Types.ObjectId;
  category: Types.ObjectId;
  images: {
    path: string;
    public_id: string;
  }[]; // Multiple gallery images ko lagi Array banako
  is_featured: boolean;
  newArrival: boolean;
}

const productSchema: Schema = new mongoose.Schema<IProduct>({
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
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minLength: [10, "name must be at least 50 characters long"],
      maxLength: [2000, "name must not exceed 2000 characters"],
    },
    cover_image: {
      path: {
        type: String,
        required: [true, "Cover image path is required"],
      },
      public_id: {
        type: String,
        required: [true, "Cover image public_id is required"],
      },
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

const Product = mongoose.model<IProduct>("product", productSchema);

export default Product;

//fullname, email, password, profile_image