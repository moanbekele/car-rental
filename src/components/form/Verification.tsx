import React from 'react';
import { Check, Download } from 'lucide-react';

interface VerificationProps {
  onContinue: () => void;
}

const Verification: React.FC<VerificationProps> = ({ onContinue }) => {
  const paymentDetails = {
    refNumber: '00008575257',
    paymentTime: '25-02-2023, 13:22:16',
    paymentMethod: 'Bank Transfer',
    senderName: 'Abebe Bekele',
    amount: 'ETB, 49000.00',
    transactionFee: 'ETB, 50.00',
    totalAmount: 'ETB 49050.00'
  };

  const handleDownloadPDF = () => {
    alert('Payment details PDF will be downloaded');
  };

  return (
    <div className="px-4 py-8 flex flex-col justify-between min-h-[calc(100vh-200px)]">
      
      {/* Content */}
      <div className="flex-1">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={32} className="text-green-600" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Payment Success!
          </h1>
          <div className="text-2xl font-bold text-gray-900 mb-4">
            {paymentDetails.totalAmount}
          </div>
          <p className="text-gray-600">
            We will be contact you shortly,{'\n'}
            Average 1-2 hours
          </p>
        </div>

        {/* Payment Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ref Number</span>
            <span className="font-semibold text-gray-900">{paymentDetails.refNumber}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payment Time</span>
            <span className="font-semibold text-gray-900">{paymentDetails.paymentTime}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-semibold text-gray-900">{paymentDetails.paymentMethod}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Sender Name</span>
            <span className="font-semibold text-gray-900">{paymentDetails.senderName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold text-gray-900">{paymentDetails.amount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Transaction Fee</span>
            <span className="font-semibold text-gray-900">{paymentDetails.transactionFee}</span>
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-8">
          <p className="text-gray-700 mb-3">Download Payment details</p>
          <button
            onClick={handleDownloadPDF}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} />
            PDF
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-8">
        <button
          onClick={onContinue}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Verification;
