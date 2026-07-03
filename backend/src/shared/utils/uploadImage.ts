import cloudinary from "../config/cloudinary";

export const uploadImage = async (
  file: string,
  folder: string,
): Promise<string> => {
  const result = await cloudinary.uploader.upload(file, { folder });
  return result.secure_url;
};
