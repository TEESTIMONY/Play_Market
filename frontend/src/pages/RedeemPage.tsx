import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const RedeemPage: React.FC = () => {
  const navigate = useNavigate();
  const [redeemCode, setRedeemCode] = useState('');

  const handleSubmit = () => {
    // Handle redeem logic here
    alert(`Redeeming code: ${redeemCode}`);
  };

  return (
    <Sidebar>
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
    </Sidebar>
  );
};

export default RedeemPage;
