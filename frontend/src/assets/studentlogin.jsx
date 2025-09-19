import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Navigate to homepage after login
    navigate('/homepage');
  };

  const handleApplyToJoin = () => {
    navigate('/student-info');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-base">
            Sign in to help patients with their mental health journey
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Professional Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="doctor@clinic.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              style={{ backgroundColor: '#585182' }}
              className="w-full text-white py-3 px-4 text-base font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              Sign In
            </button>

            {/* Links */}
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={handleApplyToJoin}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  Apply to Join
                </button>
              </p>
              <p className="text-sm text-gray-600">
                <button className="text-gray-500 hover:text-gray-700">
                  Forgot your password?
                </button>
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                By continuing, you agree to our commitment to patient privacy and professional 
                standards in mental healthcare.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}