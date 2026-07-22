// {user:user_id, items:[{product:product_id, quantity:number},{}]}
import mongoose, { Schema, Types, Document } from "mongoose";

export interface ICart extends Document {
  user: Types.ObjectId;
  item: {
    product: Types.ObjectId;
    quantity: Number;
  };
}

const cartSchema: Schema = new mongoose.Schema<ICart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Athentication",
    required: [true, "User id is required"],
  },
  item: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product id is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required."],
      },
    },
  ],
});

const Cart = mongoose.model<ICart>("cart", cartSchema);

export default Cart;
