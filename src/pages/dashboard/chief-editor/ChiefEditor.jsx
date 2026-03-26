import {
  FaUserTie,
  FaUserCheck,
  FaCog,
  FaHome,
  FaUsers,
  FaBookOpen,
  FaFileAlt,
  FaBook,
  FaUserEdit,
  FaUserClock
} from "react-icons/fa";


import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import PaperManagement from "../../../components/dashboard/chief-editor/PaperManagement";
import PublishedPapers from "../../../components/dashboard/chief-editor/PublishedPapers";

import PendingApplications from "../../../components/dashboard/chief-editor/role-management/PendingApplications";
import UserManagement from "../../../components/dashboard/chief-editor/role-management/UserManagement";
import RoleList from "../../../components/dashboard/chief-editor/role-management/RoleList";
import { useState } from "react";

// NAV ITEMS
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaHome },
  { id: "pendingApplications", label: "Pending Applications", icon: FaUserClock },
  { id: "userManagement", label: "All Users", icon: FaUsers },
  { id: "readers", label: "Readers", icon: FaBookOpen },
  { id: "authors", label: "Authors", icon: FaUsers },
  { id: "papers", label: "Paper Management", icon: FaFileAlt },
  { id: "published", label: "Published Papers", icon: FaBook },
  { id: "assignRole", label: "Assign Role", icon: FaUserEdit },
  { id: "reviewers", label: "Reviewers", icon: FaUserCheck },
  { id: "editors", label: "Editors", icon: FaUserTie },
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
      case "pendingApplications":
        return <PendingApplications />;
      case "userManagement":
        return <UserManagement />;
      case "readers":
        return (
          <RoleList 
            roleType="Reader" 
            title="Manage Readers" 
            description="View all registered readers and their submission activities."
            icon={FaBookOpen}
          />
        );
      case "authors":
        return (
          <RoleList 
            roleType="Author" 
            title="Manage Authors" 
            description="View and manage all registered authors on the platform."
            icon={FaUsers}
          />
        );
      case "reviewers":
        return (
          <RoleList 
            roleType="Reviewer" 
            title="Manage Reviewers" 
            description="View and manage all peer reviewers."
            icon={FaUserCheck}
          />
        );
      case "editors":
        return (
          <RoleList 
            roleType="Editor" 
            title="Manage Editors" 
            description="View and manage all associate editors."
            icon={FaUserTie}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-4 transform rotate-12">
                <FaCog className="w-8 h-8" />
             </div>
             <h3 className="text-gray-600 font-bold uppercase tracking-widest text-sm">{activeSection}</h3>
             <p className="text-gray-400 text-xs mt-2 italic font-medium">This section is currently under development.</p>
          </div>
        );
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
        <div className="flex-1 bg-gray-50 overflow-y-auto w-full">
          <main className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 min-h-[calc(100vh-140px)]">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ChiefEditor;