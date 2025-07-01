import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Check } from 'lucide-react';

interface DrivingLicenseUploadProps {
  fullName: string;
  country: string;
  expirationDate: string;
  dateOfBirth: string;
  frontImage: File | null;
  backImage: File | null;
  onFullNameChange: (name: string) => void;
  onCountryChange: (country: string) => void;
  onExpirationDateChange: (date: string) => void;
  onDateOfBirthChange: (date: string) => void;
  onFrontImageChange: (image: File | null) => void;
  onBackImageChange: (image: File | null) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DrivingLicenseUpload: React.FC<DrivingLicenseUploadProps> = ({
  fullName,
  country,
  expirationDate,
  dateOfBirth,
  frontImage,
  backImage,
  onFullNameChange,
  onCountryChange,
  onExpirationDateChange,
  onDateOfBirthChange,
  onFrontImageChange,
  onBackImageChange,
  onNext,
  onPrevious
}) => {
  const frontFileRef = useRef<HTMLInputElement>(null);
  const backFileRef = useRef<HTMLInputElement>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const countries = [
    { value: '', label: 'Select country' },
    { value: 'ET', label: 'Ethiopia' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' }
  ];

  const handleImageUpload = (type: 'front' | 'back', file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Please select an image smaller than 10MB');
      return;
    }

    if (type === 'front') {
      onFrontImageChange(file);
      const url = URL.createObjectURL(file);
      setFrontPreview(url);
    } else {
      onBackImageChange(file);
      const url = URL.createObjectURL(file);
      setBackPreview(url);
    }

    // Auto-fill dummy data when both images are uploaded
    if ((type === 'front' && backImage) || (type === 'back' && frontImage)) {
      autoFillData();
    } else if (type === 'front' && backImage) {
      autoFillData();
    } else if (type === 'back' && frontImage) {
      autoFillData();
    }
  };

  const autoFillData = () => {
    setTimeout(() => {
      onFullNameChange('Abebe Bekele');
      onCountryChange('ET');
      onExpirationDateChange('25/12/2027');
      onDateOfBirthChange('15/03/1990');
      alert('License information extracted successfully!');
    }, 1000);
  };

  const handleFileSelect = (type: 'front' | 'back') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(type, file);
    }
  };

  const handleNext = () => {
    if (!frontImage) {
      alert('Please upload the front of your license');
      return;
    }
    if (!backImage) {
      alert('Please upload the back of your license');
      return;
    }
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!country) {
      alert('Please select your country');
      return;
    }
    if (!expirationDate.trim()) {
      alert('Please enter the expiration date');
      return;
    }
    if (!dateOfBirth.trim()) {
      alert('Please enter your date of birth');
      return;
    }
    onNext();
  };

  const formatDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as dd/mm/yyyy
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };

  return (
    <div className="px-4 py-8 flex flex-col justify-between min-h-[calc(100vh-200px)]">
      
      {/* Content */}
      <div className="flex-1">
        
        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Upload License Photos
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Please upload clear photos of both sides of your license. We'll automatically extract your information.
          </p>
        </div>

        {/* Upload Sections */}
        <div className="space-y-6 mb-8">
          
          {/* Front License Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Front of License
            </label>
            <button
              onClick={() => frontFileRef.current?.click()}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-400 transition-colors"
            >
              {frontPreview ? (
                <div className="relative">
                  <img
                    src={frontPreview}
                    alt="Front license"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Upload Front</span>
                  <span className="text-gray-400 text-sm">JPG, PNG up to 10MB</span>
                </div>
              )}
            </button>
            <input
              ref={frontFileRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect('front')}
              className="hidden"
            />
          </div>

          {/* Back License Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Back of License
            </label>
            <button
              onClick={() => backFileRef.current?.click()}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-400 transition-colors"
            >
              {backPreview ? (
                <div className="relative">
                  <img
                    src={backPreview}
                    alt="Back license"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Upload Back</span>
                  <span className="text-gray-400 text-sm">JPG, PNG up to 10MB</span>
                </div>
              )}
            </button>
            <input
              ref={backFileRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect('back')}
              className="hidden"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              {countries.map((countryOption) => (
                <option key={countryOption.value} value={countryOption.value}>
                  {countryOption.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Fields Row */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Expiration Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                value={expirationDate}
                onChange={(e) => onExpirationDateChange(formatDate(e.target.value))}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={10}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => onDateOfBirthChange(formatDate(e.target.value))}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={10}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-8">
        <button
          onClick={onPrevious}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        
        <button
          onClick={handleNext}
          className="flex-1 py-4 rounded-2xl font-semibold text-lg bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default DrivingLicenseUpload;
