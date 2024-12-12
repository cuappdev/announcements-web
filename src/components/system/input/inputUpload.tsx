"use client";

import { useState, useRef } from "react";
import { ImageIcon, X, AlertTriangle, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { uploadFile } from "@/services/upload";

interface Props {
  setUrl: (url: string | undefined) => void;
}

export default function InputUpload({ setUrl }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFile = async (file: File) => {
    try {
      setError(null);
      setSuccess(false);
      setIsUploading(true);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadFile(formData);

      clearInterval(interval);

      if (response.success) {
        setUploadProgress(100);
        setSuccess(true);
        setUrl(response.url);
      } else {
        setUploadProgress(0);
        setSuccess(false);
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border border-dashed rounded-md transition-colors ${
          isDragging ? "border-primary bg-primary/10" : "border-other-stroke hover:border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />

        {!isUploading && !success && !error && (
          <div
            className="flex flex-col items-center justify-center gap-2 cursor-pointer p-6"
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon className="size-[32px] stroke-neutral-400" />
            <p className="b1 text-neutral-400">Choose a file or drag it here</p>
          </div>
        )}

        {(isUploading || success || error) && (
          <div className="space-y-4 p-6 cursor-pointer" onClick={() => inputRef.current?.click()}>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 stroke-neutral-400" />
              <h6 className="text-neutral-400">
                {fileName} ({fileSize})
              </h6>
              {success && (
                <div className="ml-auto flex items-center gap-2">
                  <div className="size-[20px] rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="size-[12px] stroke-neutral-white" />
                  </div>
                </div>
              )}
              {error && (
                <div className="ml-auto flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
              )}
            </div>

            {isUploading && <Progress value={uploadProgress} className="h-1 w-full" />}

            {error && (
              <p className="b1 text-destructive flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
