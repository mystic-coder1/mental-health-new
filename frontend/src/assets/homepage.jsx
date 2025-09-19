// // import React, { useState, useRef, useEffect } from 'react';

// // const HomePage = () => {
// //   // Chat state
// //   const [chatOpen, setChatOpen] = useState(false);
// //   const [chatMessages, setChatMessages] = useState([
// //     {
// //       text: "Hello! I'm here to provide support",
// //       sender: "bot",
// //       timestamp: Date.now()
// //     },
// //     {
// //       text: "Feel free to share what's on your mind, and I'll do my best to help.",
// //       sender: 'bot',
// //       timestamp: Date.now() + 500
// //     },
// //     {
// //       text: "🌟 You're not alone in this journey.",
// //       sender: 'bot',
// //       timestamp: Date.now() + 1000
// //     }
// //   ]);
// //   const [currentMessage, setCurrentMessage] = useState('');
// //   const chatMessagesRef = useRef(null);

// //   // Data
// //   const videoLectures = [
// //     {
// //       id: 'stress-anxiety',
// //       title: 'Managing Stress and Anxiety',
// //       description: 'Learn practical techniques to identify triggers and develop healthy coping mechanisms for daily stress management.',
// //       thumbnail: '🧘‍♀️'
// //     },
// //     {
// //       id: 'healthy-habits',
// //       title: 'Building Healthy Habits',
// //       description: 'Discover how small, consistent changes can transform your mental well-being and create lasting positive impact.',
// //       thumbnail: '🌱'
// //     },
// //     {
// //       id: 'mindfulness',
// //       title: 'Mindfulness Techniques for Beginners',
// //       description: 'Start your mindfulness journey with simple, effective techniques you can practice anywhere, anytime.',
// //       thumbnail: '🧠'
// //     },
// //     {
// //       id: 'negative-thoughts',
// //       title: 'How to Cope with Negative Thoughts',
// //       description: 'Understand the nature of negative thinking patterns and learn evidence-based strategies to overcome them.',
// //       thumbnail: '💭'
// //     }
// //   ];

// //   const journalEntries = [
// //     {
// //       date: 'Today, September 17, 2025',
// //       text: 'Started my morning with a 10-minute meditation session. Felt more centered and ready to tackle the day. The breathing exercises from yesterday\'s video really helped...'
// //     },
// //     {
// //       date: 'Yesterday',
// //       text: 'Had a challenging conversation at work, but I managed to stay calm and communicate my feelings clearly. Progress!'
// //     }
// //   ];

// //   const communityStories = [
// //     {
// //       text: 'After months of anxiety, I finally found peace through the mindfulness videos. The community support made all the difference in my recovery journey.',
// //       author: 'Anonymous Community Member'
// //     },
// //     {
// //       text: 'Journaling became my safe space. Writing down my thoughts helped me understand my emotions better and track my progress over time.',
// //       author: 'Sarah M.'
// //     },
// //     {
// //       text: 'The expert lectures gave me tools I never knew existed. Now I help others in my community using what I\'ve learned here.',
// //       author: 'Alex R.'
// //     }
// //   ];

// //   // Functions
// //   const scrollToSection = (sectionId) => {
// //     const element = document.getElementById(sectionId);
// //     element?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   const openCommunity = () => {
// //     alert('Opening community page...\n\nIn a real implementation, this would show the full community section with more stories, support groups, and discussion forums.');
// //   };

// //   const playVideo = (videoId) => {
// //     const video = videoLectures.find(v => v.id === videoId);
// //     alert(`Playing video: ${video.title}\n\nIn a real implementation, this would open the video player with the selected content.`);
// //   };

// //   const openJournal = () => {
// //     alert('Opening full journal view...\n\nIn a real implementation, this would navigate to your complete journal with all entries, writing tools, and progress tracking.');
// //   };

// //   const toggleChat = () => {
// //     setChatOpen(!chatOpen);
// //   };

// //   const handleChatInput = (e) => {
// //     if (e.key === 'Enter' && currentMessage.trim()) {
// //       const userMessage = {
// //         text: currentMessage.trim(),
// //         sender: 'user',
// //         timestamp: Date.now()
// //       };
      
// //       setChatMessages(prev => [...prev, userMessage]);
// //       setCurrentMessage('');
      
