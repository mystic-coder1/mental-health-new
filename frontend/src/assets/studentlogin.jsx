import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Navigate to homepage after login
    navigate('/homepage');
  };

  const handleContinueWithoutLogin = () => {
    console.log('Continuing without login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 mb-3">Your Journey Starts Here</h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Every great journey begins with a single step. Take yours today.
            </p>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-4 pr-12 py-3 sm:py-4 text-base sm:text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
              Forgot your password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 sm:py-4 px-4 bg-[#585182] text-white text-base sm:text-lg font-medium rounded-lg hover:bg-[#4a4570] focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-md"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm sm:text-base">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Continue Without Login */}
          <button
            type="button"
            onClick={handleContinueWithoutLogin}
            className="w-full py-3 sm:py-4 px-4 bg-[#585182] text-white text-base sm:text-lg font-medium rounded-lg hover:bg-[#4a4570] focus:outline-none focus:ring-2 focus:ring-purple-200 focus:ring-offset-2 transition-all duration-200 border border-gray-200 shadow-md"
          >
            Continue as Guest
          </button>

          {/* Sign Up Link */}
          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/student-account"
                className="text-[#585182] hover:text-[#4a4570] font-medium transition-colors duration-200 hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>

          {/* Supportive Message */}
          <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm">
            <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
              Remember: It's okay to take breaks. Your wellbeing matters most.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}