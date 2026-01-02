import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaGamepad, FaCoins, FaTrophy } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Mock Google sign-in - in real implementation, this would integrate with Google OAuth
    console.log('Google sign-in clicked');

    // Simulate successful login and redirect to home
    // In real app, this would be handled by Google OAuth callback
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
              <img
                src="/PM LOGO BLACK .png"
                alt="PlayMarket Logo"
                className="w-16 h-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to PlayMarket
            </h1>
            <p className="mt-3 text-gray-300 text-lg">Join the ultimate gaming marketplace</p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-4 px-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm border border-white/20">
                <FaGamepad className="text-purple-300 text-xl" />
              </div>
              <p className="text-xs text-gray-300 font-medium">Auctions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm border border-white/20">
                <FaCoins className="text-yellow-300 text-xl" />
              </div>
              <p className="text-xs text-gray-300 font-medium">Earn Coins</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm border border-white/20">
                <FaTrophy className="text-orange-300 text-xl" />
              </div>
              <p className="text-xs text-gray-300 font-medium">Win Prizes</p>
            </div>
          </div>

          {/* Sign In Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="space-y-6">
              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                className="group w-full flex items-center justify-center px-6 py-4 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                <FaGoogle className="w-6 h-6 mr-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-300 font-medium">🔒 Secure & Trusted</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center">
                <p className="text-sm text-gray-300 leading-relaxed">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-purple-300 hover:text-purple-200 underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-300 hover:text-purple-200 underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              New to PlayMarket? Just sign in to start your journey! 🎮
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
