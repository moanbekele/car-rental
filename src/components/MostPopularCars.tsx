import React from 'react';
import { Heart, Star, MapPin } from 'lucide-react';
import { mostPopularCars } from '../data/data';
import type { Car } from '../types';

const MostPopularCars = () => {
  const handleLike = (carId: string) => {
    console.log('Liked car:', carId);
  };

  const handleDetails = (carId: string) => {
    console.log('View details for car:', carId);
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={`${
              index < fullStars
                ? 'text-amber-500 fill-amber-500'
                : index === fullStars && hasHalfStar
                ? 'text-amber-500 fill-amber-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        Most Popular Cars
      </h2>
      
      <div className="space-y-6">
        {mostPopularCars.map((car: Car) => (
          <div key={car.id} className="relative w-full h-80 md:h-96 lg:h-[420px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100">
            {/* Car Image */}
            <div className="w-full h-full relative">
              <img
                src={car.imageUrl}
                alt={`${car.name} ${car.year}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Professional gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            
            {/* Heart Icon */}
            <button 
              className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 ${
                car.isLiked ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => handleLike(car.id)}
            >
              <Heart 
                className={`w-5 h-5 ${
                  car.isLiked 
                    ? 'text-white fill-white' 
                    : 'text-white'
                }`} 
              />
            </button>
            
            {/* Car Details Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="text-white">
                {/* Car Name & Brand */}
                <div className="mb-4">
                  <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2">
                    {car.name}
                  </h3>
                  <p className="text-sm md:text-base opacity-90 font-medium">
                    {car.year} • {car.brand.charAt(0).toUpperCase() + car.brand.slice(1)}
                  </p>
                </div>
                
                {/* Rating and Stats */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">{car.rating}</span>
                    {renderStars(car.rating)}
                    <span className="text-xs opacity-75">({car.reviewCount})</span>
                  </div>
                  {car.trips && (
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <MapPin size={14} />
                      <span>{car.trips} Trips</span>
                    </div>
                  )}
                </div>
                
                {/* Bottom Row */}
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-sm md:text-base opacity-90 mb-2">
                      {car.availability}
                    </p>
                    <div className="text-2xl md:text-3xl font-bold">
                      {formatPrice(car.pricePerDay, car.currency)}
                      <span className="text-base font-normal opacity-75">/day</span>
                    </div>
                  </div>
                  
                  {/* Details Button */}
                  <button 
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 border border-white/20"
                    onClick={() => handleDetails(car.id)}
                  >
                    <span className="text-sm font-semibold text-white">View Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostPopularCars;
