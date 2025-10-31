import React from 'react';
import { Camera, X } from 'lucide-react';

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imagePreview,
  onImageChange,
  onImageRemove,
  isProcessing
}) => {
  const handleCameraClick = () => {
    // For mobile devices, we need to trigger the file input differently
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <div>
      <label className="block text-base font-medium text-gray-800 mb-2">
        Got a photo? <span className="text-gray-500 font-normal">(Optional)</span>
      </label>
      
      {!imagePreview ? (
        <div className="relative">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
            aria-label="Upload food photo"
          />
          <label 
            htmlFor="image-upload"
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer block"
            onClick={handleCameraClick}
          >
            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">
              {isProcessing ? 'Processing image...' : 'Tap to take photo or choose from gallery'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              📱 Camera or gallery • JPG, PNG up to 10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Food preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={onImageRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;