// ============================================
// 📁 components/layout/CompleteProfileNotice.jsx
// ============================================

import { FaExclamationTriangle, FaUserEdit } from "react-icons/fa";

const CompleteProfileNotice = ({ onGoToProfile }) => {
  return (
    <div className="flex justify-center w-full mt-10">
      <div className="bg-white border border-yellow-200 rounded-2xl p-8 text-center shadow-lg max-w-md w-full">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6">
          <FaExclamationTriangle className="text-yellow-600 text-2xl" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Complete Your Profile
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          You must complete your profile before accessing submissions, reviews,
          and other dashboard features. This helps us provide you with a better
          experience.
        </p>

        {/* Features that require profile */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 font-medium mb-2">
            After completing your profile, you can:
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>✓ Submit manuscripts</li>
            <li>✓ Track your submissions</li>
            <li>✓ Receive reviews</li>
            <li>✓ Access full dashboard features</li>
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={onGoToProfile}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
        >
          <FaUserEdit />
          Complete Profile Now
        </button>
      </div>
    </div>
  );
};

export default CompleteProfileNotice;