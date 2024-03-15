import { createReadStream, unlinkSync } from "fs";
import fetch from "node-fetch-commonjs";
import FormData from "form-data";
import multer, { diskStorage } from "multer";
import path from "path";

interface UploadResponse {
  success: boolean;
  data: string;
}

// Form data upload
export const storage = diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
export const upload = multer({ storage });

/**
 * Upload an image to AppDev storage.
 *
 * @param image The file that the user sent in their form data request.
 *
 * @returns The URL representing the image.
 */
export const uploadImage = async (
  image: Express.Multer.File
): Promise<string | undefined> => {
  // Upload image via a POST request
  const form = new FormData();
  form.append("bucket", process.env.UPLOAD_BUCKET);
  form.append("image", createReadStream(image.path));

  const response = await fetch(`${process.env.UPLOAD_SERVICE_URL}/upload/`, {
    method: "POST",
    headers: form.getHeaders(),
    body: form,
  });
  // Delete the image after sending it to the upload service
  unlinkSync(image.path);

  let responseData: UploadResponse | undefined;
  try {
    const json = await response.json();
    responseData = json as UploadResponse;
  } catch (e) {
    console.log(`Error sending request: ${e}`);
  }
  return responseData?.data;
};

/**
 * Remove an image from AppDev storage.
 *
 * @param imageURL The image URL to remove.
 *
 * @returns True if the deletion was successful; otherwise false.
 */
export const removeImage = async (imageURL: string): Promise<boolean> => {
  // Delete image via a POST request
  const payload = {
    bucket: process.env.UPLOAD_BUCKET,
    image_url: imageURL,
  };
  const response = await fetch(`${process.env.UPLOAD_SERVICE_URL}/remove/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const responseData = (await response.json()) as UploadResponse;
  if (!responseData.success) {
    console.log(
      `Removing an image from our servers failed with image URL: ${imageURL}`
    );
  }
  return responseData.success;
};
