import cloudinary from "../config/cloudinary.config";
import fs from "fs";

//* upload
export const upload = async (file: Express.Multer.File, dir = "/") => {
  try {
    const folder = "team_16_6_am" + dir;
    const { secure_url: path, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "auto",
        unique_filename: true,
        folder,
        transformation: {
          width: 900,
          height: 900,
          crop: "fill",
          fetch_format: "auto",
          gravity: "face",
          format: "auto",
        },
      },
    );

    //* delete form local uploads folder
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      path,
      public_id,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

//* delete file form cloudinary
export const deleteFileFormCloudinary = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (error) {
    console.log(error);
  }
};