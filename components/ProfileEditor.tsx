
import React, { useState, useEffect } from 'react';
import { WorkerProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { Upload, Pencil } from 'lucide-react';

interface ProfileEditorProps {
  onComplete: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ onComplete }) => {
  const { user, workerProfile, updateWorkerProfile } = useAuth();
  const { serviceCategories } = useSite();

  const [formData, setFormData] = useState<WorkerProfile>({
    userId: user?.id || '',
    phone: '',
    dob: '',
    gender: 'Male',
    address: '',
    city: '',
    state: '',
    country: 'India',
    skills: [],
    experienceYears: 0,
    education: '10th Pass',
    languages: [],
    preferredLocation: [],
    documents: {}
  });

  useEffect(() => {
    if (workerProfile) {
      setFormData(workerProfile);
    }
  }, [workerProfile]);

  const handleChange = (field: keyof WorkerProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, languages: val.split(',').map(l => l.trim()) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerProfile(formData);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Worker Registration</h2>
        <p className="text-gray-500 text-sm mt-1">Create your profile to find high-paying domestic and international jobs.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-lg rounded-lg border-t-[6px] border-yellow-400 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Personal Information */}
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={user?.name || ''} 
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 bg-gray-50 focus:outline-none"
                  placeholder="e.g. Rahul Kumar"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none placeholder-gray-400"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email (Optional)</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled={!!user?.email}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 bg-gray-50 focus:outline-none placeholder-gray-400"
                  placeholder="email@example.com"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={e => handleChange('dob', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none text-gray-600"
                />
              </div>

              {/* Gender */}
              <div className="md:col-span-1">
                 <label className="block text-xs font-semibold text-gray-600 mb-1">Gender</label>
                 <select 
                    value={formData.gender}
                    onChange={e => handleChange('gender', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none bg-white text-gray-700"
                 >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                 </select>
              </div>

              {