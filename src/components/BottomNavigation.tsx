import React, { useState } from 'react';
import { MessageCircle, MapPin, Heart, User, Plus, Menu } from 'lucide-react';

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
      {/* MOBILE BOTTOM NAVIGATION (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
        <div className="bg-[#1C1C1E] rounded-t-[32px] px-2 py-3 relative mx-2 shadow-2xl border-t border-gray-800/20">
          <div className="flex items-center justify-between px-4">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.isCenter ? (
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className="bg-gradient-to-br from-[#00E5A0] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#00C299] w-14 h-14 rounded-full flex items-center justify-center shadow-xl transform -translate-y-6 transition-all duration-300 border-[3px] border-[#1C1C1E] relative z-10"
                    style={{
                      boxShadow: '0 8px 25px rgba(0, 229, 160, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <div className="text-white drop-shadow-sm">
                      {item.icon}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className="flex flex-col items-center transition-all duration-300 py-2 px-3 group"
                  >
                    <div className="relative">
                      {activeTab === item.id && (
                        <div className="absolute inset-0 bg-white/10 rounded-full scale-110 transition-all duration-300" />
                      )}
                      <div
                        className={`w-8 h-8 flex items-center justify-center transition-all duration-300 relative z-10 ${
                          activeTab === item.id
                            ? 'text-white scale-105'
                            : 'text-[#8E8E93] group-hover:text-[#A8A8A8]'
                        }`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <span
                      className={`text-[9px] font-semibold transition-all duration-300 mt-1 tracking-wide ${
                        activeTab === item.id
                          ? 'text-white'
                          : 'text-[#8E8E93] group-hover:text-[#A8A8A8]'
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

      {/* TABLET TOP NAVIGATION (768px - 1280px) */}
      <div className="hidden md:block xl:hidden">
        {/* Top Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
          <div className="max-w-full mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-18">
              
              {/* Left: Logo/Brand */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#00E5A0] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm lg:text-base">RC</span>
                </div>
                <span className="font-semibold text-gray-900 text-lg lg:text-xl hidden lg:block">RentCar</span>
              </div>

              {/* Center: Navigation Items (Landscape tablets and up) */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.filter(item => !item.isCenter).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-[#00E5A0] text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Right: Add Button + Menu (Portrait tablets) */}
              <div className="flex items-center space-x-3">
                {/* Add Button */}
                <button
                  onClick={() => handleTabClick('add')}
                  className="bg-gradient-to-br from-[#00E5A0] to-[#00D4AA] hover:from-[#00D4AA] hover:to-[#00C299] w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus size={20} className="text-white" strokeWidth={2} />
                </button>

                {/* Menu Button for Portrait Tablets */}
                <div className="lg:hidden relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Menu size={20} className="text-gray-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 min-w-[180px] z-50">
                      {navItems.filter(item => !item.isCenter).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                            activeTab === item.id
                              ? 'bg-[#00E5A0] text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top spacing for fixed navigation */}
        <div className="h-16 lg:h-18" />
      </div>

      {/* DESKTOP SIDEBAR NAVIGATION (≥ 1280px) */}
      <div className="hidden xl:block fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
        <nav className="space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${
                activeTab === item.id
                  ? 'bg-[#00E5A0] text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              } ${item.isCenter ? 'bg-gradient-to-br from-[#00E5A0] to-[#00D4AA] text-white shadow-lg' : ''}`}
              title={item.label}
            >
              {item.icon}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile menu */}
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
