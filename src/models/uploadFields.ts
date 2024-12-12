/**
 * Represents the fields returned from an image upload operation.
 */
export interface UploadFields {
  /**
   * Indicates whether the upload was successful.
   */
  success: boolean;

  /**
   * The URL of the uploaded image if successful, otherwise undefined.
   */
  url?: string;

  /**
   * An error message if the upload failed, otherwise undefined.
   */
  error?: string;
}
