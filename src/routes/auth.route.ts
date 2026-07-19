import express, { Router } from "express";
import {
  register,
  login, 
  update,
  profileChange,
} from "../controllers/auth.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/authenticate.middleware";


const router: Router = express.Router();

// multer uploader
const upload = uploader();

// Auth Endpoints
router.post("/register", upload.single("profile_image") ,register);
router.post("/login", login);

router.put("/profile_image", authenticate(),upload.single("profile_image"), profileChange);


export default router;