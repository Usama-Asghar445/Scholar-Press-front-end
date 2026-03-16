// ============================================
// 📁 components/Sidebar.jsx
// ============================================

import {
  FaBook,
  FaBars,
  FaTimes,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { logoutUser } from "../../services/api/auth/api";

const Sidebar = ({
  navItems,
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white z-40 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-[72px]"
        } hidden lg:flex flex-col border-r border-slate-700/50`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaBook className="w-4 h-4" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-base truncate">ScholarPress</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <FaAngleDoubleLeft className="w-4 h-4" />
            ) : (
              <FaAngleDoubleRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              title={!sidebarOpen ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <item.icon
                className={`w-[18px] h-[18px] flex-shrink-0 ${
                  !sidebarOpen ? "mx-auto" : ""
                }`}
              />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        activeSection === item.id
                          ? "bg-white/20 text-white"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-3">
          <button
            onClick={logoutUser}
            title={!sidebarOpen ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors ${
              !sidebarOpen ? "justify-center" : ""
            }`}
          >
            <FaSignOutAlt className="w-[18px] h-[18px]" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white z-40 transition-transform duration-300 lg:hidden flex flex-col border-r border-slate-700/50 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaBook className="w-4 h-4" />
            </div>
            <span className="font-bold text-base">ScholarPress</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Footer */}
        <div className="border-t border-slate-700/50 p-3">
          <button
            onClick={logoutUser}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <FaSignOutAlt className="w-[18px] h-[18px]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;