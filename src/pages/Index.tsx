import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BrandCarousel from '../components/BrandCarousel';
import TopRatedCars from '../components/TopRatedCars';
import MostPopularCars from '../components/MostPopularCars';
import BottomNavigation from '../components/BottomNavigation';

const Index = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      {/* Responsive container with tablet considerations */}
      <div className="max-w-md mx-auto md:max-w-full lg:max-w-6xl xl:max-w-7xl">
        
        {/* Desktop Sidebar Space - only on xl screens */}
        <div className="xl:ml-24">
          {/* Tablet and desktop padding adjustments */}
          <div className="px-4 py-4 md:px-6 lg:px-8 xl:px-8">
            <Header />
            
            <main className="mt-6 space-y-8 md:space-y-10 lg:space-y-12">
              <SearchBar />
              <BrandCarousel />
              
              {/* Responsive grid for car sections */}
              <div className="space-y-8 md:space-y-10 lg:space-y-12 xl:grid xl:grid-cols-2 xl:gap-12 xl:space-y-0">
                <TopRatedCars />
                <MostPopularCars />
              </div>
            </main>
          </div>
        </div>
        
        <BottomNavigation />
        
        {/* Responsive bottom padding */}
        <div className="h-20 md:h-16 xl:h-8" />
      </div>
    </div>
  );
};

export default Index;
