import React, { useState } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import OTPModal from './OTPModal';

interface PhoneNumberEntryProps {
  phoneNumber: string;
  countryCode: string;
  isVerified: boolean;
  onPhoneChange: (phone: string) => void;
  onCountryCodeChange: (code: string) => void;
  onVerified: (verified: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PhoneNumberEntry: React.FC<PhoneNumberEntryProps> = ({
  phoneNumber,
  countryCode,
  isVerified,
  onPhoneChange,
  onCountryCodeChange,
  onVerified,
  onNext,
  onPrevious
}) => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckbox, setHasCheckbox] = useState(true);

  const handleSendCode = () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      return;
    }

    if (phoneNumber.length < 9) {
      alert('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    // Simulate sending verification code
    setTimeout(() => {
      setIsLoading(false);
      setShowOTPModal(true);
    }, 1500);
  };

  const handleOTPVerifySuccess = () => {
    onVerified(true);
    setShowOTPModal(false);
  };

  const handleNext = () => {
    if (!isVerified) {
      alert('Please verify your phone number to continue');
      return;
    }
    onNext();
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as Ethiopian phone number (9 digits after country code)
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  };

  return (
    <>
      <div className="px-4 py-8 flex flex-col justify-between min-h-[calc(100vh-200px)]">
        
        {/* Content */}
        <div className="flex-1">
          
          {/* Title and Description */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Enter Your Phone Number
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Please enter your mobile number we'll send you a verification code.
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <select
                value={countryCode.replace('+', '')}
                onChange={(e) => onCountryCodeChange(`+${e.target.value}`)}
                className="w-20 px-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50"
              >
                <option value="251">ET</option>
                <option value="1">US</option>
                <option value="44">UK</option>
              </select>
              
              <div className="flex-1 relative">
                <div className="absolute left-4 top-4 text-gray-600 font-medium">
                  {countryCode}
                </div>
                <input
                  type="tel"
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="912 345 678"
                  className="w-full pl-20 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={11}
                />
                <Phone size={20} className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            {/* Checkbox for trip updates */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="trip-updates"
                checked={hasCheckbox}
                onChange={(e) => setHasCheckbox(e.target.checked)}
                className="w-5 h-5 text-green-500 border-2 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="trip-updates" className="text-gray-700 text-sm">
                Get trip updates via text
              </label>
            </div>
          </div>

          {/* Verification Success */}
          {isVerified && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 font-medium">✓ Phone number verified successfully!</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-8">
          {!isVerified ? (
            <button
              onClick={handleSendCode}
              disabled={isLoading || !phoneNumber.trim() || phoneNumber.length < 9}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                isLoading || !phoneNumber.trim() || phoneNumber.length < 9
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          ) : (
            <div className="flex gap-4">
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
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onVerifySuccess={handleOTPVerifySuccess}
      />
    </>
  );
};

export default PhoneNumberEntry;
