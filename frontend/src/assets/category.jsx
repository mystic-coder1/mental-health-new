import React, { useState, useEffect } from 'react';
import { Brain, Users, Moon, Flame, Heart, BookOpen, ChevronRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const MentalHealthApp = () => {
  const [currentStep, setCurrentStep] = useState('categories');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [userName, setUserName] = useState('');

  const categories = [
    {
      id: 'anxiety',
      name: 'Anxiety',
      icon: Brain,
      description: 'Excessive worry and fear',
      color: 'bg-purple-100 border-purple-300'
    },
    {
      id: 'depression',
      name: 'Depression',
      icon: Heart,
      description: 'Persistent sadness and hopelessness',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: 'burnout',
      name: 'Burnout',
      icon: Flame,
      description: 'Emotional and physical exhaustion',
      color: 'bg-red-100 border-red-300'
    },
    {
      id: 'insomnia',
      name: 'Insomnia',
      icon: Moon,
      description: 'Sleep difficulties and disturbances',
      color: 'bg-indigo-100 border-indigo-300'
    },
    {
      id: 'academic_stress',
      name: 'Academic Stress',
      icon: BookOpen,
      description: 'Study and performance pressure',
      color: 'bg-green-100 border-green-300'
    },
    {
      id: 'social_isolation',
      name: 'Social Isolation',
      icon: Users,
      description: 'Loneliness and disconnection',
      color: 'bg-yellow-100 border-yellow-300'
    }
  ];

  const questions = {
    anxiety: [
      {
        question: "How often do you worry excessively about everyday situations?",
        options: [
          { text: "Rarely or never", points: 0 },
          { text: "Sometimes, but manageable", points: 1 },
          { text: "Often, hard to control", points: 2 },
          { text: "Constantly, can't stop", points: 3 }
        ]
      },
      {
        question: "Do you experience physical symptoms (racing heart, sweating, trembling) when stressed?",
        options: [
          { text: "No physical symptoms", points: 0 },
          { text: "Mild symptoms occasionally", points: 1 },
          { text: "Noticeable symptoms regularly", points: 2 },
          { text: "Intense symptoms frequently", points: 3 }
        ]
      },
      {
        question: "How often do you avoid situations because they make you anxious?",
        options: [
          { text: "Never avoid situations", points: 0 },
          { text: "Rarely avoid, push through", points: 1 },
          { text: "Sometimes avoid activities", points: 2 },
          { text: "Frequently avoid many things", points: 3 }
        ]
      },
      {
        question: "How much does anxiety interfere with your daily life?",
        options: [
          { text: "No interference", points: 0 },
          { text: "Minimal interference", points: 1 },
          { text: "Moderate interference", points: 2 },
          { text: "Severe interference", points: 3 }
        ]
      }
    ],
    depression: [
      {
        question: "How has your mood been over the past 2 weeks?",
        options: [
          { text: "Generally positive and stable", points: 0 },
          { text: "Some ups and downs", points: 1 },
          { text: "Frequently sad or empty", points: 2 },
          { text: "Persistently hopeless/numb", points: 3 }
        ]
      },
      {
        question: "How is your interest in activities you usually enjoy?",
        options: [
          { text: "Same level of interest", points: 0 },
          { text: "Slightly less interested", points: 1 },
          { text: "Much less interested", points: 2 },
          { text: "Lost all interest", points: 3 }
        ]
      },
      {
        question: "How are your energy levels and motivation?",
        options: [
          { text: "Good energy and motivation", points: 0 },
          { text: "Occasionally low energy", points: 1 },
          { text: "Frequently tired/unmotivated", points: 2 },
          { text: "Exhausted, can't do basic tasks", points: 3 }
        ]
      },
      {
        question: "How do you view yourself and your future?",
        options: [
          { text: "Positive self-image, hopeful", points: 0 },
          { text: "Generally positive outlook", points: 1 },
          { text: "Often feel inadequate/worried", points: 2 },
          { text: "Feel worthless, no hope", points: 3 }
        ]
      }
    ],
    burnout: [
      {
        question: "How emotionally drained do you feel from your studies/work?",
        options: [
          { text: "Energized and engaged", points: 0 },
          { text: "Occasionally tired", points: 1 },
          { text: "Regularly drained", points: 2 },
          { text: "Completely exhausted", points: 3 }
        ]
      },
      {
        question: "How has your attitude toward your studies changed?",
        options: [
          { text: "Positive and engaged", points: 0 },
          { text: "Sometimes frustrated", points: 1 },
          { text: "More cynical/detached", points: 2 },
          { text: "Completely disconnected", points: 3 }
        ]
      },
      {
        question: "How do you feel about your achievements and progress?",
        options: [
          { text: "Proud and confident", points: 0 },
          { text: "Generally satisfied", points: 1 },
          { text: "Often doubt competence", points: 2 },
          { text: "Feel like a failure", points: 3 }
        ]
      },
      {
        question: "Do you experience physical symptoms from academic stress?",
        options: [
          { text: "No significant symptoms", points: 0 },
          { text: "Occasional minor symptoms", points: 1 },
          { text: "Regular headaches/sleep issues", points: 2 },
          { text: "Multiple severe symptoms", points: 3 }
        ]
      }
    ],
    insomnia: [
      {
        question: "How long does it take you to fall asleep?",
        options: [
          { text: "Less than 15 minutes", points: 0 },
          { text: "15-30 minutes", points: 1 },
          { text: "30-60 minutes", points: 2 },
          { text: "Over 1 hour frequently", points: 3 }
        ]
      },
      {
        question: "How well do you stay asleep through the night?",
        options: [
          { text: "Sleep soundly, wake refreshed", points: 0 },
          { text: "Occasionally wake up", points: 1 },
          { text: "Wake multiple times", points: 2 },
          { text: "Wake frequently, can't return to sleep", points: 3 }
        ]
      },
      {
        question: "How does poor sleep affect your daytime functioning?",
        options: [
          { text: "No daytime impact", points: 0 },
          { text: "Occasionally tired", points: 1 },
          { text: "Regularly drowsy/unfocused", points: 2 },
          { text: "Constantly exhausted", points: 3 }
        ]
      },
      {
        question: "How much do you worry about your sleep?",
        options: [
          { text: "Rarely think about sleep", points: 0 },
          { text: "Occasionally worry", points: 1 },
          { text: "Frequently worry about sleep", points: 2 },
          { text: "Constantly preoccupied with sleep", points: 3 }
        ]
      }
    ],
    academic_stress: [
      {
        question: "How do you handle academic pressure and expectations?",
        options: [
          { text: "Feel appropriately challenged", points: 0 },
          { text: "Sometimes pressured but cope", points: 1 },
          { text: "Frequently overwhelmed", points: 2 },
          { text: "Constantly crushed by pressure", points: 3 }
        ]
      },
      {
        question: "How well do you manage your academic workload?",
        options: [
          { text: "Effectively manage time", points: 0 },
          { text: "Generally manage well", points: 1 },
          { text: "Regularly struggle to keep up", points: 2 },
          { text: "Constantly behind, can't manage", points: 3 }
        ]
      },
      {
        question: "How much do you worry about academic failure?",
        options: [
          { text: "Confident in abilities", points: 0 },
          { text: "Occasionally worry", points: 1 },
          { text: "Frequently worry about failing", points: 2 },
          { text: "Consumed by fear of failure", points: 3 }
        ]
      },
      {
        question: "What stress symptoms do you experience from academics?",
        options: [
          { text: "Minimal symptoms", points: 0 },
          { text: "Brief tension before exams", points: 1 },
          { text: "Regular headaches/sleep issues", points: 2 },
          { text: "Severe symptoms/panic attacks", points: 3 }
        ]
      }
    ],
    social_isolation: [
      {
        question: "How often do you interact with friends or family?",
        options: [
          { text: "Regularly throughout the week", points: 0 },
          { text: "Several times per week", points: 1 },
          { text: "Few times per month", points: 2 },
          { text: "Rarely or never", points: 3 }
        ]
      },
      {
        question: "How satisfied are you with your relationships?",
        options: [
          { text: "Deep, meaningful connections", points: 0 },
          { text: "Generally feel supported", points: 1 },
          { text: "Feel misunderstood/unsupported", points: 2 },
          { text: "Feel completely disconnected", points: 3 }
        ]
      },
      {
        question: "How often do you avoid social situations?",
        options: [
          { text: "Actively seek social opportunities", points: 0 },
          { text: "Generally participate", points: 1 },
          { text: "Regularly avoid social events", points: 2 },
          { text: "Avoid almost all social situations", points: 3 }
        ]
      },
      {
        question: "How does your social life affect your well-being?",
        options: [
          { text: "Enhances my well-being", points: 0 },
          { text: "Generally positive impact", points: 1 },
          { text: "Sometimes feel lonely", points: 2 },
          { text: "Severely impacts mental health", points: 3 }
        ]
      }
    ]
  };

  const getAllQuestions = () => {
    let allQuestions = [];
    selectedCategories.forEach(category => {
      questions[category].forEach((question, index) => {
        allQuestions.push({
          ...question,
          category,
          categoryIndex: index
        });
      });
    });
    return allQuestions;
  };

  const calculateResults = () => {
    const categoryScores = {};
    let totalScore = 0;

    selectedCategories.forEach(category => {
      let categoryScore = 0;
      questions[category].forEach((_, index) => {
        const answerKey = `${category}_${index}`;
        categoryScore += answers[answerKey] || 0;
      });
      categoryScores[category] = categoryScore;
      totalScore += categoryScore;
    });

    const getCategoryLevel = (score) => {
      if (score <= 3) return { level: 'Minimal', color: 'text-green-600', bgColor: 'bg-green-50' };
      if (score <= 6) return { level: 'Mild', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      if (score <= 9) return { level: 'Moderate', color: 'text-orange-600', bgColor: 'bg-orange-50' };
      return { level: 'Severe', color: 'text-red-600', bgColor: 'bg-red-50' };
    };

    const getOverallRisk = (total, maxPossible) => {
      const percentage = (total / maxPossible) * 100;
      if (percentage <= 25) return { level: 'Low Risk', color: 'text-green-600', message: 'Good mental health, continue healthy habits' };
      if (percentage <= 50) return { level: 'Moderate Risk', color: 'text-yellow-600', message: 'Some concerns, try self-help resources' };
      if (percentage <= 75) return { level: 'High Risk', color: 'text-orange-600', message: 'Multiple issues, seek counseling' };
      return { level: 'Critical Risk', color: 'text-red-600', message: 'Immediate professional help needed' };
    };

    const maxPossibleScore = selectedCategories.length * 12;
    const overallRisk = getOverallRisk(totalScore, maxPossibleScore);

    return {
      categoryScores,
      totalScore,
      maxPossibleScore,
      overallRisk,
      getCategoryLevel
    };
  };

  // Helper functions for results
  const downloadResultsAsPDF = () => {
    const resultText = `
Mental Health Assessment Results
==============================
Name: ${userName || 'Anonymous User'}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Overall Risk Level: ${results.overallRisk.level}
Total Score: ${results.totalScore}/${results.maxPossibleScore}
Recommendation: ${results.overallRisk.message}

Category Breakdown:
${selectedCategories.map(categoryId => {
  const category = categories.find(cat => cat.id === categoryId);
  const score = results.categoryScores[categoryId];
  const levelInfo = results.getCategoryLevel(score);
  return `- ${category.name}: ${levelInfo.level} (${score}/12)`;
}).join('\n')}

Assessment Details:
${selectedCategories.map(categoryId => {
  const category = categories.find(cat => cat.id === categoryId);
  return `\n${category.name} Questions:\n${questions[categoryId].map((q, index) => {
    const answerKey = `${categoryId}_${index}`;
    const selectedPoints = answers[answerKey];
    const selectedOption = q.options.find(opt => opt.points === selectedPoints);
    return `Q: ${q.question}\nA: ${selectedOption?.text || 'Not answered'}`;
  }).join('\n\n')}`;
}).join('\n')}

Remember: This assessment is for informational purposes only and should not replace professional medical advice.
    `.trim();

    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mental-health-assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    const shareData = {
      title: 'Mental Health Assessment Results',
      text: `I completed a mental health assessment. Overall risk level: ${results.overallRisk.level}. Taking care of mental wellness is important!`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`Mental Health Assessment Results - ${results.overallRisk.level}\n\nTaking care of mental wellness is important! Visit ${window.location.href}`);
        alert('Results copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(`Mental Health Assessment Results - ${results.overallRisk.level}`);
        alert('Results copied to clipboard!');
      } catch (clipboardError) {
        alert('Unable to share results. Please try again.');
      }
    }
  };

  const getRecommendations = (categoryId, score) => {
    const recommendations = {
      anxiety: {
        minimal: ['Practice deep breathing exercises', 'Maintain regular sleep schedule', 'Continue healthy stress management'],
        mild: ['Try mindfulness meditation', 'Regular exercise routine', 'Limit caffeine intake'],
        moderate: ['Consider talking to a counselor', 'Practice progressive muscle relaxation', 'Join a support group'],
        severe: ['Seek professional help immediately', 'Contact a mental health crisis line', 'Avoid isolation - reach out to trusted friends/family']
      },
      depression: {
        minimal: ['Maintain social connections', 'Regular physical activity', 'Practice gratitude'],
        mild: ['Establish daily routines', 'Engage in enjoyable activities', 'Consider therapy'],
        moderate: ['Seek professional counseling', 'Consider medication evaluation', 'Build strong support network'],
        severe: ['Immediate professional intervention needed', 'Contact crisis hotline', 'Consider inpatient treatment options']
      },
      burnout: {
        minimal: ['Set healthy boundaries', 'Take regular breaks', 'Practice work-life balance'],
        mild: ['Reassess priorities and workload', 'Increase self-care activities', 'Delegate when possible'],
        moderate: ['Consider reducing commitments', 'Seek supervisor support', 'Professional stress management'],
        severe: ['Take immediate time off', 'Professional intervention required', 'Consider career counseling']
      },
      insomnia: {
        minimal: ['Maintain consistent sleep schedule', 'Create relaxing bedtime routine', 'Limit screen time before bed'],
        mild: ['Practice sleep hygiene', 'Try relaxation techniques', 'Avoid caffeine late in day'],
        moderate: ['Consult healthcare provider', 'Consider cognitive behavioral therapy for insomnia', 'Sleep study evaluation'],
        severe: ['Immediate medical evaluation', 'Sleep specialist consultation', 'Address underlying conditions']
      },
      academic_stress: {
        minimal: ['Maintain organized study schedule', 'Use effective study techniques', 'Take regular breaks'],
        mild: ['Break large tasks into smaller steps', 'Seek academic support when needed', 'Practice stress-reduction techniques'],
        moderate: ['Consider academic counseling', 'Explore tutoring options', 'Reassess academic load'],
        severe: ['Immediate academic intervention', 'Mental health counseling', 'Consider temporary reduction in course load']
      },
      social_isolation: {
        minimal: ['Continue nurturing relationships', 'Engage in group activities', 'Practice social skills'],
        mild: ['Join clubs or organizations', 'Volunteer in community', 'Reach out to old friends'],
        moderate: ['Consider group therapy', 'Practice social anxiety management', 'Seek counseling support'],
        severe: ['Immediate professional help', 'Crisis intervention if needed', 'Intensive social skills therapy']
      }
    };

    const level = score <= 3 ? 'minimal' : score <= 6 ? 'mild' : score <= 9 ? 'moderate' : 'severe';
    return recommendations[categoryId]?.[level] || ['Consult with a mental health professional'];
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleStartAssessment = () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category to continue.');
      return;
    }
    setCurrentStep('questions');
  };

  const handleAnswerSelect = (points) => {
    const allQuestions = getAllQuestions();
    const currentQuestion = allQuestions[currentQuestionIndex];
    const answerKey = `${currentQuestion.category}_${currentQuestion.categoryIndex}`;
    
    setAnswers(prev => ({
      ...prev,
      [answerKey]: points
    }));

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const results = calculateResults();
      setResults(results);
      setCurrentStep('results');
      
      const assessmentData = {
        userName: userName || 'Anonymous User',
        timestamp: new Date().toISOString(),
        selectedCategories,
        answers,
        results
      };
      console.log('Storing assessment data:', assessmentData);
    }
  };

  const resetAssessment = () => {
    setCurrentStep('categories');
    setSelectedCategories([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
    setUserName('');
  };

  // Category Selection Screen
  if (currentStep === 'categories') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 md:w-10 md:h-10" style={{ color: '#585182' }} />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Mental Health Assessment</h1>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Select the areas you'd like to assess. We'll provide personalized insights to help you understand your mental wellness.
              </p>
            </div>

            <div className="mb-6 md:mb-8">
              <input
                type="text"
                placeholder="Enter your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base md:text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`
                      relative p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg
                      ${isSelected 
                        ? `${category.color} border-opacity-100 shadow-md` 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {isSelected && (
                      <CheckCircle className="absolute top-2 right-2 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className={`
                        w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4
                        ${isSelected ? 'bg-white bg-opacity-80' : 'bg-gray-100'}
                      `}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#585182' }} />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm md:text-base text-gray-600">{category.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedCategories.length > 0 && (
              <div className="mb-6 md:mb-8 p-4 md:p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Selected Categories ({selectedCategories.length})</h3>
                <p className="text-sm md:text-base text-gray-600 mb-2">
                  You'll answer {selectedCategories.length * 4} questions total ({selectedCategories.length} categories × 4 questions each)
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map(categoryId => {
                    const category = categories.find(cat => cat.id === categoryId);
                    return (
                      <span key={categoryId} className="px-3 py-1 bg-white rounded-full text-sm font-medium" style={{ color: '#585182' }}>
                        {category.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleStartAssessment}
                disabled={selectedCategories.length === 0}
                className={`
                  px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto
                  ${selectedCategories.length > 0
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                Start Assessment
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions Screen
  if (currentStep === 'questions') {
    const allQuestions = getAllQuestions();
    const currentQuestion = allQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <button
                onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(prev => prev - 1) : setCurrentStep('categories')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Back</span>
              </button>
              <div className="text-center">
                <span className="text-sm md:text-base text-gray-600">
                  Question {currentQuestionIndex + 1} of {allQuestions.length}
                </span>
              </div>
              <div className="w-12 md:w-16"></div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, backgroundColor: '#585182' }}
                ></div>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-purple-100 rounded-full text-sm md:text-base font-medium" style={{ color: '#585182' }}>
                {categories.find(cat => cat.id === currentQuestion.category)?.name}
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 md:mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option.points)}
                    className="w-full p-4 md:p-5 text-left border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-gray-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-gray-900">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Results Screen
  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">Assessment Complete!</h1>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                {userName && `Thank you ${userName}! `}Here are your personalized results and recommendations.
              </p>
              <div className="text-sm text-gray-500">
                Assessment completed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Overall Risk Assessment */}
            <div className={`p-6 md:p-8 rounded-xl shadow-lg mb-6 md:mb-8 ${
              results.overallRisk.level === 'Low Risk' ? 'bg-green-50 border border-green-200' : 
              results.overallRisk.level === 'Moderate Risk' ? 'bg-yellow-50 border border-yellow-200' : 
              results.overallRisk.level === 'High Risk' ? 'bg-orange-50 border border-orange-200' : 
              'bg-red-50 border border-red-200'
            }`}>
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Overall Assessment</h2>
                <div className={`text-2xl md:text-3xl font-bold mb-2 ${results.overallRisk.color}`}>
                  {results.overallRisk.level}
                </div>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Total Score: {results.totalScore} / {results.maxPossibleScore} 
                  ({Math.round((results.totalScore / results.maxPossibleScore) * 100)}%)
                </p>
                <p className="text-base md:text-lg font-medium text-gray-800">
                  {results.overallRisk.message}
                </p>
                {results.overallRisk.level === 'Critical Risk' && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-red-800">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold">Immediate Action Needed</span>
                    </div>
                    <p className="text-sm mt-2 text-red-700">
                      Please contact a mental health professional, crisis hotline, or emergency services immediately.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Category Results with Recommendations */}
            <div className="space-y-6 mb-8 md:mb-12">
              {selectedCategories.map(categoryId => {
                const category = categories.find(cat => cat.id === categoryId);
                const score = results.categoryScores[categoryId];
                const levelInfo = results.getCategoryLevel(score);
                const Icon = category.icon;
                const recommendations = getRecommendations(categoryId, score);

                return (
                  <div key={categoryId} className={`rounded-xl shadow-lg border-l-4 overflow-hidden ${levelInfo.bgColor}`} style={{ borderLeftColor: '#585182' }}>
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#585182' }} />
                          </div>
                          <div>
                            <h3 className="text-base md:text-lg font-semibold text-gray-900">{category.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm md:text-base font-medium ${levelInfo.color}`}>
                                {levelInfo.level}
                              </span>
                              <span className="text-sm text-gray-600">({score}/12)</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 md:ml-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${(score / 12) * 100}%`, 
                                backgroundColor: score <= 3 ? '#10b981' : score <= 6 ? '#f59e0b' : score <= 9 ? '#f97316' : '#ef4444'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Recommendations */}
                      <div className="bg-white bg-opacity-70 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-purple-600 mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Crisis Resources */}
            {(results.overallRisk.level === 'Critical Risk' || results.overallRisk.level === 'High Risk') && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Crisis Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-red-800">National Suicide Prevention Lifeline:</p>
                    <p className="text-red-700">988 (USA)</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Crisis Text Line:</p>
                    <p className="text-red-700">Text HOME to 741741</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Emergency Services:</p>
                    <p className="text-red-700">911 (USA) / 999 (UK) / 112 (EU)</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Campus Counseling:</p>
                    <p className="text-red-700">Contact your student health center</p>
                  </div>
                </div>
              </div>
            )}

            {/* Positive Message */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 md:p-8 rounded-xl shadow-lg mb-6 md:mb-8 border border-purple-200">
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Remember</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Taking this assessment shows your commitment to mental wellness. Every step toward understanding yourself better is a step toward growth and healing. You have the strength to overcome challenges, and seeking help when needed is a sign of courage, not weakness.
                </p>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <button
                onClick={resetAssessment}
                className="px-4 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retake Assessment
              </button>
              <button
                onClick={downloadResultsAsPDF}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Download Results
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>🖨️</span>
                Print Results
              </button>
              <button
                onClick={shareResults}
                className="px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>📤</span>
                Share Results
              </button>
            </div>

            {/* Additional Actions */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const mailtoLink = `mailto:?subject=Mental Health Assessment Results&body=I completed a mental health assessment today. Overall risk level: ${results.overallRisk.level}. It's important to prioritize mental wellness.`;
                    window.location.href = mailtoLink;
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
                >
                  Email Results to Counselor
                </button>
                <button
                  onClick={() => {
                    const calendar = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Follow-up on Mental Health Assessment
DESCRIPTION:Review mental health assessment results and consider next steps
DTSTART:${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VEVENT
END:VCALENDAR`;
                    const link = document.createElement('a');
                    link.href = calendar;
                    link.download = 'mental-health-followup.ics';
                    link.click();
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300"
                >
                  Schedule Follow-up
                </button>
              </div>
              
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                This assessment is for informational purposes only and does not constitute medical advice. 
                Please consult with a qualified mental health professional for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MentalHealthApp;
