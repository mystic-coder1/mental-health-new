import React, { useState } from 'react';
import { Search, Filter, Star, Clock, User, Phone, Mail } from 'lucide-react';

const DoctorFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Depression & Anxiety",
      experience: 8,
      rating: 4.8,
      fees: 1200,
      education: "MD Psychiatry, AIIMS Delhi",
      availability: "Mon-Fri 9AM-5PM",
      phone: "+91-98765-43210",
      email: "priya.sharma@healthcenter.com",
      about: "Specializes in cognitive behavioral therapy for students dealing with depression and anxiety disorders."
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Sleep Disorders",
      experience: 12,
      rating: 4.9,
      fees: 1500,
      education: "MD Sleep Medicine, PGI Chandigarh",
      availability: "Tue-Sat 10AM-6PM",
      phone: "+91-98765-43211",
      email: "rajesh.kumar@sleepwellness.com",
      about: "Expert in treating insomnia, sleep apnea, and circadian rhythm disorders in young adults."
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      specialty: "Anxiety & Panic Disorders",
      experience: 6,
      rating: 4.7,
      fees: 1000,
      education: "PhD Clinical Psychology, NIMHANS Bangalore",
      availability: "Mon-Thu 8AM-4PM",
      phone: "+91-98765-43212",
      email: "anita.desai@mindcare.com",
      about: "Focuses on helping students overcome social anxiety and panic attacks through evidence-based treatments."
    },
    {
      id: 4,
      name: "Dr. Vikram Singh",
      specialty: "Depression & Mood Disorders",
      experience: 15,
      rating: 4.6,
      fees: 1800,
      education: "MD Psychiatry, KGMU Lucknow",
      availability: "Mon-Wed-Fri 11AM-7PM",
      phone: "+91-98765-43213",
      email: "vikram.singh@moodhealth.com",
      about: "Experienced psychiatrist specializing in treatment-resistant depression and bipolar disorder."
    },
    {
      id: 5,
      name: "Dr. Meera Patel",
      specialty: "Stress & Burnout",
      experience: 10,
      rating: 4.8,
      fees: 1300,
      education: "PsyD, Tata Institute of Social Sciences",
      availability: "Tue-Fri 9AM-5PM",
      phone: "+91-98765-43214",
      email: "meera.patel@stressrelief.com",
      about: "Helps students manage academic stress, burnout, and develop healthy coping mechanisms."
    },
    {
      id: 6,
      name: "Dr. Arjun Reddy",
      specialty: "ADHD & Focus Issues",
      experience: 9,
      rating: 4.7,
      fees: 1400,
      education: "MD Psychiatry, CMC Vellore",
      availability: "Mon-Sat 8AM-6PM",
      phone: "+91-98765-43215",
      email: "arjun.reddy@focushealth.com",
      about: "Specializes in ADHD diagnosis and treatment, helping students improve focus and academic performance."
    }
  ];

  const specialties = [...new Set(doctors.map(doc => doc.specialty))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Mental Health Professionals
            </h1>
            <p className="text-lg text-gray-600">
              Connect with qualified doctors who specialize in student mental health
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none cursor-pointer"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600 mb-6">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Doctor Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                    <span className="text-sm text-gray-500">rating</span>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                {/* Experience and Fees */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doctor.experience} years</p>
                      <p className="text-xs text-gray-500">Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 text-gray-500 text-sm font-semibold flex items-center justify-center">₹</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">₹{doctor.fees}</p>
                      <p className="text-xs text-gray-500">Per session</p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Education</p>
                  <p className="text-sm text-gray-600">{doctor.education}</p>
                </div>

                {/* About */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">About</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{doctor.about}</p>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Availability</p>
                  <p className="text-sm text-gray-600">{doctor.availability}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{doctor.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{doctor.email}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-3">
                <button 
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#585182' }}
                >
                  Book Appointment
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  <User className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No doctors found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Need immediate help? Contact the crisis helpline: 988
            </p>
            <p className="text-sm text-gray-500">
              Remember: Seeking help is a sign of strength, not weakness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorFinder;