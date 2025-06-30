import React from 'react';
import { Heart, Star, Users } from 'lucide-react';

interface PopularCar {
  id: string;
  name: string;
  year: number;
  imageUrl: string;
  rating: number;
  trips: number;
  availability: string;
  seats: number;
  price: string;
  isLiked: boolean;
}

const MostPopularCars = () => {
  const popularCars: PopularCar[] = [
    {
      id: '1',
      name: 'Chevrolet Captiva',
      year: 2023,
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9acf30aa4aabcc7ab4eb6c56b70f04f55fc8916c?placeholderIfAbsent=true',
      rating: 5.0,
      trips: 5,
      availability: 'Available from 2 August',
      seats: 4,
      price: 'ETB 8,000/Day',
      isLiked: false,
    },
    {
      id: '2', 
      name: 'Tesla Model Y',
      year: 2023,
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/26016370bc24ccf98f21fe8d04f85a4fb6b3b6ff?placeholderIfAbsent=true',
      rating: 4.9,
      trips: 12,
      availability: 'Available from 8 September',
      seats: 4,
      price: 'ETB 9,000/Day',
      isLiked: true,
    },
    {
      id: '3',
      name: 'Suzuki Dzire',
      year: 2022,
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true',
      rating: 4.8,
      trips: 8,
      availability: 'Available Now',
      seats: 4,
      price: 'ETB 2,000/Day',
      isLiked: false,
    }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-3 h-3 ${
              index < fullStars
                ? 'text-yellow-400 fill-yellow-400'
                : index === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleLike = (carId: string) => {
    // Handle like functionality
    console.log('Liked car:', carId);
  };

  const handleDetails = (carId: string) => {
    // Handle details navigation
    console.log('View details for car:', carId);
  };

  return (
    <section className="w-full">
      <h2 className="text-[15px] font-semibold text-gray-900 tracking-[-0.15px] mb-4">
        Most Popular Cars
      </h2>
      
      <div className="space-y-4">
        {popularCars.map((car) => (
          <div key={car.id} className="relative w-full h-56 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Car Image */}
            <div className="w-full h-full relative">
              <img
                src={car.imageUrl}
                alt={`${car.name} ${car.year}`}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Heart Icon */}
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              onClick={() => handleLike(car.id)}
            >
              <Heart 
                className={`w-4 h-4 ${
                  car.isLiked 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-white'
                }`} 
              />
            </button>
            
            {/* Car Details Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-white">
                {/* Car Name */}
                <h3 className="font-semibold text-base mb-2">
                  {car.name} {car.year}
                </h3>
                
                {/* Rating and Trips Row */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{car.rating}</span>
                    {renderStars(car.rating)}
                  </div>
                  <span className="text-sm opacity-90">{car.trips} Trips</span>
                </div>
                
                {/* Bottom Row - Availability, Price, Details Button */}
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <p className="text-sm opacity-90 mb-1">{car.availability}</p>
                    <p className="text-lg font-bold">{car.price}</p>
                  </div>
                  
                  {/* Details Button */}
                  <button 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    onClick={() => handleDetails(car.id)}
                  >
                    <span className="text-sm font-medium text-white">Details</span>
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
