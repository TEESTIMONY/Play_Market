import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCoins, FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pages = [
    { name: 'Auction', key: 'auction', path: '/' },
    { name: 'Bounties', key: 'bounties', path: '/bounties' },
    { name: 'Redeem', key: 'redeem', path: '/redeem' },
  ];

  const currentPage = location.pathname === '/' ? 'auction' : location.pathname.slice(1);

  const handlePageClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 p-5 flex items-center justify-between shadow-lg border-b border-gray-200 animate-fade-in relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden mr-2 bg-white p-2 rounded-md shadow-lg hover:bg-gray-50 transition-colors text-black"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Logo */}
      <img
        src="/PM LOGO BLACK .png"
        alt="Playmarket Logo"
        className="h-12 hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={() => handlePageClick('/')}
      />

      {/* Web Navigation */}
      <nav className="hidden md:flex space-x-8">
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => handlePageClick(page.path)}
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
                onClick={() => handlePageClick(page.path)}
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
        <FaCoins className="text-amber-400 mr-2 animate-bounce text-xl" />
        <span className="text-black font-bold text-lg">14</span>
      </div>
    </header>
  );
};

export default Header;
