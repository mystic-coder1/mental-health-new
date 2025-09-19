import React, { useState, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  Clock, 
  User, 
  Settings, 
  Camera, 
  Share, 
  Users,
  Send,
  Maximize,
  Minimize,
  Volume2,
  VolumeX
} from 'lucide-react';

const TherapySessionPage = () => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [sessionNotes, setSessionNotes] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volumeEnabled, setVolumeEnabled] = useState(true);

  // Sample student data
  const studentInfo = {
    name: "Sarah Johnson",
    age: 20,
    studentId: "STU123456",
    condition: "Severe Depression with Suicidal Ideation",
    riskLevel: "Critical",
    sessionType: "Individual Therapy",
    scheduledTime: "2:00 PM - 3:00 PM",
    previousSessions: 3,
    lastSession: "2024-01-10"
  };

  // Sample chat messages
  const initialMessages = [
    {
      id: 1,
      sender: 'system',
      message: 'Session room is ready. Waiting for student to join...',
      timestamp: '2:00 PM'
    }
  ];

  useEffect(() => {
    setChatMessages(initialMessages);
  }, []);

  // Timer for session duration
  useEffect(() => {
    let interval;
    if (sessionStarted) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'system',
      message: 'Session started. Student has joined the room.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleEndSession = () => {
    setSessionStarted(false);
    setSessionTime(0);
    setChatMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'system',
      message: 'Session ended. Thank you for the session.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'doctor',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatMessage('');
    }
  };

  const handleSaveNotes = () => {
    console.log('Session notes saved:', sessionNotes);
    alert('Session notes saved successfully!');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-t-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Therapy Session</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {studentInfo.sessionType} • {studentInfo.scheduledTime}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {sessionStarted && (
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">
                    {formatTime(sessionTime)}
                  </span>
                </div>
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
                <p className="text-xs text-gray-500">Clinical Psychologist</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white border-x border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[600px]">
            {/* Video Section */}
            <div className="lg:col-span-8 p-4 sm:p-6">
              <div className="space-y-4">
                {/* Student Info Card */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="font-semibold text-gray-900">{studentInfo.name}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                        <span>Age: {studentInfo.age}</span>
                        <span>•</span>
                        <span>ID: {studentInfo.studentId}</span>
                        <span>•</span>
                        <span className="text-red-600 font-medium">Risk: {studentInfo.riskLevel}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-500">Previous Sessions: {studentInfo.previousSessions}</p>
                      <p className="text-sm text-gray-500">Last: {studentInfo.lastSession}</p>
                    </div>
                  </div>
                </div>

                {/* Video Interface */}
                <div className="relative">
                  <div className={`bg-gray-100 rounded-lg overflow-hidden transition-all ${
                    isFullscreen ? 'fixed inset-4 z-50' : 'aspect-video'
                  }`}>
                    {/* Main Video Area */}
                    <div className="relative h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      {!sessionStarted ? (
                        <div className="text-center">
                          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 text-lg">Waiting for session to start</p>
                          <p className="text-gray-400 text-sm">Student will appear here once connected</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="h-16 w-16 text-white" />
                          </div>
                          <p className="text-gray-700 text-lg font-medium">{studentInfo.name}</p>
                          <p className="text-gray-500">Student Video Active</p>
                        </div>
                      )}
                      
                      {/* Doctor Video (Picture-in-Picture) */}
                      <div className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                        {videoEnabled ? (
                          <div className="text-center">
                            <User className="h-8 w-8 sm:h-12 sm:w-12 text-white mx-auto" />
                            <p className="text-white text-xs mt-1">You</p>
                          </div>
                        ) : (
                          <VideoOff className="h-8 w-8 text-white" />
                        )}
                      </div>

                      {/* Fullscreen Toggle */}
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-md hover:bg-opacity-70 transition-opacity"
                      >
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </button>

                      {/* Recording Indicator */}
                      {isRecording && (
                        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-sm">Recording</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="mt-4 flex justify-center space-x-4">
                    {!sessionStarted ? (
                      <button
                        onClick={handleStartSession}
                        style={{ backgroundColor: '#585182' }}
                        className="flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                      >
                        <Video className="h-5 w-5 mr-2" />
                        Start Session
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setVideoEnabled(!videoEnabled)}
                          className={`p-3 rounded-full transition-all ${
                            videoEnabled 
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                        </button>
                        
                        <button
                          onClick={() => setAudioEnabled(!audioEnabled)}
                          className={`p-3 rounded-full transition-all ${
                            audioEnabled 
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                              : 'bg-red-500 text-white hover:bg-red-600'
                          }`}
                        >
                          {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                        </button>

                        <button
                          onClick={() => setVolumeEnabled(!volumeEnabled)}
                          className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all"
                        >
                          {volumeEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                        </button>

                        <button
                          onClick={() => setIsRecording(!isRecording)}
                          className={`p-3 rounded-full transition-all ${
                            isRecording 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          <Camera className="h-5 w-5" />
                        </button>

                        <button
                          style={{ backgroundColor: '#585182' }}
                          className="p-3 text-white rounded-full hover:opacity-90 transition-all"
                        >
                          <Share className="h-5 w-5" />
                        </button>

                        <button
                          onClick={handleEndSession}
                          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                        >
                          <PhoneOff className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 bg-gray-50 border-l border-gray-200">
              {/* Sidebar Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    activeTab === 'chat'
                      ? 'text-purple-600 bg-white border-b-2 border-purple-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 px-4 py-3 text-sm font-medium ${
                    activeTab === 'notes'
                      ? 'text-purple-600 bg-white border-b-2 border-purple-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  Notes
                </button>
              </div>

              {/* Chat Tab */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-96">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`${
                        msg.sender === 'doctor' 
                          ? 'ml-4' 
                          : msg.sender === 'system' 
                          ? 'text-center' 
                          : 'mr-4'
                      }`}>
                        <div className={`p-3 rounded-lg text-sm ${
                          msg.sender === 'doctor' 
                            ? 'bg-purple-100 text-purple-800 ml-auto max-w-xs' 
                            : msg.sender === 'system'
                            ? 'bg-gray-100 text-gray-600 text-xs'
                            : 'bg-white text-gray-800 max-w-xs'
                        }`}>
                          <p>{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        style={{ backgroundColor: '#585182' }}
                        className="p-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="p-4 h-96 flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-3">Session Notes</h3>
                  <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Record your observations, key discussion points, treatment progress, and next steps..."
                    className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                  />
                  <button
                    onClick={handleSaveNotes}
                    style={{ backgroundColor: '#585182' }}
                    className="mt-3 px-4 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    Save Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border border-t-0 border-gray-200 rounded-b-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Session Duration: {formatTime(sessionTime)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Participants: 2</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                style={{ backgroundColor: '#585182' }}
                className="px-4 py-2 text-white text-sm rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Schedule Follow-up
              </button>
              <button
                style={{ backgroundColor: '#585182' }}
                className="px-4 py-2 text-white text-sm rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Alert */}
        {studentInfo.riskLevel === 'Critical' && sessionStarted && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-800 font-medium text-sm">
                  High-risk patient - Emergency protocols active
                </span>
              </div>
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700">
                Crisis Resources
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapySessionPage;