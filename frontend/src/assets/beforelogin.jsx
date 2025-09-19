import React from 'react';
import { Heart, User, GraduationCap, Shield, Users, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Your Buddy</h1>
          </div>
          <p className="text-center text-gray-600 mt-3 text-lg">
            Your compassionate companion for mental wellness
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
              Welcome to Your Safe Space
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Take a deep breath. You're in the right place. Choose how you'd like to continue your journey with us.
            </p>
          </div>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Doctor Option */}
            <div className="group">
              <button 
                className="w-full p-8 rounded-3xl border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                style={{ backgroundColor: 'white' }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: '#585182' }}
                  >
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      Continue as Doctor
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Access your professional dashboard to support and guide your patients on their healing journey
                    </p>
                  </div>
                  <div 
                    className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 group-hover:shadow-lg"
                    style={{ backgroundColor: '#585182' }}
                  >
                    Get Started
                  </div>
                </div>
              </button>
            </div>

            {/* Student Option */}
            <div className="group">
              <button 
                className="w-full p-8 rounded-3xl border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
                style={{ backgroundColor: 'white' }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: '#585182' }}
                  >
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      Continue as Student
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Begin your path to wellness with personalized support and resources tailored just for you
                    </p>
                  </div>
                  <div 
                    className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 group-hover:shadow-lg"
                    style={{ backgroundColor: '#585182' }}
                  >
                    Get Started
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Trusted by 10,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Remember: You are not alone. Every step forward is progress. We're here to support you.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;