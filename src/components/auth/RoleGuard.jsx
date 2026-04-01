import { Navigate } from "react-router-dom";
import { useGetUser } from "../../hooks/auth/useGetUser";

const roleRedirectMap = {
  Author: "/author",
  Editor: "/editor",
  "Associate Editor": "/associate-editor",
  Reviewer: "/reviewer",
  "Editor in Chief": "/chief-editor",
};

const RoleGuard = ({ allowedRoles, children }) => {
  const { user, loading } = useGetUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-500">Checking access...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate to={roleRedirectMap[user.role] || "/auth/login"} replace />
    );
  }

  return children;
};

export default RoleGuard;
