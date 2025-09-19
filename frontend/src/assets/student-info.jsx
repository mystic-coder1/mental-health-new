import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentRegistrationPage = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Academic Information
    studentId: '',
    institution: '',
    program: '',
    yearOfStudy: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    
    // Health Information
    previousTherapy: '',
    currentMedications: '',
    allergies: '',
    mentalHealthConcerns: [],
    urgencyLevel: '',
    
    // Additional Information
    preferredTherapistGender: '',
    preferredLanguage: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    
    // Consent
    privacyConsent: false,
    communicationConsent: false,
    emergencyConsent: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const mentalHealthOptions = [
    'Anxiety',
    'Depression',
    'Stress Management',
    'Sleep Issues',
    'Relationship Problems',
    'Academic Pressure',
    'Self-Esteem Issues',
    'Trauma/PTSD',
    'Eating Disorders',
    'Substance Use',
    'Grief/Loss',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Not Urgent - General wellness support' },
    { value: 'moderate', label: 'Moderate - Affecting daily life' },
    { value: 'high', label: 'High - Significant distress' },
    { value: 'critical', label: 'Critical - Immediate attention needed' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'mentalHealthConcerns') {
        setFormData(prev => ({
          ...prev,
          mentalHealthConcerns: checked 
            ? [...prev.mentalHealthConcerns, value]
            : prev.mentalHealthConcerns.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
        if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
        if (!formData.program.trim()) newErrors.program = 'Program/Major is required';
        if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required';
        break;
      case 3:
        if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Emergency contact name is required';
        if (!formData.emergencyRelationship.trim()) newErrors.emergencyRelationship = 'Relationship is required';
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
        break;
      case 4:
        if (formData.mentalHealthConcerns.length === 0) newErrors.mentalHealthConcerns = 'Please select at least one concern';
        if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Please indicate urgency level';
        break;
      case 5:
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.privacyConsent) newErrors.privacyConsent = 'Privacy consent is required';
        if (!formData.emergencyConsent) newErrors.emergencyConsent = 'Emergency contact consent is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      console.log('Registration data:', formData);
      alert('Account created successfully! Please check your email for verification.');
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic information' },
    { number: 2, title: 'Academic', description: 'Student details' },
    { number: 3, title: 'Emergency Contact', description: 'Safety information' },
    { number: 4, title: 'Health Info', description: 'Mental health concerns' },
    { number: 5, title: 'Account Setup', description: 'Security & consent' }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Smith"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="john.smith@university.edu"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender *
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
            errors.gender ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID *
          </label>
          <input
            id="studentId"
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.studentId ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="STU123456"
          />
          {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
        </div>

        <div>
          <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
            Year of Study *
          </label>
          <select
            id="yearOfStudy"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.yearOfStudy ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="graduate">Graduate Student</option>
          </select>
          {errors.yearOfStudy && <p className="text-red-500 text-xs mt-1">{errors.yearOfStudy}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
          Institution/University *
        </label>
        <input
          id="institution"
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
            errors.institution ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="University of Example"
        />
        {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
      </div>

      <div>
        <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
          Program/Major *
        </label>
        <input
          id="program"
          type="text"
          name="program"
          value={formData.program}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
            errors.program ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Computer Science"
        />
        {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program}</p>}
      </div>
    </div>
  );

  const renderEmergencyContact = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact Information</h3>
      <p className="text-sm text-gray-600 mb-4">
        This person will be contacted only in case of emergency or if you're at risk of harm.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="emergencyName"
            type="text"
            name="emergencyName"
            value={formData.emergencyName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.emergencyName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Jane Smith"
          />
          {errors.emergencyName && <p className="text-red-500 text-xs mt-1">{errors.emergencyName}</p>}
        </div>

        <div>
          <label htmlFor="emergencyRelationship" className="block text-sm font-medium text-gray-700 mb-1">
            Relationship *
          </label>
          <input
            id="emergencyRelationship"
            type="text"
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.emergencyRelationship ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Mother, Father, Guardian, etc."
          />
          {errors.emergencyRelationship && <p className="text-red-500 text-xs mt-1">{errors.emergencyRelationship}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            id="emergencyPhone"
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 987-6543"
          />
          {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
        </div>

        <div>
          <label htmlFor="emergencyEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address (Optional)
          </label>
          <input
            id="emergencyEmail"
            type="email"
            name="emergencyEmail"
            value={formData.emergencyEmail}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            placeholder="jane.smith@email.com"
          />
        </div>
      </div>
    </div>
  );

  const renderHealthInfo = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mental Health Information</h3>
      <p className="text-sm text-gray-600 mb-4">
        This information helps us provide you with the best possible care. All information is confidential.
      </p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What mental health concerns bring you here today? * (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
          {mentalHealthOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="mentalHealthConcerns"
                value={option}
                checked={formData.mentalHealthConcerns.includes(option)}
                onChange={handleInputChange}
                className="text-purple-600 focus:ring-purple-500 rounded"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.mentalHealthConcerns && <p className="text-red-500 text-xs mt-1">{errors.mentalHealthConcerns}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How urgent is your need for support? *
        </label>
        <div className="space-y-2">
          {urgencyLevels.map((level) => (
            <label key={level.value} className="flex items-start space-x-2 cursor-pointer">
              <input
                type="radio"
                name="urgencyLevel"
                value={level.value}
                checked={formData.urgencyLevel === level.value}
                onChange={handleInputChange}
                className="mt-1 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{level.label}</span>
            </label>
          ))}
        </div>
        {errors.urgencyLevel && <p className="text-red-500 text-xs mt-1">{errors.urgencyLevel}</p>}
      </div>

      <div>
        <label htmlFor="previousTherapy" className="block text-sm font-medium text-gray-700 mb-1">
          Previous Therapy Experience (Optional)
        </label>
        <textarea
          id="previousTherapy"
          name="previousTherapy"
          value={formData.previousTherapy}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-vertical"
          placeholder="Please describe any previous therapy or counseling experience..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700 mb-1">
            Current Medications (Optional)
          </label>
          <textarea
            id="currentMedications"
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleInputChange}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-vertical"
            placeholder="List any medications you're currently taking..."
          />
        </div>

        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
            Allergies (Optional)
          </label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-vertical"
            placeholder="List any known allergies..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredTherapistGender" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Therapist Gender (Optional)
          </label>
          <select
            id="preferredTherapistGender"
            name="preferredTherapistGender"
            value={formData.preferredTherapistGender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            <option value="">No preference</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>
        </div>

        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Language (Optional)
          </label>
          <input
            id="preferredLanguage"
            type="text"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            placeholder="English, Spanish, etc."
          />
        </div>
      </div>
    </div>
  );

  const renderAccountSetup = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security & Consent</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password *
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="space-y-4 bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium text-gray-800">Required Consents</h4>
        
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent}
            onChange={handleInputChange}
            className={`mt-1 text-purple-600 focus:ring-purple-500 rounded ${
              errors.privacyConsent ? 'border-red-500' : ''
            }`}
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the <a href="#" className="text-purple-600 underline hover:text-purple-800">Privacy Policy</a> and 
            <a href="#" className="text-purple-600 underline hover:text-purple-800 ml-1">Terms of Service</a>. I understand that my information will be kept confidential and secure. *
          </span>
        </label>
        {errors.privacyConsent && <p className="text-red-500 text-xs">{errors.privacyConsent}</p>}

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="emergencyConsent"
            checked={formData.emergencyConsent}
            onChange={handleInputChange}
            className={`mt-1 text-purple-600 focus:ring-purple-500 rounded ${
              errors.emergencyConsent ? 'border-red-500' : ''
            }`}
          />
          <span className="text-sm text-gray-700">
            I consent to my emergency contact being reached in case of a mental health crisis or if I'm at risk of harm to myself or others. *
          </span>
        </label>
        {errors.emergencyConsent && <p className="text-red-500 text-xs">{errors.emergencyConsent}</p>}

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="communicationConsent"
            checked={formData.communicationConsent}
            onChange={handleInputChange}
            className="mt-1 text-purple-600 focus:ring-purple-500 rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to receive appointment reminders, wellness tips, and important updates via email and SMS. (Optional)
          </span>
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="font-medium text-blue-800 mb-2">🔒 Your Information is Safe</h4>
        <p className="text-sm text-blue-700">
          All your personal and health information is encrypted and stored securely. We follow strict HIPAA guidelines 
          to protect your privacy. Only authorized mental health professionals will have access to your information.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderAcademicInfo();
      case 3: return renderEmergencyContact();
      case 4: return renderHealthInfo();
      case 5: return renderAccountSetup();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Create Your Student Account
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Join our mental health support community. Your wellbeing matters.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-colors ${
                  currentStep >= step.number
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <div className="text-center mt-2 hidden sm:block">
                  <p className="text-xs font-medium text-gray-800">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                <div className="text-center mt-1 sm:hidden">
                  <p className="text-xs font-medium text-gray-600">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="absolute top-0 left-0 h-2 bg-gray-300 rounded-full w-full"></div>
            <div 
              className="absolute top-0 left-0 h-2 bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg">
          <form onSubmit={(e) => e.preventDefault()}>
            {renderCurrentStep()}
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-3 sm:space-y-0">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-md text-sm sm:text-base font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Previous
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Step {currentStep} of {steps.length}
                </span>
              </div>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ backgroundColor: '#585182' }}
                  className="px-6 py-2 text-white rounded-md text-sm sm:text-base font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                >
                  Next Step
                </button>
              ) : (
                <Link
                  to="/category"
                  onClick={(e) => {
                    e.preventDefault();
                    if (handleSubmit()) {
                      window.location.href = '/category';
                    }
                  }}
                  style={{ backgroundColor: '#585182' }}
                  className="px-6 py-2 text-white rounded-md text-sm sm:text-base font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all inline-block text-center"
                >
                  Create Account  
                </Link>
              )}
            </div>
          </form>
        </div>

        {/* Support Information */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-gray-500 text-xs sm:text-sm mb-2">
            Need help with registration or have questions?
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
            <a 
              href="#" 
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Contact Support
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a 
              href="#" 
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Registration Help
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a 
              href="#" 
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Privacy Information
            </a>
          </div>
        </div>

        {/* Crisis Helpline */}
        <div className="text-center mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
          <p className="text-red-700 text-xs sm:text-sm font-medium mb-1">
            🚨 In Crisis? Need Immediate Help?
          </p>
          <p className="text-red-600 text-xs sm:text-sm">
            Call the National Suicide Prevention Lifeline: 
            <a href="tel:988" className="font-bold underline ml-1 hover:text-red-800">988</a> (Available 24/7)
          </p>
          <p className="text-red-600 text-xs mt-1">
            Or text "HELLO" to 741741 for the Crisis Text Line
          </p>
        </div>

        {/* Already Have Account */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium ml-1 transition-colors">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationPage;