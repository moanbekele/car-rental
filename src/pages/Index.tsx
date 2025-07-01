import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BrandCarousel from '../components/BrandCarousel';
import TopRatedCars from '../components/TopRatedCars';
import MostPopularCars from '../components/MostPopularCars';
import BottomNavigation from '../components/BottomNavigation';

const Index = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen w-full">
      {/* Professional container with responsive design */}
      <div className="max-w-md mx-auto md:max-w-full md:px-8 lg:max-w-6xl xl:max-w-7xl">
        
        {/* Desktop Sidebar Space */}
        <div className="xl:ml-24">
          <div className="px-4 py-6 md:px-6 lg:px-8 xl:px-8">
            <Header />
            
            <main className="mt-8 space-y-10 md:space-y-12 lg:space-y-16">
              <SearchBar />
              <BrandCarousel />
              
              {/* Clean grid layout for car sections */}
              <div className="space-y-12 md:space-y-16 xl:grid xl:grid-cols-2 xl:gap-16 xl:space-y-0">
                <TopRatedCars />
                <MostPopularCars />
              </div>
            </main>
          </div>
        </div>
        
        <BottomNavigation />
        
        {/* Responsive bottom padding */}
        <div className="h-24 md:h-20 xl:h-12" />
      </div>
    </div>
  );
};

export default Index;
