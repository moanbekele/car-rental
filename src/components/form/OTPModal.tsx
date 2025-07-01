import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  countryCode: string;
  onVerifySuccess: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  phoneNumber,
  countryCode,
  onVerifySuccess
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setCountdown(60);
      setCanResend(false);
    }
  }, [isOpen]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    // Simulate verification (use 123456 for demo)
    setTimeout(() => {
      setIsLoading(false);
      if (otpValue === '123456') {
        onVerifySuccess();
        onClose();
      } else {
        alert('Invalid code. Use 123456 for demo.');
        setOtp(['', '', '', '', '', '']);
        document.getElementById('otp-0')?.focus();
      }
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    alert('New verification code sent!');
  };

  const formatPhoneNumber = (phone: string, code: string) => {
    const formatted = phone.replace(/(\d{2})(\d{3})(\d{3})/, '$1-$2-$3');
    return `${code}-${formatted}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-lg mx-auto p-6 pb-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Enter 6 Digit Code</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Please enter the 6 digit code sent you on{' '}
          <span className="font-semibold">
            {formatPhoneNumber(phoneNumber, countryCode)}
          </span>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="number"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">
            Didn't receive the text?{' '}
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-green-600 font-medium hover:text-green-700"
              >
                Resend Code
              </button>
            ) : (
              <span className="text-gray-400">
                Resend Code ({countdown}s)
              </span>
            )}
          </p>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 6}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
            isLoading || otp.join('').length !== 6
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? 'Verifying...' : 'Verify and Continue'}
        </button>

        {/* Bottom Indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
