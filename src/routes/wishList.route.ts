import express, { Router } from "express";
import {
    addToWishList,
    getUserWishlist,
    removeFromWishlist,
} from "../controllers/wishList.controller";
import { authenticate } from "../middlewares/authenticate.middleware";

const router: Router = express.Router();

router.use(authenticate);

router.get("/",getUserWishlist);

router.post("/",addToWishList);

router.delete("/:id",removeFromWishlist);

export default router;