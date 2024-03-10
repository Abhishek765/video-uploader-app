import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env.dev'
});

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const uploadOnCloudinary = async (localFilePath: string) => {
  console.log({ localFilePath });
  try {
    if (!localFilePath) return null;
    // if localFilePath is valid the upload to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    });

    // Logging success message
    console.log(
      `File with Path: ${localFilePath} is successfully uploaded on cloudinary with responseUrl: ${response.url}`
    );
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // if upload got failed -> remove the temporary saved file
    console.error('Error: ', error);
    return null;
  }
};

export { uploadOnCloudinary };