// //       // Simulate AI response
// //       setTimeout(() => {
// //         const responses = [
// //           "Thank you for sharing that with me. It takes courage to reach out. Can you tell me more about what you're experiencing?",
// //           "I hear you, and your feelings are completely valid. Let's work through this together. Have you tried any breathing exercises today?",
// //           "That sounds really challenging. Remember, it's okay to take things one step at a time. Would you like me to guide you through a quick mindfulness exercise?",
// //           "You're taking positive steps by reaching out. That shows real strength. How has your day been overall?",
// //           "I'm here to support you. If you're in crisis, please don't hesitate to contact a professional helpline. For now, let's focus on some grounding techniques."
// //         ];
        
// //         const aiMessage = {
// //           text: responses[Math.floor(Math.random() * responses.length)],
// //           sender: 'ai',
// //           timestamp: Date.now()
// //         };
        
// //         setChatMessages(prev => [...prev, aiMessage]);
// //       }, 1500);
// //     }
// //   };

// //   // Effects
// //   useEffect(() => {
// //     if (chatMessagesRef.current) {
// //       chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
// //     }
// //   }, [chatMessages]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (chatOpen && 
// //           !event.target.closest('.chat-modal') && 
// //           !event.target.closest('.emergency-support')) {
// //         setChatOpen(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [chatOpen]);

// //   return (
// //     <div className="min-h-screen bg-white text-gray-800 font-sans">
// //       {/* Header */}
    

// //       {/* Main Content */}
// //       <main className="pt-16 min-h-screen bg-[#f8fafc]">
// //         {/* Welcome Section */}
// //         <section className="py-16 md:py-24">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-3xl mx-auto text-center space-y-8">
// //               <h1 className="text-4xl md:text-6xl font-normal text-gray-900">
// //                 Hello, <span className="text-[#585182] font-medium">Rohan</span>.
// //               </h1>
// //               <p className="text-xl md:text-2xl text-gray-700">
// //                 How are you feeling today?
// //               </p>
// //               <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
// //                 <span className="text-2xl">😊</span>
// //                 <span className="text-lg text-gray-700">Feeling optimistic today</span>
// //               </div>
// //               <div>
// //                 <button
// //                   className="mt-8 px-8 py-3 bg-[#585182] text-white text-lg font-medium rounded-full shadow-lg hover:bg-[#4a4070] transition-colors"
// //                   onClick={() => scrollToSection('videos')}
// //                 >
// //                   Start Your Journey
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Video Lectures Section */}
// //         <section id="videos" className="py-16 bg-white">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-3xl mx-auto text-center mb-12">
// //               <div className="flex justify-center mb-4">
// //                 <span className="text-3xl">🎥</span>
// //               </div>
// //               <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
// //                 Start Your Healing Journey with Expert-Guided Video Lectures
// //               </h2>
// //               <p className="text-lg text-gray-600">
// //                 Discover curated content designed to support your mental wellness journey
// //               </p>
// //             </div>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //               {videoLectures.map((video) => (
// //                 <div 
// //                   key={video.id} 
// //                   className="bg-[#585182] rounded-2xl overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
// //                   onClick={() => playVideo(video.id)}
// //                 >
// //                   <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-[#585182] p-8">
// //                     <span className="text-6xl">{video.thumbnail}</span>
// //                   </div>
// //                   <div className="p-6 bg-white">
// //                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
// //                     <p className="text-gray-600 text-sm">{video.description}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Journal Section */}
// //         <section id="journal" className="py-16 bg-gray-50">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-3xl mx-auto text-center mb-12">
// //               <div className="flex justify-center mb-4">
// //                 <span className="text-3xl">📖</span>
// //               </div>
// //               <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
// //                 Daily Journal Snapshot
// //               </h2>
// //               <p className="text-lg text-gray-600">
// //                 Reflect on your thoughts and track your emotional journey
// //               </p>
// //             </div>
            
