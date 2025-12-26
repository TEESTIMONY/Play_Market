import React, { useState } from 'react';
import { FaCoins } from 'react-icons/fa';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pages = [
    { name: 'Auction', key: 'auction' },
    { name: 'Bounties', key: 'bounties' },
    { name: 'Redeem', key: 'redeem' },
  ];

  const handlePageClick = (pageKey: string) => {
    onPageChange(pageKey);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 p-5 flex items-center justify-between shadow-lg border-b border-gray-200 animate-fade-in relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden mr-2 p-3 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
      >
        <div className="w-6 h-6 flex flex-col justify-center relative">
          <span className={`absolute w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2' : 'top-1'}`}></span>
          <span className={`absolute w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-2.5'}`}></span>
          <span className={`absolute w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
        </div>
      </button>

      {/* Logo */}
      <img
        src="/PM LOGO BLACK .png"
        alt="Playmarket Logo"
        className="h-12 hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={() => handlePageClick('auction')}
      />

      {/* Web Navigation */}
      <nav className="hidden md:flex space-x-8">
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => handlePageClick(page.key)}
            className={`font-body text-lg transition-all duration-200 hover:scale-110 ${
              currentPage === page.key ? 'text-red font-semibold' : 'text-black hover:text-red'
            }`}
          >
            {page.name}
          </button>
        ))}
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-200 shadow-2xl backdrop-blur-sm md:hidden animate-slide-in z-50 rounded-b-xl">
          <nav className="flex flex-col py-3">
            {pages.map((page, index) => (
              <button
                key={page.key}
                onClick={() => handlePageClick(page.key)}
                className={`text-left px-6 py-4 font-body text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transform hover:translate-x-2 ${
                  currentPage === page.key
                    ? 'text-red font-semibold bg-gradient-to-r from-red-50 to-pink-50 border-r-4 border-red-500 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {page.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Coin Balance */}
      <div className="flex items-center bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
        <FaCoins className="text-yellow-400 mr-2 animate-bounce text-xl" />
        <span className="text-black font-bold text-lg">14</span>
      </div>
    </header>
  );
};

export default Header;
