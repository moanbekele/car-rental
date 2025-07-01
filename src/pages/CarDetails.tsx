import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Phone, 
  MessageCircle, 
  ChevronRight,
  Calendar,
  MapPin,
  Battery,
  Users,
  DoorOpen,
  Shield,
  CheckCircle
} from 'lucide-react';
import { getCarById } from '../data/data';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const car = getCarById(id || '');

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Car not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl hover:bg-emerald-600 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookNow = () => {
    navigate(`/car/${car.id}/select-date`);
  };

  const handleAddDates = () => {
    navigate(`/car/${car.id}/select-date`);
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`${
              index < fullStars
                ? 'text-amber-500 fill-amber-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return 'bg-emerald-500';
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Responsive Container */}
      <div className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        
        {/* Header with Car Image - Responsive Heights */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-100">
          <img
            src={car.imageUrl}
            alt={`${car.name} ${car.year}`}
            className="w-full h-full object-cover"
          />
          
          {/* Header Controls - Responsive Positioning */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 lg:p-8 pt-8 md:pt-12">
            <button
              onClick={handleBack}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/30 transition-all duration-200"
            >
              <ArrowLeft size={20} className="text-white" />
            </button>
            
            <button
              onClick={handleLike}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 ${
                isLiked || car.isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart size={18} className={isLiked || car.isLiked ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Image Dots Indicator - Responsive */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {car.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content - Responsive Layout */}
        <div className="lg:flex lg:gap-8 xl:gap-12">
          
          {/* Main Content */}
          <div className="flex-1 px-4 md:px-6 lg:px-0 py-6 space-y-6 md:space-y-8">
            
            {/* Car Title and Rating - Responsive Typography */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                {car.name} {car.year}
              </h1>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-amber-500 fill-amber-500 md:w-5 md:h-5" />
                  <span className="font-semibold text-gray-900 text-lg md:text-xl">{car.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600 text-sm md:text-base">{car.trips} Trips</span>
              </div>
            </div>

            {/* Host Section - Responsive */}
            {car.host && (
              <div className="border border-gray-100 rounded-2xl p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">Host</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <img
                      src={car.host.avatar}
                      alt={car.host.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg truncate">{car.host.name}</h4>
                        {car.host.isAllStar && (
                          <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                            All-Star Host
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 text-sm text-gray-600 flex-wrap">
                        <span>{car.host.rating} ★</span>
                        <span>{car.host.totalTrips} Trips</span>
                        <span className="hidden sm:inline">Joined {car.host.joinDate}</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Typically responds in {car.host.responseTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                      <Phone size={18} className="text-white" />
                    </button>
                    <button className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                      <MessageCircle size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Trip Dates - Responsive */}
            <div className="border border-gray-100 rounded-2xl p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">Trip Dates</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-emerald-600 md:w-6 md:h-6" />
                  <span className="text-gray-600 text-sm md:text-base">Any time</span>
                </div>
                <button 
                  onClick={handleAddDates}
                  className="text-emerald-600 font-semibold flex items-center gap-1 text-sm md:text-base hover:text-emerald-700 transition-colors"
                >
                  Add Dates
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Pickup & Return - Responsive */}
            <div className="border border-gray-100 rounded-2xl p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">Pickup & Return</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <MapPin size={20} className="text-emerald-600 flex-shrink-0 md:w-6 md:h-6" />
                  <span className="text-gray-600 text-sm md:text-base truncate">{car.pickupLocation}</span>
                </div>
                <button className="text-emerald-600 font-semibold text-sm md:text-base hover:text-emerald-700 transition-colors ml-4">
                  Change
                </button>
              </div>
            </div>

            {/* Description - Responsive */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {showFullDescription ? car.fullDescription : car.description}
                {!showFullDescription && car.fullDescription && car.fullDescription.length > (car.description?.length || 0) && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="text-emerald-600 font-semibold ml-1 hover:text-emerald-700 transition-colors"
                  >
                    Read More
                  </button>
                )}
              </p>
            </div>

            {/* Car Basics - Responsive Grid */}
            {car.basics && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">Car Basics</h3>
                <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {car.basics.batteryCapacity && (
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                        <Battery size={24} className="text-emerald-600 md:w-8 md:h-8" />
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Battery Capacity</p>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{car.basics.batteryCapacity}</p>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                      <Users size={24} className="text-emerald-600 md:w-8 md:h-8" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Capacity</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{car.basics.capacity} Seats</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                      <DoorOpen size={24} className="text-emerald-600 md:w-8 md:h-8" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Entrance</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{car.basics.doors} Doors</p>
                  </div>
                </div>
              </div>
            )}

            {/* Insurance - Responsive */}
            {car.insurance && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">Insurance</h3>
                <div className="flex items-center justify-between p-4 md:p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Shield size={20} className="text-emerald-600 flex-shrink-0 md:w-6 md:h-6" />
                    <span className="text-gray-700 text-sm md:text-base truncate">{car.insurance.coverage}</span>
                  </div>
                  <button className="text-emerald-600 font-semibold text-sm md:text-base hover:text-emerald-700 transition-colors ml-4">
                    Read More
                  </button>
                </div>
              </div>
            )}

            {/* Cancellation Policy - Responsive */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">Cancellation Policy</h3>
              <div className="flex items-start gap-3 p-4 md:p-6 bg-gray-50 rounded-2xl">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0 md:w-6 md:h-6" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{car.cancellationPolicy}</p>
              </div>
            </div>

            {/* Guidelines - Responsive */}
            {car.guidelines && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-lg md:text-xl">Guidelines</h3>
                <div className="space-y-3">
                  {car.guidelines.rules.map((rule, index) => (
                    <p key={index} className="text-gray-700 text-sm md:text-base leading-relaxed">
                      • {rule}
                    </p>
                  ))}
                </div>
                {car.guidelines.rules.length > 2 && (
                  <button className="text-emerald-600 font-semibold text-sm md:text-base mt-3 hover:text-emerald-700 transition-colors">
                    Read More
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar for Desktop - Reviews Section */}
          <div className="lg:w-96 xl:w-[420px] px-4 md:px-6 lg:px-0 pb-6 lg:pb-0">
            <div className="lg:sticky lg:top-8">
              {/* Rating and Reviews - Responsive */}
              <div className="border-t lg:border-t-0 lg:border lg:border-gray-100 lg:rounded-2xl pt-6 lg:pt-6 lg:p-6">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg md:text-xl">Rating and Reviews</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">{car.rating}</span>
                  <Star size={20} className="text-amber-500 fill-amber-500 md:w-6 md:h-6" />
                  <span className="text-gray-600 text-sm md:text-base">({car.reviewCount} ratings)</span>
                </div>

                {/* Rating Breakdown - Responsive */}
                {car.ratingBreakdown && (
                  <div className="space-y-3 mb-6">
                    {Object.entries(car.ratingBreakdown).map(([category, rating]) => (
                      <div key={category} className="flex items-center gap-3">
                        <span className="text-sm md:text-base text-gray-600 capitalize w-24 md:w-28">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getRatingColor(rating)} transition-all duration-500`}
                            style={{ width: `${(rating / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm md:text-base font-semibold text-gray-900 w-8">
                          {rating}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews - Responsive */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                      Reviews ({car.reviews?.length || 0} reviews)
                    </h4>
                    <button className="text-emerald-600 font-semibold text-sm md:text-base hover:text-emerald-700 transition-colors">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    {car.reviews?.slice(0, 2).map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-gray-900 text-sm md:text-base">{review.userName}</span>
                              {renderStars(review.rating)}
                              <span className="text-gray-500 text-xs md:text-sm">{review.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing for Mobile */}
        <div className="h-24 lg:h-12" />
      </div>

      {/* Fixed Bottom Booking Bar - Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:p-6 lg:hidden z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {formatPrice(car.pricePerDay, car.currency)}/Day
            </div>
            <div className="text-sm md:text-base text-gray-500">
              {car.currency} {(car.pricePerDay * 0.85).toLocaleString()}/Day
            </div>
          </div>
          <button 
            onClick={handleBookNow}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold transition-colors duration-200 text-sm md:text-base"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Desktop Booking Sidebar */}
      <div className="hidden lg:block fixed right-8 xl:right-16 top-1/2 transform -translate-y-1/2 w-80 xl:w-96 bg-white border border-gray-200 rounded-3xl p-6 xl:p-8 shadow-2xl z-50">
        <div className="text-center mb-6">
          <div className="text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
            {formatPrice(car.pricePerDay, car.currency)}
          </div>
          <div className="text-lg text-gray-500">per day</div>
        </div>
        
        <button 
          onClick={handleBookNow}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 xl:py-5 rounded-2xl font-semibold transition-colors duration-200 text-lg xl:text-xl mb-4"
        >
          Book Now
        </button>
        
        <div className="text-center text-sm text-gray-500">
          Free cancellation up to 5 days before your trip
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
