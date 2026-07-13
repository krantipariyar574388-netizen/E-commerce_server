import express, { Router } from "express";
import {
    create,
    update,
    remove,
    getAll,
    getById,
} from "../controllers/brand.controller";

import { uploader } from "../middlewares/multer.middleware";

const router: Router = express.Router();

// multer uploader
const upload = uploader();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", upload.single("logo") ,create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;