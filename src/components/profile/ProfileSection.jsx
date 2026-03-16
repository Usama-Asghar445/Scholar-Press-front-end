// ============================================
// 📁 components/profile/ProfileSection.jsx
// ============================================

import { useState } from "react";
import CompleteProfileForm from "./CompleteProfileForm";
import EditProfileForm from "./EditProfileForm";
import AuthorProfileView from "./AuthorProfileView";
import { FaSpinner } from "react-icons/fa";

const ProfileSection = ({ user, loading, refetchUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Handle successful profile update/completion
  const handleSuccess = () => {
    refetchUser();
    setIsEditing(false);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  // If profile is not complete, show complete profile form
  if (!user?.isProfileComplete) {
    return (
      <CompleteProfileForm
        user={user}
        onSuccess={handleSuccess}
        onCancel={null} // No cancel for first time completion
      />
    );
  }

  // If editing, show edit form
  if (isEditing) {
    return (
      <EditProfileForm
        user={user}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    );
  }

  // Show profile view
  return (
    <AuthorProfileView
      user={user}
      onEdit={() => setIsEditing(true)}
    />
  );
};

export default ProfileSection;