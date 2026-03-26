import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEye, FaUserShield, FaBookOpen } from 'react-icons/fa';
import DataTable from '../../../common/DataTable';
import UserProfileModal from '../../../common/UserProfileModal';
import { getAllUsers, getUserFullProfile } from '../../../../services/api/chief-editor/roleApi';
import { showSuccess, showError } from '../../../../utils/swal';

const RoleList = ({ roleType, title, description, icon: Icon = FaUserShield }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile Modal State
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers(roleType);
      if (res.success) {
        setUsers(res.data || []);
      }
    } catch (err) {
      showError(err.message || `Failed to fetch ${roleType}s`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleType]);

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
      header: "User Details",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-blue-200">
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
      header: "Academic Info",
      accessor: (row) => (
        <div>
          <p className="font-medium text-gray-800">{row.institution || 'N/A'}</p>
          <p className="text-xs text-blue-600 font-semibold mt-0.5">{row.fieldOfStudy || 'General'}</p>
        </div>
      ),
    },
    {
      header: "Platform Activity",
      accessor: (row) => {
        // Only show if the backend provides these stats
        if (row.submittedPapers !== undefined) {
          return (
            <div className="flex flex-col gap-1">
              <span className="text-xs flex items-center gap-2 text-gray-600">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span> 
                {row.submittedPapers} Submitted Papers
              </span>
              <span className="text-xs flex items-center gap-2 text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> 
                {row.acceptedPapers} Accepted Papers
              </span>
            </div>
          );
        }
        return <span className="text-gray-400 text-xs italic">No activity data</span>;
      },
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
            <Icon className="text-blue-600" /> {title}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
          <span className="text-sm font-bold text-blue-700">Total {roleType}s: {users.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-16 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading {roleType.toLowerCase()}s...</p>
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={users} 
          searchPlaceholder={`Search ${roleType.toLowerCase()}s by name, email, or institution...`}
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

export default RoleList;
