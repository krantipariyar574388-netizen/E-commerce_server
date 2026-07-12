import multer from "multer";
import fs from "fs";

export const uploader = () => {
    const folder = "uploads/";

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive  : true });
    }

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, folder);
  },
  filename : (req, file, cb) =>{
    const filename = Date.now() + "-" + file.originalname
    cb(null, filename);
  },
});

// multer upload instance
const upload = multer({ storage : storage});
return upload;
};
