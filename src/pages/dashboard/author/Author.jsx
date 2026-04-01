// ============================================
// 📁 pages/Author/Author.jsx
// ============================================

import { useState, useEffect } from "react";
import {
  FaUser,
  FaFileAlt,
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaCheck,
} from "react-icons/fa";
import { MdDashboard, MdRateReview } from "react-icons/md";

import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import CompleteProfileNotice from "../../../components/layout/CompleteProfileNotice";
import ProfileSection from "../../../components/profile/ProfileSection";
import SubmissionsDashboard from "../../../components/dashboard/author/submissions/SubmissionsDashboard";
import AddPaperForm from "../../../components/dashboard/author/submissions/AddPaperForm";
import RoleApplication from "../../../components/dashboard/author/RoleApplication";
import AuthorPaperDetailsModal from "../../../components/dashboard/author/submissions/AuthorPaperDetailsModal";
import { getPaperStatusCounts } from "../../../services/api/author/api";

// NAV ITEMS
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: MdDashboard },
  { id: "profile", label: "Profile", icon: FaUser },
  { id: "submissions", label: "My Submissions", icon: FaFileAlt },
  { id: "apply-role", label: "Apply for Role", icon: MdRateReview },
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    submitted: 0,
    accepted: 0,
    underReview: 0,
    rejected: 0,
    minorRevision: 0,
    majorRevision: 0,
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
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                Welcome back,{" "}
                <span className="text-blue-600">
                  {user?.firstName || "Author"}
                </span>
                !
              </h2>
              <p className="text-gray-500 mt-1 font-medium italic">
                Overview of your research and submission activity
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 cursor-pointer hover:shadow-xl hover:shadow-blue-50 transition-all border-l-4 border-l-blue-500 group"
                onClick={() => setActiveSection("submissions")}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
                    Total Submissions
                  </h3>
                  <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                    <FaFileAlt />
                  </div>
                </div>
                <p className="text-4xl font-black text-blue-600">
                  {statusCounts?.total || 0}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-blue-400 mt-4 font-bold uppercase tracking-wider">
                  View All Papers <FaChartLine className="ml-1" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100 border-l-4 border-l-green-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-green-900">Accepted Papers</h3>
                  <div className="p-2 bg-green-100/50 rounded-lg text-green-600">
                    <FaCheck />
                  </div>
                </div>
                <p className="text-4xl font-black text-green-600">
                  {statusCounts?.accepted || 0}
                </p>
                <p className="text-[10px] text-green-500 mt-4 font-bold uppercase tracking-wider">
                  Congratulations!
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 border border-yellow-100 border-l-4 border-l-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-yellow-900">Under Review</h3>
                  <div className="p-2 bg-yellow-100/50 rounded-lg text-yellow-600">
                    <FaChartLine />
                  </div>
                </div>
                <p className="text-4xl font-black text-yellow-600">
                  {statusCounts?.underReview || 0}
                </p>
                <p className="text-[10px] text-yellow-500 mt-4 font-bold uppercase tracking-wider italic">
                  Decisions Pending
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Ready to share your next discovery?
                </h3>
                <p className="text-gray-500 text-sm">
                  Start a new manuscript submission in just a few steps.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveSection("submissions");
                  setIsAddingPaper(true);
                }}
                className="whitespace-nowrap px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl shadow-blue-100 transition-all font-black text-sm uppercase tracking-widest transform active:scale-95"
              >
                Submit New Paper
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
              setSelectedPaper(paper);
              setIsDetailsOpen(true);
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
            <p className="text-gray-600">
              Settings options will appear here...
            </p>
          </div>
        );

      case "apply-role":
        return <RoleApplication user={user} onRoleApplied={refetchUser} />;

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

        {isDetailsOpen && selectedPaper && (
          <AuthorPaperDetailsModal
            paper={selectedPaper}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedPaper(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Author;
