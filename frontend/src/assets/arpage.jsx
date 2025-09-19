import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Users, MessageSquare, BookOpen, Home, Sparkles, Circle, Sun, Cloud, Flower, Smile, ArrowLeft, Menu, X } from 'lucide-react';

const WellnessPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [mindfulnessScene, setMindfulnessScene] = useState('forest');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Therapeutic game states
  const [gratitudeCount, setGratitudeCount] = useState(0);
  const [moodTracker, setMoodTracker] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [positiveWords, setPositiveWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [journalEntry, setJournalEntry] = useState('');
  const [selfCareChecklist, setSelfCareChecklist] = useState(new Set());

  const affirmations = [
    "You are worthy of love and kindness",
    "It's okay to take things one step at a time",
    "Your feelings are valid and important",
    "You have survived difficult times before",
    "Small progress is still progress",
    "You deserve peace and happiness",
    "Tomorrow can be a better day",
    "You are stronger than you know"
  ];

  const mindfulnessScenes = {
    forest: { bg: 'bg-gradient-to-b from-green-50 to-green-100', name: 'Peaceful Forest' },
    ocean: { bg: 'bg-gradient-to-b from-blue-50 to-blue-100', name: 'Calm Waters' },
    garden: { bg: 'bg-gradient-to-b from-pink-50 to-purple-50', name: 'Healing Garden' },
    sunrise: { bg: 'bg-gradient-to-b from-yellow-50 to-orange-50', name: 'New Beginning' }
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
      inhale: 'Breathe In... You are safe',
      hold: 'Hold... Feel the calm',
      exhale: 'Breathe Out... Release tension'
    };

    return (
      <div className="text-center p-8">
        <div className="relative mx-auto mb-6">
          <div 
            className={`w-32 h-32 rounded-full mx-auto transition-transform duration-4000 ease-in-out ${scale} shadow-2xl`}
            style={{ backgroundColor: '#585182' }}
          >
            <div className="absolute inset-4 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
              <Circle className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-2xl font-semibold" style={{ color: '#585182' }}>{instructions[breathPhase]}</p>
          <p className="text-lg text-gray-600">Breathing cycles: {breathCount}</p>
          <p className="text-sm text-gray-500">Each breath brings you closer to peace</p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className="flex items-center space-x-2 text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#585182' }}
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

  // Gratitude Garden - Enhanced therapeutic activity with better visualization
  const GratitudeGarden = () => {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🌱', '🦋', '🐝'];
    const [plantedFlowers, setPlantedFlowers] = useState([]);
    const [gratitudeText, setGratitudeText] = useState('');
    const [showGratitudeList, setShowGratitudeList] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);

    const plantFlower = () => {
      if (gratitudeText.trim()) {
        const newFlower = {
          id: Date.now(),
          flower: flowers[Math.floor(Math.random() * flowers.length)],
          gratitude: gratitudeText.trim(),
          x: Math.random() * 60 + 15, // More centered positioning
          y: Math.random() * 40 + 25, // Better vertical distribution
          planted: new Date().toLocaleDateString()
        };
        setPlantedFlowers(prev => [...prev, newFlower]);
        setGratitudeText('');
        setGratitudeCount(prev => prev + 1);
        
        // Show success message
        setTimeout(() => {
          setSelectedFlower(newFlower);
          setTimeout(() => setSelectedFlower(null), 3000);
        }, 500);
      }
    };

    const removeFlower = (flowerId) => {
      setPlantedFlowers(prev => prev.filter(f => f.id !== flowerId));
      setGratitudeCount(prev => Math.max(0, prev - 1));
    };

    const clearGarden = () => {
      setPlantedFlowers([]);
      setGratitudeCount(0);
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="bg-white rounded-lg px-6 py-3 shadow-lg inline-block mb-4 border-2" style={{ borderColor: '#585182' }}>
            <div className="flex items-center space-x-2">
              <Flower className="w-5 h-5" style={{ color: '#585182' }} />
              <p style={{ color: '#585182' }} className="font-bold">Garden Flowers: {gratitudeCount}</p>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#585182' }}>Your Gratitude Garden</h3>
          <p className="text-gray-600 text-sm">Plant flowers of gratitude and watch your garden bloom</p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What are you grateful for today? 🌱
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                placeholder="I'm grateful for my family, a warm cup of tea, a good book..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{ 
                  focusRingColor: '#585182',
                  borderColor: gratitudeText.trim() ? '#585182' : '#e5e7eb'
                }}
                onKeyPress={(e) => e.key === 'Enter' && plantFlower()}
                maxLength={150}
              />
              <button
                onClick={plantFlower}
                disabled={!gratitudeText.trim()}
                className="text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                style={{ backgroundColor: '#585182' }}
              >
                Plant 🌸
              </button>
            </div>
            <div className="mt-2 text-right">
              <span className="text-xs text-gray-500">{gratitudeText.length}/150</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-80 bg-gradient-to-b from-sky-100 via-green-50 to-green-100 rounded-xl overflow-hidden border-2 shadow-lg" style={{ borderColor: '#585182' }}>
          {/* Garden ground */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-200 to-transparent"></div>
          
          {/* Sun in the corner */}
          <div className="absolute top-4 right-4 text-4xl animate-pulse">☀️</div>
          
          {/* Planted flowers */}
          {plantedFlowers.map(flower => (
            <div
              key={flower.id}
              className="absolute text-3xl cursor-pointer hover:scale-125 transition-all duration-300 select-none"
              style={{ 
                left: `${flower.x}%`, 
                top: `${flower.y}%`,
                filter: selectedFlower?.id === flower.id ? 'drop-shadow(0 0 10px #585182)' : 'none',
                transform: selectedFlower?.id === flower.id ? 'scale(1.3)' : 'scale(1)'
              }}
              title={`${flower.gratitude} (${flower.planted})`}
              onClick={() => setSelectedFlower(flower)}
            >
              {flower.flower}
            </div>
          ))}
          
          {/* Empty garden message */}
          {plantedFlowers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center bg-white bg-opacity-80 p-6 rounded-xl">
                <Flower className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="font-medium">Your gratitude garden awaits...</p>
                <p className="text-sm mt-1">Share what you're thankful for today</p>
              </div>
            </div>
          )}
          
          {/* Floating gratitude preview */}
          {selectedFlower && (
            <div className="absolute top-4 left-4 right-4 bg-white bg-opacity-95 p-3 rounded-lg shadow-lg border" style={{ borderColor: '#585182' }}>
              <div className="flex items-start space-x-2">
                <span className="text-2xl">{selectedFlower.flower}</span>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: '#585182' }}>"{selectedFlower.gratitude}"</p>
                  <p className="text-xs text-gray-500 mt-1">Planted on {selectedFlower.planted}</p>
                </div>
                <button
                  onClick={() => removeFlower(selectedFlower.id)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded"
                  title="Remove this gratitude"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Garden controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowGratitudeList(!showGratitudeList)}
            disabled={plantedFlowers.length === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            style={{ 
              backgroundColor: showGratitudeList ? '#585182' : 'white',
              color: showGratitudeList ? 'white' : '#585182',
              border: '2px solid #585182'
            }}
          >
            <span>{showGratitudeList ? '📖' : '📝'}</span>
            <span className="text-sm font-medium">
              {showGratitudeList ? 'Hide' : 'View'} All Gratitudes
            </span>
          </button>
          
          {plantedFlowers.length > 0 && (
            <button
              onClick={clearGarden}
              className="text-sm text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-50"
            >
              Clear Garden
            </button>
          )}
        </div>
        
        {/* Gratitude list */}
        {showGratitudeList && plantedFlowers.length > 0 && (
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h4 className="font-semibold mb-3" style={{ color: '#585182' }}>Your Gratitude Collection</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {plantedFlowers.map((flower, index) => (
                <div key={flower.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{flower.flower}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">"{flower.gratitude}"</p>
                      <p className="text-xs text-gray-500">{flower.planted}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFlower(flower.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center bg-white p-4 rounded-lg border">
          <p className="text-gray-600 text-sm mb-2">🌱 Gratitude helps cultivate positive thinking and emotional well-being</p>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>🌸 Express daily gratitude</span>
            <span>🌺 Notice small blessings</span>
            <span>🌻 Share thankfulness</span>
          </div>
        </div>
      </div>
    );
  };

  // Mood Check-in - Enhanced mood tracking with more options
  const MoodCheckin = () => {
    const moods = [
      { emoji: '😊', name: 'Joyful', color: '#22c55e', intensity: 'high' },
      { emoji: '😌', name: 'Peaceful', color: '#06b6d4', intensity: 'medium' },
      { emoji: '😄', name: 'Excited', color: '#f59e0b', intensity: 'high' },
      { emoji: '😐', name: 'Neutral', color: '#6b7280', intensity: 'medium' },
      { emoji: '😕', name: 'Confused', color: '#8b5cf6', intensity: 'medium' },
      { emoji: '😔', name: 'Sad', color: '#ef4444', intensity: 'low' },
      { emoji: '😰', name: 'Anxious', color: '#f97316', intensity: 'low' },
      { emoji: '😴', name: 'Tired', color: '#6366f1', intensity: 'low' },
      { emoji: '😤', name: 'Frustrated', color: '#dc2626', intensity: 'low' },
      { emoji: '🥺', name: 'Vulnerable', color: '#ec4899', intensity: 'low' },
      { emoji: '🤗', name: 'Grateful', color: '#10b981', intensity: 'high' },
      { emoji: '😊', name: 'Content', color: '#059669', intensity: 'medium' }
    ];

    const supportiveMessages = {
      high: [
        "That's wonderful! Your positive energy is beautiful. ✨",
        "I'm so glad you're feeling this way. Enjoy this moment! 🌟",
        "Your joy is contagious. Thank you for sharing it! 💖"
      ],
      medium: [
        "It's perfectly okay to feel this way. You're doing great. 💙",
        "Thank you for checking in. Your feelings matter. 🤍",
        "You're being so mindful of your emotions. That's strength. 💪"
      ],
      low: [
        "I see you, and your feelings are completely valid. 🫂",
        "It's brave of you to acknowledge how you're feeling. 💙",
        "You don't have to carry this alone. You're worthy of support. 🤗",
        "Be gentle with yourself today. You deserve kindness. 🌸"
      ]
    };

    const logMood = (mood) => {
      const newMoodEntry = {
        ...mood,
        timestamp: new Date().toLocaleString(),
        id: Date.now()
      };
      setMoodTracker(prev => [newMoodEntry, ...prev.slice(0, 9)]);
      setSelectedMood(mood);
    };

    const getSupportiveMessage = (intensity) => {
      const messages = supportiveMessages[intensity];
      return messages[Math.floor(Math.random() * messages.length)];
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#585182' }}>How are you feeling right now?</h3>
          <p className="text-gray-600 text-sm">Choose the mood that best describes how you feel today</p>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm inline-block mt-3">
            <p style={{ color: '#585182' }} className="font-medium text-sm">
              All feelings are valid and important 💙
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {moods.map(mood => (
            <button
              key={mood.name}
              onClick={() => logMood(mood)}
              className="p-3 rounded-lg border-2 transition-all hover:scale-105 bg-white shadow-sm"
              style={{ 
                borderColor: selectedMood?.name === mood.name ? '#585182' : '#e5e7eb',
                backgroundColor: selectedMood?.name === mood.name ? '#f8f9ff' : 'white'
              }}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs font-medium text-gray-700">{mood.name}</div>
            </button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border" style={{ borderColor: '#585182' }}>
            <p className="text-center font-medium" style={{ color: '#585182' }}>
              {getSupportiveMessage(selectedMood.intensity)}
            </p>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                You selected: <span className="font-medium">{selectedMood.emoji} {selectedMood.name}</span>
              </p>
            </div>
          </div>
        )}
        
        {moodTracker.length > 0 && (
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold" style={{ color: '#585182' }}>Your Mood Journey</h4>
              <span className="text-sm text-gray-500">Last {Math.min(moodTracker.length, 5)} entries</span>
            </div>
            <div className="space-y-2">
              {moodTracker.slice(0, 5).map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{entry.emoji}</span>
                    <span className="font-medium text-gray-700">{entry.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{entry.timestamp.split(',')[0]}</span>
                </div>
              ))}
            </div>
            {moodTracker.length > 5 && (
              <div className="mt-3 text-center">
                <button 
                  className="text-sm text-gray-500 hover:text-gray-700"
                  style={{ color: '#585182' }}
                >
                  View all {moodTracker.length} entries
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="bg-white p-4 rounded-lg border">
          <h5 className="font-medium mb-2" style={{ color: '#585182' }}>💡 Mood Tracking Tips</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check in with yourself multiple times a day</li>
            <li>• Notice patterns in your mood over time</li>
            <li>• Remember that all emotions are temporary</li>
            <li>• Be kind to yourself on difficult days</li>
          </ul>
        </div>
      </div>
    );
  };

  // Self-Care Checklist - Encouraging daily habits
  const SelfCareChecklist = () => {
    const selfCareItems = [
      { id: 'water', label: 'Drink a glass of water', icon: '💧' },
      { id: 'stretch', label: 'Do gentle stretching', icon: '🤸‍♀️' },
      { id: 'outside', label: 'Step outside for fresh air', icon: '🌿' },
      { id: 'music', label: 'Listen to calming music', icon: '🎵' },
      { id: 'friend', label: 'Connect with someone you care about', icon: '💝' },
      { id: 'rest', label: 'Take a moment to rest', icon: '😌' }
    ];

    const toggleItem = (itemId) => {
      setSelfCareChecklist(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    };

    const completedCount = selfCareChecklist.size;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#585182' }}>Gentle Self-Care</h3>
          <p className="text-gray-600 text-sm">Small acts of kindness toward yourself</p>
          <div className="bg-white rounded-lg px-4 py-2 shadow-lg inline-block mt-3">
            <p style={{ color: '#585182' }} className="font-semibold">
              Completed: {completedCount}/{selfCareItems.length}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          {selfCareItems.map(item => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selfCareChecklist.has(item.id)
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.icon}</span>
                <span 
                  className={`flex-1 ${
                    selfCareChecklist.has(item.id) 
                      ? 'line-through text-green-700' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </span>
                {selfCareChecklist.has(item.id) && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {completedCount === selfCareItems.length && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium">🎉 You've completed all self-care activities!</p>
            <p className="text-green-600 text-sm mt-1">You're taking wonderful care of yourself today</p>
          </div>
        )}
      </div>
    );
  };

  // Positive Word Collection - Building self-worth
  const PositiveWordCollection = () => {
    const positiveWordsList = [
      'brave', 'worthy', 'loved', 'strong', 'resilient', 'capable', 
      'beautiful', 'kind', 'valuable', 'enough', 'important', 'precious'
    ];

    useEffect(() => {
      const shuffled = [...positiveWordsList].sort(() => Math.random() - 0.5);
      setPositiveWords(shuffled.slice(0, 8));
    }, []);

    const collectWord = (word) => {
      setSelectedWords(prev => new Set([...prev, word]));
    };

    const resetWords = () => {
      setSelectedWords(new Set());
      const shuffled = [...positiveWordsList].sort(() => Math.random() - 0.5);
      setPositiveWords(shuffled.slice(0, 8));
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#585182' }}>Collect Positive Words About Yourself</h3>
          <p className="text-gray-600 text-sm">Choose words that resonate with who you are</p>
          <div className="bg-white rounded-lg px-4 py-2 shadow-lg inline-block mt-3">
            <p style={{ color: '#585182' }} className="font-semibold">
              Collected: {selectedWords.size}/8
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {positiveWords.map(word => (
            <button
              key={word}
              onClick={() => collectWord(word)}
              disabled={selectedWords.has(word)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedWords.has(word)
                  ? 'bg-purple-50 border-purple-300 opacity-75'
                  : 'bg-white border-gray-200 hover:border-purple-300'
              }`}
            >
              <span 
                className={`font-medium ${
                  selectedWords.has(word) ? 'text-purple-700' : 'text-gray-700'
                }`}
              >
                {word}
              </span>
              {selectedWords.has(word) && (
                <span className="ml-2 text-purple-600">✨</span>
              )}
            </button>
          ))}
        </div>
        
        <button
          onClick={resetWords}
          className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset & Try New Words
        </button>
        
        {selectedWords.size > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-center" style={{ color: '#585182' }}>
              You are: {Array.from(selectedWords).join(', ')} ✨
            </p>
          </div>
        )}
      </div>
    );
  };

  const MindfulnessSpace = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#585182' }}>Choose Your Mindful Space</h3>
          <div className="flex justify-center space-x-3 flex-wrap gap-2">
            {Object.entries(mindfulnessScenes).map(([key, scene]) => (
              <button
                key={key}
                onClick={() => setMindfulnessScene(key)}
                className={`px-4 py-2 rounded-lg transition-all border-2 ${
                  mindfulnessScene === key 
                    ? 'text-white border-transparent' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: mindfulnessScene === key ? '#585182' : 'white',
                  borderColor: mindfulnessScene === key ? '#585182' : '#e5e7eb'
                }}
              >
                {scene.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative h-72 rounded-xl overflow-hidden shadow-lg border-2" style={{ borderColor: '#585182' }}>
          {/* Background based on scene */}
          <div className={`absolute inset-0 ${mindfulnessScenes[mindfulnessScene].bg}`}>
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white">
              <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4 backdrop-blur-sm">
                <Sparkles className="w-16 h-16 mx-auto animate-pulse" style={{ color: '#585182' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-shadow">{mindfulnessScenes[mindfulnessScene].name}</h3>
              <p className="text-lg opacity-90 text-shadow">Take a moment to breathe and be present</p>
              <div className="mt-4 bg-white bg-opacity-20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium">Close your eyes and imagine yourself here</p>
              </div>
            </div>
          </div>
          
          {/* Scene-specific elements */}
          {mindfulnessScene === 'forest' && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-800 to-transparent opacity-40" />
              <div className="absolute top-4 right-4 text-green-100 text-2xl animate-bounce">🌲</div>
              <div className="absolute top-8 left-6 text-green-100 text-xl animate-pulse">🍃</div>
            </>
          )}
          
          {mindfulnessScene === 'ocean' && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-blue-600 to-transparent opacity-40 animate-pulse" />
              <div className="absolute bottom-2 left-0 right-0 h-6 bg-white opacity-30 animate-pulse" style={{animationDelay: '0.5s'}} />
              <div className="absolute top-6 right-8 text-blue-100 text-xl animate-bounce">🌊</div>
              <div className="absolute top-12 left-8 text-blue-100 text-lg animate-pulse">🐚</div>
            </>
          )}
          
          {mindfulnessScene === 'mountain' && (
            <>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-700 to-transparent opacity-30" />
              <div className="absolute top-4 right-6 text-white text-xl animate-pulse">⭐</div>
              <div className="absolute top-8 left-8 text-white text-lg animate-bounce">🏔️</div>
            </>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Practice mindful breathing in your chosen space</p>
          <div className="bg-white p-4 rounded-lg border" style={{ borderColor: '#585182' }}>
            <p style={{ color: '#585182' }} className="font-medium text-sm">
              💡 Tip: Spend 3-5 minutes focusing on the scene and your breath
            </p>
          </div>
        </div>
      </div>
    );
  };

  const features = [
    {
      id: 'breathing',
      icon: <Circle className="w-8 h-8" />,
      title: 'Guided Breathing',
      description: 'Gentle breathing exercises to calm your mind and reduce anxiety',
      component: <BreathingOrb />
    },
    {
      id: 'mindfulness',
      icon: <Cloud className="w-8 h-8" />,
      title: 'Mindful Spaces',
      description: 'Peaceful virtual environments for meditation and relaxation',
      component: <MindfulnessSpace />
    },
    {
      id: 'affirmations',
      icon: <Heart className="w-8 h-8" />,
      title: 'Daily Affirmations',
      description: 'Gentle reminders of your worth, strength, and resilience',
      component: (
        <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="mb-6">
            <div 
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{ backgroundColor: '#585182' }}
            >
              <Heart className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
              <p className="text-xl font-semibold text-gray-800 animate-fade-in">
                {affirmations[affirmationIndex]}
              </p>
            </div>
          </div>
          <p className="text-gray-600">Gentle affirmations refresh every 8 seconds</p>
        </div>
      )
    },
    {
      id: 'gratitude',
      icon: <Flower className="w-8 h-8" />,
      title: 'Gratitude Garden',
      description: 'Plant flowers of gratitude to nurture positive thoughts and emotions',
      component: <GratitudeGarden />
    },
    {
      id: 'mood',
      icon: <Smile className="w-8 h-8" />,
      title: 'Mood Check-in',
      description: 'A safe space to acknowledge and validate your current feelings',
      component: <MoodCheckin />
    },
    {
      id: 'selfcare',
      icon: <Sun className="w-8 h-8" />,
      title: 'Self-Care Reminders',
      description: 'Gentle daily activities and habits to nurture your wellbeing',
      component: <SelfCareChecklist />
    },
    {
      id: 'positive',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Positive Words',
      description: 'Collect meaningful words that reflect your true worth and beauty',
      component: <PositiveWordCollection />
    },
    {
      id: 'consultancy',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Professional Support',
      description: 'Connect with caring mental health professionals and counselors',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="bg-white border-2 rounded-xl p-6 hover:border-opacity-80 transition-colors cursor-pointer"
              style={{ borderColor: '#585182' }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#f3f4f6' }}
                >
                  <BookOpen className="w-8 h-8" style={{ color: '#585182' }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Dr. Emily Chen</h4>
                  <p className="text-sm text-gray-600">Compassionate Therapist</p>
                  <p className="text-xs text-green-600">● Available Now</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Specializes in depression, anxiety, and gentle healing approaches.</p>
              <button 
                className="w-full text-white py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#585182' }}
              >
                Book Session
              </button>
            </div>
            
            <div 
              className="bg-white border-2 rounded-xl p-6 hover:border-opacity-80 transition-colors cursor-pointer"
              style={{ borderColor: '#585182' }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#f3f4f6' }}
                >
                  <Heart className="w-8 h-8" style={{ color: '#585182' }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sarah Williams</h4>
                  <p className="text-sm text-gray-600">Wellness Counselor</p>
                  <p className="text-xs text-yellow-600">● Next available: 2:30 PM</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Expert in trauma-informed care and mindful healing practices.</p>
              <button 
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Schedule Later
              </button>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h4 className="font-bold text-red-800 mb-2">24/7 Crisis Support</h4>
            <p className="text-red-700 text-sm mb-4">If you're in crisis or having thoughts of self-harm, immediate help is available. You are not alone.</p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
              Get Help Now
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#585182' }}
              >
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">YR Buddy</h1>
                <p className="text-xs text-gray-600">Mental Wellness Hub</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => setActiveSection('breathing')}
                className="px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                Breathing
              </button>
              <button 
                onClick={() => setActiveSection('gratitude')}
                className="px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                Gratitude
              </button>
              <button 
                onClick={() => setActiveSection('consultancy')}
                className="px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                Get Help
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#585182' }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    window.location.href = '/';
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveSection('breathing');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  Breathing Exercises
                </button>
                <button 
                  onClick={() => {
                    setActiveSection('gratitude');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  Gratitude Garden
                </button>
                <button 
                  onClick={() => {
                    setActiveSection('consultancy');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: '#585182' }}
                >
                  Professional Help
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Safe Space for <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #585182, #7c3aed)' }}>Mental Wellness</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gentle, therapeutic activities designed specifically for mental health support. Take things at your own pace in a judgment-free, compassionate environment.
          </p>
          
          {/* Therapeutic Features Preview */}
          <div className="flex justify-center space-x-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <Heart className="w-5 h-5" style={{ color: '#585182' }} />
              <span className="text-sm font-medium text-gray-700">Self-Compassion</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <Flower className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-700">Healing Activities</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <Sun className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Daily Support</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Professional Help</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveSection('breathing')}
              className="text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: '#585182' }}
            >
              Start with Breathing
            </button>
            <button 
              onClick={() => setActiveSection('gratitude')}
              className="bg-white border-2 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
              style={{ borderColor: '#585182', color: '#585182' }}
            >
              Try Gratitude Garden
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>✨ All activities are designed to be gentle, supportive, and non-judgmental ✨</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Therapeutic Activities for Healing</h3>
          <p className="text-lg text-gray-600">Choose gentle activities designed to support your mental health journey with compassion and understanding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#585182' }}
            >
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">YR Buddy</h4>
          </div>
          <p className="text-gray-600 mb-4">Supporting mental health through gentle, therapeutic experiences</p>
          <p className="text-sm text-gray-500 mb-2">Remember: You are worthy of love, care, and healing. Take your time. 💙</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Crisis Support: 988</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WellnessPage;