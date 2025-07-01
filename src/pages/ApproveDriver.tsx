import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, User, Phone, CreditCard, FileText } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';

interface ApprovalItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

const ApproveDriver = () => {
  const navigate = useNavigate();
  const { clearBooking } = useBooking();

  const handleClose = () => {
    navigate('/');
  };

  const handleContinue = () => {
    // Clear booking data and navigate to home
    clearBooking();
    navigate('/', { replace: true });
    
    // Show success message
    setTimeout(() => {
      alert('Your booking has been submitted! We will review your information and get back to you soon.');
    }, 500);
  };

  const approvalItems: ApprovalItem[] = [
    {
      id: 'profile-photo',
      title: 'Profile Photo',
      description: 'Your Rental host will use it to identify you at pickup.',
      icon: <User size={20} className="text-white" />,
      backgroundColor: 'bg-green-500'
    },
    {
      id: 'phone-number',
      title: 'Phone Number',
      description: "We'll send you a verification code to help secure your account",
      icon: <Phone size={20} className="text-white" />,
      backgroundColor: 'bg-green-500'
    },
    {
      id: 'drivers-license',
      title: "Driver's License",
      description: 'You must have a valid driver\'s license to book on Rental.',
      icon: <FileText size={20} className="text-white" />,
      backgroundColor: 'bg-green-500'
    },
    {
      id: 'payment-method',
      title: 'Payment Method',
      description: "You won't be charged until you book your trip.",
      icon: <CreditCard size={20} className="text-white" />,
      backgroundColor: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-6">
        
        {/* Header with Close Button */}
        <div className="flex justify-start mb-8 pt-4">
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Get Approved to Drive
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Since this is your first trip, you'll need to provide us with some information before you can check out.
          </p>
        </div>

        {/* Approval Items */}
        <div className="space-y-4 mb-12">
          {approvalItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className={`w-12 h-12 ${item.backgroundColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for fixed button */}
        <div className="h-24"></div>
      </div>

      {/* Fixed Bottom Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleContinue}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
          
          {/* Bottom indicator line */}
          <div className="flex justify-center mt-4">
            <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveDriver;
