import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Users, MessageSquare, BookOpen, Camera, Sparkles, Circle } from 'lucide-react';

const ARWellnessPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [clickedBubbles, setClickedBubbles] = useState(new Set());
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [mindfulnessScene, setMindfulnessScene] = useState('forest');

  const affirmations = [
    "You are capable of amazing things",
    "This moment is full of possibilities", 
    "You have the strength to overcome challenges",
    "Peace flows through you naturally",
    "You are exactly where you need to be"
  ];

  const mindfulnessScenes = {
    forest: { bg: 'bg-gradient-to-b from-green-200 to-green-400', name: 'Forest Sanctuary' },
    ocean: { bg: 'bg-gradient-to-b from-blue-200 to-blue-400', name: 'Ocean Waves' },
    mountain: { bg: 'bg-gradient-to-b from-purple-200 to-purple-400', name: 'Mountain Peak' },
    sunset: { bg: 'bg-gradient-to-b from-orange-200 to-pink-400', name: 'Sunset View' }
  };

  useEffect(() => {
    if (breathingActive) {
      const interval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          if (prev === 'exhale') {
            setBreathCount(c => c + 1);
            return 'inhale';
          }
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [breathingActive]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmationIndex(prev => (prev + 1) % affirmations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const BreathingOrb = () => {
    const scale = breathPhase === 'inhale' ? 'scale-150' : breathPhase === 'exhale' ? 'scale-75' : 'scale-125';
    const instructions = {
      inhale: 'Breathe In...',
      hold: 'Hold...',
      exhale: 'Breathe Out...'
    };

    return (
      <div className="text-center p-8">
        <div className="relative mx-auto mb-6">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mx-auto transition-transform duration-4000 ease-in-out ${scale} shadow-2xl`}>
            <div className="absolute inset-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
              <Circle className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-gray-700">{instructions[breathPhase]}</p>
          <p className="text-lg text-gray-600">Cycles completed: {breathCount}</p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              {breathingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{breathingActive ? 'Pause' : 'Start'}</span>
            </button>
            
            <button
              onClick={() => {
                setBreathingActive(false);
                setBreathCount(0);
                setBreathPhase('inhale');
              }}
              className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StressBubbleGame = () => {
    const bubbles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 5,
      top: Math.random() * 60 + 20,
      size: Math.random() * 30 + 20,
      delay: Math.random() * 2
    }));

    const popBubble = (id) => {
      if (!clickedBubbles.has(id)) {
        setClickedBubbles(prev => new Set([...prev, id]));
        setGameScore(prev => prev + 10);
      }
    };

    const resetGame = () => {
      setClickedBubbles(new Set());
      setGameScore(0);
    };

    return (
      <div className="relative h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl overflow-hidden">
        <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg">
          <p className="text-purple-600 font-semibold">Score: {gameScore}</p>
        </div>
        
        <div className="absolute top-4 right-4">
          <button
            onClick={resetGame}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reset Game
          </button>
        </div>

        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`absolute rounded-full cursor-pointer transition-all duration-500 ${
              clickedBubbles.has(bubble.id) 
                ? 'opacity-0 scale-0' 
                : 'opacity-70 hover:opacity-90 hover:scale-110'
            }`}
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(138, 43, 226, 0.6))`,
              animationDelay: `${bubble.delay}s`
            }}
            onClick={() => popBubble(bubble.id)}
          >
            <div className="w-full h-full rounded-full animate-pulse" />
          </div>
        ))}
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-600 font-medium">Click the bubbles to pop stress away!</p>
        </div>
      </div>
    );
  };

  const MindfulnessSpace = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-center space-x-4 mb-6">
          {Object.entries(mindfulnessScenes).map(([key, scene]) => (
            <button
              key={key}
              onClick={() => setMindfulnessScene(key)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mindfulnessScene === key 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {scene.name}
            </button>
          ))}
        </div>
        
        <div className={`h-64 ${mindfulnessScenes[mindfulnessScene].bg} rounded-xl relative overflow-hidden shadow-lg`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">{mindfulnessScenes[mindfulnessScene].name}</h3>
              <p className="text-lg opacity-90">Take a moment to breathe and be present</p>
            </div>
          </div>
          
          {mindfulnessScene === 'forest' && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-600 opacity-50 rounded-b-xl" />
          )}
          
          {mindfulnessScene === 'ocean' && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-600 opacity-30 animate-pulse" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-white opacity-40 animate-pulse" style={{animationDelay: '0.5s'}} />
            </>
          )}
        </div>
      </div>
    );
  };

  const features = [
    {
      id: 'breathing',
      icon: <Circle className="w-8 h-8" />,
      title: 'AR Breathing Orb',
      description: 'A glowing orb that guides deep breathing exercises',
      component: <BreathingOrb />
    },
    {
      id: 'mindfulness',
      icon: <Camera className="w-8 h-8" />,
      title: 'Mindfulness AR Spaces',
      description: 'Transforming environments into calming visuals',
      component: <MindfulnessSpace />
    },
    {
      id: 'mirror',
      icon: <Heart className="w-8 h-8" />,
      title: 'AR Positive Mirror',
      description: 'Affirmations and calming effects in real-time',
      component: (
        <div className="text-center p-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
              <p className="text-xl font-semibold text-gray-800 animate-fade-in">
                {affirmations[affirmationIndex]}
              </p>
            </div>
          </div>
          <p className="text-gray-600">Positive affirmations refresh every 5 seconds</p>
        </div>
      )
    },
    {
      id: 'games',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Gamified Stress Relief',
      description: 'Interactive games to promote relaxation and focus',
      component: <StressBubbleGame />
    },
    {
      id: 'consultancy',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Direct Consultancy',
      description: 'Access to college-provided consultants for personalized support',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Dr. Emily Chen</h4>
                  <p className="text-sm text-gray-600">Stress Management Specialist</p>
                  <p className="text-xs text-green-600">● Available Now</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Specializes in academic stress, anxiety management, and mindfulness techniques.</p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Book Session
              </button>
            </div>
            
            <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600">Wellness Coach</p>
                  <p className="text-xs text-yellow-600">● Next available: 2:30 PM</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Expert in holistic wellness, meditation practices, and work-life balance.</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Later
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2">24/7 Crisis Support</h4>
            <p className="text-gray-600 text-sm mb-4">If you're experiencing a mental health emergency, immediate help is available.</p>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold">
              Emergency Support
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AR Wellness Hub</h1>
                <p className="text-sm text-gray-600">Interactive Stress Relief & Mindfulness</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Wellness Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">AR Technology</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience immersive stress relief, guided breathing exercises, and mindful spaces designed to enhance your mental well-being through cutting-edge AR technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveSection('breathing')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Wellness Features</h3>
          <p className="text-lg text-gray-600">Choose from our interactive tools designed to support your mental health journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.id} className="group">
              <div 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
                  activeSection === feature.id ? 'border-purple-400' : 'border-gray-100'
                } group-hover:border-purple-300 p-6`}
                onClick={() => setActiveSection(activeSection === feature.id ? null : feature.id)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Active Section Display */}
        {activeSection && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {features.find(f => f.id === activeSection)?.title}
              </h3>
              <button
                onClick={() => setActiveSection(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            {features.find(f => f.id === activeSection)?.component}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">AR Wellness Hub</h4>
          </div>
          <p className="text-gray-600">Empowering student wellness through innovative AR technology</p>
        </div>
      </footer>
    </div>
  );
};

export default ARWellnessPage;