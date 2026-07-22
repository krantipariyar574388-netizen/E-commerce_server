import express, { Router } from "express";
import {
    addToCart,
    updateQuantity,
    removeItem,
    getCart,
    clearCart,
} from "../controllers/cart.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router : Router = express.Router();

router.use(authenticate());

router.get("/",getCart);
router.post("/",addToCart);
router.put("/:id",updateQuantity);
router.delete("/:id",removeItem);
router.delete("/clear",clearCart);

export default router;
