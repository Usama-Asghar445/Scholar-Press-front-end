import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaEye, 
  FaCheck, 
  FaTimes,
  FaFileAlt,
  FaArrowRight,
  FaClipboardCheck,
  FaHourglassHalf,
  FaHistory
} from "react-icons/fa";
import { showSuccess, showError, showConfirm } from "../../../utils/swal";
import { getMyPapers } from "../../../services/api/author/api"; 
import { respondInvitation, submitReview } from "../../../services/api/workflow/workflow.api";
import PaperDetailsModal from "../chief-editor/PaperDetailsModal";

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Invited");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [paperToReview, setPaperToReview] = useState(null);

  useEffect(() => {
    fetchPapers();
  }, []);

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

  const handleInvitation = async (paperId, response) => {
    const text = response === "Accepted" ? "accept" : "decline";
    const { isConfirmed } = await showConfirm(
      `${response} Invitation?`,
      `Are you sure you want to ${text} this review invitation?`,
      response === "Accepted" ? "info" : "warning"
    );

    if (isConfirmed) {
      try {
        await respondInvitation(paperId, response);
        showSuccess(`Invitation ${response.toLowerCase()}ed`);
        fetchPapers();
      } catch (error) {
        showError(error.message || "Failed to respond to invitation");
      }
    }
  };

  const handleSubmitReview = async (paperId, decision, comments) => {
    try {
      await submitReview(paperId, decision, comments);
      showSuccess("Review submitted successfully");
      setIsReviewModalOpen(false);
      setPaperToReview(null);
      fetchPapers();
    } catch (error) {
      showError(error.message || "Failed to submit review");
    }
  };

  // Correctly filter based on the nested reviewers array for the current user
  // This is handled partly by the backend role-based filtering, but status within that role needs careful UI handling.
  const filteredPapers = papers.filter((paper) => {
    const titleMatch = paper.paperDetails.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Determine the user's specific reviewer status for this paper
    // In a real app, you'd get the logged-in user ID. For now we assume the backend filtered appropriately.
    // We can filter the papers based on the overall status as well.
    if (statusFilter === "Invited") {
        return titleMatch && paper.status === "Under Review" && paper.reviewers?.some(r => r.status === "Pending");
    } else if (statusFilter === "Pending Review") {
        return titleMatch && paper.status === "Under Review" && paper.reviewers?.some(r => r.status === "Accepted");
    } else if (statusFilter === "Completed") {
        return titleMatch && (paper.status !== "Under Review" || paper.reviewers?.some(r => r.status === "Completed"));
    }
    
    return titleMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in w-full">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "New Invitations", value: papers.filter(p => p.reviewers?.some(r => r.status === "Pending")).length, color: "blue", icon: FaClipboardCheck },
          { label: "Pending Reviews", value: papers.filter(p => p.reviewers?.some(r => r.status === "Accepted")).length, color: "yellow", icon: FaHourglassHalf },
          { label: "Completed", value: papers.filter(p => p.reviewers?.some(r => r.status === "Completed")).length, color: "emerald", icon: FaHistory },
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

      {/* Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex gap-2">
        {["Invited", "Pending Review", "Completed"].map((tab) => (
           <button 
             key={tab}
             onClick={() => setStatusFilter(tab)}
             className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
               statusFilter === tab 
               ? "bg-blue-600 text-white shadow-lg" 
               : "text-gray-400 hover:bg-gray-50"
             }`}
           >
             {tab}
           </button>
        ))}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
             <div className="p-20 text-center text-gray-400 animate-pulse">Loading...</div>
        ) : filteredPapers.length === 0 ? (
             <div className="bg-white p-20 text-center rounded-2xl border border-gray-100 shadow-sm">
                <FaFileAlt className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-bold">No papers in this category</p>
             </div>
        ) : (
          filteredPapers.map((paper) => (
            <div key={paper._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div className="max-w-2xl">
                  <div className="flex gap-2 mb-2">
                     <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded tracking-widest">{paper.paperDetails.subject}</span>
                     <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] font-black uppercase rounded tracking-widest">ID: {paper._id.slice(-6)}</span>
                  </div>
                  <h3 className="text-gray-800 font-bold text-lg mb-1">{paper.paperDetails.title}</h3>
                  <p className="text-gray-400 text-sm italic">{paper.paperDetails.abstract.slice(0, 200)}...</p>
               </div>

               <div className="flex flex-shrink-0 gap-2">
                  <button 
                    onClick={() => { setSelectedPaper(paper); setIsModalOpen(true); }}
                    className="p-3 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all"
                  >
                    <FaEye />
                  </button>
                  
                  {statusFilter === "Invited" && (
                    <>
                      <button 
                        onClick={() => handleInvitation(paper._id, "Accepted")}
                        className="px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-50"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleInvitation(paper._id, "Declined")}
                        className="px-4 py-2 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-100"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {statusFilter === "Pending Review" && (
                     <button 
                       onClick={() => { setPaperToReview(paper._id); setIsReviewModalOpen(true); }}
                       className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-50 flex items-center gap-2"
                     >
                       <FaClipboardCheck />
                       Submit Review
                     </button>
                  )}
               </div>
            </div>
          ))
        )}
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Submit Your Review</h3>
                <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSubmitReview(paperToReview, formData.get('decision'), formData.get('comments'));
            }} className="p-6 space-y-4">
                <div>
                   <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Detailed Comments</label>
                   <textarea 
                     name="comments" 
                     required
                     placeholder="Provide detailed feedback for the author and editors..."
                     className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm h-40 focus:ring-2 focus:ring-blue-600/10"
                   ></textarea>
                </div>

                <div>
                   <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Recommendation</label>
                   <div className="grid grid-cols-2 gap-2">
                       {["Accept", "Minor Revision", "Major Revision", "Reject"].map(opt => (
                           <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-blue-50 cursor-pointer transition-all">
                               <input type="radio" name="decision" value={opt} required className="text-blue-600" />
                               <span className="text-xs font-bold text-gray-700">{opt}</span>
                           </label>
                       ))}
                   </div>
                </div>

                <div className="pt-4 flex gap-2">
                    <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
                       Submit Final Review
                    </button>
                    <button type="button" onClick={() => setIsReviewModalOpen(false)} className="px-6 py-4 bg-gray-50 text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                       Cancel
                    </button>
                </div>
            </form>
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
