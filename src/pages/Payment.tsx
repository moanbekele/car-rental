import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { getCarById } from '../data/data';

interface PaymentMethod {
  id: string;
  name: string;
  logoUrl: string;
  backgroundColor: string;
}

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [selectedPayment, setSelectedPayment] = useState<string>('telebirr');
  const [isProcessing, setIsProcessing] = useState(false);

  const car = getCarById(id || '');

  useEffect(() => {
    if (!car || !booking.startDate || !booking.endDate || !booking.pickupLocation) {
      navigate('/');
    }
  }, [car, booking, navigate]);

  if (!car || !booking.startDate || !booking.endDate || !booking.pickupLocation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid booking data</h2>
          <p className="text-gray-600 mb-6">Please start the booking process again.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'ebirr',
      name: 'E-birr',
      logoUrl: 'https://images.seeklogo.com/logo-png/50/1/ebirr-logo-png_seeklogo-508155.png',
      backgroundColor: 'bg-green-50'
    },
    {
      id: 'awashbirr',
      name: 'Awash birr',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Awash_Bank_Final_logo.jpg/200px-Awash_Bank_Final_logo.jpg',
      backgroundColor: 'bg-blue-50'
    },
    {
      id: 'paypal',
      name: 'Paypal',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png',
      backgroundColor: 'bg-blue-50'
    },
    {
      id: 'mastercard',
      name: 'Master card',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png',
      backgroundColor: 'bg-red-50'
    },
    {
      id: 'telebirr',
      name: 'Tele birr',
      logoUrl: 'https://play-lh.googleusercontent.com/EMobDJKabP1eY_63QHgPS_-TK3eRfxXaeOnERbcRaWAw573iaV74pXS9xOv997dRtVg',
      backgroundColor: 'bg-teal-50'
    },
    {
      id: 'wegago',
      name: 'Wegago',
      logoUrl: 'https://images.seeklogo.com/logo-png/32/1/wegago-logo-png_seeklogo-320224.png',
      backgroundColor: 'bg-orange-50'
    },
    {
      id: 'cbebirr',
      name: 'CBE birr',
      logoUrl: 'https://play-lh.googleusercontent.com/9nJjZo24dGF3CkzAfKsQFMQk1ZF5R3Y3aCzd6cKOwT2Q8XEKy8Q5cDJYcGchNF8kh_E',
      backgroundColor: 'bg-purple-50'
    },
    {
      id: 'amole',
      name: 'Amole',
      logoUrl: 'https://play-lh.googleusercontent.com/Lv4yy_0GMa9dBZJhbJ8ZzNwQ7afCyPJf2mT2TpU5fBF-QTy0KzQ5WJe-JEcQnmNzWJA',
      backgroundColor: 'bg-yellow-50'
    },
    {
      id: 'boa',
      name: 'BOA',
      logoUrl: 'https://play-lh.googleusercontent.com/KzJJfKVfJw2R5QQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ0QqQ',
      backgroundColor: 'bg-orange-50'
    }
  ];

  const handleBack = () => {
    navigate(`/car/${id}/checkout`);
  };

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to ApproveDriver page instead of going home
      navigate(`/car/${id}/approve-driver`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto">
        
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
        </div>

        <div className="px-4 py-6">
          
          {/* Payment Options Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Options</h2>
            
            {/* Payment Methods Grid */}
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className={`relative bg-white rounded-2xl p-4 shadow-sm transition-all duration-200 hover:shadow-md border-2 ${
                    selectedPayment === method.id 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-transparent'
                  }`}
                >
                  {/* Green checkmark indicator for selected payment */}
                  {selectedPayment === method.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${method.backgroundColor} rounded-2xl flex items-center justify-center mb-3 p-2`}>
                      <img
                        src={method.logoUrl}
                        alt={method.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-xs font-bold text-gray-700">${method.name.substring(0, 3)}</span>`;
                          }
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 text-center">
                      {method.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom spacing for fixed button */}
          <div className="h-20"></div>
        </div>

        {/* Fixed Bottom Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                isProcessing
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
