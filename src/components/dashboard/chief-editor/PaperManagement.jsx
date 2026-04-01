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
  FaExclamationCircle,
} from "react-icons/fa";
import { showSuccess, showError } from "../../../utils/swal";
import {
  getChiefEditorPapers,
  updatePaperStatus,
} from "../../../services/api/chief-editor/api";
import PaperDetailsModal from "./PaperDetailsModal";

const PaperManagement = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [areaFilter, setAreaFilter] = useState("All");
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPapers();
  }, []);

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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await updatePaperStatus(id, newStatus);
      if (res.success) {
        showSuccess(`Paper successfully marked as ${newStatus}`);
        fetchPapers(); // Refresh the list
      }
    } catch (error) {
      showError(
        error.message || `Failed to update paper status to ${newStatus}`,
      );
    }
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.paperDetails.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      paper.paperDetails.correspondingName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || paper.status === statusFilter;
    const matchesArea =
      areaFilter === "All" || paper.areaOfResearch === areaFilter;
    return matchesSearch && matchesStatus && matchesArea;
  });

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[1.5px] border shadow-sm";
    switch (status) {
      case "Submitted":
        return `${baseClasses} bg-blue-50 text-blue-600 border-blue-200`;
      case "Under Review":
        return `${baseClasses} bg-yellow-50 text-yellow-600 border-yellow-200`;
      case "Accepted":
        return `${baseClasses} bg-emerald-50 text-emerald-600 border-emerald-200`;
      case "Rejected":
        return `${baseClasses} bg-rose-50 text-rose-600 border-rose-200`;
      case "Published":
        return `${baseClasses} bg-indigo-50 text-indigo-600 border-indigo-200`;
      case "Minor Revision":
      case "Major Revision":
        return `${baseClasses} bg-orange-50 text-orange-600 border-orange-200`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-600 border-gray-200`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Papers",
            value: papers.length,
            color: "blue",
            icon: FaFileAlt,
          },
          {
            label: "Pending Review",
            value: papers.filter((p) =>
              ["Submitted", "Under Review"].includes(p.status),
            ).length,
            color: "yellow",
            icon: FaExclamationCircle,
          },
          {
            label: "Accepted",
            value: papers.filter((p) => p.status === "Accepted").length,
            color: "emerald",
            icon: FaCheckCircle,
          },
          {
            label: "Published",
            value: papers.filter((p) => p.status === "Published").length,
            color: "indigo",
            icon: FaUpload,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className={`text-2xl font-black text-${stat.color}-600 mt-1`}>
                {stat.value}
              </p>
            </div>
            <div
              className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}
            >
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
        <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          >
            {["All", "Computer Science", "Physics", "Biology"].map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {[
            "All",
            "Submitted",
            "Under Review",
            "Accepted",
            "Rejected",
            "Published",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === filter
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
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
            <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">
              Loading submissions...
            </p>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <FaFileAlt className="w-10 h-10" />
            </div>
            <h3 className="text-gray-600 font-bold">No papers found</h3>
            <p className="text-gray-400 text-sm">
              Matching your search/filter criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Paper Details
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Author Info
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Area
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPapers.map((paper) => (
                  <tr
                    key={paper._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="max-w-xs md:max-w-md">
                        <p className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                          {paper.paperDetails.title}
                        </p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1.5 font-medium italic">
                          Submitted{" "}
                          {new Date(paper.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">
                          {paper.paperDetails.correspondingName}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {paper.paperDetails.correspondingEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[11px] font-bold">
                        {paper.areaOfResearch || "N/A"}
                      </span>
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
                          onClick={() => {
                            setSelectedPaper(paper);
                            setIsModalOpen(true);
                          }}
                          title="View Details"
                          className="p-2.5 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 border border-gray-100 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>

                        {(paper.status === "Submitted" ||
                          paper.status === "Under Review") && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(paper._id, "Accepted")
                              }
                              title="Accept Paper"
                              className="p-2.5 bg-white text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 border border-emerald-100 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm"
                            >
                              <FaCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(paper._id, "Rejected")
                              }
                              title="Reject Paper"
                              className="p-2.5 bg-white text-rose-400 hover:text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-sm"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {paper.status === "Accepted" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(paper._id, "Published")
                            }
                            title="Publish Paper"
                            className="p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all hover:scale-110 active:scale-95 shadow-lg shadow-indigo-200 flex items-center gap-2"
                          >
                            <FaUpload className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest pl-1 pr-1 hidden lg:inline">
                              Publish
                            </span>
                          </button>
                        )}

                        {paper.status === "Published" && (
                          <div className="p-2.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl flex items-center justify-center gap-2">
                            <FaCheckCircle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest pl-1 pr-1 hidden lg:inline">
                              Live
                            </span>
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

      {/* Details Modal */}
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
};

export default PaperManagement;
