import React, { useState } from 'react';
import { Heart, Video, Users, Smartphone, Menu, X, Shield, Clock, Star, ChevronRight, Play, MessageCircle, Calendar, Quote } from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                Video Sessions
              </button>
              <button 
                className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                Community Forums
              </button>
              <button 
                className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                AR Therapy Experiences
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#585182' }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <button 
                  className="w-full px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  Video Sessions
                </button>
                <button 
                  className="w-full px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  Community Forums
                </button>
                <button 
                  className="w-full px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  AR Therapy Experiences
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-indigo-100 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-100 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-8 leading-tight">
            Build Happier & Thriving
            <span className="block" style={{ color: '#585182' }}>Mental Wellness</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your mental health journey by building a proactive culture of care, resilience and well-being.
          </p>
          
          {/* Attractive Quote */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto p-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 shadow-sm">
              <Quote className="w-8 h-8 text-purple-300 absolute top-4 left-4" />
              <p className="text-lg italic text-gray-700 pl-8 mb-4">
                "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."
              </p>
              <div className="text-right">
                <span className="text-sm text-purple-600 font-medium">— Your Buddy Community</span>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 mb-12">
            Join the community that has supported <strong>30 Lakh+ individuals</strong> across <strong>500+ institutions</strong>.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/counsellor')}
              className="flex items-center px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 space-x-3"
              style={{ backgroundColor: '#585182' }}
            >
              <Calendar className="w-6 h-6" />
              <span>Book a Session with Doctor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-6">
              Your Complete Mental Wellness Toolkit
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support designed to meet you wherever you are in your mental health journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Video Sessions */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: '#585182' }}
              >
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Video Sessions</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Connect with licensed therapists through secure, private video consultations tailored to your needs.
              </p>
              <button 
                className="flex items-center text-lg font-medium hover:underline"
                style={{ color: '#585182' }}
              >
                Start Session <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>

            {/* Community Forums */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: '#585182' }}
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Community Forums</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Join supportive communities where you can share experiences and find encouragement from peers.
              </p>
              <button 
                className="flex items-center text-lg font-medium hover:underline"
                style={{ color: '#585182' }}
              >
                Join Community <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>

            {/* AR Therapy */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: '#585182' }}
              >
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">AR Therapy Experiences</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Immersive augmented reality sessions designed to help you practice mindfulness and manage anxiety.
              </p>
              <button 
                className="flex items-center text-lg font-medium hover:underline"
                style={{ color: '#585182' }}
              >
                Try AR Therapy <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-6">
              Trusted by Students & Professionals
            </h2>
            <p className="text-xl text-gray-600">
              Your privacy and well-being are our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: '#585182' }} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Secure</h3>
              <p className="text-gray-600">End-to-end encryption ensures your conversations remain private</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" style={{ color: '#585182' }} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Available</h3>
              <p className="text-gray-600">Support when you need it, day or night</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" style={{ color: '#585182' }} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Highly Rated</h3>
              <p className="text-gray-600">4.8/5 stars from thousands of satisfied users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20" style={{ backgroundColor: '#585182' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <Quote className="w-12 h-12 text-purple-200 mx-auto mb-6" />
            <h2 className="text-4xl font-light text-white mb-6">
              "Healing is not a destination, but a journey of self-discovery"
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Take the first step towards better mental health today
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-purple-100 italic">
                "Every expert was once a beginner. Every pro was once an amateur."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#585182' }}
            >
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold" style={{ color: '#585182' }}>YR Buddy</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Your compassionate companion for mental wellness
          </p>
          <p className="text-sm text-gray-500">
            © 2024 YR Buddy. All rights reserved. • Privacy Policy • Terms of Service
          </p>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chatbot Window */}
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
                <span className="font-medium">YR Buddy Assistant</span>
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
                  👋 Hi there! I'm here to help you with your mental wellness journey. How can I assist you today?
                </p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Book a therapy session
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Join community forums
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Try AR therapy
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Emergency support
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Chatbot Toggle Button */}
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
        
        {/* Floating notification dot */}
        {!isChatbotOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">1</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;