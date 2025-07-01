import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { getCarById } from '../data/data';

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { booking } = useBooking();

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

  const handleBack = () => {
    navigate(`/car/${id}/select-pickup`);
  };

  const handleProceedToPay = () => {
    navigate(`/car/${id}/payment`);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short',
      weekday: 'short'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()}`;
  };

  const formatPriceWithCurrency = (price: number): string => {
    return `${booking.currency} ${price.toLocaleString()}`;
  };

  const getDiscountAmount = (): number => {
    return 0;
  };

  const getCarRentalSubtotal = (): number => {
    return car.pricePerDay * booking.totalDays;
  };

  const getPickupFee = (): number => {
    return booking.pickupLocation?.additionalCost || 0;
  };

  const getFinalTotal = (): number => {
    return getCarRentalSubtotal() + getPickupFee() - getDiscountAmount();
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
          <h1 className="text-lg font-semibold text-gray-900">Request to Book</h1>
        </div>

        <div className="px-4 py-6 space-y-4">
          
          {/* Car Details Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex gap-4">
              <div className="w-20 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{car.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-green-500 fill-green-500" />
                    <span className="text-sm font-semibold text-gray-900">{car.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{car.trips} Trips</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {formatPriceWithCurrency(car.pricePerDay)}/Day
                </div>
              </div>
            </div>
          </div>

          {/* Trip Date & Time */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Date & Time</h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {formatDate(booking.startDate)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatTime(booking.startDate)}
                </div>
              </div>
              
              <div className="flex-1 flex justify-center items-center">
                <div className="flex items-center">
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
                  <div className="w-8 h-px bg-gray-300"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {formatDate(booking.endDate)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatTime(booking.endDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Pickup & Return */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup & Return</h3>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{booking.pickupLocation.name}</div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">
                  {formatPrice(car.pricePerDay)} {booking.currency} × {booking.totalDays} days
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(getCarRentalSubtotal())}
                </span>
              </div>
              
              {getPickupFee() > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Pickup service</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(getPickupFee())}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Discount</span>
                <span className="font-medium text-gray-900">
                  {getDiscountAmount() > 0 ? `-${formatPrice(getDiscountAmount())}` : '-'}
                </span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="font-bold text-gray-900 text-lg">
                  {formatPrice(getFinalTotal())}.00
                </span>
              </div>
            </div>
          </div>

          {/* Bottom spacing for fixed button */}
          <div className="h-20"></div>
        </div>

        {/* Fixed Bottom Payment Section */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="text-white">
              <div className="text-lg font-bold">
                {formatPrice(getFinalTotal())}.00 {booking.currency}
              </div>
              <div className="text-sm text-gray-300">Total Amount</div>
            </div>
            <button
              onClick={handleProceedToPay}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
