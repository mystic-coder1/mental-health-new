import React, { useState } from 'react';
import { Bell, Calendar, Users, FileText, MessageSquare, Check, X, Eye, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

const DoctorDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('critical');
  const [activeSection, setActiveSection] = useState('patients');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [notes, setNotes] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionType, setSessionType] = useState('individual');
  const [sessionDuration, setSessionDuration] = useState('60');
  const [reportType, setReportType] = useState('progress');
  const [reportNotes, setReportNotes] = useState('');

  // Sample consultant requests data
  const consultantRequests = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      requestedBy: "Dr. Williams",
      specialty: "Psychiatry",
      reason: "Medication evaluation for severe depression with suicidal ideation",
      urgency: "Critical",
      submittedDate: "2024-01-15",
      status: "pending"
    },
    {
      id: 2,
      studentName: "Michael Chen",
      requestedBy: "Dr. Davis",
      specialty: "Behavioral Therapy",
      reason: "Specialized anxiety treatment and panic disorder management",
      urgency: "High",
      submittedDate: "2024-01-14",
      status: "pending"
    },
    {
      id: 3,
      studentName: "Emily Rodriguez",
      requestedBy: "Dr. Thompson",
      specialty: "Cognitive Therapy",
      reason: "CBT consultation for treatment-resistant depression",
      urgency: "Moderate",
      submittedDate: "2024-01-13",
      status: "pending"
    }
  ];

  // Sample student data categorized by severity
  const students = {
    critical: [
      {
        id: 1,
        name: "Sarah Johnson",
        age: 20,
        condition: "Severe Depression with Suicidal Ideation",
        riskLevel: "Critical",
        symptoms: ["Suicidal thoughts", "Severe mood swings", "Social isolation", "Sleep disturbances"],
        lastAssessment: "2024-01-15",
        urgency: "Immediate attention required",
        background: "Recent family loss, academic stress, previous suicide attempt"
      },
      {
        id: 2,
        name: "Michael Chen",
        age: 19,
        condition: "Severe Anxiety with Panic Attacks",
        riskLevel: "Critical",
        symptoms: ["Frequent panic attacks", "Agoraphobia", "Severe social anxiety", "Academic decline"],
        lastAssessment: "2024-01-14",
        urgency: "Immediate attention required",
        background: "Performance anxiety, fear of failure, family pressure"
      }
    ],
    high: [
      {
        id: 3,
        name: "Emily Rodriguez",
        age: 21,
        condition: "Moderate to Severe Depression",
        riskLevel: "High",
        symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Concentration issues"],
        lastAssessment: "2024-01-13",
        urgency: "Schedule within 48 hours",
        background: "Relationship issues, academic pressure, financial stress"
      },
      {
        id: 4,
        name: "David Thompson",
        age: 22,
        condition: "Severe Sleep Disorder with Depression",
        riskLevel: "High",
        symptoms: ["Chronic insomnia", "Depressive episodes", "Irritability", "Memory problems"],
        lastAssessment: "2024-01-12",
        urgency: "Schedule within 48 hours",
        background: "Work-study balance, caffeine dependency, irregular schedule"
      }
    ],
    moderate: [
      {
        id: 5,
        name: "Jessica Lee",
        age: 20,
        condition: "Moderate Anxiety",
        riskLevel: "Moderate",
        symptoms: ["General anxiety", "Stress management issues", "Mild social anxiety"],
        lastAssessment: "2024-01-11",
        urgency: "Schedule within 1 week",
        background: "Transitioning to college, homesickness, social adjustment"
      },
      {
        id: 6,
        name: "Alex Williams",
        age: 19,
        condition: "Mild Depression",
        riskLevel: "Moderate",
        symptoms: ["Occasional sadness", "Motivation issues", "Sleep irregularity"],
        lastAssessment: "2024-01-10",
        urgency: "Schedule within 1 week",
        background: "Academic transition, seasonal affective symptoms"
      }
    ]
  };

  const recommendedTreatments = {
    critical: [
      "Immediate psychiatric evaluation",
      "Crisis intervention therapy",
      "Safety planning and monitoring",
      "Consider inpatient treatment if necessary",
      "Family/support system involvement",
      "Medication evaluation with psychiatrist",
      "Daily check-ins for first week"
    ],
    high: [
      "Weekly individual therapy sessions",
      "Cognitive Behavioral Therapy (CBT)",
      "Group therapy participation",
      "Medication consultation",
      "Stress management techniques",
      "Academic accommodation planning",
      "Regular progress monitoring"
    ],
    moderate: [
      "Bi-weekly counseling sessions",
      "Mindfulness and relaxation techniques",
      "Support group participation",
      "Self-care planning",
      "Coping strategies development",
      "Lifestyle modifications",
      "Follow-up in 2-3 weeks"
    ]
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setTreatmentPlan('');
    setNotes('');
  };

  const handleSaveTreatment = () => {
    console.log('Saving treatment plan for:', selectedStudent.name);
    console.log('Treatment Plan:', treatmentPlan);
    console.log('Notes:', notes);
    alert('Treatment plan saved successfully!');
  };

  const handleAcceptRequest = (requestId) => {
    console.log('Accepting consultant request:', requestId);
    alert('Consultant request accepted successfully!');
  };

  const handleRejectRequest = (requestId) => {
    console.log('Rejecting consultant request:', requestId);
    alert('Consultant request rejected.');
  };

  const handleScheduleSession = () => {
    setShowScheduleModal(true);
  };

  const handleConfirmSchedule = () => {
    console.log('Scheduling session for:', selectedStudent.name);
    console.log('Date:', sessionDate);
    console.log('Time:', sessionTime);
    console.log('Type:', sessionType);
    console.log('Duration:', sessionDuration, 'minutes');
    alert(`Session scheduled successfully for ${selectedStudent.name} on ${sessionDate} at ${sessionTime}`);
    setShowScheduleModal(false);
    setSessionDate('');
    setSessionTime('');
    setSessionType('individual');
    setSessionDuration('60');
  };

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const handleConfirmReport = () => {
    console.log('Generating report for:', selectedStudent.name);
    console.log('Report Type:', reportType);
    console.log('Additional Notes:', reportNotes);
    
    // Simulate report generation
    const reportData = {
      studentName: selectedStudent.name,
      reportType: reportType,
      generatedDate: new Date().toLocaleDateString(),
      condition: selectedStudent.condition,
      symptoms: selectedStudent.symptoms,
      riskLevel: selectedStudent.riskLevel,
      background: selectedStudent.background,
      additionalNotes: reportNotes
    };
    
    // In a real application, this would generate and download a PDF
    alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully for ${selectedStudent.name}`);
    console.log('Report Data:', reportData);
    
    setShowReportModal(false);
    setReportType('progress');
    setReportNotes('');
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Moderate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { name: 'Total Patients', value: '12', icon: Users, color: 'text-blue-600' },
    { name: 'Critical Cases', value: '2', icon: AlertTriangle, color: 'text-red-600' },
    { name: 'Pending Requests', value: '3', icon: MessageSquare, color: 'text-orange-600' },
    { name: 'Today\'s Sessions', value: '5', icon: Calendar, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mental Health Dashboard</h1>
              <p className="text-gray-600 mt-1">Student Case Management & Treatment Planning</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
                <p className="text-sm text-gray-500">Licensed Clinical Psychologist</p>
              </div>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-400" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveSection('patients')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'patients'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4 inline mr-2" />
              Patient Management
            </button>
            <button
              onClick={() => setActiveSection('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === 'requests'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Consultant Requests
              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">3</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {activeSection === 'patients' ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Patient List */}
            <div className="lg:col-span-4 mb-6 lg:mb-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Severity Tabs */}
                <div className="flex border-b border-gray-200">
                  {[
                    { key: 'critical', label: 'Critical', count: students.critical.length },
                    { key: 'high', label: 'High', count: students.high.length },
                    { key: 'moderate', label: 'Moderate', count: students.moderate.length }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
                        activeTab === tab.key
                          ? 'border-purple-500 text-purple-600 bg-purple-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                {/* Patient Cards */}
                <div className="max-h-96 overflow-y-auto">
                  {students[activeTab].map((student) => (
                    <div
                      key={student.id}
                      onClick={() => handleStudentSelect(student)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedStudent?.id === student.id ? 'bg-purple-50 border-purple-200' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                          {student.riskLevel}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{student.condition}</p>
                      <p className="text-xs text-gray-500">{student.urgency}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        Last seen: {student.lastAssessment}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="lg:col-span-8">
              {selectedStudent ? (
                <div className="space-y-6">
                  {/* Patient Header */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                        <p className="text-gray-600">Age: {selectedStudent.age} | Risk Level: {selectedStudent.riskLevel}</p>
                        <p className="text-sm text-gray-500 mt-1">{selectedStudent.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last Assessment</p>
                        <p className="font-semibold">{selectedStudent.lastAssessment}</p>
                      </div>
                    </div>
                  </div>

                  {/* Patient Information Grid */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Symptoms */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                        Current Symptoms
                      </h3>
                      <ul className="space-y-3">
                        {selectedStudent.symptoms.map((symptom, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Background */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Background Information
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedStudent.background}</p>
                    </div>
                  </div>

                  {/* Recommended Treatments */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recommended Treatment Approaches</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {recommendedTreatments[activeTab].map((treatment, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-700">
                          <Check className="h-4 w-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Treatment Plan Input */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4">Create Treatment Plan</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Treatment Plan & Interventions
                        </label>
                        <textarea
                          value={treatmentPlan}
                          onChange={(e) => setTreatmentPlan(e.target.value)}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-vertical"
                          placeholder="Detail the specific treatment plan, therapy sessions, interventions, and timeline..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Clinical Notes & Observations
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-vertical"
                          placeholder="Add any additional notes, observations, or special considerations..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleSaveTreatment}
                      style={{ backgroundColor: '#585182' }}
                      className="px-6 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                    >
                      Save Treatment Plan
                    </button>
                    <button
                      onClick={handleScheduleSession}
                      style={{ backgroundColor: '#585182' }}
                      className="px-6 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                    >
                      Schedule Session
                    </button>
                    <button
                      onClick={handleGenerateReport}
                      style={{ backgroundColor: '#585182' }}
                      className="px-6 py-2 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                    >
                      Generate Report
                    </button>
                  </div>

                  {/* Emergency Protocol */}
                  {selectedStudent.riskLevel === 'Critical' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Emergency Protocol Active
                      </h3>
                      <p className="text-sm text-red-700 mb-4">
                        This student requires immediate attention due to critical risk factors including suicidal ideation.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Contact Crisis Team
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Safety Plan Review
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Select a student to view details</p>
                    <p className="text-gray-400 text-sm mt-2">Choose from the patient list to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Consultant Requests Section */
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Pending Consultant Requests</h3>
                <p className="text-sm text-gray-500 mt-1">Review and respond to consultation requests from other healthcare providers</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {consultantRequests.map((request) => (
                  <div key={request.id} className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium text-gray-900">{request.studentName}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                            {request.urgency}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">Requested by:</span> {request.requestedBy}</p>
                          <p><span className="font-medium">Specialty:</span> {request.specialty}</p>
                          <p><span className="font-medium">Reason:</span> {request.reason}</p>
                          <p><span className="font-medium">Submitted:</span> {request.submittedDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          style={{ backgroundColor: '#585182' }}
                          className="flex items-center px-4 py-2 text-white text-sm rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                        <button
                          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Schedule Session</h3>
            <p className="text-gray-600 mb-4">Patient: {selectedStudent?.name}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="individual">Individual Therapy</option>
                  <option value="group">Group Therapy</option>
                  <option value="family">Family Therapy</option>
                  <option value="crisis">Crisis Intervention</option>
                  <option value="follow-up">Follow-up Session</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <select
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
                disabled={!sessionDate || !sessionTime}
                style={{ backgroundColor: '#585182' }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Generate Report</h3>
            <p className="text-gray-600 mb-4">Patient: {selectedStudent?.name}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="progress">Progress Report</option>
                  <option value="assessment">Assessment Report</option>
                  <option value="treatment">Treatment Plan Report</option>
                  <option value="crisis">Crisis Intervention Report</option>
                  <option value="referral">Referral Report</option>
                  <option value="discharge">Discharge Summary</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  placeholder="Enter any additional observations, recommendations, or notes for the report..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
                />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Report will include:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Patient demographics and condition</li>
                  <li>• Current symptoms and risk assessment</li>
                  <li>• Treatment history and background</li>
                  <li>• Professional recommendations</li>
                  <li>• Generated on: {new Date().toLocaleDateString()}</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReport}
                style={{ backgroundColor: '#585182' }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-all"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;