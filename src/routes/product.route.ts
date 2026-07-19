import express, { Router } from "express"; 
import {
    create,
    update,
    remove,
    getAll,
    getById,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { Role } from "../@types/enum.types";
import { uploader } from "../middlewares/multer.middleware";

const router: Router = express.Router();

const upload = uploader();


router.get("/", getAll);

router.get("/:id", getById);

router.post("/",
    authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    upload.fields([
        {
            name : "cover_image",
            maxCount : 1,
        },
        {
            name : "images",
            maxCount : 5,
        },
    ]),
    create
);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;