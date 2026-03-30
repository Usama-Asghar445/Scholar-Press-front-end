import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaEye, 
  FaUsers, 
  FaCheckCircle,
  FaFileAlt,
  FaTimes,
  FaChevronRight,
  FaUserPlus,
  FaClock,
  FaClipboardList
} from "react-icons/fa";
import { showSuccess, showError, showConfirm } from "../../../utils/swal";
import { getMyPapers } from "../../../services/api/author/api"; 
import { assignReviewers, recommendDecision } from "../../../services/api/workflow/workflow.api";
import { getUsersByRole } from "../../../services/api/auth/api";
import PaperDetailsModal from "../chief-editor/PaperDetailsModal";

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [reviewers, setReviewers] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [paperToAssign, setPaperToAssign] = useState(null);
  const [selectedReviewerIds, setSelectedReviewerIds] = useState([]);

  useEffect(() => {
    fetchPapers();
    fetchReviewers();
  }, []);

  const fetchReviewers = async () => {
    try {
      const res = await getUsersByRole("Reviewer");
      if (res.success) {
        setReviewers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch reviewers", error);
    }
  };

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await getMyPapers();
      if (res.success) {
        setPapers(res.data);
      }
    } catch (error) {
      showError(error.message || "Failed to fetch papers");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignReviewers = async () => {
    if (selectedReviewerIds.length < 2 || selectedReviewerIds.length > 3) {
      showError("Please select 2 or 3 reviewers.");
      return;
    }

    try {
      await assignReviewers(paperToAssign, selectedReviewerIds);
      showSuccess("Reviewers assigned successfully");
      setIsAssignModalOpen(false);
      setPaperToAssign(null);
      setSelectedReviewerIds([]);
      fetchPapers();
    } catch (error) {
      showError(error.message || "Failed to assign reviewers");
    }
  };

  const handleRecommendDecision = async (id) => {
    const { isConfirmed, value: recommendation } = await showConfirm(
      "Recommend Decision",
      "Choose a recommendation for the Editor-in-Chief",
      "info",
      true, // input enabled
      ["Accept", "Minor Revision", "Major Revision", "Reject"]
    );

    if (isConfirmed && recommendation) {
      const { value: comments } = await showConfirm(
        "Comments",
        "Add any confidential comments for the EIC",
        "info",
        true
      );

      try {
        await recommendDecision(id, recommendation, comments || "");
        showSuccess("Recommendation submitted successfully");
        fetchPapers();
      } catch (error) {
        showError(error.message || "Failed to submit recommendation");
      }
    }
  };

  const filteredPapers = papers.filter((paper) => {
    const titleMatch = paper.paperDetails.title.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === "All" || paper.status === statusFilter;
    return titleMatch && statusMatch;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[1.5px] border shadow-sm";
    switch (status) {
      case "Assigned to Associate Editor":
        return `${baseClasses} bg-blue-50 text-blue-600 border-blue-200`;
      case "Under Review":
        return `${baseClasses} bg-purple-50 text-purple-600 border-purple-200`;
      case "Reviews Completed":
        return `${baseClasses} bg-emerald-50 text-emerald-600 border-emerald-200`;
      case "Revisions Submitted":
        return `${baseClasses} bg-amber-50 text-amber-600 border-amber-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-600 border-gray-200`;
    }
  };

  const toggleReviewerSelection = (id) => {
    setSelectedReviewerIds(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Assigned To Me", value: papers.length, color: "blue", icon: FaFileAlt },
          { label: "Needs Reviewers", value: papers.filter(p => p.status === "Assigned to Associate Editor").length, color: "purple", icon: FaUserPlus },
          { label: "Review Completed", value: papers.filter(p => p.status === "Reviews Completed").length, color: "emerald", icon: FaClipboardList },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-2xl font-black text-${stat.color}-600 mt-1`}>{stat.value}</p>
            </div>
            <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
              <stat.icon />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Active Assignments</h2>
            <div className="flex gap-2 w-full md:w-auto">
                <input 
                    type="text" 
                    placeholder="Filter papers..."
                    className="px-4 py-2 bg-gray-50 border-0 rounded-xl text-xs w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {loading ? (
             <div className="p-20 text-center text-gray-400 animate-pulse">Loading...</div>
        ) : filteredPapers.length === 0 ? (
             <div className="p-20 text-center text-gray-400">No papers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Paper</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Reviewers</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPapers.map((paper) => (
                  <tr key={paper._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 max-w-sm">
                      <p className="font-bold text-gray-800 text-sm line-clamp-2">{paper.paperDetails.title}</p>
                      <p className="text-[10px] text-gray-400 mt-1 italic">Field: {paper.paperDetails.subject}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                        <div className="flex justify-center -space-x-2">
                            {paper.reviewers?.map((rev, idx) => (
                                <div key={idx} title={`${rev.reviewerId?.firstName} - ${rev.status}`} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white ${
                                    rev.status === 'Completed' ? 'bg-emerald-500' : 
                                    rev.status === 'Accepted' ? 'bg-blue-500' : 
                                    rev.status === 'Declined' ? 'bg-rose-500' : 'bg-gray-300'
                                }`}>
                                    {rev.reviewerId?.firstName?.charAt(0) || '?'}
                                </div>
                            ))}
                            {(!paper.reviewers || paper.reviewers.length === 0) && (
                                <span className="text-[10px] text-gray-300 font-bold italic">Unassigned</span>
                            )}
                        </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={getStatusBadge(paper.status)}>
                        {paper.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => { setSelectedPaper(paper); setIsModalOpen(true); }}
                            className="p-2.5 bg-white text-gray-400 hover:text-blue-600 border border-gray-100 rounded-xl transition-all"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          
                          {paper.status === "Assigned to Associate Editor" && (
                            <button 
                              onClick={() => { setPaperToAssign(paper._id); setIsAssignModalOpen(true); }}
                              className="p-2.5 bg-white text-purple-400 hover:text-purple-600 border border-purple-100 rounded-xl transition-all flex items-center gap-2"
                              title="Assign Reviewers"
                            >
                              <FaUsers className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">Assign Reviewers</span>
                            </button>
                          )}

                          {paper.status === "Reviews Completed" && (
                             <button 
                                onClick={() => handleRecommendDecision(paper._id)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-100"
                             >
                               Recommend
                             </button>
                          )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reviewer Assignment Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Assign Reviewers</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Select 2-3 Reviewers</p>
              </div>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {reviewers.map((rev) => (
                  <button
                    key={rev._id}
                    onClick={() => toggleReviewerSelection(rev._id)}
                    className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                        selectedReviewerIds.includes(rev._id) 
                        ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-50' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-colors ${
                            selectedReviewerIds.includes(rev._id) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                            {rev.firstName?.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">{rev.firstName} {rev.lastName}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{rev.fieldOfStudy || 'Broad Spectrum'}</p>
                        </div>
                    </div>
                    {selectedReviewerIds.includes(rev._id) && <FaCheckCircle className="text-blue-600" />}
                  </button>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Selected: <span className="text-blue-600">{selectedReviewerIds.length}</span> / 3
                  </p>
                  <button 
                    onClick={handleAssignReviewers}
                    disabled={selectedReviewerIds.length < 2 || selectedReviewerIds.length > 3}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-100"
                  >
                    Send Invitations
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedPaper && (
        <PaperDetailsModal 
          paper={selectedPaper} 
          onClose={() => { setIsModalOpen(false); setSelectedPaper(null); }} 
        />
      )}
    </div>
  );
};

export default PaperManagement;
