import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Video, MapPin, Edit, Trash2, Plus, ArrowLeft, Check, X, AlertCircle, MessageCircle } from 'lucide-react';

const AppointmentManagement = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    date: '',
    time: ''
  });

  // Sample appointment data - in real app, this would come from an API
  useEffect(() => {
    const sampleAppointments = [
      {
        id: 1,
        doctorName: "Dr. Priya Sharma",
        doctorSpecialty: "Depression & Anxiety",
        date: "2025-09-25",
        time: "10:00",
        type: "video",
        status: "confirmed",
        fees: 1200,
        patientName: "John Doe",
        symptoms: "Feeling anxious about upcoming exams and having trouble sleeping",
        appointmentId: "APT001",
        doctorPhone: "+91-98765-43210",
        doctorEmail: "priya.sharma@healthcenter.com"
      },
      {
        id: 2,
        doctorName: "Dr. Rajesh Kumar",
        doctorSpecialty: "Sleep Disorders",
        date: "2025-09-22",
        time: "14:30",
        type: "in-person",
        status: "completed",
        fees: 1500,
        patientName: "John Doe",
        symptoms: "Chronic insomnia and fatigue",
        appointmentId: "APT002",
        doctorPhone: "+91-98765-43211",
        doctorEmail: "rajesh.kumar@sleepwellness.com"
      },
      {
        id: 3,
        doctorName: "Dr. Anita Desai",
        doctorSpecialty: "Anxiety & Panic Disorders",
        date: "2025-10-02",
        time: "11:00",
        type: "phone",
        status: "confirmed",
        fees: 1000,
        patientName: "John Doe",
        symptoms: "Social anxiety in group settings",
        appointmentId: "APT003",
        doctorPhone: "+91-98765-43212",
        doctorEmail: "anita.desai@mindcare.com"
      },
      {
        id: 4,
        doctorName: "Dr. Vikram Singh",
        doctorSpecialty: "Depression & Mood Disorders",
        date: "2025-09-18",
        time: "16:00",
        type: "video",
        status: "cancelled",
        fees: 1800,
        patientName: "John Doe",
        symptoms: "Persistent low mood and lack of motivation",
        appointmentId: "APT004",
        doctorPhone: "+91-98765-43213",
        doctorEmail: "vikram.singh@moodhealth.com"
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (activeTab) {
      case 'upcoming':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= today && apt.status === 'confirmed';
        });
      case 'past':
        return appointments.filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate < today || apt.status === 'completed';
        });
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      )
    );
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, date: rescheduleData.date, time: rescheduleData.time }
          : apt
      )
    );
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    setRescheduleData({ date: '', time: '' });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'in-person':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/homepage')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            </div>
            <button
              onClick={() => navigate('/counsellor')}
              className="flex items-center px-4 py-2 text-white rounded-lg font-medium transition-colors"
              style={{ backgroundColor: '#585182' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'upcoming', label: 'Upcoming', count: appointments.filter(apt => apt.status === 'confirmed').length },
              { id: 'past', label: 'Past', count: appointments.filter(apt => apt.status === 'completed').length },
              { id: 'cancelled', label: 'Cancelled', count: appointments.filter(apt => apt.status === 'cancelled').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} appointments
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming appointments. Book one to get started."
                : `No ${activeTab} appointments found.`
              }
            </p>
            {activeTab === 'upcoming' && (
              <button
                onClick={() => navigate('/counsellor')}
                className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                style={{ backgroundColor: '#585182' }}
              >
                Book Your First Appointment
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map(appointment => (
              <div
                key={appointment.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-blue-600 font-medium">{appointment.doctorSpecialty}</p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(appointment.date)}
                            </p>
                            <p className="text-xs text-gray-500">Date</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {appointment.time}
                            </p>
                            <p className="text-xs text-gray-500">Time</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {getTypeIcon(appointment.type)}
                          <div className="ml-2">
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {appointment.type.replace('-', ' ')} Consultation
                            </p>
                            <p className="text-xs text-gray-500">₹{appointment.fees}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900 mb-1">Appointment ID</p>
                        <p className="text-sm text-gray-600 font-mono">{appointment.appointmentId}</p>
                      </div>

                      {appointment.symptoms && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-900 mb-1">Reason for Visit</p>
                          <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {appointment.status === 'confirmed' && (
                          <>
                            {appointment.type === 'video' && (
                              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors">
                                <Video className="w-4 h-4 inline mr-2" />
                                Join Video Call
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowRescheduleModal(true);
                              }}
                              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                              <Edit className="w-4 h-4 inline mr-2" />
                              Reschedule
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowCancelModal(true);
                              }}
                              className="px-4 py-2 text-sm border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 inline mr-2" />
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'completed' && (
                          <button className="px-4 py-2 text-sm border border-blue-300 text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                            <MessageCircle className="w-4 h-4 inline mr-2" />
                            Leave Review
                          </button>
                        )}

                        <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Contact Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Cancel Appointment</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your appointment with {selectedAppointment.doctorName} 
              on {formatDate(selectedAppointment.date)} at {selectedAppointment.time}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={() => handleCancelAppointment(selectedAppointment.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Appointment Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <Edit className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Reschedule Appointment</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Current appointment: {formatDate(selectedAppointment.date)} at {selectedAppointment.time}
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
                <input
                  type="date"
                  value={rescheduleData.date}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
                <select
                  value={rescheduleData.time}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  {generateTimeSlots().map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleData({ date: '', time: '' });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRescheduleAppointment(selectedAppointment.id)}
                disabled={!rescheduleData.date || !rescheduleData.time}
                className="px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#585182' }}
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;