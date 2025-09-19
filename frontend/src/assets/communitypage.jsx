import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Users, 
  User, 
  Heart, 
  MessageSquare, 
  Share2, 
  Search, 
  Filter, 
  Plus,
  Award,
  Star,
  Send,
  X,
  Menu,
  ChevronUp,
  ChevronDown,
  BookOpen,
  UserCheck,
  Hash,
  Reply,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  Phone,
  Video,
  Settings,
  Camera,
  Paperclip,
  Smile,
  Mic
} from 'lucide-react';

const CommunityPage = () => {
  const [currentPage, setCurrentPage] = useState('community'); // community, chat, individual-chat
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [newPostTags, setNewPostTags] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [likedComments, setLikedComments] = useState(new Set());

  // Generate unique IDs for privacy
  const generateUniqueId = (name) => {
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return `user_${Math.abs(hash).toString().slice(-6)}`;
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "How to prepare for React interviews?",
      content: "I'm struggling with React concepts for interviews. Any tips from experienced developers?",
      author: generateUniqueId("alex_student"),
      authorType: "student",
      category: "Career",
      votes: 24,
      comments: [
        {
          id: 101,
          content: "Focus on hooks, state management, and component lifecycle. Practice coding challenges daily!",
          author: generateUniqueId("sarah_mentor"),
          authorType: "mentor",
          timestamp: "1 hour ago",
          likes: 12,
          replies: []
        }
      ],
      timestamp: "2 hours ago",
      tags: ["react", "interview", "career"],
      solved: false,
      likes: 15
    }
  ]);

  const [mentors] = useState([
    {
      id: 1,
      name: "Mentor",
      username: generateUniqueId("sarah_mentor"),
      expertise: "Full Stack Development",
      rating: 4.9,
      experience: "5+ years",
      avatar: "SC",
      online: true,
      students: 127
    },
    {
      id: 2,
      name: "Mentor",
      username: generateUniqueId("david_mentor"),
      expertise: "Machine Learning",
      rating: 4.8,
      experience: "7+ years",
      avatar: "DK",
      online: false,
      students: 89
    }
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: "Student",
      username: generateUniqueId("emma_student"),
      lastMessage: "Thanks for the help with the algorithm!",
      timestamp: "5 min ago",
      unread: 2,
      avatar: "EW",
      online: true,
      messages: [
        { id: 1, text: "Hi! Can you help me with binary trees?", sender: generateUniqueId("emma_student"), timestamp: "10:30 AM", type: "text" },
        { id: 2, text: "Of course! What specific part are you struggling with?", sender: "current_user", timestamp: "10:32 AM", type: "text" },
        { id: 3, text: "I'm having trouble with traversal algorithms", sender: generateUniqueId("emma_student"), timestamp: "10:35 AM", type: "text" },
        { id: 4, text: "Thanks for the help with the algorithm!", sender: generateUniqueId("emma_student"), timestamp: "11:15 AM", type: "text" }
      ]
    },
    {
      id: 2,
      user: "Student",
      username: generateUniqueId("john_student"),
      lastMessage: "Can we schedule a call tomorrow?",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "JS",
      online: false,
      messages: [
        { id: 1, text: "Hey! I saw your post about React optimization", sender: generateUniqueId("john_student"), timestamp: "Yesterday", type: "text" },
        { id: 2, text: "Can we schedule a call tomorrow?", sender: generateUniqueId("john_student"), timestamp: "2 hours ago", type: "text" }
      ]
    }
  ]);

  const categories = ['all', 'Technical', 'Career', 'Study Groups', 'General'];

  const handleVote = (postId, direction) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { ...post, votes: post.votes + (direction === 'up' ? 1 : -1) }
        : post
    ));
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
        setPosts(prevPosts => prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes - 1 }
            : post
        ));
      } else {
        newLiked.add(postId);
        setPosts(prevPosts => prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        ));
      }
      return newLiked;
    });
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      content: newComment,
      author: generateUniqueId("current_user"),
      authorType: "student",
      timestamp: "just now",
      likes: 0,
      replies: []
    };

    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
    
    setNewComment('');
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    const post = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent,
      author: generateUniqueId("current_user"),
      authorType: "student",
      category: newPostCategory,
      votes: 0,
      comments: [],
      timestamp: "just now",
      tags: newPostTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      solved: false,
      likes: 0
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setShowNewPost(false);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !activeChat) return;
    
    const message = {
      id: Date.now(),
      text: chatMessage,
      sender: "current_user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setConversations(prevConversations => prevConversations.map(conv => 
      conv.id === activeChat.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, message],
            lastMessage: chatMessage,
            timestamp: "just now"
          }
        : conv
    ));
    
    setChatMessage('');
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // WhatsApp-like Individual Chat Page
  const IndividualChatPage = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Chat Header */}
      <div className="bg-[#585182] text-white p-4 flex items-center space-x-4 shadow-lg">
        <button 
          onClick={() => setCurrentPage('chat')}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="relative">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold">
            {activeChat?.avatar}
          </div>
          {activeChat?.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#585182]"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold">{activeChat?.user}</h3>
          <p className="text-sm opacity-75">
            {activeChat?.online ? 'Online' : 'Offline'} • ID: {activeChat?.username}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ backgroundImage: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8f9fa 75%), linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
        {activeChat?.messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'current_user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
              message.sender === 'current_user'
                ? 'bg-[#585182] text-white rounded-br-none'
                : 'bg-white text-gray-900 shadow-sm border rounded-bl-none'
            }`}>
              <p>{message.text}</p>
              <div className="flex items-center justify-end mt-1 space-x-1">
                <p className={`text-xs ${
                  message.sender === 'current_user' ? 'text-white text-opacity-75' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
                {message.sender === 'current_user' && (
                  <div className="flex space-x-0.5">
                    <div className="w-1 h-1 bg-white bg-opacity-75 rounded-full"></div>
                    <div className="w-1 h-1 bg-white bg-opacity-75 rounded-full"></div>
                  </div>
                )}
              </div>
              
              {/* WhatsApp-style tail */}
              <div className={`absolute bottom-0 ${
                message.sender === 'current_user' 
                  ? 'right-0 transform translate-x-full' 
                  : 'left-0 transform -translate-x-full'
              }`}>
                <svg width="10" height="10" className={`${
                  message.sender === 'current_user' ? 'text-[#585182]' : 'text-white'
                }`}>
                  <path d="M0,0 L10,0 L0,10 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input - WhatsApp Style */}
      <div className="bg-white p-4 border-t">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-[#585182] hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-[#585182] hover:bg-gray-100 rounded-full transition-colors">
            <Camera className="w-5 h-5" />
          </button>
          
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <button className="p-1 text-gray-600 hover:text-[#585182] mr-2">
              <Smile className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          
          {chatMessage.trim() ? (
            <button 
              onClick={handleSendMessage}
              className="bg-[#585182] text-white p-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button className="p-3 text-gray-600 hover:text-[#585182] hover:bg-gray-100 rounded-full transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Chat List Page (WhatsApp-like)
  const ChatPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#585182] text-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('community')}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Messages</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowNewChat(true)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1">
        {/* Search Bar */}
        <div className="bg-white p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#585182] focus:bg-white transition-colors"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="bg-white">
          {conversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => {
                setActiveChat(conversation);
                setCurrentPage('individual-chat');
              }}
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#585182] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.user}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                      {conversation.unread > 0 && (
                        <span className="bg-[#585182] text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm truncate">{conversation.lastMessage}</p>
                  <p className="text-gray-400 text-xs">ID: {conversation.username}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <button 
            onClick={() => handleVote(post.id, 'up')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronUp className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-semibold text-gray-800">{post.votes}</span>
          <button 
            onClick={() => handleVote(post.id, 'down')}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              post.authorType === 'mentor' 
                ? 'bg-purple-100 text-[#585182]' 
                : 'bg-blue-100 text-[#585182]'
            }`}>
              {post.authorType === 'mentor' ? <Award className="w-3 h-3 inline mr-1" /> : <User className="w-3 h-3 inline mr-1" />}
              {post.author}
            </span>
            <span className="text-gray-500 text-sm">{post.timestamp}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-3">{post.content}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <button 
              onClick={() => toggleComments(post.id)}
              className="flex items-center space-x-1 hover:text-[#585182] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments.length} comments</span>
            </button>
            <button 
              onClick={() => handleLike(post.id)}
              className={`flex items-center space-x-1 transition-colors ${
                likedPosts.has(post.id) 
                  ? 'text-red-600' 
                  : 'hover:text-red-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
              <span>{post.likes} likes</span>
            </button>
          </div>

          {expandedComments[post.id] && (
            <div className="border-t pt-4">
              <div className="flex space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#585182] to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  CU
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182] resize-none"
                    rows="3"
                  />
                  <button 
                    onClick={() => handleAddComment(post.id)}
                    className="mt-2 bg-[#585182] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Comment
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#585182] to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {comment.author.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-gray-500 text-sm">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Community Page Component
  const CommunityPageContent = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Community</h1>
              <div className="hidden sm:flex space-x-6">
                <button 
                  onClick={() => setActiveTab('discussions')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'discussions' 
                      ? 'bg-[#585182] bg-opacity-10 text-[#585182]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discussions</span>
                </button>
                <button 
                  onClick={() => setActiveTab('mentors')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'mentors' 
                      ? 'bg-[#585182] bg-opacity-10 text-[#585182]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Mentors</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('chat')}
                className="p-2 text-gray-600 hover:text-[#585182] hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-[#585182] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button 
                onClick={() => setShowNewPost(true)}
                className="bg-[#585182] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Post</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {activeTab === 'discussions' && (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text"
                        placeholder="Search discussions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'mentors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map(mentor => (
                  <div key={mentor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#585182] to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {mentor.avatar}
                        </div>
                        {mentor.online && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-[#585182] font-medium">{mentor.expertise}</p>
                        <p className="text-gray-500 text-xs mb-2">ID: {mentor.username}</p>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              const existingConv = conversations.find(conv => conv.username === mentor.username);
                              if (existingConv) {
                                setActiveChat(existingConv);
                              } else {
                                const newConv = {
                                  id: Date.now(),
                                  user: mentor.name,
                                  username: mentor.username,
                                  lastMessage: "",
                                  timestamp: "now",
                                  unread: 0,
                                  avatar: mentor.avatar,
                                  online: mentor.online,
                                  messages: []
                                };
                                setConversations(prevConversations => [newConv, ...prevConversations]);
                                setActiveChat(newConv);
                              }
                              setCurrentPage('individual-chat');
                            }}
                            className="bg-[#585182] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex-1"
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Mentors</span>
                  <span className="font-semibold">24</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Mentors</h3>
              <div className="space-y-3">
                {mentors.filter(mentor => mentor.online).map(mentor => (
                  <div key={mentor.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#585182] to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {mentor.avatar}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{mentor.name}</p>
                      <p className="text-xs text-gray-500 truncate">{mentor.expertise}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const existingConv = conversations.find(conv => conv.username === mentor.username);
                        if (existingConv) {
                          setActiveChat(existingConv);
                        } else {
                          const newConv = {
                            id: Date.now(),
                            user: mentor.name,
                            username: mentor.username,
                            lastMessage: "",
                            timestamp: "now",
                            unread: 0,
                            avatar: mentor.avatar,
                            online: mentor.online,
                            messages: []
                          };
                          setConversations(prevConversations => [newConv, ...prevConversations]);
                          setActiveChat(newConv);
                        }
                        setCurrentPage('individual-chat');
                      }}
                      className="text-[#585182] hover:text-opacity-75"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NewPostModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Create New Post</h3>
          <button 
            onClick={() => setShowNewPost(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182]"
            >
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write your post content..."
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182] resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={newPostTags}
              onChange={(e) => setNewPostTags(e.target.value)}
              placeholder="react, javascript, tutorial"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182]"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              onClick={() => setShowNewPost(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreatePost}
              className="px-4 py-2 bg-[#585182] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const NewChatModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Start New Chat</h3>
          <button 
            onClick={() => setShowNewChat(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
            <input
              type="text"
              placeholder="Search by username or ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182]"
            />
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Available Mentors</h4>
            {mentors.map(mentor => (
              <button
                key={mentor.id}
                onClick={() => {
                  const existingConv = conversations.find(conv => conv.username === mentor.username);
                  if (existingConv) {
                    setActiveChat(existingConv);
                  } else {
                    const newConv = {
                      id: Date.now(),
                      user: mentor.name,
                      username: mentor.username,
                      lastMessage: "",
                      timestamp: "now",
                      unread: 0,
                      avatar: mentor.avatar,
                      online: mentor.online,
                      messages: []
                    };
                    setConversations(prevConversations => [newConv, ...prevConversations]);
                    setActiveChat(newConv);
                  }
                  setShowNewChat(false);
                  setCurrentPage('individual-chat');
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#585182] to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {mentor.avatar}
                    </div>
                    {mentor.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{mentor.name}</p>
                    <p className="text-sm text-gray-600">{mentor.expertise}</p>
                    <p className="text-xs text-gray-500">ID: {mentor.username}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Bottom Navigation
  const MobileNavigation = () => (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-3 h-16">
        <button 
          onClick={() => {
            setCurrentPage('community');
            setActiveTab('discussions');
          }}
          className={`flex flex-col items-center justify-center space-y-1 ${
            currentPage === 'community' && activeTab === 'discussions' ? 'text-[#585182]' : 'text-gray-600'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">Discussions</span>
        </button>
        <button 
          onClick={() => {
            setCurrentPage('community');
            setActiveTab('mentors');
          }}
          className={`flex flex-col items-center justify-center space-y-1 ${
            currentPage === 'community' && activeTab === 'mentors' ? 'text-[#585182]' : 'text-gray-600'
          }`}
        >
          <Award className="w-5 h-5" />
          <span className="text-xs">Mentors</span>
        </button>
        <button 
          onClick={() => setCurrentPage('chat')}
          className={`flex flex-col items-center justify-center space-y-1 relative ${
            currentPage === 'chat' || currentPage === 'individual-chat' ? 'text-[#585182]' : 'text-gray-600'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Messages</span>
          <span className="absolute -top-1 -right-2 bg-[#585182] text-white text-xs rounded-full px-1.5 py-0.5">2</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentPage === 'community' && <CommunityPageContent />}
      {currentPage === 'chat' && <ChatPage />}
      {currentPage === 'individual-chat' && <IndividualChatPage />}

      {/* Modals */}
      {showNewPost && <NewPostModal />}
      {showNewChat && <NewChatModal />}

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default CommunityPage;