// //             <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
// //               {journalEntries.map((entry, index) => (
// //                 <div key={index} className="border-l-4 border-[#585182] pl-6 py-2">
// //                   <div className="text-sm text-gray-500 mb-2">{entry.date}</div>
// //                   <div className="text-gray-700 italic">"{entry.text}"</div>
// //                 </div>
// //               ))}
// //               <div className="text-center pt-6">
// //                 <button 
// //                   className="px-8 py-3 bg-[#585182] text-white text-lg font-medium rounded-full shadow-lg hover:bg-[#4a4070] transition-colors"
// //                   onClick={openJournal}
// //                 >
// //                   View Full Journal
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Community Section */}
// //         <section id="community" className="py-16 bg-white">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="max-w-3xl mx-auto text-center mb-12">
// //               <div className="flex justify-center mb-4">
// //                 <span className="text-3xl">💬</span>
// //               </div>
// //               <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
// //                 Community Spotlights
// //               </h2>
// //               <p className="text-lg text-gray-600">
// //                 Find inspiration in shared experiences and collective healing
// //               </p>
// //             </div>
            
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //               {communityStories.map((story, index) => (
// //                 <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#585182]">
// //                   <div className="text-gray-700 italic mb-4">"{story.text}"</div>
// //                   <div className="text-[#585182] font-medium">- {story.author}</div>
// //                   <button 
// //                     className="mt-6 w-full px-6 py-3 border-2 border-[#585182] text-[#585182] font-medium rounded-full hover:bg-[#585182] hover:text-white transition-colors"
// //                     onClick={openCommunity}
// //                   >
// //                     Read More
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>
// //       </main>

// //       {/* Emergency Support Button */}
// //       <button 
// //         className="fixed bottom-8 right-8 bg-[#585182] text-white w-16 h-16 rounded-full shadow-lg hover:bg-[#4a4070] transition-colors flex items-center justify-center text-2xl"
// //         onClick={toggleChat} 
// //         title="Chat with AI Support"
// //       >
// //         💬
// //       </button>

// //       {/* Chat Modal */}
// //       {chatOpen && (
// //         <div className="fixed bottom-28 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
// //           <div className="bg-[#585182] text-white px-6 py-4 font-semibold">
// //             🤖 AI Support - Here to Help
// //           </div>
// //           <div className="flex-1 p-6 space-y-4 overflow-y-auto" ref={chatMessagesRef}>
// //             {chatMessages.map((message, index) => (
// //               <div
// //                 key={index}
// //                 className={`max-w-[80%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
// //               >
// //                 <div
// //                   className={`rounded-2xl px-4 py-2 inline-block ${
// //                     message.sender === 'user'
// //                       ? 'bg-[#585182] text-white'
// //                       : 'bg-gray-100 text-gray-800'
// //                   }`}
// //                 >
// //                   {message.text}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="p-4 bg-gray-50 border-t border-gray-200">
// //             <input
// //               type="text"
// //               className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#585182] focus:ring-2 focus:ring-[#585182] focus:ring-opacity-20"
// //               placeholder="Type your message here..."
// //               value={currentMessage}
// //               onChange={(e) => setCurrentMessage(e.target.value)}
// //               onKeyPress={handleChatInput}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default HomePage;
// {/* Quick Access Features */}import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './navbar.jsx';
// import { 
//   Heart, 
//   Users, 
//   Calendar, 
//   Shield, 
//   Zap, 
//   Sparkles, 
//   Gamepad2, 
//   Share, 
//   UserCheck,
//   Bot,
//   Headphones,
//   Eye,
//   Smile,
//   ChevronRight,
//   Clock,
//   Lock,
//   Disc
// } from 'lucide-react';

// const StudentDashboard = () => {
//   const navigate = useNavigate();
//   const [chatbotOpen, setChatbotOpen] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   // Floating background elements
//   const FloatingElements = () => (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none">
//       <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-30 animate-pulse"></div>
//       <div className="absolute top-40 right-20 w-24 h-24 bg-purple-50 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '3s' }}></div>
//       <div className="absolute bottom-32 left-20 w-20 h-20 bg-purple-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
//       <div className="absolute bottom-20 right-32 w-28 h-28 bg-purple-50 rounded-full opacity-35 animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
//       <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
//     </div>
//   );

//   // Chatbot Modal
//   const ChatbotModal = () => (
//     chatbotOpen && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-[#585182] rounded-full flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">AI Mental Health Assistant</h3>
//                   <p className="text-sm text-gray-500">Available 24/7</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setChatbotOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="space-y-4 mb-4 h-64 overflow-y-auto">
//               <div className="bg-gray-100 rounded-lg p-3">
//                 <p className="text-sm text-gray-700">Hi! I'm here to support you. How are you feeling today?</p>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <input 
//                 type="text" 
//                 placeholder="Type your message..."
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#585182] focus:border-transparent"
//               />
//               <button className="px-4 py-2 bg-[#585182] text-white rounded-lg hover:bg-[#4a456e] transition-colors">
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );

