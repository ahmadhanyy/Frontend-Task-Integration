import { useState } from 'react';
import { api } from '@/lib/api';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadItem {
  file: File;
  status: UploadStatus;
  attachmentId?: string;
  error?: string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'File upload failed';
}

export function useFileUpload() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  async function uploadFile(file: File): Promise<string> {
    setUploads(prev => [...prev, { file, status: 'uploading' }]);

    try {
      // Step 1: get signed URL
      const { key, signedUrl } = await api<{
        key: string;
        signedUrl: string;
      }>('/attachments/upload-url', { method: 'POST' });

      // Step 2: upload file binary
      await fetch(signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: file,
      });

      // Step 3: register attachment
      const attachment = await api<{ id: string }>('/attachments', {
        method: 'POST',
        body: JSON.stringify({
          key,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }),
      });

      setUploads(prev =>
        prev.map(u =>
          u.file === file
            ? { ...u, status: 'success', attachmentId: attachment.id }
            : u
        )
      );

      return attachment.id;
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      setUploads(prev =>
        prev.map(u =>
          u.file === file
            ? { ...u, status: 'error', error: message }
            : u
        )
      );

      throw error;
    }
  }

  function removeFile(file: File) {
    setUploads(prev => prev.filter(u => u.file !== file));
  }

  const isUploading = uploads.some(u => u.status === 'uploading');

  const attachmentIds = uploads
    .filter(u => u.status === 'success' && u.attachmentId)
    .map(u => u.attachmentId as string);

  return {
    uploads,
    uploadFile,
    removeFile,
    isUploading,
    attachmentIds,
  };
}
