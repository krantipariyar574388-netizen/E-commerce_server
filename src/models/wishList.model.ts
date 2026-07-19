// user:user_id, product_product_id
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWishList extends Document {
    user : Types.ObjectId;
    product : Types.ObjectId;
    createdAt : Date;
    updatedAt : Date;
}

const WishListSchema : Schema = new mongoose.Schema<IWishList>({
    user : {
        type : Schema.Types.ObjectId,
        ref : "Authentication",
        required : [true, "User ID is required!!"],
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : [true, "Product ID is required!!"],
    },
},
{
    timestamps : true,
}
);

WishListSchema.index({ user : 1, product : 1}, { unique : true });

const WishList = mongoose.model<IWishList>("WishList",WishListSchema);

export default WishList;