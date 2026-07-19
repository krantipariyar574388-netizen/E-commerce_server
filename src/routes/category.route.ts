import express, { Router } from "express";
import {
    create,
    update,
    remove,
    getAll,
    getById,
} from "../controllers/category.controller";

import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";

const router: Router = express.Router();

// multer uploader
const upload = uploader();

router.get("/", getAll);

router.get("/:id", authenticate, getById);

router.post("/", upload.single("image") ,create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;