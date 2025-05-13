import React, { useRef, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi';

export function ImageUploader({ control, name, onUpload }) {
  const {
    field: { value, onChange },
  } = useController({ name, control });
  const fileInput = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const lastUrl = useRef(null);

  useEffect(() => {
    // Clean up previous URL
    if (lastUrl.current) {
      URL.revokeObjectURL(lastUrl.current);
      lastUrl.current = null;
    }

    if (value) {
      if (value.type.startsWith('image/')) {
        const url = URL.createObjectURL(value);
        setPreviewUrl(url);
        lastUrl.current = url;
        setError(null);
      } else {
        setError('Please upload a valid image file');
        onChange(null);
      }
    } else {
      setPreviewUrl(null);
      setError(null);
    }

    return () => {
      if (lastUrl.current) {
        URL.revokeObjectURL(lastUrl.current);
      }
    };
  }, [value, onChange]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onChange(file);
      onUpload?.(file);
      setError(null);
    } else {
      setError('Please upload a valid image file');
      onChange(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-2">
      <div
        className={`group relative border-2 border-dashed rounded-xl transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500 bg-red-50' : ''}
          cursor-pointer overflow-hidden`}
        onClick={() => fileInput.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Preview Overlay */}
        {previewUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
            <button
              type="button"
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                onUpload?.(null);
              }}
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}

        <div className="p-6 flex flex-col items-center justify-center aspect-square">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-center space-y-3">
              <div className="inline-flex p-3 bg-blue-100 rounded-full">
                <FiUploadCloud
                  className={`w-8 h-8 ${error ? 'text-red-500' : 'text-blue-500'} transition-colors`}  
                />
              </div>
              <div className="space-y-1">
                <p className={`font-medium ${error ? 'text-red-600' : 'text-gray-600'}`}>
                  {error || 'Drag & drop or click to upload'}
                </p>
                <p className="text-sm text-gray-500">
                  Recommended: JPEG, PNG (Max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Details */}
      {value && !error && (
        <div className="flex items-center space-x-3 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
          <FiImage className="w-5 h-5 text-gray-400" />
          <span className="truncate">{value.name}</span>
          <span className="text-xs text-gray-400">
            {(value.size / 1024 / 1024).toFixed(1)}MB
          </span>
        </div>
      )}

      <input
        ref={fileInput}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}