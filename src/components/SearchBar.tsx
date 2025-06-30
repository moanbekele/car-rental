import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="w-full">
      <h1 className="text-[15px] md:text-lg lg:text-xl font-semibold text-gray-900 tracking-[-0.15px] mb-3 md:mb-4">
        Rent a Car anytime
      </h1>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-gray-50 flex items-center gap-4 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3 flex-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c95c8ef414a7166be9b1b9ea229482131ef9e896?placeholderIfAbsent=true"
              className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
              alt="Search icon"
            />
            <input
              type="text"
              placeholder="Search any car..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none placeholder-gray-600 text-[13px] md:text-base font-normal tracking-[-0.13px] w-full"
              aria-label="Search for cars"
            />
          </div>
          
          <button 
            type="button" 
            className="p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4264786ec5ad3884e92fb8a52bfdc9b3c2f9f5eb?placeholderIfAbsent=true"
              className="w-6 h-6 md:w-7 md:h-7"
              alt="Filter options"
            />
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
