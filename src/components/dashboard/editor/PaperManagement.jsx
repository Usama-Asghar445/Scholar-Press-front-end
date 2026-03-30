import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaEye, 
  FaUserTag, 
  FaChevronRight,
  FaFileAlt,
  FaExclamationCircle,
  FaTimes
} from "react-icons/fa";
import { showSuccess, showError } from "../../../utils/swal";
import { getMyPapers } from "../../../services/api/author/api"; // Reusing generic getMyPapers as it supports backend role filtering
import { assignAssociateEditor } from "../../../services/api/workflow/workflow.api";
import { getUsersByRole } from "../../../services/api/auth/api";
import PaperDetailsModal from "../chief-editor/PaperDetailsModal";

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [associateEditors, setAssociateEditors] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [paperToAssign, setPaperToAssign] = useState(null);

  useEffect(() => {
    fetchPapers();
    fetchAssociateEditors();
  }, []);

  const fetchAssociateEditors = async () => {
    try {
      const res = await getUsersByRole("Associate Editor");
      if (res.success) {
        setAssociateEditors(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch associate editors", error);
    }
  };

  const fetchPapers = async () => {
    setLoading(true);
    try {
      // Backend automatically filters by role and field for Handling Editor
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

  const handleAssignAssociateEditor = async (paperId, associateEditorId) => {
    try {
      await assignAssociateEditor(paperId, associateEditorId);
      showSuccess("Associate Editor assigned successfully");
      setIsAssignModalOpen(false);
      setPaperToAssign(null);
      fetchPapers();
    } catch (error) {
      showError(error.message || "Failed to assign associate editor");
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
      case "Assigned to Editor":
        return `${baseClasses} bg-blue-50 text-blue-600 border-blue-200`;
      case "Assigned to Associate Editor":
        return `${baseClasses} bg-purple-50 text-purple-600 border-purple-200`;
      case "Under Review":
        return `${baseClasses} bg-yellow-50 text-yellow-600 border-yellow-200`;
      case "Reviews Completed":
        return `${baseClasses} bg-orange-50 text-orange-600 border-orange-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-600 border-gray-200`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Assigned", value: papers.length, color: "blue", icon: FaFileAlt },
          { label: "Needs AE Assignment", value: papers.filter(p => p.status === "Assigned to Editor").length, color: "purple", icon: FaUserTag },
          { label: "Under Review", value: papers.filter(p => p.status === "Under Review").length, color: "yellow", icon: FaExclamationCircle },
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

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search papers..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border-0 focus:ring-2 focus:ring-blue-600/10 rounded-xl text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          {["All", "Assigned to Editor", "Assigned to Associate Editor", "Under Review", "Reviews Completed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                statusFilter === filter 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loading Papers...</p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="p-20 text-center text-gray-400">
             <FaFileAlt className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p className="font-bold">No papers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Paper Details</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPapers.map((paper) => (
                  <tr key={paper._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 max-w-md">
                      <p className="font-bold text-gray-800 text-sm line-clamp-2">{paper.paperDetails.title}</p>
                      <p className="text-[10px] text-gray-400 mt-1 italic">
                        Author: {paper.paperDetails.correspondingName}
                      </p>
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
                            className="p-2.5 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 border border-gray-100 rounded-xl transition-all"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          {paper.status === "Assigned to Editor" && (
                            <button 
                              onClick={() => { setPaperToAssign(paper._id); setIsAssignModalOpen(true); }}
                              className="p-2.5 bg-white text-purple-400 hover:text-purple-600 hover:bg-purple-50 border border-purple-100 rounded-xl transition-all flex items-center gap-2"
                            >
                              <FaUserTag className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">Assign AE</span>
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

      {/* Associate Editor Assignment Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Assign Associate Editor</h3>
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">Select an Associate Editor for this paper.</p>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {associateEditors.length === 0 ? (
                  <p className="text-center py-4 text-gray-400 text-sm">No associate editors available</p>
                ) : (
                  associateEditors.map((ae) => (
                    <button
                      key={ae._id}
                      onClick={() => handleAssignAssociateEditor(paperToAssign, ae._id)}
                      className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all text-left flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{ae.firstName} {ae.lastName}</p>
                        <p className="text-xs text-gray-400">{ae.email}</p>
                      </div>
                      <FaChevronRight className="text-gray-200 group-hover:text-purple-500 transition-all" />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
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
