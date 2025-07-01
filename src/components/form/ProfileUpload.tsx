import React, { useRef, useState } from 'react';
import { User, Plus } from 'lucide-react';

interface ProfileUploadProps {
  profilePhoto: File | null;
  onPhotoChange: (photo: File | null) => void;
  onNext: () => void;
}

const ProfileUpload: React.FC<ProfileUploadProps> = ({
  profilePhoto,
  onPhotoChange,
  onNext
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      onPhotoChange(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    if (!profilePhoto) {
      alert('Please upload a profile photo to continue');
      return;
    }
    onNext();
  };

  return (
    <div className="px-4 py-8 flex flex-col justify-between min-h-[calc(100vh-200px)]">
      
      {/* Content */}
      <div className="flex-1">
        
        {/* Title and Description */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Choose Profile Photo
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Please provide a clear photo of your face so your hosts can recognize you.
          </p>
        </div>

        {/* Photo Upload Area */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <button
              onClick={handleUploadClick}
              className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden hover:bg-gray-200 transition-colors"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={64} className="text-gray-400" />
              )}
            </button>
            
            {/* Plus Button */}
            <button
              onClick={handleUploadClick}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg"
            >
              <Plus size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Info */}
        {profilePhoto && (
          <div className="text-center text-sm text-gray-600 mb-4">
            <p>✓ Photo uploaded: {profilePhoto.name}</p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="pt-8">
        <button
          onClick={handleNext}
          disabled={!profilePhoto}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
            profilePhoto
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default ProfileUpload;
