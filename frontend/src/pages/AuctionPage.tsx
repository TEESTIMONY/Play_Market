import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FaCoins } from 'react-icons/fa';

interface PageProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const AuctionPage: React.FC<PageProps> = ({ currentPage, onPageChange }) => {
  // Hardcoded data for demo
  const auctionTitle = '5-DAY MEAL PASS @ ST RINA';
  const auctionDescription = 'Because cooking is overrated and your gas deserves a break.';
  const latestBid = 119;

  // Slideshow images for ST Rina
  const images = [
    '/ST Rina 1.jpg',
    '/ST Rina 2.jpg',
    '/ST Rina 3.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 11,
    minutes: 26,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) clearInterval(timer);
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slideshow effect
  useEffect(() => {
    const slideshowTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(slideshowTimer);
  }, [images.length]);

  const bids = [
    { user: 'USER 1', amount: 119, isWinner: true },
    { user: 'USER 3', amount: 118 },
    { user: 'USER 4', amount: 117 },
    { user: 'USER 2', amount: 116 },
    { user: 'USER 6', amount: 115 },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200">
      <Header currentPage={currentPage} onPageChange={onPageChange} />

      {/* Red Banner */}
      <div className="bg-gradient-to-r from-red to-red-600 text-white text-center py-3 font-body shadow-lg animate-pulse">
        Complete Tasks
      </div>

      {/* Auction Details */}
      <div className="flex flex-col items-center p-4 md:p-8">
        {/* Product Image Slideshow */}
        <div className="w-full max-w-md h-48 md:h-64 mb-4 rounded-xl shadow-xl overflow-hidden relative">
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`ST Rina ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                onError={(e) => {
                  // Fallback for missing images
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
          </div>
          {/* Slideshow indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="font-heading text-2xl md:text-4xl text-black mb-2 text-center">{auctionTitle}</h1>
        <p className="font-body font-thin text-black mb-4 text-center">{auctionDescription}</p>

        {/* Timer */}
        <div className="bg-gradient-to-r from-black to-gray-900 text-white p-6 rounded-xl mb-6 w-full max-w-md shadow-2xl animate-fade-in relative">
          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-bounce shadow-lg border-2 border-white">
            ⏰ +3 min
          </div>
          <p className="text-center text-gray-300 mb-4 font-body">Auction ends in:</p>
          <div className="flex justify-around">
            <div className="text-center transform hover:scale-110 transition-transform duration-200">
              <div className="text-3xl md:text-4xl font-bold animate-pulse">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-xs font-light">Days</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-200">
              <div className="text-3xl md:text-4xl font-bold animate-pulse">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs font-light">Hours</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-200">
              <div className="text-3xl md:text-4xl font-bold animate-pulse">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs font-light">Minutes</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-200">
              <div className="text-3xl md:text-4xl font-bold animate-pulse">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs font-light">Seconds</div>
            </div>
          </div>
        </div>

        {/* Latest Bid */}
        <div className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-xl mb-6 w-full max-w-md text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
          <p className="font-body text-black text-lg">Latest Bid: <span className="text-yellow font-bold text-xl animate-bounce">{latestBid} <FaCoins className="inline text-amber-400" /></span></p>
        </div>

        {/* Place a Bid Button */}
        <button className="bg-gradient-to-r from-black to-gray-800 text-white py-4 px-8 rounded-xl font-heading text-xl w-full max-w-md mb-8 hover:from-gray-800 hover:to-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
          🚀 Place a Bid
        </button>

        {/* Bidding Leaderboard */}
        <div className="w-full max-w-md space-y-3">
          {bids.map((bid, index) => (
            <div
              key={index}
              className={`flex items-center p-4 ${bid.isWinner ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-green-300' : 'bg-gradient-to-r from-white to-gray-50 text-black'} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 animate-slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full mr-4 flex items-center justify-center shadow-md">
                <span className="text-black font-bold">{bid.user[0]}</span>
              </div>
              <div className={`flex-1 ${bid.isWinner ? 'bg-green-600 rounded-lg p-2' : ''}`}>
                <p className={`font-body font-semibold ${bid.isWinner ? 'text-black' : ''}`}>{bid.user}</p>
                {bid.isWinner && <p className="text-xs bg-green text-white px-2 py-1 rounded-full inline-block mt-1">👑Current Winner</p>}
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-black">{bid.amount} <FaCoins className="inline text-amber-400" /></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
