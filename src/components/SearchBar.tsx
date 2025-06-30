import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Rent a Car
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Find the perfect vehicle for your journey
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 px-6 py-4 md:px-8 md:py-5">
            <Search className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            
            <input
              type="text"
              placeholder="Search any car..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none placeholder-gray-500 text-base md:text-lg font-medium w-full text-gray-900"
              aria-label="Search for cars"
            />
            
            <button 
              type="button" 
              className="p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <SlidersHorizontal className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
