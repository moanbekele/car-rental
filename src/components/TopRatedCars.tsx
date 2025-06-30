import React from 'react';
import CarCard from './CarCard';

const TopRatedCars = () => {
  const topRatedCars = [
    {
      id: '1',
      name: 'Volkswagen Id4 Pro',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9acf30aa4aabcc7ab4eb6c56b70f04f55fc8916c?placeholderIfAbsent=true',
      rating: 5.00,
      availability: 'Available Now',
      seats: 4,
      price: 'ETB 7,000/Day',
      hasHeartIcon: false,
    },
    {
      id: '2',
      name: 'Tesla Model Y 2023',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/26016370bc24ccf98f21fe8d04f85a4fb6b3b6ff?placeholderIfAbsent=true',
      rating: 4.97,
      availability: 'Available from 8 September',
      seats: 4,
      price: 'ETB 9,000/Day',
      hasHeartIcon: true,
    },
    {
      id: '3',
      name: 'Suzuki Dzire 2022',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true',
      rating: 4.92,
      availability: 'Available Now',
      seats: 4,
      price: 'ETB 2,000/Day',
      hasHeartIcon: true,
    },
    {
      id: '4',
      name: 'Byd Electric Kiray',
      imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8559cde1d85afa8752521dd1ea31d0054ba77f05?placeholderIfAbsent=true',
      rating: 5.00,
      availability: 'Available from 2 August',
      seats: 4,
      price: 'ETB 2,000/Day',
      hasHeartIcon: false,
    },
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[15px] md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 tracking-[-0.15px]">
          Top Rated Cars
        </h2>
        <button className="text-[13px] md:text-sm lg:text-base font-normal text-gray-600 tracking-[-0.13px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 hover:text-gray-800 hover:bg-gray-50 transition-all">
          View All
        </button>
      </div>
      
      {/* Enhanced responsive grid with better tablet support */}
      <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 md:gap-6 lg:gap-8 md:overflow-visible" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {topRatedCars.map((car) => (
          <div key={car.id} className="flex-shrink-0 md:flex-shrink">
            <CarCard
              id={car.id}
              name={car.name}
              imageUrl={car.imageUrl}
              rating={car.rating}
              availability={car.availability}
              seats={car.seats}
              price={car.price}
              hasHeartIcon={car.hasHeartIcon}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedCars;
