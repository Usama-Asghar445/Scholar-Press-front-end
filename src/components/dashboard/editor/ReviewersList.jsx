import { useState, useEffect } from "react";
import { FaEye, FaUser, FaBook } from "react-icons/fa";
import {
  getReviewers,
  getUserQualifications,
} from "../../../services/api/paper/api";
import UserQualificationsModal from "./UserQualificationsModal";
import { showError } from "../../../utils/swal";

const ReviewersList = () => {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [qualificationsLoading, setQualificationsLoading] = useState(false);
  const [qualifications, setQualifications] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReviewers();
  }, []);

  const fetchReviewers = async () => {
    setLoading(true);
    try {
      const res = await getReviewers();
      setReviewers(res.data || []);
    } catch (error) {
      showError(error.message || "Failed to fetch reviewers");
    } finally {
      setLoading(false);
    }
  };

  const handleViewQualifications = async (user) => {
    setSelectedUser(user);
    setQualificationsLoading(true);
    setIsModalOpen(true);
    try {
      const res = await getUserQualifications(user._id);
      setQualifications(res.data);
    } catch (error) {
      showError(error.message || "Failed to fetch qualifications");
    } finally {
      setQualificationsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (reviewers.length === 0) {
    return (
      <div className="text-center py-12">
        <FaUser className="mx-auto text-4xl text-gray-300 mb-4" />
        <p className="text-gray-500 font-medium">
          No Reviewers found in your field of study
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewers.map((reviewer) => (
          <div
            key={reviewer._id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {reviewer.firstName} {reviewer.lastName}
                  </h3>
                  <p className="text-sm text-purple-600 font-semibold">
                    {reviewer.role}
                  </p>
                </div>
              </div>

              {/* Field of Study */}
              <div className="flex items-center gap-2">
                <FaBook className="text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  {reviewer.fieldOfStudy}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Institution */}
              {reviewer.institution && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Institution
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    {reviewer.institution}
                  </p>
                </div>
              )}

              {/* Department */}
              {reviewer.department && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Department
                  </p>
                  <p className="text-sm text-gray-700">{reviewer.department}</p>
                </div>
              )}

              {/* Specializations */}
              {reviewer.specializations?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {reviewer.specializations.slice(0, 3).map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                    {reviewer.specializations.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                        +{reviewer.specializations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">Email:</span>
                <a
                  href={`mailto:${reviewer.email}`}
                  className="text-blue-600 hover:underline truncate"
                >
                  {reviewer.email}
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={() => handleViewQualifications(reviewer)}
                className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition font-semibold text-sm"
              >
                <FaEye size={16} />
                View Qualifications
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <UserQualificationsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
          setQualifications(null);
        }}
        user={selectedUser}
        qualifications={qualifications}
        loading={qualificationsLoading}
      />
    </div>
  );
};

export default ReviewersList;
