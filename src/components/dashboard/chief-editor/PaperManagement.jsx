import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaCheck, 
  FaTimes, 
  FaUpload,
  FaFileAlt,
  FaChevronRight,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import { showSuccess, showError, showConfirm } from "../../../utils/swal";
import { getChiefEditorPapers } from "../../../services/api/chief-editor/api";
import { deskReject, assignHandlingEditor, finalDecision, publishPaper } from "../../../services/api/workflow/workflow.api";
import { getUsersByRole } from "../../../services/api/auth/api";
import PaperDetailsModal from "./PaperDetailsModal";
import { FaUserTag, FaBan } from "react-icons/fa";

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editors, setEditors] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [paperToAssign, setPaperToAssign] = useState(null);

  useEffect(() => {
    fetchPapers();
    fetchEditors();
  }, []);

  const fetchEditors = async () => {
    try {
      const res = await getUsersByRole("Editor");
      if (res.success) {
        setEditors(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch editors", error);
    }
  };

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const res = await getChiefEditorPapers();
      if (res.success) {
        setPapers(res.data);
      }
    } catch (error) {
      showError(error.message || "Failed to fetch papers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeskReject = async (id) => {
    const { isConfirmed, value: comments } = await showConfirm(
      "Desk Reject Paper?",
      "Provide a reason for rejection (this will be sent to the author)",
      "warning",
      true // input enabled
    );

    if (isConfirmed && comments) {
      try {
        await deskReject(id, comments);
        showSuccess("Paper desk rejected successfully");
        fetchPapers();
      } catch (error) {
        showError(error.message || "Failed to reject paper");
      }
    }
  };

  const handleAssignEditor = async (paperId, editorId) => {
    try {
      await assignHandlingEditor(paperId, editorId);
      showSuccess("Handling Editor assigned successfully");
      setIsAssignModalOpen(false);
      setPaperToAssign(null);
      fetchPapers();
    } catch (error) {
      showError(error.message || "Failed to assign editor");
    }
  };

  const handleFinalDecision = async (id, decision) => {
    const { isConfirmed, value: comments } = await showConfirm(
      `${decision} Paper?`,
      `Are you sure you want to mark this paper as ${decision}?`,
      "info",
      true
    );

    if (isConfirmed) {
      try {
        await finalDecision(id, decision, comments || "");
        showSuccess(`Paper successfully marked as ${decision}`);
        fetchPapers();
      } catch (error) {
        showError(error.message || "Failed to update decision");
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      await publishPaper(id);
      showSuccess("Paper published successfully");
      fetchPapers();
    } catch (error) {
      showError(error.message || "Failed to publish paper");
    }
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = 
      paper.paperDetails.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.paperDetails.correspondingName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "All" || paper.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[1.5px] border shadow-sm";
    switch (status) {
      case "Submitted":
        return `${baseClasses} bg-blue-50 text-blue-600 border-blue-200`;
      case "Assigned to Editor":
      case "Assigned to Associate Editor":
        return `${baseClasses} bg-purple-50 text-purple-600 border-purple-200`;
      case "Under Review":
        return `${baseClasses} bg-yellow-50 text-yellow-600 border-yellow-200`;
      case "Reviews Completed":
        return `${baseClasses} bg-orange-50 text-orange-600 border-orange-200`;
      case "Accepted":
        return `${baseClasses} bg-emerald-50 text-emerald-600 border-emerald-200`;
      case "Rejected":
        return `${baseClasses} bg-rose-50 text-rose-600 border-rose-200`;
      case "Published":
        return `${baseClasses} bg-indigo-50 text-indigo-600 border-indigo-200`;
      case "Minor Revision":
      case "Major Revision":
      case "Revised Submission":
        return `${baseClasses} bg-amber-50 text-amber-600 border-amber-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-600 border-gray-200`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Papers", value: papers.length, color: "blue", icon: FaFileAlt },
          { label: "Pending Review", value: papers.filter(p => ["Submitted", "Under Review"].includes(p.status)).length, color: "yellow", icon: FaExclamationCircle },
          { label: "Accepted", value: papers.filter(p => p.status === "Accepted").length, color: "emerald", icon: FaCheckCircle },
          { label: "Published", value: papers.filter(p => p.status === "Published").length, color: "indigo", icon: FaUpload }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
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

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title or author..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-0 focus:ring-2 focus:ring-blue-600/10 rounded-xl text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          {["All", "Submitted", "Assigned to Editor", "Under Review", "Reviews Completed", "Accepted", "Rejected", "Published"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === filter 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">Loading submissions...</p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="p-20 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <FaFileAlt className="w-10 h-10" />
             </div>
             <h3 className="text-gray-600 font-bold">No papers found</h3>
             <p className="text-gray-400 text-sm">Matching your search/filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Paper Details</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Author Info</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPapers.map((paper) => (
                  <tr key={paper._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="max-w-xs md:max-w-md">
                        <p className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                          {paper.paperDetails.title}
                        </p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1.5 font-medium italic">
                          Submitted {new Date(paper.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">{paper.paperDetails.correspondingName}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{paper.paperDetails.correspondingEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[11px] font-bold">
                        {paper.paperDetails.subject}
                      </span>
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
                          title="View Details"
                          className="p-2.5 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 border border-gray-100 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        
                        {/* Initial Actions for Submitted Papers */}
                        {paper.status === "Submitted" && (
                          <>
                            <button 
                              onClick={() => { setPaperToAssign(paper); setIsAssignModalOpen(true); }}
                              title="Assign Handling Editor"
                              className="p-2.5 bg-white text-purple-400 hover:text-purple-600 hover:bg-purple-50 border border-purple-100 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm flex items-center gap-2"
                            >
                              <FaUserTag className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest hidden xl:inline">Assign Editor</span>
                            </button>
                            <button 
                              onClick={() => handleDeskReject(paper._id)}
                              title="Desk Reject"
                              className="p-2.5 bg-white text-rose-400 hover:text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm"
                            >
                              <FaBan className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Decision after review is completed */}
                        {paper.status === "Reviews Completed" && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleFinalDecision(paper._id, "Accepted")}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleFinalDecision(paper._id, "Rejected")}
                              className="px-4 py-2 bg-rose-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
                            >
                              Reject
                            </button>
                          </div>
                        )}

                        {paper.status === "Accepted" && (
                          <button 
                            onClick={() => handlePublish(paper._id)}
                            title="Publish Paper"
                            className="p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-lg shadow-indigo-200 flex items-center gap-2"
                          >
                            <FaUpload className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest pl-1 pr-1 hidden lg:inline">Publish</span>
                          </button>
                        )}
                        
                        {paper.status === "Published" && (
                           <div className="p-2.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center gap-2">
                              <FaCheckCircle className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest pl-1 pr-1 hidden lg:inline">Live</span>
                           </div>
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

      {/* Assignment Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Assign Handling Editor</h3>
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">Select an editor to manage the review process for this paper.</p>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {editors.filter(e => e.fieldOfStudy === paperToAssign?.paperDetails?.subject).length === 0 ? (
                  <div className="text-center py-8 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <FaExclamationCircle className="mx-auto text-gray-300 text-3xl mb-3" />
                    <p className="text-gray-500 font-bold text-sm">No specialists found</p>
                    <p className="text-gray-400 text-xs mt-1">No editors found with expertise in "{paperToAssign?.paperDetails?.subject}"</p>
                  </div>
                ) : (
                  editors
                    .filter(e => e.fieldOfStudy === paperToAssign?.paperDetails?.subject)
                    .map((editor) => (
                      <button
                        key={editor._id}
                        onClick={() => handleAssignEditor(paperToAssign._id, editor._id)}
                        className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                             <p className="font-bold text-gray-800 text-sm">{editor.firstName} {editor.lastName}</p>
                             <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-[9px] font-black uppercase">Specialist</span>
                          </div>
                          <p className="text-xs text-gray-400">{editor.email}</p>
                          <span className="text-[10px] font-black text-blue-500 uppercase mt-1 block tracking-wider">{editor.fieldOfStudy}</span>
                        </div>
                        <FaChevronRight className="text-gray-200 group-hover:text-blue-500 transition-all" />
                      </button>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
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
