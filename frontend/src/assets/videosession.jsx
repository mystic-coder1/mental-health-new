import React, { useState, useEffect } from 'react';
import { Heart, Play, Clock, Eye, ThumbsUp, Filter, Search, Calendar, Video, Star, ArrowLeft, MessageCircle, X, Menu } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Mock mental health videos data (in real app, this would come from YouTube API)
  const mentalHealthVideos = [
    {
      id: 'dQw4w9WgXcQ',
      title: '10-Minute Meditation for Anxiety Relief',
      description: 'A gentle guided meditation to help calm anxiety and promote relaxation.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=360&fit=crop',
      duration: '10:23',
      views: '2.3M',
      likes: '45K',
      category: 'meditation',
      therapist: 'Dr. Priya Sharma'
    },
    {
      id: 'abc123def',
      title: 'Cognitive Behavioral Therapy Techniques for Depression',
      description: 'Learn practical CBT strategies to manage depressive thoughts and behaviors.',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=480&h=360&fit=crop',
      duration: '15:45',
      views: '1.8M',
      likes: '32K',
      category: 'therapy',
      therapist: 'Dr. Rajesh Patel'
    },
    {
      id: 'xyz789uvw',
      title: 'Mindfulness Exercise for Stress Management',
      description: 'Simple mindfulness techniques you can practice anywhere to reduce stress.',
      thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=480&h=360&fit=crop',
      duration: '8:12',
      views: '3.1M',
      likes: '67K',
      category: 'mindfulness',
      therapist: 'Dr. Anita Gupta'
    },
    {
      id: 'pqr456mno',
      title: 'Understanding Panic Attacks: Causes and Coping Strategies',
      description: 'Comprehensive guide to understanding and managing panic attacks effectively.',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=480&h=360&fit=crop',
      duration: '12:30',
      views: '892K',
      likes: '18K',
      category: 'anxiety',
      therapist: 'Dr. Vikram Singh'
    },
    {
      id: 'lmn321jkl',
      title: 'Building Self-Esteem and Confidence',
      description: 'Practical exercises and insights to boost your self-worth and confidence.',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&h=360&fit=crop',
      duration: '18:55',
      views: '1.2M',
      likes: '29K',
      category: 'self-help',
      therapist: 'Dr. Kavita Rao'
    },
    {
      id: 'ghi654fed',
      title: 'Sleep Hygiene for Better Mental Health',
      description: 'Learn how proper sleep habits can significantly improve your mental wellbeing.',
      thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=480&h=360&fit=crop',
      duration: '14:20',
      views: '756K',
      likes: '15K',
      category: 'wellness',
      therapist: 'Dr. Arjun Kumar'
    },
    {
      id: 'def987ghi',
      title: 'Managing Work-Life Balance and Burnout',
      description: 'Essential strategies to prevent burnout and maintain healthy work-life boundaries.',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=480&h=360&fit=crop',
      duration: '16:40',
      views: '1.5M',
      likes: '38K',
      category: 'wellness',
      therapist: 'Dr. Meera Joshi'
    },
    {
      id: 'jkl654mno',
      title: 'Breathing Techniques for Instant Calm',
      description: 'Learn powerful breathing exercises to quickly reduce stress and anxiety.',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=480&h=360&fit=crop',
      duration: '7:35',
      views: '2.8M',
      likes: '52K',
      category: 'meditation',
      therapist: 'Dr. Suresh Nair'
    },
    {
      id: 'pqr321stu',
      title: 'Dealing with Social Anxiety and Shyness',
      description: 'Practical tips to overcome social fears and build confidence in social situations.',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=360&fit=crop',
      duration: '13:22',
      views: '1.1M',
      likes: '25K',
      category: 'anxiety',
      therapist: 'Dr. Deepika Iyer'
    },
    {
      id: 'vwx789yza',
      title: 'Mindful Eating for Mental Wellness',
      description: 'Discover how mindful eating practices can improve both physical and mental health.',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=480&h=360&fit=crop',
      duration: '11:15',
      views: '678K',
      likes: '16K',
      category: 'mindfulness',
      therapist: 'Dr. Ravi Agarwal'
    },
    {
      id: 'bcd456efg',
      title: 'Trauma Recovery and Healing',
      description: 'Understanding trauma responses and gentle approaches to healing and recovery.',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=480&h=360&fit=crop',
      duration: '22:18',
      views: '934K',
      likes: '21K',
      category: 'therapy',
      therapist: 'Dr. Sunita Reddy'
    },
    {
      id: 'hij123klm',
      title: 'Daily Habits for Mental Strength',
      description: 'Simple daily practices that can significantly boost your mental resilience and well-being.',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=480&h=360&fit=crop',
      duration: '19:45',
      views: '1.7M',
      likes: '41K',
      category: 'self-help',
      therapist: 'Dr. Amit Malhotra'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Videos', count: mentalHealthVideos.length },
    { id: 'meditation', name: 'Meditation', count: mentalHealthVideos.filter(v => v.category === 'meditation').length },
    { id: 'therapy', name: 'Therapy', count: mentalHealthVideos.filter(v => v.category === 'therapy').length },
    { id: 'mindfulness', name: 'Mindfulness', count: mentalHealthVideos.filter(v => v.category === 'mindfulness').length },
    { id: 'anxiety', name: 'Anxiety', count: mentalHealthVideos.filter(v => v.category === 'anxiety').length },
    { id: 'self-help', name: 'Self-Help', count: mentalHealthVideos.filter(v => v.category === 'self-help').length },
    { id: 'wellness', name: 'Wellness', count: mentalHealthVideos.filter(v => v.category === 'wellness').length }
  ];

  const filteredVideos = mentalHealthVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 shadow-sm sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
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

            <div className="hidden md:flex items-center space-x-2">
              <button 
                className="px-6 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ backgroundColor: '#585182' }}
              >
                Video Sessions
              </button>
              <button 
                className="px-6 py-2 rounded-full border-2 font-medium hover:bg-gray-50 transition-colors duration-200"
                style={{ borderColor: '#585182', color: '#585182' }}
              >
                Community Forums
              </button>
              <button 
                className="px-6 py-2 rounded-full border-2 font-medium hover:bg-gray-50 transition-colors duration-200"
                style={{ borderColor: '#585182', color: '#585182' }}
              >
                AR Therapy Experiences
              </button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#585182' }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <button 
                  className="w-full px-6 py-3 rounded-full text-white font-medium"
                  style={{ backgroundColor: '#585182' }}
                >
                  Video Sessions
                </button>
                <button 
                  className="w-full px-6 py-3 rounded-full border-2 font-medium"
                  style={{ borderColor: '#585182', color: '#585182' }}
                >
                  Community Forums
                </button>
                <button 
                  className="w-full px-6 py-3 rounded-full border-2 font-medium"
                  style={{ borderColor: '#585182', color: '#585182' }}
                >
                  AR Therapy Experiences
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Header Section */}
      <section className="px-6 py-12 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Mental Health Video Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our curated collection of expert-led mental health videos, guided meditations, and therapeutic sessions
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-purple-300 focus:outline-none transition-colors duration-200"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center ${
                      selectedCategory === category.id
                        ? 'text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={selectedCategory === category.id ? { backgroundColor: '#585182' } : {}}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedCategory === 'all' ? 'All Videos' : categories.find(c => c.id === selectedCategory)?.name} 
                <span className="text-gray-500 font-normal ml-2">({filteredVideos.length} videos)</span>
              </h2>
              <button 
                className="px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2"
                style={{ backgroundColor: '#585182' }}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Live Session</span>
              </button>
            </div>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVideos.map(video => (
                <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: '#585182' }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {video.views} views
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {video.likes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: '#585182' }}>
                        {video.therapist}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedVideo.title}
                </h2>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">YouTube Video Player</p>
                  <p className="text-sm opacity-75">Video ID: {selectedVideo.id}</p>
                  <p className="text-xs opacity-50 mt-2">
                    Note: In production, this would be a YouTube embedded player
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{ color: '#585182' }}>
                    {selectedVideo.therapist}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedVideo.views} views
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {selectedVideo.likes}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {selectedVideo.description}
                </p>
                <div className="flex space-x-4 pt-4">
                  <button 
                    className="px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-200 flex items-center space-x-2"
                    style={{ backgroundColor: '#585182' }}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Follow-up Session</span>
                  </button>
                  <button className="px-6 py-3 rounded-full border-2 font-medium hover:bg-gray-50 transition-colors duration-200"
                    style={{ borderColor: '#585182', color: '#585182' }}
                  >
                    Save to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  🎥 Need help finding the right video? I can recommend videos based on your needs!
                </p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Recommend videos for anxiety
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Find meditation videos
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                  Book a live session
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

export default App;