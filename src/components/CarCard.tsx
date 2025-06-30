import React from 'react';

interface CarCardProps {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  availability: string;
  seats: number;
  price: string;
  hasHeartIcon?: boolean;
  isLiked?: boolean;
}

const CarCard: React.FC<CarCardProps> = ({
  name,
  imageUrl,
  rating,
  availability,
  seats,
  price,
  hasHeartIcon = false,
  isLiked = false,
}) => {
  return (
    <article className="w-[200px] sm:w-[220px] md:w-full bg-white border border-gray-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-[1.4] bg-gray-50 overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          alt={name}
        />
        
        {/* Enhanced overlay for better touch targets on tablets */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
          {hasHeartIcon ? (
            <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 border-2 border-white rounded-sm" />
            </div>
          ) : (
            <button className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 focus:outline-none focus:ring-2 focus:ring-white rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 active:scale-95">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e2f4d6e72e00a53125156b210f777721d9e1dc5?placeholderIfAbsent=true"
                className="w-full h-full p-2"
                alt="Add to favorites"
              />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 flex-1 mr-2 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            {hasHeartIcon ? (
              <div className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-green-500 rounded-sm" />
            ) : (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/27940602ec6eafa706550124d926ceba544a0eda?placeholderIfAbsent=true"
                className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                alt="Rating star"
              />
            )}
            <span className="text-xs md:text-sm lg:text-base text-gray-500 font-medium">{rating.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <div className="text-xs md:text-sm lg:text-base text-gray-500 font-normal">
            {availability}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2">
              {!hasHeartIcon && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4354b56ff7c37d0bd983bf36b8def40e8a2d7e9?placeholderIfAbsent=true"
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                  alt="Seats icon"
                />
              )}
              <span className="text-xs md:text-sm lg:text-base font-medium text-gray-900">{seats} Seats</span>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2">
              {!hasHeartIcon && (
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/957c62cb0e5b41537792495d03ed9d8a249f3e03?placeholderIfAbsent=true"
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                  alt="Price icon"
                />
              )}
              <span className="text-xs md:text-sm lg:text-base font-semibold text-gray-900">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
