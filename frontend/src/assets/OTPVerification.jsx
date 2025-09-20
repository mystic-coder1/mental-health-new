import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Heart, Mail, ArrowLeft, CheckCircle, RefreshCw, Shield, Clock, MessageCircle, X } from 'lucide-react';

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from login pages
  const { email, userType, userData } = location.state || {};
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if no email data
  useEffect(() => {
    if (!email || !userType) {
      navigate('/');
    }
  }, [email, userType, navigate]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle OTP verification
  const handleVerification = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    try {
      // Simulate API call for verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit code
      // In real implementation, verify with backend
      console.log('Verifying OTP:', otpString, 'for', userType, 'with email:', email);
      console.log('User data:', userData);
      
      setIsVerifying(false);
      setIsVerified(true);
      
      // Store user session data (in real app, you'd get this from API response)
      localStorage.setItem('userType', userType);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isAuthenticated', 'true');
      
    } catch (error) {
      setIsVerifying(false);
      setError('Verification failed. Please try again.');
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setIsResending(true);
    setError('');
    
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Resending OTP to:', email, 'for user type:', userType);
      
      setIsResending(false);
      setTimeLeft(300);
      setOtp(['', '', '', '', '', '']);
      
    } catch (error) {
      setIsResending(false);
      setError('Failed to resend code. Please try again.');
    }
  };

  // Handle successful verification
  const handleContinue = () => {
    if (userType === 'student') {
      navigate('/homepage');
    } else if (userType === 'doctor') {
      navigate('/doc-dashboard');
    } else {
      navigate('/');
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const otpString = otp.join('');
  const isOtpComplete = otpString.length === 6;

  if (isVerified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-light text-gray-800 mb-4">
              Verification Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to Your Buddy! Your {userType} account has been verified successfully.
            </p>
          </div>
          
          <button 
            onClick={handleContinue}
            className="w-full py-4 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#585182' }}
          >
            Continue to {userType === 'student' ? 'Home' : 'Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#585182' }}
            >
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#585182' }}>
              Your Buddy
            </h1>
          </div>
          
          <div></div> {/* Spacer for flex layout */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-light text-gray-800 mb-4">
            Verify Your Email
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            We've sent a verification code to
          </p>
          <p className="font-semibold text-gray-800 mb-6" style={{ color: '#585182' }}>
            {email}
          </p>
          
          <p className="text-sm text-gray-500">
            Registering as: <span className="font-medium capitalize">{userType}</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* OTP Input */}
          <div>
            <div className="flex justify-center space-x-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none transition-colors duration-200"
                  style={{
                    borderColor: digit ? '#585182' : undefined,
                    color: digit ? '#585182' : undefined
                  }}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center mb-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Timer */}
            <div className="text-center mb-6">
              {timeLeft > 0 ? (
                <p className="text-gray-500 flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in {formatTime(timeLeft)}</span>
                </p>
              ) : (
                <p className="text-red-500 font-medium">Code expired</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerification}
              disabled={!isOtpComplete || isVerifying}
              className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                isOtpComplete && !isVerifying
                  ? 'text-white hover:opacity-90 hover:shadow-lg'
                  : 'text-gray-400 bg-gray-100 cursor-not-allowed'
              }`}
              style={{
                backgroundColor: isOtpComplete && !isVerifying ? '#585182' : undefined
              }}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify Email</span>
              )}
            </button>
          </div>

          {/* Resend Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Didn't receive the code?
            </p>
            
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-500">
                You can resend the code in {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold hover:underline transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                style={{ color: '#585182' }}
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Resend Code</span>
                )}
              </button>
            )}
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="font-medium mb-1">Security Notice</p>
                <p>
                  This verification step ensures the security of your account. 
                  Never share this code with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatbotOpen && (
          <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div 
              className="p-4 text-white flex items-center justify-between"
              style={{ backgroundColor: '#585182' }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium">Your Buddy Assistant</span>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-white hover:bg-white/20 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 h-full bg-gray-50">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <p className="text-gray-700 text-sm">
                  📧 Having trouble with verification? I'm here to help!
                </p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Didn't receive the code?
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Change email address
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Contact support
                </button>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleChatbot}
          className="w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
          style={{ backgroundColor: '#585182' }}
        >
          {isChatbotOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <MessageCircle className="w-8 h-8 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default OTPVerification;