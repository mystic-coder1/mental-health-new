import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DoctorLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    specialization: '',
    yearsOfExperience: '',
    qualifications: '',
    licenseNumber: '',
    medicalBoard: '',
    clinicAddress: '',
    phoneNumber: ''
  });

  const [isLogin, setIsLogin] = useState(true);

  const specializations = [
    'Psychiatrist',
    'Clinical Psychologist',
    'Counseling Psychologist',
    'Licensed Clinical Social Worker (LCSW)',
    'Licensed Professional Counselor (LPC)',
    'Marriage and Family Therapist (MFT)',
    'Addiction Counselor',
    'Trauma Specialist',
    'Sleep Medicine Specialist'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      console.log('Login attempt:', { email: formData.email, password: formData.password });
      // Navigate to doctor dashboard on login
      navigate('/doc-dashboard');
    } else {
      console.log('Registration attempt:', formData);
      // Show a success message for registration and navigate to doctor dashboard
      alert('Application submitted successfully! You will be redirected to the doctor dashboard.');
      navigate('/doc-dashboard');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form when switching modes
    setFormData({
      fullName: '',
      email: '',
      password: '',
      specialization: '',
      yearsOfExperience: '',
      qualifications: '',
      licenseNumber: '',
      medicalBoard: '',
      clinicAddress: '',
      phoneNumber: ''
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Welcome Back' : 'Join Our Network'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">
            {isLogin 
              ? 'Sign in to help patients with their mental health journey'
              : 'Register as a verified mental health professional'
            }
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Dr. John Smith"
                  required
                />
              </div>

              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your specialization</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose the specialization that best matches your practice in treating depression, anxiety, sleep disorders, and related conditions.
                </p>
              </div>

              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="5"
                  min="0"
                  max="50"
                  required
                />
              </div>

              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications & Degrees
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="MD in Psychiatry from Harvard Medical School, Board Certified in Psychiatry..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  List your medical degrees, certifications, and relevant qualifications.
                </p>
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Medical License Number
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="MD123456789"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be verified with the medical board for authenticity.
                </p>
              </div>

              <div>
                <label htmlFor="medicalBoard" className="block text-sm font-medium text-gray-700 mb-1">
                  Licensing Medical Board/State
                </label>
                <input
                  type="text"
                  id="medicalBoard"
                  name="medicalBoard"
                  value={formData.medicalBoard}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="California Medical Board"
                  required
                />
              </div>

              <div>
                <label htmlFor="clinicAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic/Practice Address
                </label>
                <textarea
                  id="clinicAddress"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="123 Wellness Street, Suite 456, City, State 12345"
                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="doctor@clinic.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
              minLength="8"
              required
            />
          </div>

          {!isLogin && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-xs sm:text-sm text-blue-700">
              <strong>Verification Process:</strong> Your credentials will be verified within 24-48 hours. 
              We check your license status with the medical board and may contact your practice for confirmation.
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            style={{ backgroundColor: '#585182' }}
            className="w-full text-white py-2 px-4 text-sm sm:text-base rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
          >
            {isLogin ? 'Sign In' : 'Submit Application'}
          </button>
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <button
              onClick={toggleMode}
              className="text-purple-600 hover:text-purple-800 font-medium focus:outline-none"
            >
              {isLogin ? 'Apply to Join' : 'Sign In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="text-center mt-3 sm:mt-4">
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-700">
              Forgot your password?
            </a>
          </div>
        )}

        <div className="mt-6 sm:mt-8 text-center px-4 sm:px-0">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our commitment to patient privacy and professional standards in mental healthcare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;