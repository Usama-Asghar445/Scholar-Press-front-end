// ============================================
// 📁 components/profile/AuthorProfileView.jsx
// ============================================

import {
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaBuilding,
  FaBriefcase,
  FaGlobe,
  FaCity,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTags,
  FaEdit,
  FaUser,
} from "react-icons/fa";

const AuthorProfileView = ({ user, onEdit }) => {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const ProfileField = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-800 font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                  {getInitials(user?.firstName, user?.lastName)}
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-blue-100 mt-1">{user?.designation}</p>
              <p className="text-blue-200 text-sm mt-1">
                {user?.department} • {user?.institution}
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={onEdit}
              className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-medium flex items-center gap-2 shadow-md"
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Biography Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              About
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {user?.biography || "No biography provided."}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileField
                icon={FaEnvelope}
                label="Email Address"
                value={user?.email}
              />
              <ProfileField
                icon={FaPhone}
                label="Phone Number"
                value={user?.phone}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileField
                icon={FaUniversity}
                label="Institution"
                value={user?.institution}
              />
              <ProfileField
                icon={FaBuilding}
                label="Department"
                value={user?.department}
              />
              <ProfileField
                icon={FaBriefcase}
                label="Designation"
                value={user?.designation}
              />
              <ProfileField
                icon={FaGraduationCap}
                label="Field of Study"
                value={user?.fieldOfStudy}
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProfileField
                icon={FaGlobe}
                label="Country"
                value={user?.country}
              />
              <ProfileField icon={FaCity} label="City" value={user?.city} />
              <ProfileField
                icon={FaMapMarkerAlt}
                label="Address"
                value={user?.address}
              />
            </div>
          </div>

          {/* Specializations */}
          {user?.specializations && user.specializations.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaTags className="text-blue-600" />
                Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileView;