import { useState } from "react";
import { FaHome, FaClipboardCheck, FaCheckDouble, FaUserCircle, FaCog } from "react-icons/fa";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaHome },
  { id: "assignedPapers", label: "Assigned Papers", icon: FaClipboardCheck },
  { id: "completedReviews", label: "Completed Reviews", icon: FaCheckDouble },
  { id: "profile", label: "Profile", icon: FaUserCircle },
  { id: "settings", label: "Settings", icon: FaCog },
];

function Reviewer() {
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

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 overflow-y-auto w-full">
          <main className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center text-center">
              
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                 {navItems.find(i => i.id === activeSection)?.icon({ className: "w-10 h-10" })}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {navItems.find(i => i.id === activeSection)?.label}
              </h1>
              <p className="text-gray-500 max-w-lg">
                Welcome to the Reviewer Dashboard. This section is currently under construction and will be available in a future update.
              </p>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Reviewer;
