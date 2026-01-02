import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCoins, FaBars, FaTimes, FaHome, FaGavel, FaGift, FaUser, FaSignInAlt } from 'react-icons/fa';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'auction', name: 'Auctions', icon: FaGavel, path: '/' },
    { id: 'bounties', name: 'Bounties', icon: FaGift, path: '/bounties' },
    { id: 'redeem', name: 'Redeem', icon: FaHome, path: '/redeem' },
    { id: 'profile', name: 'Profile', icon: FaUser, path: '/profile' },
    { id: 'login', name: 'Login', icon: FaSignInAlt, path: '/login' },
  ];

  const currentPage = location.pathname === '/' ? 'auction' : location.pathname.slice(1);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className={`w-64 bg-white shadow-lg fixed lg:static inset-y-0 left-0 z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <img
                src="/PM LOGO BLACK .png"
                alt="PlayMarket Logo"
                className="h-16"
              />
            </div>
          </div>
          <nav className="mt-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors ${
                    currentPage === item.id ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' : 'text-gray-900'
                  }`}
                >
                  <Icon className="inline mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center p-4 bg-white shadow-sm border-b border-gray-200 relative">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-black"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Center: Logo (Absolutely Centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
              <img
                src="/PM LOGO BLACK .png"
                alt="PlayMarket Logo"
                className="h-10 hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => handleNavigation('/')}
              />
            </div>

            {/* Right: Coin Balance + Profile Icon */}
            <div className="flex items-center space-x-3 ml-auto z-10">
              {/* Coin Balance */}
              <div className="flex items-center bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                <FaCoins className="text-amber-400 mr-1 animate-bounce text-sm" />
                <span className="text-black font-bold text-sm">14</span>
              </div>

              {/* Profile Button */}
              <button
                onClick={() => handleNavigation('/profile')}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Profile"
              >
                <FaUser className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
