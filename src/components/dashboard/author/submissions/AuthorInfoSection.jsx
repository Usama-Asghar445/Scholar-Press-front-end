import React from 'react';
import { FaUserEdit, FaLock } from 'react-icons/fa';

const AuthorInfoSection = ({ user, formData, handleChange, errors }) => {
  // Required fields for author submission
  const requiredFields = [
    { name: 'firstName', label: 'First Name', value: user?.firstName || '' },
    { name: 'lastName', label: 'Last Name', value: user?.lastName || '' },
    { name: 'institution', label: 'Institution', value: user?.institution || '' },
    { name: 'department', label: 'Department', value: user?.department || '' },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FaUserEdit className="text-blue-600" /> Corresponding Author Information
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {user?.firstName ? 'Pre-filled from profile' : 'Please complete information'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requiredFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="text"
                name={field.name}
                value={field.value || formData[field.name] || ''}
                readOnly={!!field.value}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border text-sm transition-all ${
                  field.value 
                    ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' 
                    : errors[field.name]
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                }`}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
              {field.value && (
                <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              )}
            </div>
            {errors[field.name] && !field.value && (
              <span className="text-xs text-red-500 mt-1">{errors[field.name]}</span>
            )}
          </div>
        ))}
      </div>
      
      {!user?.isProfileComplete && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded text-xs text-yellow-700">
          <strong>Tip:</strong> You can complete your full profile in the 
          <button 
            type="button" 
            onClick={() => window.location.hash = 'profile'} 
            className="mx-1 underline hover:text-yellow-800"
          >
            Profile Section
          </button>
          to have this information saved for all future submissions.
        </div>
      )}
    </div>
  );
};

export default AuthorInfoSection;
