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

  // Mental Health Feed Content
  const [mentalHealthFeed, setMentalHealthFeed] = useState([
    {
      id: 'mh1',
      type: 'daily_tip',
      title: '💡 Daily Mental Health Tip',
      content: 'Practice the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps reduce anxiety and brings you back to the present moment.',
      author: 'Mental Health Guide',
      timestamp: '6 hours ago',
      likes: 89,
      category: 'tip',
      color: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      icon: '🧠'
    },
    {
      id: 'mh_new1',
      type: 'trending',
      title: '🔥 Trending: Study Break Ideas',
      content: 'Top 5 study break activities that actually boost productivity:\n\n1. 10-minute walk outside\n2. Listen to 3 favorite songs\n3. Do 5 minutes of stretching\n4. Call a friend for 2 minutes\n5. Practice gratitude - list 3 good things\n\nWhich one will you try today?',
      author: 'Study Wellness Tips',
      timestamp: '2 hours ago',
      likes: 342,
      comments: 67,
      retweets: 45,
      category: 'trending',
      color: 'from-red-50 to-orange-50',
      borderColor: 'border-red-200',
      icon: '🔥'
    },
    {
      id: 'mh_new2',
      type: 'student_post',
      title: '📝 Student Thought',
      content: 'Just realized that my anxiety about "not being productive enough" was actually making me LESS productive. Sometimes the pressure we put on ourselves is the real enemy. Taking breaks = not lazy. 🌱',
      author: generateUniqueId('alex_student'),
      authorType: 'student',
      timestamp: '3 hours ago',
      likes: 189,
      comments: 34,
      retweets: 23,
      category: 'student_thought',
      color: 'from-green-50 to-teal-50',
      borderColor: 'border-green-200',
      icon: '🌱'
    },
    {
      id: 'mh2',
      type: 'success_story',
      title: '🌟 Student Success Story',
      content: 'Just wanted to share that I finally overcame my test anxiety using the breathing techniques from our mindfulness sessions! I went from having panic attacks before exams to feeling calm and confident. Remember, small steps lead to big changes. You got this! 💪',
      author: generateUniqueId('sarah_success'),
      authorType: 'student',
      timestamp: '4 hours ago',
      likes: 256,
      comments: 43,
      retweets: 67,
      category: 'success',
      color: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      icon: '🎉'
    },
    {
      id: 'mh_new3',
      type: 'meme',
      title: '😂 Mental Health Meme',
      content: 'Me: "I should really prioritize my mental health"\n\nAlso me at 3 AM: "Let me just overthink this one conversation from 2019 real quick"\n\n😅 Anyone else? Share your relatable moments below!',
      author: 'Meme Mental Health',
      timestamp: '5 hours ago',
      likes: 445,
      comments: 89,
      retweets: 156,
      category: 'humor',
      color: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      icon: '😂'
    },
    {
      id: 'mh_new4',
      type: 'quick_tip',
      title: '⚡ Quick Tip',
      content: 'Feeling overwhelmed? Try the "2-minute rule": If a task takes less than 2 minutes, do it NOW. This prevents small tasks from piling up into mental clutter. Your future self will thank you! ✨',
      author: generateUniqueId('productivity_guru'),
      timestamp: '6 hours ago',
      likes: 178,
      comments: 21,
      retweets: 34,
      category: 'productivity',
      color: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      icon: '⚡'
    },
    {
      id: 'mh_new5',
      type: 'live_session',
      title: '🎥 Live Session Alert',
      content: 'LIVE NOW: "Mindful Study Techniques" with Dr. Sarah Chen\n\n🕐 Started 30 minutes ago\n👥 47 students watching\n💬 Join the chat!\n\nTopics: Focus techniques, handling distractions, anxiety management during study sessions.',
      author: 'Campus Wellness Center',
      timestamp: '30 minutes ago',
      likes: 67,
      comments: 12,
      category: 'live',
      color: 'from-red-50 to-pink-50',
      borderColor: 'border-red-300',
      icon: '🔴',
      isLive: true
    },
    {
      id: 'mh3',
      type: 'quote',
      title: '💭 Mindful Moment',
      content: '"You are not your thoughts. You are the awareness behind your thoughts." - Eckhart Tolle',
      subtitle: 'Take a moment to breathe and remember that difficult thoughts and feelings are temporary. You have the strength to work through them.',
      author: 'Daily Wisdom',
      timestamp: '8 hours ago',
      likes: 334,
      comments: 45,
      retweets: 78,
      category: 'inspiration',
      color: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      icon: '🌸'
    },
    {
      id: 'mh_new6',
      type: 'poll_active',
      title: '📊 Quick Poll',
      content: 'What helps you most when you\'re feeling stressed?',
      author: 'Stress Management Hub',
      timestamp: '10 hours ago',
      likes: 123,
      category: 'poll',
      color: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      icon: '📊',
      pollOptions: [
        { text: 'Deep breathing exercises 🌬️', votes: 89, percentage: 42 },
        { text: 'Talking to friends 💬', votes: 56, percentage: 26 },
        { text: 'Physical exercise 🏃‍♀️', votes: 43, percentage: 20 },
        { text: 'Music/meditation 🎵', votes: 25, percentage: 12 }
      ]
    },
    {
      id: 'mh_new7',
      type: 'thread',
      title: '🧵 Thread: Exam Season Survival',
      content: 'THREAD: How to survive exam season without losing your sanity 🧠\n\n1/7: First, remember that your worth isn\'t determined by your grades. You are more than your academic performance.\n\nReply to see the full thread! 👇',
      author: 'Academic Wellness Coach',
      timestamp: '12 hours ago',
      likes: 267,
      comments: 34,
      retweets: 89,
      category: 'thread',
      color: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      icon: '🧵'
    },
    {
      id: 'mh4',
      type: 'exercise',
      title: '🧘‍♀️ Quick Stress Relief Exercise',
      content: 'Box Breathing Technique:\n1. Inhale for 4 counts\n2. Hold for 4 counts\n3. Exhale for 4 counts\n4. Hold empty for 4 counts\n\nRepeat 4-6 times. Perfect for before exams or presentations!',
      author: 'Wellness Coach',
      timestamp: '14 hours ago',
      likes: 187,
      comments: 23,
      retweets: 45,
      category: 'exercise',
      color: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      icon: '🌬️',
      actionButton: 'Try It Now'
    },
    {
      id: 'mh_new8',
      type: 'announcement',
      title: '📢 New Feature: Mood Tracking',
      content: 'Exciting news! We\'ve just launched our new mood tracking feature 🎉\n\n✨ Track daily emotions\n✨ Identify patterns\n✨ Get personalized insights\n✨ Share progress with counselors\n\nTry it now in your dashboard!',
      author: 'Platform Updates',
      timestamp: '16 hours ago',
      likes: 298,
      comments: 67,
      category: 'announcement',
      color: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-200',
      icon: '📢'
    },
    {
      id: 'mh_new9',
      type: 'personal_story',
      title: '💝 Personal Share',
      content: 'Two years ago, I couldn\'t leave my dorm room due to social anxiety. Today, I gave a presentation to 200+ people. Growth isn\'t linear, setbacks happen, but progress is possible. To anyone struggling: you\'re not alone, and you\'re stronger than you think. 💙',
      author: generateUniqueId('brave_student'),
      authorType: 'student',
      timestamp: '18 hours ago',
      likes: 543,
      comments: 89,
      retweets: 167,
      category: 'personal_story',
      color: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200',
      icon: '💝'
    },
    {
      id: 'mh_new10',
      type: 'fact',
      title: '🧠 Mental Health Fact',
      content: 'Did you know? Regular exercise can be as effective as antidepressants for mild to moderate depression. Just 30 minutes of walking daily can boost mood, reduce stress, and improve sleep quality. 🚶‍♀️✨\n\nStart small - even 5 minutes counts!',
      author: 'Mental Health Facts',
      timestamp: '20 hours ago',
      likes: 234,
      comments: 34,
      retweets: 67,
      category: 'fact',
      color: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      icon: '🧠'
    },
    {
      id: 'mh5',
      type: 'article',
      title: '📚 Understanding Imposter Syndrome',
      content: 'Feeling like you don\'t belong in your academic program? You\'re not alone. Imposter syndrome affects 70% of students. Here are signs to watch for and strategies to overcome those feelings of self-doubt.',
      author: 'Dr. Mental Health Expert',
      timestamp: '22 hours ago',
      likes: 398,
      comments: 67,
      retweets: 89,
      category: 'education',
      color: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      icon: '🎓',
      readTime: '5 min read'
    },
    {
      id: 'mh_new11',
      type: 'challenge',
      title: '🎯 Weekly Challenge',
      content: 'This Week\'s Challenge: Digital Detox Hours 📱➡️📚\n\nGoal: 2 hours of phone-free time daily\nBenefits: Reduced anxiety, better sleep, improved focus\n\n💪 1,247 students participating\n🏆 Join the challenge!\n\n#DigitalDetox #MentalHealthChallenge',
      author: 'Wellness Challenges',
      timestamp: '1 day ago',
      likes: 156,
      comments: 43,
      category: 'challenge',
      color: 'from-violet-50 to-purple-50',
      borderColor: 'border-violet-200',
      icon: '🎯',
      challengeProgress: 73,
      participants: 1247
    },
    {
      id: 'mh6',
      type: 'poll',
      title: '📊 Community Check-in',
      content: 'How are you feeling about your mental health journey this week?',
      author: 'Community Team',
      timestamp: '1 day ago',
      likes: 267,
      comments: 78,
      retweets: 34,
      category: 'community',
      color: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200',
      icon: '💕',
      pollOptions: [
        { text: 'Making great progress! 😊', votes: 45, percentage: 35 },
        { text: 'Having ups and downs 😐', votes: 62, percentage: 48 },
        { text: 'Struggling but trying 😔', votes: 22, percentage: 17 }
      ]
    },
    {
      id: 'mh_new12',
      type: 'video',
      title: '🎬 Video: 5-Minute Meditation',
      content: 'New video uploaded! 🎥\n\n"5-Minute Morning Meditation for Students"\n\n👀 2.3K views in 6 hours\n💬 "This helped me start my day feeling centered!"\n💬 "Perfect for my busy schedule"\n\nWatch now and start your day mindfully ✨',
      author: 'Mindfulness Videos',
      timestamp: '1 day ago',
      likes: 189,
      comments: 45,
      retweets: 67,
      category: 'video',
      color: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200',
      icon: '🎬',
      videoViews: '2.3K'
    },
    {
      id: 'mh7',
      type: 'resource',
      title: '🎯 Mental Health Resources',
      content: 'Quick access to support when you need it most:',
      author: 'Campus Resources',
      timestamp: '2 days ago',
      likes: 189,
      comments: 23,
      retweets: 45,
      category: 'resources',
      color: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      icon: '🆘',
      resources: [
        { name: 'Crisis Text Line', contact: 'Text HOME to 741741', type: 'crisis' },
        { name: 'Campus Counseling', contact: 'Call (555) 123-4567', type: 'counseling' },
        { name: 'Peer Support Group', contact: 'Join our Discord', type: 'peer' }
      ]
    },
    {
      id: 'mh_new13',
      type: 'motivational',
      title: '🌅 Monday Motivation',
      content: 'New week, fresh mindset! 🌟\n\nThis week I will:\n✅ Be patient with my progress\n✅ Celebrate small wins\n✅ Ask for help when needed\n✅ Practice self-compassion\n✅ Remember that healing isn\'t linear\n\nWhat\'s your intention for this week? Share below! 👇',
      author: 'Monday Motivations',
      timestamp: '2 days ago',
      likes: 445,
      comments: 123,
      retweets: 189,
      category: 'motivational',
      color: 'from-orange-50 to-yellow-50',
      borderColor: 'border-orange-200',
      icon: '🌅'
    },
    {
      id: 'mh8',
      type: 'reminder',
      title: '⏰ Gentle Reminder',
      content: 'It\'s okay to take breaks. It\'s okay to ask for help. It\'s okay to not be okay sometimes. Your mental health matters more than any assignment or deadline. Be kind to yourself today. 💙',
      author: 'Self-Care Bot',
      timestamp: '3 days ago',
      likes: 521,
      comments: 89,
      retweets: 167,
      category: 'self-care',
      color: 'from-sky-50 to-blue-50',
      borderColor: 'border-sky-200',
      icon: '💙'
    },
    {
      id: 'mh_new14',
      type: 'research',
      title: '📊 New Research',
      content: 'Interesting study alert! 🔬\n\nNew research from Stanford shows that students who practice gratitude journaling for just 2 weeks experience:\n\n📈 23% improvement in sleep quality\n📈 15% reduction in stress levels\n📈 18% boost in academic motivation\n\nWho\'s ready to try it?',
      author: 'Research Updates',
      timestamp: '3 days ago',
      likes: 234,
      comments: 56,
      retweets: 78,
      category: 'research',
      color: 'from-teal-50 to-emerald-50',
      borderColor: 'border-teal-200',
      icon: '📊'
    },
    {
      id: 'mh9',
      type: 'interactive',
      title: '🎮 Mood Tracker Challenge',
      content: 'Track your mood for 7 days and notice patterns! Understanding your emotional rhythms can help you plan better self-care strategies.',
      author: 'Wellness Challenge',
      timestamp: '4 days ago',
      likes: 303,
      comments: 67,
      retweets: 89,
      category: 'challenge',
      color: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      icon: '📈',
      challengeProgress: 65,
      participants: 89
    },
    {
      id: 'mh10',
      type: 'community_question',
      title: '🤝 Let\'s Connect',
      content: 'What\'s one small thing that made you smile today? Share in the comments to spread some positivity! Sometimes the smallest moments can brighten someone else\'s day. ✨',
      author: 'Community Manager',
      timestamp: '5 days ago',
      likes: 256,
      comments: 145,
      retweets: 67,
      category: 'community',
      color: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      icon: '✨'
    }
  ]);

  const [likedMentalHealthPosts, setLikedMentalHealthPosts] = useState(new Set());

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

  // Mental Health Feed Handlers
  const handleMentalHealthLike = (postId) => {
    setLikedMentalHealthPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
        setMentalHealthFeed(prevFeed => prevFeed.map(post => 
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        ));
      } else {
        newLiked.add(postId);
        setMentalHealthFeed(prevFeed => prevFeed.map(post => 
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
      }
      return newLiked;
    });
  };

  const handlePollVote = (postId, optionIndex) => {
    setMentalHealthFeed(prevFeed => prevFeed.map(post => {
      if (post.id === postId && post.pollOptions) {
        const updatedOptions = post.pollOptions.map((option, index) => {
          if (index === optionIndex) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        
        const totalVotes = updatedOptions.reduce((sum, option) => sum + option.votes, 0);
        const updatedOptionsWithPercentage = updatedOptions.map(option => ({
          ...option,
          percentage: Math.round((option.votes / totalVotes) * 100)
        }));
        
        return { ...post, pollOptions: updatedOptionsWithPercentage };
      }
      return post;
    }));
  };

  const handleBreathingExercise = () => {
    alert('🌬️ Let\'s practice together!\n\n1. Breathe in for 4 counts... 1... 2... 3... 4...\n2. Hold for 4 counts... 1... 2... 3... 4...\n3. Breathe out for 4 counts... 1... 2... 3... 4...\n4. Hold empty for 4 counts... 1... 2... 3... 4...\n\nGreat job! Repeat this cycle 4-6 times for maximum benefit. 💙');
  };

  // Twitter-style interaction handlers
  const [retweetedPosts, setRetweetedPosts] = useState(new Set());
  
  const handleRetweet = (postId) => {
    setRetweetedPosts(prev => {
      const newRetweeted = new Set(prev);
      if (newRetweeted.has(postId)) {
        newRetweeted.delete(postId);
        setMentalHealthFeed(prevFeed => prevFeed.map(post => 
          post.id === postId ? { ...post, retweets: (post.retweets || 0) - 1 } : post
        ));
      } else {
        newRetweeted.add(postId);
        setMentalHealthFeed(prevFeed => prevFeed.map(post => 
          post.id === postId ? { ...post, retweets: (post.retweets || 0) + 1 } : post
        ));
      }
      return newRetweeted;
    });
  };

  const handleLiveJoin = (postId) => {
    alert('🎥 Joining live session...\n\nRedirecting to live stream in the Campus Wellness Center. You\'ll receive a notification when the session starts!');
  };

  const handleVideoPlay = (postId) => {
    alert('🎬 Opening video player...\n\nThis would open the meditation video in a new window or modal. Video features:\n\n• 5-minute guided meditation\n• Closed captions available\n• Playback speed control\n• Save to favorites');
  };

  const handleJoinChallenge = (postId) => {
    setMentalHealthFeed(prevFeed => prevFeed.map(post => {
      if (post.id === postId && post.participants) {
        return { ...post, participants: post.participants + 1 };
      }
      return post;
    }));
    alert('🎯 Challenge joined!\n\nYou\'ve successfully joined the Digital Detox Challenge. Check your dashboard for daily progress tracking and tips!');
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
              onChange={(e) => setChatMessage(prevMessage => e.target.value)}
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
                    onChange={(e) => setNewComment(prevComment => e.target.value)}
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
              <button 
                onClick={() => window.history.back()}
                className="p-2 text-gray-600 hover:text-[#585182] hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
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
                <button 
                  onClick={() => setActiveTab('mental-health')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'mental-health' 
                      ? 'bg-[#585182] bg-opacity-10 text-[#585182]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wellness Feed</span>
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
                        onChange={(e) => setSearchTerm(prevTerm => e.target.value)}
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

            {activeTab === 'mental-health' && (
              <div className="space-y-6">
                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Welcome to your Wellness Feed</h2>
                  </div>
                  <p className="text-gray-700">Discover mental health tips, inspiring stories, and supportive resources curated just for you. Your wellbeing matters! 💙</p>
                </div>

                {/* Mental Health Feed Posts */}
                {mentalHealthFeed.map(post => (
                  <div key={post.id} className={`bg-gradient-to-br ${post.color} border ${post.borderColor} rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}>
                    <div className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{post.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {post.title}
                              {post.type === 'success_story' && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Success</span>}
                              {post.type === 'daily_tip' && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Tip</span>}
                              {post.type === 'exercise' && <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">Exercise</span>}
                              {post.type === 'trending' && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Trending</span>}
                              {post.type === 'live_session' && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">LIVE</span>}
                              {post.type === 'poll_active' && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Poll</span>}
                              {post.type === 'thread' && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Thread</span>}
                              {post.type === 'meme' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Meme</span>}
                              {post.type === 'video' && <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Video</span>}
                              {post.type === 'challenge' && <span className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full">Challenge</span>}
                            </h3>
                            <p className="text-sm text-gray-600">{post.author} • {post.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {post.readTime && (
                            <span className="bg-white bg-opacity-70 text-gray-700 text-xs px-2 py-1 rounded-full">
                              {post.readTime}
                            </span>
                          )}
                          {post.videoViews && (
                            <span className="bg-white bg-opacity-70 text-gray-700 text-xs px-2 py-1 rounded-full">
                              👁️ {post.videoViews}
                            </span>
                          )}
                          {post.isLive && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                              🔴 LIVE
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
                        {post.subtitle && (
                          <p className="text-gray-600 mt-2 italic">{post.subtitle}</p>
                        )}
                      </div>

                      {/* Special Content Types */}
                      {post.type === 'poll' && post.pollOptions && (
                        <div className="mb-4 space-y-2">
                          {post.pollOptions.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handlePollVote(post.id, index)}
                              className="w-full text-left p-3 rounded-lg border border-white bg-white bg-opacity-50 hover:bg-opacity-70 transition-all"
                            >
                              <div className="flex justify-between items-center">
                                <span>{option.text}</span>
                                <span className="font-semibold">{option.percentage}%</span>
                              </div>
                              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${option.percentage}%` }}
                                ></div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {post.type === 'resource' && post.resources && (
                        <div className="mb-4 space-y-2">
                          {post.resources.map((resource, index) => (
                            <div key={index} className="bg-white bg-opacity-70 rounded-lg p-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{resource.name}</p>
                                <p className="text-sm text-gray-600">{resource.contact}</p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                resource.type === 'crisis' ? 'bg-red-100 text-red-800' :
                                resource.type === 'counseling' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {resource.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {post.type === 'interactive' && (
                        <div className="mb-4 bg-white bg-opacity-70 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Challenge Progress</span>
                            <span className="text-sm text-gray-600">{post.participants} participants</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${post.challengeProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{post.challengeProgress}% complete</p>
                        </div>
                      )}

                      {/* Enhanced Action Buttons - Twitter Style */}
                      <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-50">
                        <div className="flex items-center space-x-1">
                          {/* Like Button */}
                          <button 
                            onClick={() => handleMentalHealthLike(post.id)}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all hover:bg-red-50 ${
                              likedMentalHealthPosts.has(post.id) 
                                ? 'text-red-600' 
                                : 'text-gray-600 hover:text-red-600'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedMentalHealthPosts.has(post.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          
                          {/* Comment Button */}
                          {post.comments && (
                            <button className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                          )}
                          
                          {/* Retweet Button */}
                          {post.retweets && (
                            <button 
                              onClick={() => handleRetweet(post.id)}
                              className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all hover:bg-green-50 ${
                                retweetedPosts.has(post.id) 
                                  ? 'text-green-600' 
                                  : 'text-gray-600 hover:text-green-600'
                              }`}
                            >
                              <Reply className="w-4 h-4" />
                              <span className="text-sm">{post.retweets}</span>
                            </button>
                          )}
                          
                          {/* Special Action Buttons */}
                          {post.actionButton && (
                            <button 
                              onClick={handleBreathingExercise}
                              className="px-3 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 font-medium rounded-full transition-all text-sm"
                            >
                              {post.actionButton}
                            </button>
                          )}
                          
                          {post.type === 'live_session' && (
                            <button 
                              onClick={() => handleLiveJoin(post.id)}
                              className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-full transition-all text-sm animate-pulse"
                            >
                              Join Live
                            </button>
                          )}
                          
                          {post.type === 'video' && (
                            <button 
                              onClick={() => handleVideoPlay(post.id)}
                              className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-full transition-all text-sm"
                            >
                              ▶️ Play Video
                            </button>
                          )}
                          
                          {post.type === 'challenge' && (
                            <button 
                              onClick={() => handleJoinChallenge(post.id)}
                              className="px-3 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 font-medium rounded-full transition-all text-sm"
                            >
                              Join Challenge
                            </button>
                          )}
                        </div>
                        
                        {/* Share Button */}
                        <button className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-2 rounded-full transition-all">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                <div className="text-center pt-6">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                    Load More Wellness Content
                  </button>
                </div>
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
              onChange={(e) => setNewPostTitle(prevTitle => e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(prevCategory => e.target.value)}
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
              onChange={(e) => setNewPostContent(prevContent => e.target.value)}
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
              onChange={(e) => setNewPostTags(prevTags => e.target.value)}
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
      <div className="grid grid-cols-4 h-16">
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
          onClick={() => {
            setCurrentPage('community');
            setActiveTab('mental-health');
          }}
          className={`flex flex-col items-center justify-center space-y-1 ${
            currentPage === 'community' && activeTab === 'mental-health' ? 'text-[#585182]' : 'text-gray-600'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span className="text-xs">Wellness</span>
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
