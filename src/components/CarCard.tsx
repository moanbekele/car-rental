import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Users, Zap } from 'lucide-react';
import type { Car } from '../types';

interface CarCardProps {
  car: Car;
  onLike?: (carId: string) => void;
  onDetails?: (carId: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onLike, onDetails }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(car.id);
  };

  const handleDetails = () => {
    navigate(`/car/${car.id}`);
    onDetails?.(car.id);
  };

  const handleCardClick = () => {
    navigate(`/car/${car.id}`);
  };

  return (
    <article 
      className="w-[280px] sm:w-[300px] md:w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Car Image Section */}
      <div className="relative aspect-[1.4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={car.imageUrl}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={`${car.name} ${car.year}`}
          loading="lazy"
        />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {car.isElectric && (
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
              <Zap size={12} />
              Electric
            </div>
          )}
          {!car.isAvailable && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Not Available
            </div>
          )}
        </div>
        
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 ${
            car.isLiked 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
          }`}
        >
          <Heart 
            size={18} 
            className={car.isLiked ? 'fill-current' : ''} 
          />
        </button>
      </div>
      
      {/* Car Details Section */}
      <div className="p-6 md:p-7 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 mr-3">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2 mb-1">
              {car.name}
            </h3>
            <p className="text-sm md:text-base text-gray-500 font-medium">
              {car.year} • {car.brand.charAt(0).toUpperCase() + car.brand.slice(1)}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-amber-700">
              {car.rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        {/* Availability */}
        <div className="mb-6">
          <p className="text-sm md:text-base text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
            {car.availability}
          </p>
        </div>
        
        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Details Row */}
          <div className="flex items-center justify-between text-sm md:text-base">
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={16} className="text-emerald-600" />
              <span className="font-medium">{car.seats} Seats</span>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                {formatPrice(car.pricePerDay, car.currency)}
              </div>
              <div className="text-sm text-gray-500">per day</div>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={handleDetails}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-6 rounded-2xl transition-all duration-300 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
