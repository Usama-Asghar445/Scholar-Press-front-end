import React from 'react';
import { 
  FaTimes, 
  FaUserTie, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaBuilding, 
  FaBookOpen,
  FaFilePdf,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFileAlt
} from 'react-icons/fa';

const UserProfileModal = ({ isOpen, onClose, user, loading = false }) => {
  if (!isOpen) return null;

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
      case 'Accepted':
        return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"><FaCheckCircle /> {status}</span>;
      case 'Rejected':
        return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold"><FaTimesCircle /> {status}</span>;
      default:
        return <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold"><FaClock /> {status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Ribbon */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <FaTimes />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 flex-1">
             <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
             <p className="mt-4 text-gray-500 font-medium">Loading profile details...</p>
          </div>
        ) : !user ? (
          <div className="p-20 text-center text-gray-500">User data not found.</div>
        ) : (
          <div className="flex-1 overflow-y-auto pb-8">
            
            {/* Quick Profile Header */}
            <div className="px-8 flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 sm:-mt-12 mb-8 relative z-10">
              <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg border border-gray-100 shrink-0">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.firstName} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center text-blue-300">
                    <FaUserTie className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-lg text-blue-600 font-medium mt-1">{user.designation || 'Scholar'} at {user.institution || 'Unknown Institution'}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold border border-blue-100 shadow-sm">
                      <FaUserTie /> Current Role: {user.role || 'User'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Contact & Basic Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Contact & Location</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <FaEnvelope className="mt-1 text-gray-400" />
                      <span className="text-sm font-medium break-all">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <FaPhone className="mt-1 text-gray-400" />
                        <span className="text-sm font-medium">{user.phone}</span>
                      </div>
                    )}
                    {(user.city || user.country) && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <FaMapMarkerAlt className="mt-1 text-gray-400" />
                        <span className="text-sm font-medium">
                          {[user.address, user.city, user.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Focus */}
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4">Academic Focus</h3>
                  <div className="flex items-start gap-3 text-gray-700 mb-4">
                    <FaBookOpen className="mt-1 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Primary Field</p>
                      <p className="text-sm font-bold">{user.fieldOfStudy || 'Not specified'}</p>
                    </div>
                  </div>
                  {user.specializations && user.specializations.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 font-medium mb-2">Specializations</p>
                      <div className="flex flex-wrap gap-2">
                        {user.specializations.map((spec, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold shadow-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Tabs/Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Biography */}
                {user.biography && (
                  <section>
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                      <FaUserTie className="text-blue-600" /> Biography
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {user.biography}
                      </p>
                    </div>
                  </section>
                )}

                {/* Education History */}
                <section>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                    <FaGraduationCap className="text-blue-600" /> Education History
                  </h3>
                  {user.educations && user.educations.length > 0 ? (
                    <div className="space-y-4">
                      {user.educations.map((edu, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                {edu.degree}
                                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Class of {edu.passingYear}</span>
                              </h4>
                              <p className="text-gray-600 text-sm font-medium mt-1 flex items-center gap-2">
                                <FaBuilding className="text-gray-400" /> {edu.institution}
                              </p>
                              <p className="text-sm text-gray-500 mt-2"><strong>Major:</strong> {edu.major}</p>
                            </div>
                            {edu.document && (
                              <a 
                                href={edu.document} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 font-bold text-sm transition-colors border border-blue-100"
                              >
                                <FaFilePdf /> View Credential
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center text-gray-500 italic">
                      No education records found for this user.
                    </div>
                  )}
                </section>

                {/* Application History */}
                <section>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                    <FaBookOpen className="text-blue-600" /> Application History
                  </h3>
                  {user.applications && user.applications.length > 0 ? (
                    <div className="space-y-3">
                      {user.applications.map((app, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-gray-900">Applied for <span className="text-blue-600">{app.appliedRole}</span></p>
                            <p className="text-xs text-gray-500 mt-1">
                              Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                            {app.chiefRejectedNote && (
                              <p className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded-lg border border-red-100">
                                <strong>Note:</strong> {app.chiefRejectedNote}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0">
                            {renderStatusBadge(app.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center text-gray-500 italic">
                      No previous role applications found.
                    </div>
                  )}
                </section>
                
                {/* Submitted Papers */}
                <section>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900">
                    <FaFileAlt className="text-blue-600" /> Submitted Papers
                  </h3>
                  {user.papers && user.papers.length > 0 ? (
                    <div className="space-y-3">
                      {user.papers.map((paper, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between gap-4 hover:border-blue-200 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 truncate">{paper.title}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Submitted on: {new Date(paper.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="shrink-0">
                            {renderStatusBadge(paper.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center text-gray-500 italic">
                      No papers submitted yet.
                    </div>
                  )}
                </section>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
