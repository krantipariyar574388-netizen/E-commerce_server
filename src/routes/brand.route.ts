import express, { Router } from "express";
import {
    create,
    update,
    remove,
    getAll,
    getById,
} from "../controllers/brand.controller";
import { Role } from "../@types/enum.types"
import { authenticate } from "../middlewares/authenticate.middleware";

import { uploader } from "../middlewares/multer.middleware";


const router: Router = express.Router();

// multer uploader
const upload = uploader();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", upload.single("logo"), authenticate([Role.ADMIN, Role.SUPER_ADMIN]), create);

router.put("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), update);

router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), remove);

export default router;