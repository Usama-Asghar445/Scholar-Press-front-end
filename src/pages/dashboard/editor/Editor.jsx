import { useState, useEffect, useCallback } from "react";
import {
  FaHome,
  FaFileAlt,
  FaSearch,
  FaEye,
  FaUserCheck,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import { getPapers } from "../../../services/api/paper/api";
import { showError } from "../../../utils/swal";
import PaperDetailsModal from "../../../components/dashboard/chief-editor/PaperDetailsModal";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaHome },
  { id: "managePapers", label: "Manage Papers", icon: FaFileAlt },
  { id: "assignReviewers", label: "Assign Reviewers", icon: FaUserCheck },
  { id: "profile", label: "Profile", icon: FaUserCircle },
  { id: "settings", label: "Settings", icon: FaCog },
];

function Editor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [papers, setPapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, loading: userLoading } = useGetUser();

  const fetchPapers = useCallback(async () => {
    setLoadingPapers(true);
    try {
      if (!user?.fieldOfStudy) {
        setPapers([]);
        return;
      }

      const res = await getPapers({ areaOfResearch: user.fieldOfStudy });
      setPapers(res.data || []);
    } catch (error) {
      showError(error.message || "Failed to fetch papers");
    } finally {
      setLoadingPapers(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchPapers();
  }, [user, fetchPapers]);

  const filteredPapers = papers.filter((paper) => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      paper.paperDetails.title.toLowerCase().includes(lowerSearch) ||
      paper.paperDetails.correspondingName
        .toLowerCase()
        .includes(lowerSearch) ||
      paper.paperDetails.correspondingEmail.toLowerCase().includes(lowerSearch)
    );
  });

  const sectionTitles = {
    dashboard: "Editor Dashboard",
    managePapers: "Manage Papers",
    assignReviewers: "Assign Reviewers",
    profile: "Profile",
    settings: "Settings",
  };

  const sectionSubtitles = {
    dashboard: user?.fieldOfStudy
      ? `Showing papers for your field of study: ${user.fieldOfStudy}`
      : "Please complete your profile with a field of study to view related papers.",
    managePapers: user?.fieldOfStudy
      ? `Assigned submissions in your area of expertise: ${user.fieldOfStudy}`
      : "Please complete your profile with a field of study to view related papers.",
    assignReviewers:
      "Assign reviewers to submissions that match your editorial area.",
    profile: "Review and update your editor profile details.",
    settings: "Configure your editor account preferences.",
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
          sidebarOpen ? "lg:ml-64" : "lg:ml-18"
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
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {sectionTitles[activeSection]}
                </h1>
                <p className="text-gray-500 mt-2 max-w-2xl">
                  {sectionSubtitles[activeSection]}
                </p>
              </div>
              <div className="w-full md:w-96">
                <label className="sr-only" htmlFor="editor-search">
                  Search papers
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="editor-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title or corresponding author"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              {userLoading || loadingPapers ? (
                <div className="flex flex-col items-center justify-center p-28 gap-4">
                  <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-semibold uppercase tracking-[0.3em] text-xs">
                    Loading papers...
                  </p>
                </div>
              ) : !user?.fieldOfStudy ? (
                <div className="text-center py-24">
                  <p className="text-gray-600 text-lg font-semibold">
                    Field of study not set.
                  </p>
                  <p className="text-gray-500 mt-3">
                    Please update your profile with your field of study so the
                    editor dashboard can load related papers.
                  </p>
                </div>
              ) : filteredPapers.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-gray-700 text-xl font-bold">
                    No related papers found
                  </p>
                  <p className="text-gray-500 mt-2">
                    There are currently no papers assigned to your area of
                    expertise.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Title
                        </th>
                        <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Corresponding Author
                        </th>
                        <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Area
                        </th>
                        <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Subject
                        </th>
                        <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Status
                        </th>
                        <th className="px-5 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPapers.map((paper) => (
                        <tr
                          key={paper._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="font-semibold text-gray-800 truncate max-w-xs">
                              {paper.paperDetails.title}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="text-sm text-gray-700 font-medium">
                              {paper.paperDetails.correspondingName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {paper.paperDetails.correspondingEmail}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-[0.12em]">
                              {paper.areaOfResearch || "N/A"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-600">
                            {paper.paperDetails.subject}
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-[0.12em]">
                              {paper.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedPaper(paper);
                                setIsModalOpen(true);
                              }}
                              title="View Details"
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                            >
                              <FaEye className="w-4 h-4" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && selectedPaper && (
        <PaperDetailsModal
          paper={selectedPaper}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPaper(null);
          }}
        />
      )}
    </div>
  );
}

export default Editor;
