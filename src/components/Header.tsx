import React, { useState } from 'react';

const Header = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Logo Section */}
      <div className="flex items-center mb-4 md:mb-6">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f0d121be16836c0dd64026ea12a20341a57b335?placeholderIfAbsent=true"
          className="w-15 h-6 md:h-8 lg:h-10 rounded-full"
          alt="Company Logo"
        />
      </div>
      
      {/* Location & Notifications */}
      <div className="flex items-center justify-between">
        <button 
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-white rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          aria-expanded={isLocationOpen}
          aria-haspopup="true"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/77c09ccdaa87b7ea338a486c63019c15a92859d9?placeholderIfAbsent=true"
            className="w-5 h-5 md:w-6 md:h-6"
            alt="Location icon"
          />
          <span className="text-[15px] md:text-base lg:text-lg font-medium text-gray-900 tracking-[-0.15px]">
            Location
          </span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb351dd92a69de04c358d8da39dcd6f23a5d9cfb?placeholderIfAbsent=true"
            className="w-4 h-4 md:w-5 md:h-5"
            alt="Dropdown arrow"
          />
        </button>
        
        <button className="p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg hover:bg-gray-50 transition-colors">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e570c1a781e03e3fe9ed31fcac2c39353d2fcd80?placeholderIfAbsent=true"
            className="w-8 h-9 md:w-10 md:h-11"
            alt="Notifications"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
