import React, { useState } from 'react';

interface Brand {
  id: string;
  name: string;
  imageUrl: string;
}

const BrandCarousel = () => {
  const [selectedBrand, setSelectedBrand] = useState('All');

  const brands: Brand[] = [
    { id: 'all', name: 'All', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d5ac26244a18ff55d0a4b45e7edf4b3501f63072?placeholderIfAbsent=true' },
    { id: 'byd', name: 'BYD', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e0b60c2aab2f4c79be1f597f96d4f393325f740e?placeholderIfAbsent=true' },
    { id: 'toyota', name: 'Toyota', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6232ea98dace406469d31057e0089ba0c99825f7?placeholderIfAbsent=true' },
    { id: 'suzuki', name: 'SUZUKI', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6658f13b9cf985585da0050d932477cf3800e0ab?placeholderIfAbsent=true' },
    { id: 'tesla', name: 'Tesla', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c6f6d340f5b2a2ce7c102efd33f9283c474cc187?placeholderIfAbsent=true' },
    { id: 'mercedes', name: 'Mercedes', imageUrl: '' },
    { id: 'audi', name: 'Audi', imageUrl: '' },
  ];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[15px] md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 tracking-[-0.15px]">
          Top Brands
        </h2>
        <button className="text-[13px] md:text-sm lg:text-base font-normal text-gray-600 tracking-[-0.13px] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2 hover:text-gray-800 hover:bg-gray-50 transition-all">
          View All
        </button>
      </div>
      
      {/* Responsive grid with proper tablet support */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 md:gap-4 lg:gap-6 md:overflow-visible" 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {brands.map((brand) => (
          <button
            key={brand.id}
            className={`flex flex-col items-center min-w-[70px] md:min-w-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-2 md:p-3 transition-all duration-200 hover:bg-gray-50 active:scale-95 ${
              selectedBrand === brand.name ? 'bg-blue-50 ring-2 ring-blue-200' : ''
            }`}
            onClick={() => setSelectedBrand(brand.name)}
            role="tab"
            aria-selected={selectedBrand === brand.name}
          >
            <div className="bg-white border border-gray-100 w-[70px] h-[70px] md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex items-center justify-center rounded-full p-4 mb-2 shadow-sm hover:shadow-md transition-all duration-200">
              {brand.imageUrl ? (
                <img
                  src={brand.imageUrl}
                  className="w-full h-full object-contain"
                  alt={`${brand.name} logo`}
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-gray-200 rounded-lg" />
              )}
            </div>
            <span className="text-[15px] md:text-sm lg:text-base xl:text-lg font-medium text-gray-900 tracking-[-0.15px] text-center">
              {brand.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default BrandCarousel;
