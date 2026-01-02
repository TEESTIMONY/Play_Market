import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome to PlayMarket</h1>
          <p className="mt-2 text-gray-600">Sign in to access auctions and bounties</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
            >
              <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
              <span className="font-medium">Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Secure authentication</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            New to PlayMarket? Just sign in with Google to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
