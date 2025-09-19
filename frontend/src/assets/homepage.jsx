import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Video, Users, Smartphone, Menu, X, Shield, Clock, Star, ChevronRight, Play, MessageCircle, Calendar, Quote, Send, Bot, User as UserIcon, Brain, Zap } from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi there! I'm Your Buddy AI, your mental wellness companion. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // API Configuration Instructions:
  // To enable AI chatbot functionality with real APIs, add your API keys to environment variables:
  // 1. Create a .env file in the frontend directory
  // 2. Add one or both of these lines to your .env file:
  //    VITE_GEMINI_API_KEY=your_gemini_api_key_here
  //    VITE_OPENAI_API_KEY=your_openai_api_key_here (optional fallback)
  // 3. Restart your development server
  // The chatbot will automatically use Gemini API when available, or fallback to local responses

  // Function to integrate with Gemini API
  const sendToGeminiAPI = async (message) => {
    try {
      setIsTyping(true);
      
      // Try Gemini API first (primary)
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log('Gemini API Key available:', !!geminiApiKey);
      console.log('User message:', message);
      
      if (geminiApiKey) {
        try {
          console.log('Attempting Gemini API call...');
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are Your Buddy AI, a compassionate mental health support assistant for the Your Buddy platform. Provide empathetic, supportive responses focused on mental wellness. Keep responses conversational, warm, and under 200 words. Include relevant emojis to make responses more engaging. Always encourage professional help for serious concerns and prioritize user safety.

User message: ${message}`
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 300,
              },
              safetySettings: [
                {
                  category: "HARM_CATEGORY_HARASSMENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_HATE_SPEECH",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                  category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                  threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
              ]
            })
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Gemini API response:', data);
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
              console.log('Gemini API response text:', data.candidates[0].content.parts[0].text);
              return data.candidates[0].content.parts[0].text;
            } else {
              console.log('Gemini API response format unexpected, trying OpenAI...');
              console.log('Response data:', data);
              throw new Error('Gemini API response format unexpected');
            }
          } else {
            console.log('Gemini API failed with status:', response.status);
            const errorText = await response.text();
            console.log('Gemini API error response:', errorText);
            throw new Error('Gemini API failed');
          }
        } catch (geminiError) {
          console.log('Gemini API error:', geminiError.message);
          // Fall through to OpenAI
        }
      }

      // Fallback to OpenAI API
      const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (openaiApiKey) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: 'You are Your Buddy AI, a compassionate mental health support assistant. Provide empathetic, supportive responses focused on mental wellness. Keep responses concise but caring. Always encourage professional help for serious concerns. Include practical coping strategies when appropriate.'
                },
                {
                  role: 'user',
                  content: message
                }
              ],
              max_tokens: 300,
              temperature: 0.7
            })
          });

          if (response.ok) {
            const data = await response.json();
            return data.choices[0].message.content || "I'm here to help! Could you please rephrase your question?";
          } else {
            console.log('OpenAI API failed, using local response');
            throw new Error('OpenAI API failed');
          }
        } catch (openaiError) {
          console.log('OpenAI API error:', openaiError.message);
          // Fall through to local response
        }
      }

      // If no API keys or both APIs failed, use local responses
      console.log('Using local responses (no API keys configured or APIs failed)');
      return getLocalResponse(message);
      
    } catch (error) {
      console.error('API Error:', error);
      return getLocalResponse(message);
    } finally {
      setIsTyping(false);
    }
  };

  // Enhanced fallback local responses (for development/offline use)
  const getLocalResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm Your Buddy AI, your mental wellness companion. I'm here to listen and support you. What's on your mind today?";
    }
    
    // Anxiety responses
    if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('nervous') || lowerMessage.includes('worry')) {
      return "I understand you're feeling anxious. Anxiety is very common and manageable. Try this quick technique:\n\n🌬️ **4-7-8 Breathing**: Inhale for 4, hold for 7, exhale for 8\n\n💭 Remember: You're safe right now. Would you like me to guide you through some grounding exercises or help you book a session with a therapist?";
    }
    
    // Depression responses
    if (lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      return "I'm sorry you're feeling this way. Depression is real and you're brave for reaching out. 💙\n\n✨ Small wins matter:\n• Take one deep breath\n• Drink some water\n• Step outside for a moment\n\nWould you like to speak with one of our licensed therapists? I can help you book a session.";
    }
    
    // Stress responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed')) {
      return "Stress can feel overwhelming, but you're not alone. Let's try the **5-4-3-2-1 grounding technique**:\n\n👁️ 5 things you can see\n✋ 4 things you can touch\n👂 3 things you can hear\n👃 2 things you can smell\n👅 1 thing you can taste\n\nThis helps bring you back to the present moment. How are you feeling now?";
    }
    
    // Sleep responses
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || lowerMessage.includes('can\'t sleep')) {
      return "Sleep is crucial for mental health. Here are some tips:\n\n🌙 **Sleep Hygiene**:\n• No screens 1 hour before bed\n• Keep room cool (65-68°F)\n• Try meditation or calming music\n• Consistent bedtime routine\n\nOur AR therapy has amazing sleep relaxation programs! Would you like to try them?";
    }
    
    // Therapy/booking responses
    if (lowerMessage.includes('book') || lowerMessage.includes('session') || lowerMessage.includes('therapy') || lowerMessage.includes('therapist') || lowerMessage.includes('counselor')) {
      return "I'd be happy to help you book a therapy session! 📅\n\nOur licensed professionals offer:\n• Video consultations\n• Flexible scheduling\n• Specialized mental health support\n\nWould you like me to redirect you to our booking page to browse available therapists?";
    }
    
    // Community responses
    if (lowerMessage.includes('community') || lowerMessage.includes('forum') || lowerMessage.includes('support group') || lowerMessage.includes('connect')) {
      return "Our community forums are a wonderful place to connect! 👥\n\n💫 Benefits:\n• Share experiences with peers\n• Get encouragement and support\n• Learn from others' journeys\n• Safe, moderated environment\n\nWould you like me to guide you to our community forums?";
    }
    
    // AR Therapy responses
    if (lowerMessage.includes('ar') || lowerMessage.includes('augmented reality') || lowerMessage.includes('vr') || lowerMessage.includes('virtual')) {
      return "AR Therapy is an exciting way to practice mindfulness! 🥽✨\n\n🌟 **Features**:\n• Guided meditation environments\n• Anxiety management exercises\n• Breathing visualizations\n• Relaxing virtual spaces\n\nOur AR sessions help you practice coping strategies in immersive environments. Ready to try it?";
    }
    
    // Crisis/Emergency responses
    if (lowerMessage.includes('emergency') || lowerMessage.includes('crisis') || lowerMessage.includes('suicide') || lowerMessage.includes('self-harm') || lowerMessage.includes('hurt myself')) {
      return "🚨 **IMMEDIATE HELP AVAILABLE**\n\nIf you're having thoughts of self-harm, please reach out right now:\n\n📞 **Crisis Resources**:\n• National Suicide Prevention Lifeline: **988**\n• Crisis Text Line: Text **HOME** to **741741**\n• Emergency Services: **911**\n\n💙 **You matter. Your life has value. Help is available 24/7.**\n\nPlease consider reaching out to someone you trust or emergency services immediately.";
    }
    
    // Positive/thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      return "You're so welcome! 😊 It's my pleasure to support you on your mental wellness journey. Remember, taking care of your mental health is a sign of strength, not weakness. I'm here whenever you need to talk! 💙";
    }
    
    // General mental health support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('mental health')) {
      return "I'm here to support your mental wellness journey! 🌟\n\n**I can help with**:\n• Coping strategies and techniques\n• Booking therapy sessions\n• Community forum guidance\n• AR therapy experiences\n• Crisis resources\n\nWhat specific area would you like support with today?";
    }
    
    // Default empathetic response
    return "Thank you for sharing that with me. 💙 I'm here to listen and support you. Every step toward better mental health matters, no matter how small.\n\nFeel free to ask me about:\n• Coping strategies\n• Booking therapy sessions\n• Community support\n• AR therapy experiences\n\nWhat would be most helpful for you right now?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Get response from Grok API
    const botResponse = await sendToGeminiAPI(inputMessage);
    
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      text: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickAction = async (action) => {
    const quickMessages = {
      'therapy': "I'd like to book a therapy session",
      'community': "Tell me about community forums",
      'ar': "How does AR therapy work?",
      'emergency': "I need emergency support"
    };

    if (quickMessages[action]) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        text: quickMessages[action],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      
      const botResponse = await sendToGeminiAPI(quickMessages[action]);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-white">
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
                onClick={() => navigate('/arpage')}
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
                  onClick={() => navigate('/arpage')}
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
                onClick={() => navigate('/arpage')}
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
            <h3 className="text-2xl font-bold" style={{ color: '#585182' }}>Your Buddy</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Your compassionate companion for mental wellness
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Your Buddy. All rights reserved. • Privacy Policy • Terms of Service
          </p>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chatbot Window */}
        {isChatbotOpen && (
          <div className="mb-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
            {/* Header */}
            <div 
              className="p-4 text-white flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-medium block">AI Assistant</span>
                  <span className="text-xs text-purple-200">Your Mental Wellness AI</span>
                </div>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-white hover:bg-white/20 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    {message.type === 'bot' && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 flex-shrink-0">
                        <Zap className="w-4 h-4 text-purple-600" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <span className={`text-xs mt-1 block ${
                        message.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-600 flex-shrink-0">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-bl-sm shadow-sm border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Actions */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button 
                  onClick={() => handleQuickAction('therapy')}
                  className="text-xs p-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  📅 Book Session
                </button>
                <button 
                  onClick={() => handleQuickAction('community')}
                  className="text-xs p-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  👥 Community
                </button>
                <button 
                  onClick={() => handleQuickAction('ar')}
                  className="text-xs p-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  🥽 AR Therapy
                </button>
                <button 
                  onClick={() => handleQuickAction('emergency')}
                  className="text-xs p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  🚨 Emergency
                </button>
              </div>
              
              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Chatbot Toggle Button */}
        <button
          onClick={toggleChatbot}
          className="w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isChatbotOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <Brain className="w-8 h-8 text-white" />
          )}
        </button>
        
        {/* Floating notification dot */}
        {!isChatbotOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs text-white font-bold">AI</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;