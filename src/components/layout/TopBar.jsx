// ============================================
// 📁 components/TopBar.jsx
// ============================================

import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { getInitials } from "../../utils/getInitials";
import { logoutUser } from "../../services/api/auth/api";

const TopBar = ({ activeSection, onMenuClick, user, userLoading }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user ? getInitials(user.firstName, user.lastName) : "U";

  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "Author";

  const profilePic = user?.profileImage || user?.avatar || null;

  // Section labels
  const sectionLabels = {
    dashboard: "Dashboard",
    profile: "My Profile",
    submissions: "My Submissions",
    reviews: "Reviews",
    messages: "Messages",
    statistics: "Statistics",
    settings: "Settings",
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaBars className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {sectionLabels[activeSection] || "Dashboard"}
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search — hidden on small */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <FaSearch className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-40 lg:w-56"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm">
                    Notifications
                  </p>
                </div>
                <div className="p-6 text-center text-sm text-gray-400">
                  No new notifications
                </div>
              </div>
            )}
          </div>

          {/* User Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {/* Avatar */}
              {userLoading ? (
                <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
              ) : profilePic ? (
                <img
                  src={profilePic}
                  alt={fullName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {initials}
                </div>
              )}

              {/* Name — hidden on small */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {userLoading ? "Loading..." : fullName}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {userLoading ? "Loading..." : user?.role || "User"}
                </p>
              </div>

              <FaChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                {/* User Info */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt={fullName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">
                      {fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>

                    <p className="text-[11px] text-gray-400 truncate">
                      {user?.role || ""}
                    </p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaUser className="w-4 h-4 text-gray-500" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaCog className="w-4 h-4 text-gray-500" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={logoutUser}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
