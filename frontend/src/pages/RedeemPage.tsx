import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCoins, FaBars, FaTimes, FaHome, FaGavel, FaGift, FaUser } from 'react-icons/fa';

const RedeemPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');

  const navigationItems = [
    { id: 'auction', name: 'Auctions', icon: FaGavel, path: '/' },
    { id: 'bounties', name: 'Bounties', icon: FaGift, path: '/bounties' },
    { id: 'redeem', name: 'Redeem', icon: FaHome, path: '/redeem' },
    { id: 'profile', name: 'Profile', icon: FaUser, path: '/profile' },
  ];

  const currentPage = location.pathname === '/' ? 'auction' : location.pathname.slice(1);

  const handleSubmit = () => {
    // Handle redeem logic here
    alert(`Redeeming code: ${redeemCode}`);
  };

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

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {/* Redeem Section */}
            <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-full">
              {/* Title */}
              <h1 className="font-heading text-2xl md:text-3xl text-black mb-4 text-center animate-fade-in">Redeem</h1>

              {/* Prompt Text */}
              <p className="font-body text-gray-700 text-center mb-6 text-sm animate-fade-in">
                Enter the secret code and hope for some coins
              </p>

              {/* Input Field */}
              <div className="w-full max-w-md mb-6">
                <input
                  type="text"
                  placeholder="Enter here"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  className="w-full bg-white text-black border-2 border-gray-300 rounded-xl px-4 py-3 text-center font-body text-base focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 shadow-lg"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-black to-gray-800 text-white py-3 px-6 rounded-xl font-heading text-lg w-full max-w-md hover:from-gray-800 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemPage;
