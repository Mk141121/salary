// Component Upload File - Hỗ trợ upload ảnh và PDF
import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FileText, Loader2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface FileUploadProps {
  /** Endpoint upload (vd: /upload/cccd/1/truoc) */
  endpoint: string;
  /** Callback khi upload thành công */
  onUploadSuccess: (url: string, file?: FileInfo) => void;
  /** URL hiện tại (để hiển thị preview) */
  currentUrl?: string;
  /** Chấp nhận loại file nào */
  accept?: 'image' | 'document' | 'all';
  /** Nhãn hiển thị */
  label?: string;
  /** Class CSS tùy chỉnh */
  className?: string;
  /** Cho phép xóa file */
  allowRemove?: boolean;
  /** Callback khi xóa file */
  onRemove?: () => void;
  /** Disabled */
  disabled?: boolean;
}

interface FileInfo {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
}

const getAcceptMime = (accept: 'image' | 'document' | 'all') => {
  switch (accept) {
    case 'image':
      return 'image/jpeg,image/png,image/gif,image/webp';
    case 'document':
      return 'image/jpeg,image/png,image/gif,image/webp,application/pdf';
    case 'all':
    default:
      return '*/*';
  }
};

export const FileUpload = ({
  endpoint,
  onUploadSuccess,
  currentUrl,
  accept = 'image',
  label = 'Upload file',
  className = '',
  allowRemove = true,
  onRemove,
  disabled = false,
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const [uploadedFile, setUploadedFile] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    const maxSize = accept === 'document' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      setError(`File quá lớn. Tối đa ${maxMB}MB`);
      return;
    }

    // Preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      setPreviewUrl('pdf');
    }

    // Upload
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload thất bại');
      }

      const result = await response.json();
      setUploadedFile(result);
      onUploadSuccess(result.url, result);
      toast.success(`Upload thành công: ${file.name}`);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi upload');
      setPreviewUrl(currentUrl || null);
      toast.error(err.message || 'Upload thất bại');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setUploadedFile(null);
    onRemove?.();
  };

  const isImage = previewUrl && previewUrl !== 'pdf';
  const isPdf = previewUrl === 'pdf';

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {previewUrl ? (
          <div className="relative">
            {isImage && (
              <div className="flex items-center gap-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-32 h-24 object-cover rounded border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Đã upload</span>
                  </div>
                  {uploadedFile && (
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                      {uploadedFile.originalName}
                    </p>
                  )}
                </div>
              </div>
            )}
            {isPdf && (
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-red-100 rounded flex items-center justify-center">
                  <FileText className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Đã upload PDF</span>
                  </div>
                  {uploadedFile && (
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                      {uploadedFile.originalName}
                    </p>
                  )}
                </div>
              </div>
            )}
            {allowRemove && !disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <label className={`flex flex-col items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <input
              ref={fileInputRef}
              type="file"
              accept={getAcceptMime(accept)}
              onChange={handleFileSelect}
              className="hidden"
              disabled={disabled || isUploading}
            />
            {accept === 'image' ? (
              <ImageIcon className="w-8 h-8 text-gray-400" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
            <span className="text-sm text-gray-500">
              {accept === 'image' && 'Chọn ảnh (JPEG, PNG, GIF, WebP)'}
              {accept === 'document' && 'Chọn file ảnh hoặc PDF'}
              {accept === 'all' && 'Chọn file'}
            </span>
            <span className="text-xs text-gray-400">
              Tối đa {accept === 'document' ? '10MB' : '5MB'}
            </span>
          </label>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

// Multi-file upload component
interface MultiFileUploadProps {
  endpoint: string;
  onUploadSuccess: (urls: string[], files?: FileInfo[]) => void;
  currentUrls?: string[];
  accept?: 'image' | 'document' | 'all';
  label?: string;
  className?: string;
  maxFiles?: number;
  disabled?: boolean;
}

export const MultiFileUpload = ({
  endpoint,
  onUploadSuccess,
  currentUrls = [],
  accept = 'document',
  label = 'Upload files',
  className = '',
  maxFiles = 10,
  disabled = false,
}: MultiFileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; name: string; type: string }[]>(
    currentUrls.map(url => ({ url, name: url.split('/').pop() || 'file', type: 'unknown' }))
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`Tối đa ${maxFiles} files`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file));

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload thất bại');
      }

      const result = await response.json();
      const newFiles = result.files.map((f: FileInfo) => ({
        url: f.url,
        name: f.originalName,
        type: f.mimetype,
      }));
      
      const allFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(allFiles);
      onUploadSuccess(allFiles.map(f => f.url), result.files);
      
      toast.success(`Đã upload ${files.length} file(s)`);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi upload');
      toast.error(err.message || 'Upload thất bại');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onUploadSuccess(newFiles.map(f => f.url));
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      {/* File list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 mb-3">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
              {file.type.startsWith('image') || file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <ImageIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <FileText className="w-5 h-5 text-red-500" />
              )}
              <span className="flex-1 text-sm truncate">{file.name}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}

        <label className={`flex flex-col items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptMime(accept)}
            onChange={handleFilesSelect}
            className="hidden"
            disabled={disabled || isUploading}
            multiple
          />
          <Upload className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-500">
            Chọn thêm files ({uploadedFiles.length}/{maxFiles})
          </span>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
