import {
  FaTimes,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const UserQualificationsModal = ({
  isOpen,
  onClose,
  user,
  qualifications,
  loading,
}) => {
  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-500 mt-4">
            Loading qualifications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-white text-2xl font-bold">
            Qualifications & Profile
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* User Basic Info */}
          {qualifications?.user && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Name</p>
                  <p className="text-lg text-gray-800 font-medium">
                    {qualifications.user.firstName}{" "}
                    {qualifications.user.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Role</p>
                  <p className="text-lg text-blue-600 font-medium">
                    {qualifications.user.role}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Email</p>
                    <p className="text-gray-800 text-sm">
                      {qualifications.user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">Phone</p>
                    <p className="text-gray-800 text-sm">
                      {qualifications.user.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    Field of Study
                  </p>
                  <p className="text-gray-800 font-medium">
                    {qualifications.user.fieldOfStudy}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    Institution
                  </p>
                  <p className="text-gray-800">
                    {qualifications.user.institution || "N/A"}
                  </p>
                </div>
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    Department
                  </p>
                  <p className="text-gray-800">
                    {qualifications.user.department || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">
                    Designation
                  </p>
                  <p className="text-gray-800">
                    {qualifications.user.designation || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">
                      Location
                    </p>
                    <p className="text-gray-800 text-sm">
                      {qualifications.user.city}, {qualifications.user.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Biography */}
              {qualifications.user.biography && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 font-semibold mb-2">
                    Biography
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {qualifications.user.biography}
                  </p>
                </div>
              )}

              {/* Specializations */}
              {qualifications.user.specializations?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 font-semibold mb-2">
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {qualifications.user.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Education Details */}
          {qualifications?.education && qualifications.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {qualifications.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 font-semibold">
                          Degree
                        </p>
                        <p className="text-gray-800 font-medium">
                          {edu.degree}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold">
                          Institution
                        </p>
                        <p className="text-gray-800">{edu.institution}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold">
                          Major
                        </p>
                        <p className="text-gray-800">{edu.major}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-semibold">
                          Passing Year
                        </p>
                        <p className="text-gray-800">{edu.passingYear}</p>
                      </div>
                    </div>

                    {/* Education Document */}
                    {edu.document && (
                      <div className="mt-4">
                        <a
                          href={edu.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                        >
                          <FaDownload size={16} />
                          View Education Document
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role Application Status */}
          {qualifications?.roleApplication && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Current Role Status
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold">
                      Applied Role
                    </p>
                    <p className="text-lg text-gray-800 font-bold">
                      {qualifications.roleApplication.appliedRole}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-semibold">
                      Status
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      {qualifications.roleApplication.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserQualificationsModal;
