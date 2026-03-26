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
import PaperManagement from "../../../components/dashboard/chief-editor/PaperManagement";
import PublishedPapers from "../../../components/dashboard/chief-editor/PublishedPapers";

// NAV ITEMS
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaHome },
  { id: "papers", label: "Paper Management", icon: FaFileAlt },
  { id: "published", label: "Published Papers", icon: FaBook },
  { id: "assignRole", label: "Assign Role", icon: FaUserEdit },
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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
      case "papers":
        return <PaperManagement />;
      case "published":
        return <PublishedPapers />;
      case "assignRole":
      case "reviewers":
      case "editors":
      case "authors":
      case "journal":
      case "reports":
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 transform rotate-12">
                <FaCog className="w-8 h-8" />
             </div>
             <h3 className="text-gray-600 font-bold uppercase tracking-widest text-sm">{activeSection}</h3>
             <p className="text-gray-400 text-xs mt-2 italic font-medium">This section is currently under development.</p>
          </div>
        );
      default:
        return <PaperManagement />;
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
        <div className="flex-1 bg-gray-50 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChiefEditor;