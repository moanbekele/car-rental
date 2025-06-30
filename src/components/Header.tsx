import React, { useState } from 'react';
import { MapPin, ChevronDown, Bell } from 'lucide-react';

const Header = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Clean logo section */}
      <div className="flex items-center mb-6 md:mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg md:text-xl">RC</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">RentCar</h1>
            <p className="text-sm text-gray-500 hidden md:block">Premium Car Rental</p>
          </div>
        </div>
      </div>
      
      {/* Location & Notifications */}
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 bg-white rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 shadow-sm"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          aria-expanded={isLocationOpen}
          aria-haspopup="true"
        >
          <MapPin className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
          <div className="text-left">
            <span className="text-sm md:text-base font-semibold text-gray-900 block">
              Location
            </span>
            <span className="text-xs text-gray-500">Addis Ababa, Ethiopia</span>
          </div>
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </button>
        
        <div className="relative">
          <button className="p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl hover:bg-gray-50 transition-all duration-200 group">
            <Bell className="w-6 h-6 md:w-7 md:h-7 text-gray-600 group-hover:text-emerald-600 transition-colors" />
          </button>
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-semibold">3</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
