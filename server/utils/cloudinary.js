import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: useRuntimeConfig().server.CLOUDINARY_CLOUD_NAME,
  api_key: useRuntimeConfig().server.CLOUDINARY_API_KEY,
  api_secret: useRuntimeConfig().server.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadToCloudinary = async ({ processedBuffer, imageName, folderPath }) => {

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        public_id: imageName.replace(/\.[^/.]+$/, ""), // Remove extension
        resource_type: 'image',
        format: 'webp',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result.secure_url,
          public_id: result.public_id,
          platform: 'cloudinary'
        });
      }
    );
    uploadStream.end(processedBuffer);
  });
};
