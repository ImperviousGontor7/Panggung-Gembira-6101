import { useCallback, useState } from "react";
import api from "../../../api/axios";

export function useUpload({
  endpoint = "/upload",
  fieldName = "file",
  initialProgress = 0,
} = {}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [uploadedData, setUploadedData] = useState(null);
  const [error, setError] = useState(null);

  const upload = useCallback(
    async (file, extraFields = {}) => {
      if (!file) {
        throw new Error("useUpload membutuhkan file.");
      }

      const formData = new FormData();
      formData.append(fieldName, file);

      Object.entries(extraFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      setUploading(true);
      setProgress(0);
      setError(null);

      try {
        const response = await api.post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (!event.total) return;

            const nextProgress = Math.round((event.loaded * 100) / event.total);
            setProgress(nextProgress);
          },
        });

        const payload = response.data?.data ?? response.data;
        setUploadedData(payload);
        return payload;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [endpoint, fieldName]
  );

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(initialProgress);
    setUploadedData(null);
    setError(null);
  }, [initialProgress]);

  return {
    upload,
    uploading,
    progress,
    uploadedData,
    error,
    reset,
    setUploadedData,
  };
}

export default useUpload;