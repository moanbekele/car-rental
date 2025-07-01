import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from './CarCard';
import { topRatedCars } from '../data/data';

const TopRatedCars = () => {
  const navigate = useNavigate();

  const handleLike = (carId: string) => {
    console.log('Liked car:', carId);
    // Here you would typically update the car's liked status in your state management
    // For example: dispatch(toggleCarLike(carId)) or updateCarLike(carId)
  };

  const handleDetails = (carId: string) => {
    navigate(`/car/${carId}`);
    console.log('View details for car:', carId);
  };

  const handleViewAll = () => {
    // Navigate to a page showing all top rated cars
    navigate('/cars?category=top-rated');
    console.log('View all top rated cars');
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          Top Rated Cars
        </h2>
        <button 
          onClick={handleViewAll}
          className="text-sm md:text-base font-semibold text-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-4 py-2 hover:bg-emerald-50 transition-all duration-200"
        >
          View All
        </button>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 md:gap-8 lg:gap-10 md:overflow-visible" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {topRatedCars.map((car) => (
          <div key={car.id} className="flex-shrink-0 md:flex-shrink">
            <CarCard
              car={car}
              onLike={handleLike}
              onDetails={handleDetails}
            />
          </div>
        ))}
      </div>
      
      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TopRatedCars;
