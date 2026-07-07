import express, { Router } from "express"; 
import {
    create,
    update,
    remove,
    getAll,
    getById,
} from "../controllers/product.controller";

const router: Router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;