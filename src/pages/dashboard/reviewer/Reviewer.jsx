import { useEffect, useState } from "react";
import {
  FaSearch,
  FaClipboardList,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import Sidebar from "../../../components/layout/Sidebar";
import TopBar from "../../../components/layout/TopBar";
import { useGetUser } from "../../../hooks/auth/useGetUser";
import { getChiefEditorPapers } from "../../../services/api/chief-editor/api";
import { submitReview } from "../../../services/api/workflow/api";
import { showError, showSuccess } from "../../../utils/swal";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: FaClipboardList },
  { id: "assignedPapers", label: "Assigned Papers", icon: FaSearch },
  { id: "reviewForm", label: "Submit Review", icon: FaCommentDots },
  { id: "history", label: "Review History", icon: FaSearch },
];

const RECOMMENDATIONS = [
  "Accept",
  "Minor Revision",
  "Major Revision",
  "Reject",
];

function Reviewer() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [papers, setPapers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState("");
  const [recommendation, setRecommendation] = useState(RECOMMENDATIONS[0]);
  const [loading, setLoading] = useState(true);

  const { user, loading: userLoading } = useGetUser();

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await getChiefEditorPapers();
        const assigned = (res.data || []).filter((paper) =>
          (paper.assignedReviewers || []).some(
            (reviewer) => reviewer?._id === user._id || reviewer === user._id,
          ),
        );
        setPapers(assigned);
        setFiltered(assigned);
      } catch (error) {
        showError(error.message || "Failed to load papers assigned to you.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  useEffect(() => {
    setFiltered(
      papers.filter((paper) =>
        paper.paperDetails.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, papers]);

  const handleSubmitReview = async () => {
    if (!selectedPaper) {
      showError("Select a paper to review first.");
      return;
    }
    if (!comments.trim()) {
      showError("Please add review comments before submitting.");
      return;
    }

    try {
      const res = await submitReview(
        selectedPaper._id,
        recommendation,
        comments.trim(),
      );
      if (res.success) {
        showSuccess(res.message || "Review submitted successfully.");
        setSelectedPaper(null);
        setComments("");
        setRecommendation(RECOMMENDATIONS[0]);
        setSearch("");
      }
    } catch (error) {
      showError(error.message || "Failed to submit review.");
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
        className={
          "flex-1 flex flex-col min-w-0 transition-all duration-300 " +
          (sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]")
        }
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
                    Reviewer Dashboard
                  </h1>
                  <p className="text-sm text-slate-500">
                    Review papers assigned to you and submit structured
                    feedback.
                  </p>
                </div>
                <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-[.2em] text-blue-700">
                  {papers.length} assigned
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Papers Assigned to You
                  </h2>
                  <p className="text-sm text-slate-500">
                    Select a paper to read the summary and complete your review.
                  </p>
                </div>
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search papers by title"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {loading ? (
                <div className="py-16 text-center text-slate-500">
                  Loading assigned papers…
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center text-slate-500">
                  No review assignments found.
                </div>
              ) : (
                <div className="grid gap-4 mt-6">
                  {filtered.map((paper) => (
                    <button
                      key={paper._id}
                      type="button"
                      onClick={() => setSelectedPaper(paper)}
                      className={
                        "w-full rounded-3xl border p-5 text-left transition " +
                        (selectedPaper?._id === paper._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-blue-300")
                      }
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
                          Field: {paper.paperDetails.field}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 border border-slate-200">
                          Subject: {paper.paperDetails.subject}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {selectedPaper && (
              <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Review Submission
                    </h2>
                    <p className="text-sm text-slate-500">
                      Provide your recommendation and comments for this
                      manuscript.
                    </p>
                    <div className="mt-6 rounded-3xl border border-gray-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-700">
                        Paper Title
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
                      Recommendation
                    </label>
                    <select
                      value={recommendation}
                      onChange={(e) => setRecommendation(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      {RECOMMENDATIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <label className="block text-sm font-medium text-slate-700">
                      Comments
                    </label>
                    <textarea
                      rows={8}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Provide constructive feedback for the author and editorial team..."
                      className="w-full rounded-3xl border border-gray-200 p-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      onClick={handleSubmitReview}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                    >
                      <FaPaperPlane /> Submit Review
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

export default Reviewer;
