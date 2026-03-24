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
import SubmissionsDashboard from "../../../components/dashboard/author/submissions/SubmissionsDashboard";
import AddPaperForm from "../../../components/dashboard/author/submissions/AddPaperForm";
import { getPaperStatusCounts } from "../../../services/api/author/api";
import { useEffect } from "react";

// NAV ITEMS
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: MdDashboard },
  { id: "profile", label: "Profile", icon: FaUser },
  { id: "submissions", label: "My Submissions", icon: FaFileAlt },
  { id: "reviews", label: "Reviews", icon: MdRateReview },
  { id: "messages", label: "Messages", icon: FaEnvelope, badge: 2 },
  { id: "statistics", label: "Statistics", icon: FaChartLine },
  { id: "settings", label: "Settings", icon: FaCog },
];

function Author() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAddingPaper, setIsAddingPaper] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    accepted: 0,
    underReview: 0,
    rejected: 0,
    minorRevision: 0,
    majorRevision: 0
  });

  const { user, loading: userLoading, refetchUser } = useGetUser();

  // Fetch status counts for dashboard
  const fetchStatusCounts = async () => {
    try {
      const res = await getPaperStatusCounts();
      if (res.data) setStatusCounts(res.data);
    } catch (error) {
      console.error("Failed to fetch status counts:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "dashboard") {
      fetchStatusCounts();
    }
  }, [activeSection]);

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
            <p className="text-gray-600">Overview of your research activity</p>
            
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div 
                className="bg-blue-50 rounded-xl p-6 border border-blue-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => setActiveSection("submissions")}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-blue-800">Total Submissions</h3>
                  <FaFileAlt className="text-blue-300" />
                </div>
                <p className="text-3xl font-black text-blue-600">{statusCounts.total}</p>
                <p className="text-xs text-blue-500 mt-2">Click to view all</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-green-800">Accepted</h3>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <p className="text-3xl font-black text-green-600">{statusCounts.accepted}</p>
                <p className="text-xs text-green-500 mt-2">Congratulations!</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-yellow-800">Under Review</h3>
                  <FaChartLine className="text-yellow-300" />
                </div>
                <p className="text-3xl font-black text-yellow-600">{statusCounts.underReview}</p>
                <p className="text-xs text-yellow-500 mt-2">Decision pending</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
               <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
               <button 
                onClick={() => {
                  setActiveSection("submissions");
                  setIsAddingPaper(true);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-100 transition-all font-bold text-sm"
               >
                 Submit a New Paper
               </button>
            </div>
          </div>
        );

      case "submissions":
        return user?.isProfileComplete === false ? (
          <CompleteProfileNotice
            onGoToProfile={() => setActiveSection("profile")}
          />
        ) : isAddingPaper ? (
          <AddPaperForm 
            user={user}
            onCancel={() => setIsAddingPaper(false)}
            onSuccess={() => {
              setIsAddingPaper(false);
              fetchStatusCounts(); // Update counts
            }}
          />
        ) : (
          <SubmissionsDashboard 
            onAddPaper={() => setIsAddingPaper(true)}
            onViewDetails={(paper) => {
              console.log("View details for:", paper);
              // Future: Navigate to paper details page
            }}
          />
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