import { useState } from "react";
import {
  FaUserTie,
  FaFileAlt,
  FaUserCheck,
  FaUserEdit,
  FaCog,
  FaHome,
  FaUsers,
  FaBook,
  FaChartBar
} from "react-icons/fa";


import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";

// NAV ITEMS
const navItems = [
 { id: "dashboard", label: "Dashboard", icon: FaHome },
  { id: "assignRole", label: "Assign Role", icon: FaUserEdit },
  { id: "papers", label: "Paper Management", icon: FaFileAlt },
  { id: "reviewers", label: "Reviewers", icon: FaUserCheck },
  { id: "editors", label: "Editors", icon: FaUserTie },
  { id: "authors", label: "Authors", icon: FaUsers },
  { id: "journal", label: "Journal Settings", icon: FaBook },
  { id: "reports", label: "Reports & Analytics", icon: FaChartBar },
  { id: "settings", label: "Settings", icon: FaCog },
];

function ChiefEditor() {
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

export default ChiefEditor;