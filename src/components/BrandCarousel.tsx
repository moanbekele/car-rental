import React, { useState } from 'react';
import { brands } from '../data/data';
import type { Brand } from '../types';

const BrandCarousel = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand.name);
    console.log('Selected brand:', brand);
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
          Top Brands
        </h2>
        <button className="text-sm md:text-base font-semibold text-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-4 py-2 hover:bg-emerald-50 transition-all duration-200">
          View All
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 md:gap-6 lg:gap-8 md:overflow-visible" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {brands.map((brand) => (
          <button
            key={brand.id}
            className={`flex flex-col items-center min-w-[90px] md:min-w-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl p-4 md:p-6 transition-all duration-300 group ${
              selectedBrand === brand.name 
                ? 'bg-gradient-to-br from-emerald-50 to-green-50 ring-2 ring-emerald-200 shadow-lg' 
                : 'bg-white hover:bg-gray-50 hover:shadow-lg border border-gray-100'
            }`}
            onClick={() => handleBrandSelect(brand)}
            role="tab"
            aria-selected={selectedBrand === brand.name}
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex items-center justify-center rounded-2xl mb-3 transition-all duration-300 ${
              selectedBrand === brand.name 
                ? 'bg-white shadow-md' 
                : 'bg-gray-50 group-hover:bg-white group-hover:shadow-md'
            }`}>
              <img
                src={brand.imageUrl}
                className="w-full h-full object-contain p-3"
                alt={`${brand.name} logo`}
                loading="lazy"
              />
            </div>
            <span className={`text-sm md:text-base lg:text-lg font-semibold text-center transition-colors duration-200 ${
              selectedBrand === brand.name 
                ? 'text-emerald-700' 
                : 'text-gray-700 group-hover:text-gray-900'
            }`}>
              {brand.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default BrandCarousel;
