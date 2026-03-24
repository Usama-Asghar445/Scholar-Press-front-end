// ============================================
// 📁 pages/Author/Author.jsx
// ============================================

import { useState } from "react";
import {
  FaUser,
  FaFileAlt,
  FaEnvelope,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { MdDashboard, MdRateReview } from "react-icons/md";

import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import CompleteProfileNotice from "../../../components/layout/CompleteProfileNotice";
import ProfileSection from "../../../components/profile/ProfileSection";
import RoleApplication from "../../../components/dashboard/author/RoleApplication";

// NAV ITEMS
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: MdDashboard },
  { id: "profile", label: "Profile", icon: FaUser },
  { id: "submissions", label: "My Submissions", icon: FaFileAlt },
  { id: "reviews", label: "Reviews", icon: MdRateReview },
  { id: "messages", label: "Messages", icon: FaEnvelope, badge: 2 },
  { id: "statistics", label: "Statistics", icon: FaChartLine },
  { id: "settings", label: "Settings", icon: FaCog },
  { id: "apply-role", label: "Apply for Role", icon: MdRateReview },
];

function Author() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const { user, loading: userLoading, refetchUser } = useGetUser();

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSection
            user={user}
            loading={userLoading}
            refetchUser={refetchUser}
          />
        );

      case "dashboard":
        return userLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : user?.isProfileComplete === false ? (
          <CompleteProfileNotice
            onGoToProfile={() => setActiveSection("profile")}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {user?.firstName}!
            </h2>
            <p className="text-gray-600">Here is your main dashboard content...</p>
            
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800">Total Submissions</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">0</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-800">Accepted</h3>
                <p className="text-2xl font-bold text-green-600 mt-2">0</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800">Under Review</h3>
                <p className="text-2xl font-bold text-yellow-600 mt-2">0</p>
              </div>
            </div>
          </div>
        );

      case "submissions":
        return user?.isProfileComplete === false ? (
          <CompleteProfileNotice
            onGoToProfile={() => setActiveSection("profile")}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">My Submissions</h2>
            <p className="text-gray-600">Your submissions will appear here...</p>
          </div>
        );

      case "reviews":
        return user?.isProfileComplete === false ? (
          <CompleteProfileNotice
            onGoToProfile={() => setActiveSection("profile")}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <p className="text-gray-600">Your reviews will appear here...</p>
          </div>
        );

      case "messages":
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <p className="text-gray-600">Your messages will appear here...</p>
          </div>
        );

      case "statistics":
        return user?.isProfileComplete === false ? (
          <CompleteProfileNotice
            onGoToProfile={() => setActiveSection("profile")}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <p className="text-gray-600">Your statistics will appear here...</p>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-gray-600">Settings options will appear here...</p>
          </div>
        );

      case "apply-role":
        return (
          <RoleApplication 
            user={user} 
            onRoleApplied={refetchUser} 
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* Main Layout */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"
        }`}
      >
        {/* Top Bar */}
        <TopBar
          activeSection={activeSection}
          onMenuClick={() => setMobileSidebarOpen(true)}
          user={user}
          userLoading={userLoading}
        />

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Author;