//   const Card = ({ children, className = "", hover = true }) => (
//     <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}>
//       {children}
//     </div>
//   );

//   const Button = ({ children, onClick, icon: Icon, variant = "primary" }) => {
//     const baseClasses = "inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105";
//     const variants = {
//       primary: "bg-[#585182] text-white hover:bg-[#4a456e] shadow-lg",
//       secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     };
    
//     return (
//       <button 
//         onClick={onClick}
//         className={`${baseClasses} ${variants[variant]}`}
//       >
//         {Icon && <Icon className="w-5 h-5" />}
//         <span>{children}</span>
//       </button>
//     );
//   };

//   const FeatureCard = ({ title, description, icon: Icon, buttonText, onClick }) => (
//     <Card className="h-full">
//       <div className="flex flex-col h-full">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-12 h-12 bg-gradient-to-br from-[#585182] to-[#6b63a8] rounded-xl flex items-center justify-center">
//             <Icon className="w-6 h-6 text-white" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
//         </div>
//         <p className="text-gray-600 mb-6 flex-grow">{description}</p>
//         <Button onClick={onClick} icon={ChevronRight}>
//           {buttonText}
//         </Button>
//       </div>
//     </Card>
//   );

//   const QuickAccessCard = ({ title, description, icon: Icon }) => (
//     <Card 
//       className="cursor-pointer group"
//       onMouseEnter={() => setHoveredCard(title)}
//       onMouseLeave={() => setHoveredCard(null)}
//     >
//       <div className="flex items-start space-x-3">
//         <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
//           hoveredCard === title ? 'bg-[#585182]' : 'bg-purple-100'
//         }`}>
//           <Icon className={`w-5 h-5 transition-colors ${
//             hoveredCard === title ? 'text-white' : 'text-[#585182]'
//           }`} />
//         </div>
//         <div className="flex-1">
//           <h4 className="font-semibold text-gray-900 group-hover:text-[#585182] transition-colors">
//             {title}
//           </h4>
//           <p className="text-sm text-gray-600 mt-1">{description}</p>
//         </div>
//       </div>
//     </Card>
//   );

//   return (
//     <div className="min-h-screen bg-white relative">
//       <Navbar />
//       <FloatingElements />
      
//       <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="mb-6">
//             <h2 className="text-2xl font-medium text-gray-700 mb-2">
//               Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋
//             </h2>
//             <p className="text-lg text-gray-600">
//               We're here to support your mental wellness journey
//             </p>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Welcome to Your Mental Wellness Hub
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Your comprehensive support system for mental health, well-being, and academic success
//           </p>
//         </div>

//         {/* Main Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {/* Mindful Moments */}
//           <FeatureCard
//             title="Mindful Moments"
//             description="AR-guided yoga, meditation, and workshops for stress management and relaxation"
//             icon={Heart}
//             buttonText="Start Session"
//             onClick={() => navigate('/arpage')}
//           />

//           {/* AR Integration Hub */}
//           <FeatureCard
//             title="AR Wellness Hub"
//             description="Enhance mental wellness using Augmented Reality technology for immersive healing experiences"
//             icon={Eye}
//             buttonText="Explore AR"
//             onClick={() => navigate('/arpage')}
//           />

//           {/* Mental Health Videos */}
//           <FeatureCard
//             title="Wellness Videos"
//             description="Expert-curated mental health content, guided meditations, and therapeutic exercises"
//             icon={Eye}
//             buttonText="Watch Videos"
//             onClick={() => {}}
//           />

//           {/* Professional Support */}
//           <FeatureCard
//             title="Professional Consultants"
//             description="Personalized support from college-provided consultants with specialized mental health expertise"
//             icon={UserCheck}
//             buttonText="Book Consultation"
//             onClick={() => {}}
//           />

//           {/* Community Forum */}
//           <FeatureCard
//             title="Community Support"
//             description="Connect with peers and advisors for guidance, support, and shared experiences"
//             icon={Users}
//             buttonText="Join Community"
//             onClick={() => navigate('/community')}
//           />

//           {/* Therapy Sessions */}
//           <FeatureCard
//             title="Therapy Sessions"
//             description="Personalized therapy sessions for comprehensive mental health support and healing"
//             icon={Calendar}
//             buttonText="Schedule Session"
//             onClick={() => {}}
//           />
//         </div>

