import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimesCircle, FaUserClock } from 'react-icons/fa';
import DataTable from '../../../common/DataTable';
import ActionConfirmationDialog from '../../../common/ActionConfirmationDialog';
import UserProfileModal from '../../../common/UserProfileModal';
import { getPendingApplications, updateRoleStatus, getUserFullProfile } from '../../../../services/api/chief-editor/roleApi';
import { showSuccess, showError } from '../../../../utils/swal';

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile Modal State
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Action Dialog State
  const [actionDialogState, setActionDialogState] = useState({
    isOpen: false,
    actionType: null, // 'Approved' | 'Rejected'
    application: null
  });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getPendingApplications();
      if (res.success) {
        setApplications(res.data || []);
      }
    } catch (err) {
      showError(err.message || "Failed to fetch pending applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleViewProfile = async (userId) => {
    setProfileModalOpen(true);
    setProfileLoading(true);
    try {
      const res = await getUserFullProfile(userId);
      if (res.success) {
        setSelectedProfile(res.data);
      }
    } catch (err) {
      showError(err.message || "Failed to load user profile");
      setProfileModalOpen(false);
    } finally {
      setProfileLoading(false);
    }
  };

  const openActionDialog = (app, type) => {
    setActionDialogState({
      isOpen: true,
      actionType: type,
      application: app
    });
  };

  const handleActionConfirm = async (note) => {
    const { actionType, application } = actionDialogState;
    try {
      const res = await updateRoleStatus(
        application.user?._id || application.userId,
        application.appliedRole,
        actionType,
        note
      );

      if (res.success) {
        showSuccess(res.message);
        setActionDialogState({ isOpen: false, actionType: null, application: null });
        fetchApplications(); // Refresh list
      }
    } catch (err) {
      showError(err.message || `Failed to ${actionType.toLowerCase()} application`);
    }
  };

  const columns = [
    {
      header: "Applicant",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            {row.user?.firstName?.charAt(0)}{row.user?.lastName?.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.user?.firstName} {row.user?.lastName}</p>
            <p className="text-xs text-gray-500">{row.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Roles",
      accessor: (row) => (
        <div>
          <p className="text-xs text-gray-500">Current: <span className="font-medium text-gray-700">{row.user?.role}</span></p>
          <p className="text-sm font-bold text-blue-600">Applied: {row.appliedRole}</p>
        </div>
      ),
    },
    {
      header: "Institution & Location",
      accessor: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row.user?.institution}</p>
          <p className="text-xs text-gray-500">{row.user?.country}</p>
        </div>
      ),
    },
    {
      header: "Applied Date",
      accessor: (row) => new Date(row.appliedAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewProfile(row.user?._id)}
            className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            title="View Full Details"
          >
            <FaEye />
          </button>
          <button
            onClick={() => openActionDialog(row, 'Approved')}
            className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            title="Accept Application"
          >
            <FaCheck />
          </button>
          <button
            onClick={() => openActionDialog(row, 'Rejected')}
            className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            title="Reject Application"
          >
            <FaTimesCircle />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FaUserClock className="text-blue-600" /> Pending Role Applications
          </h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage requests for elevated roles (Reviewer, Editor).</p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="text-sm font-bold text-yellow-700">{applications.length} Pending</span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading applications...</p>
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={applications} 
          searchPlaceholder="Search applicants by name, email, or institution..."
        />
      )}

      {/* Confirmation Dialogs */}
      <ActionConfirmationDialog 
        isOpen={actionDialogState.isOpen && actionDialogState.actionType === 'Approved'}
        onClose={() => setActionDialogState({ isOpen: false, actionType: null, application: null })}
        onConfirm={handleActionConfirm}
        title="Approve Application"
        message={`Are you sure you want to approve ${actionDialogState.application?.user?.firstName} for the ${actionDialogState.application?.appliedRole} role? They will be granted immediate access to their new dashboard.`}
        confirmText="Yes, Approve"
        cancelText="Cancel"
      />

      <ActionConfirmationDialog 
        isOpen={actionDialogState.isOpen && actionDialogState.actionType === 'Rejected'}
        onClose={() => setActionDialogState({ isOpen: false, actionType: null, application: null })}
        onConfirm={handleActionConfirm}
        title="Reject Application"
        message={`Are you sure you want to reject this application? The user will be notified and blocked from re-applying for 6 months.`}
        confirmText="Yes, Reject"
        cancelText="Cancel"
        requireNote={true}
        noteLabel="Reason for Rejection"
        notePlaceholder="Briefly explain why this application was rejected (this will be visible to the user)."
        isDestructive={true}
      />

      {/* Profile Modal */}
      <UserProfileModal 
        isOpen={profileModalOpen}
        onClose={() => { setProfileModalOpen(false); setSelectedProfile(null); }}
        user={selectedProfile}
        loading={profileLoading}
      />
    </div>
  );
};

export default PendingApplications;
