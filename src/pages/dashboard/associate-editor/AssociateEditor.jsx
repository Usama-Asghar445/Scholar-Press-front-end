import { useState } from "react";
import {
  FaFileAlt,
  FaHome,
  FaCog,
  FaCheckCircle,
  FaUsers,
  FaGavel,
  FaEnvelope,
  FaChartBar,
} from "react-icons/fa";
import { MdDashboard, MdRateReview } from "react-icons/md";

import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";

// NAV ITEMS
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaHome },

  { id: "assignedPapers", label: "Assigned Papers", icon: FaFileAlt },

  { id: "reviewManagement", label: "Review Management", icon: MdRateReview },

  { id: "reviewers", label: "Manage Reviewers", icon: FaUsers },

  { id: "recommendations", label: "My Recommendations", icon: FaCheckCircle },

  { id: "decisions", label: "Decision History", icon: FaGavel },

  { id: "messages", label: "Messages", icon: FaEnvelope },

  { id: "statistics", label: "Performance Stats", icon: FaChartBar },

  { id: "settings", label: "Profile Settings", icon: FaCog },
];

function AssociateEditor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const { user, loading: userLoading } = useGetUser();

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

        {/* Empty Content Area (Optional) */}
        <div className="flex-1 bg-gray-50"></div>
      </div>
    </div>
  );
}

export default AssociateEditor;
