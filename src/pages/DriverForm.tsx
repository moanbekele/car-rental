import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import ProgressBar from '../components/form/ProgressBar';
import ProfileUpload from '../components/form/ProfileUpload';
import PhoneNumberEntry from '../components/form/PhoneNumberEntry';
import DrivingLicenseUpload from '../components/form/DrivingLicenseUpload';
import Verification from '../components/form/Verification';

interface FormData {
  profilePhoto: File | null;
  phoneNumber: string;
  countryCode: string;
  isPhoneVerified: boolean;
  fullName: string;
  country: string;
  expirationDate: string;
  dateOfBirth: string;
  frontImage: File | null;
  backImage: File | null;
}

const DriverForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    profilePhoto: null,
    phoneNumber: '',
    countryCode: '+251',
    isPhoneVerified: false,
    fullName: '',
    country: '',
    expirationDate: '',
    dateOfBirth: '',
    frontImage: null,
    backImage: null
  });

  const handleClose = () => {
    navigate('/');
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      alert('Driver verification completed successfully! You will be contacted shortly.');
    }, 500);
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Profile Photo';
      case 2: return 'Mobile Number';
      case 3: return "Driver's License";
      case 4: return 'Verification';
      default: return '';
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileUpload
            profilePhoto={formData.profilePhoto}
            onPhotoChange={(photo) => updateFormData({ profilePhoto: photo })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PhoneNumberEntry
            phoneNumber={formData.phoneNumber}
            countryCode={formData.countryCode}
            isVerified={formData.isPhoneVerified}
            onPhoneChange={(phone) => updateFormData({ phoneNumber: phone })}
            onCountryCodeChange={(code) => updateFormData({ countryCode: code })}
            onVerified={(verified) => updateFormData({ isPhoneVerified: verified })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <DrivingLicenseUpload
            fullName={formData.fullName}
            country={formData.country}
            expirationDate={formData.expirationDate}
            dateOfBirth={formData.dateOfBirth}
            frontImage={formData.frontImage}
            backImage={formData.backImage}
            onFullNameChange={(name) => updateFormData({ fullName: name })}
            onCountryChange={(country) => updateFormData({ country: country })}
            onExpirationDateChange={(date) => updateFormData({ expirationDate: date })}
            onDateOfBirthChange={(date) => updateFormData({ dateOfBirth: date })}
            onFrontImageChange={(image) => updateFormData({ frontImage: image })}
            onBackImageChange={(image) => updateFormData({ backImage: image })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Verification
            onContinue={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{getStepTitle()}</h1>
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={4} />

        {/* Current Step Content */}
        <div className="flex-1">
          {renderCurrentStep()}
        </div>

        {/* Bottom Indicator */}
        <div className="flex justify-center pb-8">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
