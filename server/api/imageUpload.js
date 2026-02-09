import sharp from 'sharp';

export default defineEventHandler(async (event) => {

  if (!useRuntimeConfig().server.GAS_API_SECRET) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized', });
  }

  const { images, platform, folderPath } = await readBody(event);

  try {
    const processingResults = await Promise.all(images.map(async (imageObj) => {
      const imageContent = imageObj.content || imageObj;
      const imageName = imageObj.name || `image-${Date.now()}`;

      // Decode Base64
      const matches = imageContent.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer;
      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(imageContent.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      }

      // Optimize with Sharp
      const processedBuffer = await sharp(buffer)
        .resize(1000)
        .webp()
        .toBuffer();

      const processedBase64 = processedBuffer.toString('base64');
      const gasFileObj = {
        bytes: processedBase64,
        contentType: 'image/webp',
        name: imageName.replace(/\.[^/.]+$/, "") + ".webp"
      };

      let uploadResult = null;

      switch (platform) {
        case 'cloudinary':
          uploadResult = await uploadToCloudinary({ processedBuffer, imageName, folderPath });
          break;
        // case 'imagekit':
        //   uploadResult = await uploadToImageKit({ processedBuffer, imageName, folderPath });
        //   break;
        // case 'google_drive':
        //   uploadResult = await uploadToGoogleDrive({ processedBuffer, folderPath });
        //   break;
        default:
          uploadResult = null;
      }
      // Note: Google Drive upload happens in batch usually for 'gasApi', but if we want per-image logic we could do it here.
      // However, the prior logic sent ALL files at once to GAS. We will keep that batch logic below for Drive.

      return {
        gasFile: gasFileObj,
        clientURI: uploadResult ? uploadResult.url : `data:image/webp;base64,${processedBase64}`,
        uploadedFiles: uploadResult
      };
    }));

    const clientURIs = processingResults.map(r => r.clientURI);

    return {
      message: 'Image processing completed',
      platform: platform,
      size: clientURIs.length,
      processedImageBuffer: clientURIs,
      uploadedFiles: processingResults.map(r => r.uploadedFiles) // Filter out nulls if needed
    };

  } catch (error) {
    console.error(`An error occurred during processing: ${error}`);
    throw createError({
      statusCode: 500,
      statusMessage: `Image processing failed: ${error.message}`,
    });
  }
})
