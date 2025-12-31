import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { FaCoins, FaBars, FaTimes, FaHome, FaGavel, FaGift, FaUser } from 'react-icons/fa';

const BountiesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<any>(null);
  const [submission, setSubmission] = useState('');

  const navigationItems = [
    { id: 'auction', name: 'Auctions', icon: FaGavel, path: '/' },
    { id: 'bounties', name: 'Bounties', icon: FaGift, path: '/bounties' },
    { id: 'redeem', name: 'Redeem', icon: FaHome, path: '/redeem' },
    { id: 'profile', name: 'Profile', icon: FaUser, path: '/profile' },
  ];

  const currentPage = location.pathname === '/' ? 'auction' : location.pathname.slice(1);

  const bounties = [
    {
      id: 8,
      title: 'Bounties #8',
      description: 'Create social media content for our brand',
      reward: 150,
      status: 'available',
      claimsLeft: 8,
      expiresIn: null,
      postedHoursAgo: 2,
    },
    {
      id: 7,
      title: 'Bounties #7',
      description: 'Test our new mobile app features',
      reward: 200,
      status: 'available',
      claimsLeft: 12,
      expiresIn: 6,
      postedHoursAgo: 4,
    },
    {
      id: 6,
      title: 'Bounties #6',
      description: 'Write a product review article',
      reward: 120,
      status: 'available',
      claimsLeft: 3,
      expiresIn: null,
      postedHoursAgo: 8,
    },
    {
      id: 5,
      title: 'Bounties #5',
      description: 'Participate in user research study',
      reward: 175,
      status: 'available',
      claimsLeft: 20,
      expiresIn: 12,
      postedHoursAgo: 10,
    },
    {
      id: 4,
      title: 'Bounties #4',
      description: 'Complete this task and earn coins',
      reward: 119,
      status: 'available',
      claimsLeft: 14,
      expiresIn: null,
      postedHoursAgo: 6,
    },
    {
      id: 3,
      title: 'Bounties #3',
      description: 'Do this, do that, and earn coins',
      reward: 89,
      status: 'available',
      claimsLeft: 5,
      expiresIn: 2,
      postedHoursAgo: 12,
    },
    {
      id: 2,
      title: 'Bounties #2',
      description: 'Help with community tasks',
      reward: 75,
      status: 'full',
      claimsLeft: 0,
      expiresIn: null,
      postedHoursAgo: 24,
    },
    {
      id: 1,
      title: 'Bounties #1',
      description: 'Complete survey and get rewarded',
      reward: 50,
      status: 'expired',
      claimsLeft: null,
      expiresIn: null,
      postedHoursAgo: 48,
    },
  ];

  const getStatusBadge = (bounty: any) => {
    if (bounty.status === 'available' && bounty.claimsLeft > 0) {
      return (
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          {bounty.claimsLeft} Claims Left
        </span>
      );
    } else if (bounty.status === 'available' && bounty.expiresIn) {
      return (
        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
          Expires in {bounty.expiresIn} hours
        </span>
      );
    } else if (bounty.status === 'full') {
      return (
        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
          Full
        </span>
      );
    } else if (bounty.status === 'expired') {
      return (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Expired
        </span>
      );
    }
    return null;
  };

  const handleClaimClick = (bounty: any) => {
    setSelectedBounty(bounty);
  };

  const handleSubmit = () => {
    alert(`Submission for ${selectedBounty.title}: ${submission}`);
    setSelectedBounty(null);
    setSubmission('');
  };

  const getClaimButton = (bounty: any) => {
    if (bounty.status === 'available' && bounty.claimsLeft > 0) {
      return (
        <button
          onClick={() => handleClaimClick(bounty)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg font-heading text-sm hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          Claim
        </button>
      );
    } else if (bounty.status === 'full') {
      return (
        <button className="bg-gray-500 text-white py-2 px-4 rounded-lg font-heading text-sm cursor-not-allowed" disabled>
          Full
        </button>
      );
    } else if (bounty.status === 'expired') {
      return (
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg font-heading text-sm cursor-not-allowed" disabled>
          Expired
        </button>
      );
    }
    return null;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  if (selectedBounty) {
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
              {/* Expanded Bounty View */}
              <div className="p-4 md:p-8 animate-fade-in">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-slide-in">
                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedBounty(null)}
                      className="mb-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      ← Back to Bounties
                    </button>

                    {/* Bounty Title and Reward */}
                    <div className="flex items-center justify-between mb-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                      <h1 className="font-heading text-3xl text-black hover:text-blue-600 transition-colors duration-300">{selectedBounty.title}</h1>
                      <div className="flex items-center bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-xl shadow-md animate-bounce">
                        <FaCoins className="text-amber-400 mr-1 text-xl" />
                        <span className="font-bold text-2xl text-black">{selectedBounty.reward}</span>
                      </div>
                    </div>

                    {/* Bounty Description */}
                    <div className="mb-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                      <h3 className="font-heading text-lg text-black mb-3">Description</h3>
                      <p className="font-body text-gray-700 leading-relaxed bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border-l-4 border-blue-500">
                        {selectedBounty.description}. This is a detailed description of the bounty task that needs to be completed.
                        Users should follow the instructions carefully to ensure their submission is approved.
                        The task requires specific actions and deliverables that will be reviewed by our team.
                      </p>
                    </div>

                    {/* Submission Section */}
                    <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
                      <h3 className="font-heading text-lg text-black mb-3">Submission</h3>
                      <textarea
                        value={submission}
                        onChange={(e) => setSubmission(e.target.value)}
                        placeholder="Enter your submission here"
                        className="w-full bg-gray-50 text-black border-2 border-gray-300 rounded-xl px-4 py-3 font-body text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none hover:shadow-md"
                        rows={6}
                      />
                      <p className="text-sm text-gray-500 mt-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>Your submission will be reviewed and possibly approved</p>

                      <button
                        onClick={handleSubmit}
                        className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-xl font-heading text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg active:scale-95"
                      >
                        🚀 SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Campaign Banner */}
            <div className="bg-red text-white py-2 px-4 shadow-lg animate-pulse border-2 border-red-700">
              <div className="flex items-center justify-center max-w-6xl mx-auto">
                <div className="text-center">
                  {/* <span className="text-lg mb-1 block">🎯</span> */}
                  <p className="font-heading text-sm font-bold">Complete Tasks & Earn Up to 200 Coins!</p>
                  <p className="font-body text-xs opacity-90 mt-1">Start earning now - your rewards await!</p>
                </div>
              </div>
            </div>

            {/* Bounties Section */}
            <div className="p-4 md:p-8">
              <h1 className="font-heading text-3xl text-black mb-6 text-left animate-fade-in">Bounties</h1>
              <div className="max-w-4xl mx-auto space-y-4">
                {bounties.map((bounty, index) => (
                  <div
                    key={bounty.id}
                    className="bg-white rounded-xl shadow-lg hover:bg-red-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 p-6 border border-gray-200 relative animate-slide-in hover:scale-102"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Posted Time */}
                    <div className="absolute top-3 right-3 text-xs text-gray-400">
                      {bounty.postedHoursAgo}hrs ago
                    </div>

                    {/* Claims Left */}
                    {bounty.claimsLeft !== null && bounty.claimsLeft > 0 && (
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-semibold uppercase">
                        {bounty.claimsLeft} CLAIMS LEFT
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl text-black mb-2">{bounty.title}</h3>
                        <p className="font-body text-gray-600 mb-3">{bounty.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <FaCoins className="text-amber-400 mr-1" />
                            <span className="font-bold text-lg text-black">{bounty.reward}</span>
                          </div>
                          {getStatusBadge(bounty)}
                        </div>
                      </div>
                      <div className="ml-4">
                        {getClaimButton(bounty)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountiesPage;
