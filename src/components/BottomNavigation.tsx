import React, { useState } from 'react';
import { MessageCircle, MapPin, Heart, User, Plus, Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isCenter?: boolean;
}

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageCircle size={20} strokeWidth={1.8} />
    },
    {
      id: 'trips',
      label: 'Trips',
      icon: <MapPin size={20} strokeWidth={1.8} />
    },
    {
      id: 'add',
      label: 'Add',
      icon: <Plus size={20} strokeWidth={2} />,
      isCenter: true
    },
    {
      id: 'favorite',
      label: 'Favorites',
      icon: <Heart size={20} strokeWidth={1.8} />
    },
    {
      id: 'host',
      label: 'Host',
      icon: <User size={20} strokeWidth={1.8} />
    }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    console.log(`Navigating to ${tabId}`);
  };

  return (
    <>
      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-t-[32px] px-4 py-4 relative mx-4 shadow-2xl border-t border-gray-700/50">
          <div className="flex items-center justify-between px-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.isCenter ? (
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className="bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform -translate-y-8 transition-all duration-300 border-4 border-gray-900/95 relative z-10"
                  >
                    <div className="text-white drop-shadow-sm">
                      {item.icon}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className="flex flex-col items-center transition-all duration-300 py-3 px-4 group"
                  >
                    <div className="relative">
                      {activeTab === item.id && (
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full scale-110 transition-all duration-300" />
                      )}
                      <div
                        className={`w-8 h-8 flex items-center justify-center transition-all duration-300 relative z-10 ${
                          activeTab === item.id
                            ? 'text-emerald-400 scale-110'
                            : 'text-gray-400 group-hover:text-gray-300'
                        }`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold transition-all duration-300 mt-1 tracking-wide ${
                        activeTab === item.id
                          ? 'text-emerald-400'
                          : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLET TOP NAVIGATION */}
      <div className="hidden md:block xl:hidden">
        <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 z-50 shadow-sm">
          <div className="max-w-full mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-18 lg:h-20">
              
              {/* Brand */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">RC</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl lg:text-2xl text-gray-900">RentCar</h1>
                  <p className="text-sm text-gray-500 hidden lg:block">Premium Car Rental</p>
                </div>
              </div>

              {/* Center Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.filter(item => !item.isCenter).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-emerald-500 text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                {/* Add Button */}
                <button
                  onClick={() => handleTabClick('add')}
                  className="bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Plus size={22} className="text-white" strokeWidth={2} />
                </button>

                {/* Menu Button */}
                <div className="lg:hidden relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-12 h-12 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
                  >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 top-16 bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 min-w-[200px] z-50">
                      {navItems.filter(item => !item.isCenter).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                            activeTab === item.id
                              ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.icon}
                          <span className="font-semibold">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-18 lg:h-20" />
      </div>

      {/* DESKTOP SIDEBAR NAVIGATION */}
      <div className="hidden xl:block fixed left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-6 z-50">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative group ${
                activeTab === item.id
                  ? 'bg-emerald-500 text-white shadow-lg scale-110'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:scale-105'
              } ${item.isCenter ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg' : ''}`}
              title={item.label}
            >
              {item.icon}
              
              {/* Enhanced Tooltip */}
              <div className="absolute left-full ml-4 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:block xl:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default BottomNavigation;
