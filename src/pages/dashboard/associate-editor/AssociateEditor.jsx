import { useEffect, useState } from "react";
import { FaSearch, FaUsers, FaUserCheck } from "react-icons/fa";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import { getChiefEditorPapers } from "../../../services/api/chief-editor/api";
import { assignReviewers } from "../../../services/api/workflow/api";
import { showError, showSuccess } from "../../../utils/swal";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaSearch },
  { id: "assignedPapers", label: "Assigned Papers", icon: FaUsers },
  { id: "reviewers", label: "Reviewers", icon: FaUserCheck },
  { id: "search", label: "Search Papers", icon: FaSearch },
  { id: "settings", label: "Settings", icon: FaUserCheck },
];

function AssociateEditor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [reviewerInput, setReviewerInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { user, loading: userLoading } = useGetUser();

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await getChiefEditorPapers();
        const assigned = (res.data || []).filter(
          (paper) =>
            paper.assignedAE?._id === user._id || paper.assignedAE === user._id,
        );
        setPapers(assigned);
        setFilteredPapers(assigned);
      } catch (error) {
        showError(error.message || "Failed to load assigned papers.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  useEffect(() => {
    setFilteredPapers(
      papers.filter((paper) =>
        paper.paperDetails.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, papers]);

  const handleAssignReviewers = async () => {
    if (!selectedPaper) {
      showError("Please select a paper first.");
      return;
    }
    const ids = reviewerInput
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (ids.length === 0) {
      showError("Enter one or more reviewer IDs separated by commas.");
      return;
    }

    try {
      const res = await assignReviewers(selectedPaper._id, ids);
      if (res.success) {
        showSuccess(res.message || "Reviewers assigned successfully.");
        setSelectedPaper(null);
        setReviewerInput("");
        setSearch("");
        setPapers((prev) =>
          prev.filter((paper) => paper._id !== selectedPaper._id),
        );
      }
    } catch (error) {
      showError(error.message || "Failed to assign reviewers.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"}`}
      >
        <TopBar
          activeSection={activeSection}
          onMenuClick={() => setMobileSidebarOpen(true)}
          user={user}
          userLoading={userLoading}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Associate Editor Portal
                  </h1>
                  <p className="text-sm text-slate-500">
                    Manage papers assigned to you and assign reviewers to move
                    the paper forward.
                  </p>
                </div>
                <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[.2em] text-emerald-700">
                  {papers.length} assigned
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Assigned Papers
                  </h2>
                  <p className="text-sm text-slate-500">
                    Select a paper to assign reviewers and track review
                    progress.
                  </p>
                </div>
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search your assigned papers"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {loading ? (
                <div className="py-16 text-center text-slate-500">
                  Loading assigned papers…
                </div>
              ) : filteredPapers.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  No papers are assigned to you.
                </div>
              ) : (
                <div className="grid gap-4 mt-6">
                  {filteredPapers.map((paper) => (
                    <button
                      key={paper._id}
                      type="button"
                      onClick={() => setSelectedPaper(paper)}
                      className={`w-full rounded-3xl border p-5 text-left transition ${selectedPaper?._id === paper._id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 bg-white hover:border-emerald-300"}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {paper.paperDetails.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                            {paper.paperDetails.abstract}
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[.2em] text-slate-700">
                          {paper.status}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-white px-3 py-1 border border-slate-200">
                          Subject: {paper.paperDetails.subject}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 border border-slate-200">
                          Reviewers: {paper.assignedReviewers?.length || 0}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {selectedPaper && (
              <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Assign Reviewers
                    </h2>
                    <p className="text-sm text-slate-500">
                      Add one or more reviewer user IDs separated by commas.
                    </p>
                    <div className="mt-5 rounded-3xl border border-gray-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-700">
                        Paper title
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {selectedPaper.paperDetails.title}
                      </p>
                      <p className="mt-3 text-[12px] uppercase tracking-[.2em] text-slate-600">
                        Current status: {selectedPaper.status}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">
                      Reviewer IDs
                    </label>
                    <textarea
                      rows={5}
                      value={reviewerInput}
                      onChange={(e) => setReviewerInput(e.target.value)}
                      placeholder="e.g. 6412abc..., 6423def..."
                      className="w-full rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                    <button
                      type="button"
                      onClick={handleAssignReviewers}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                    >
                      Assign Reviewers
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPaper(null)}
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AssociateEditor;
