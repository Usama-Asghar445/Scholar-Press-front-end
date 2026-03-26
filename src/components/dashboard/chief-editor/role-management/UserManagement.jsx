import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEye, FaUsers } from 'react-icons/fa';
import DataTable from '../../../common/DataTable';
import UserProfileModal from '../../../common/UserProfileModal';
import { getAllUsers, getUserFullProfile } from '../../../../services/api/chief-editor/roleApi';
import { showSuccess, showError } from '../../../../utils/swal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile Modal State
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers("All");
      if (res.success) {
        setUsers(res.data || []);
      }
    } catch (err) {
      showError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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

  const columns = [
    {
      header: "User",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-indigo-200">
            {row.profileImage ? (
              <img src={row.profileImage} alt={row.firstName} className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="w-6 h-6 opacity-70" />
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900">{row.firstName} {row.lastName}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: (row) => (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold border border-gray-200 shadow-sm">
          {row.role || 'User'}
        </span>
      ),
    },
    {
      header: "Institution",
      accessor: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row.institution || 'N/A'}</p>
          <p className="text-xs text-gray-500">{row.country || 'N/A'}</p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row) => {
        if (row.hasPendingApplication) {
          return (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center justify-center max-w-fit gap-1 shadow-sm">
               Role Pending
            </span>
          );
        }
        return (
           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center max-w-fit shadow-sm">
              Active
           </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: (row) => (
        <button
          onClick={() => handleViewProfile(row._id)}
          className="px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 font-bold text-sm shadow-sm transition-all flex items-center gap-2"
        >
          <FaEye /> View Profile
        </button>
      ),
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FaUsers className="text-indigo-600" /> Platform Users
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all registered users across the journal.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-sm">
          <span className="text-sm font-bold text-indigo-700">Total Users: {users.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading platform users...</p>
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={users} 
          searchPlaceholder="Search users by name, email, or institution..."
        />
      )}

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

export default UserManagement;
