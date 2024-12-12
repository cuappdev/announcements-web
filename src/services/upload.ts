"use server";

import { UploadFields } from "@/models/uploadFields";
import { revalidatePath } from "next/cache";
import ApiClient from "./apiClient";

type UploadServiceResponse = {
  success: boolean;
  data: string;
};

export async function uploadFile(formData: FormData): Promise<UploadFields> {
  const apiClient = ApiClient.createInstance();
  const uploadUrl = process.env.UPLOAD_URL;
  if (!uploadUrl) return { success: false, error: "Upload URL invalid" };

  try {
    const file = formData.get("image") as File;
    const response = await ApiClient.postFormData<UploadServiceResponse>(
      apiClient,
      `${uploadUrl}/upload/`,
      { bucket: process.env.UPLOAD_BUCKET },
      file
    );

    revalidatePath("/");
    return { success: true, url: response.data };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to upload file" };
  }
}