//         {/* Mental Health Videos Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//             Mental Health & Wellness Videos
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <Card className="cursor-pointer group overflow-hidden">
//               <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black opacity-20"></div>
//                 <div className="relative z-10 w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <div className="w-0 h-0 border-l-4 border-l-[#585182] border-y-2 border-y-transparent ml-1"></div>
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">5:30</div>
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Breathing Techniques for Anxiety</h4>
//               <p className="text-sm text-gray-600">Learn effective breathing exercises to manage anxiety and stress</p>
//             </Card>

//             <Card className="cursor-pointer group overflow-hidden">
//               <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black opacity-20"></div>
//                 <div className="relative z-10 w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <div className="w-0 h-0 border-l-4 border-l-[#585182] border-y-2 border-y-transparent ml-1"></div>
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">8:15</div>
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Mindful Meditation Guide</h4>
//               <p className="text-sm text-gray-600">A gentle introduction to mindfulness and meditation practices</p>
//             </Card>

//             <Card className="cursor-pointer group overflow-hidden">
//               <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black opacity-20"></div>
//                 <div className="relative z-10 w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <div className="w-0 h-0 border-l-4 border-l-[#585182] border-y-2 border-y-transparent ml-1"></div>
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">6:45</div>
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Managing Study Stress</h4>
//               <p className="text-sm text-gray-600">Practical strategies for handling academic pressure and deadlines</p>
//             </Card>

//             <Card className="cursor-pointer group overflow-hidden">
//               <div className="aspect-video bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-black opacity-20"></div>
//                 <div className="relative z-10 w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <div className="w-0 h-0 border-l-4 border-l-[#585182] border-y-2 border-y-transparent ml-1"></div>
//                 </div>
//                 <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">10:20</div>
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-2">Building Self-Confidence</h4>
//               <p className="text-sm text-gray-600">Techniques to boost self-esteem and develop a positive mindset</p>
//             </Card>
//           </div>
//         </div>
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//             Quick Access Features
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <QuickAccessCard
//               title="AR Breathing Orb"
//               description="A glowing orb that guides deep breathing exercises"
//               icon={Sparkles}
//             />
//             <QuickAccessCard
//               title="Mindfulness AR Spaces"
//               description="Transforming environments into calming visuals"
//               icon={Zap}
//             />
//             <QuickAccessCard
//               title="AR Positive Mirror"
//               description="Affirmations and calming effects in real-time"
//               icon={Disc}
//             />
//             <QuickAccessCard
//               title="Gamified Stress Relief"
//               description="Interactive games to promote relaxation and focus"
//               icon={Gamepad2}
//             />
//             <QuickAccessCard
//               title="Community Sharing"
//               description="Share AR experiences with peers"
//               icon={Share}
//             />
//             <QuickAccessCard
//               title="Direct Consultancy"
//               description="Access to college-provided consultants"
//               icon={Headphones}
//             />
//           </div>
//         </div>

//         {/* Privacy & Security Center */}
//         <Card className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                 <Shield className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900">Privacy & Security Center</h3>
//                 <p className="text-gray-600">Unique IDs and confidentiality measures to protect student privacy</p>
//               </div>
//             </div>
//             <Button icon={Lock}>
//               Security Settings
//             </Button>
//           </div>
//         </Card>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="text-center">
//             <div className="w-16 h-16 bg-[#585182] rounded-full flex items-center justify-center mx-auto mb-4">
//               <Clock className="w-8 h-8 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
//             <p className="text-gray-600">Support Available</p>
//           </Card>
//           <Card className="text-center">
//             <div className="w-16 h-16 bg-[#585182] rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-8 h-8 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
//             <p className="text-gray-600">Students Helped</p>
//           </Card>
//           <Card className="text-center">
//             <div className="w-16 h-16 bg-[#585182] rounded-full flex items-center justify-center mx-auto mb-4">
//               <Smile className="w-8 h-8 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
//             <p className="text-gray-600">Satisfaction Rate</p>
//           </Card>
//         </div>
//       </div>

//       <ChatbotModal />

//       {/* Floating AI Chatbot Button */}
//       <div className="fixed bottom-6 right-6 z-40">
//         <button
//           onClick={() => setChatbotOpen(true)}
//           className="w-16 h-16 bg-[#585182] hover:bg-[#4a456e] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group animate-bounce"
//           style={{ animationDuration: '2s' }}
//         >
//           <Bot className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
//           <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
//         </button>
//         <div className="absolute -top-12 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//           Chat with AI Assistant
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;