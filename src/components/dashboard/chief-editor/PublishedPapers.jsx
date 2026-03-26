import React, { useState, useEffect } from "react";
import { 
  FaBook, 
  FaCalendarAlt, 
  FaUserFriends, 
  FaTag, 
  FaChevronRight,
  FaFilePdf,
  FaSearch
} from "react-icons/fa";
import { showSuccess, showError } from "../../../utils/swal";
import { getPublishedPapers } from "../../../services/api/chief-editor/api";

const PublishedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPublished();
  }, []);

  const fetchPublished = async () => {
    setLoading(true);
    try {
      const res = await getPublishedPapers();
      if (res.success) {
        setPapers(res.data);
      }
    } catch (error) {
      showError(error.message || "Failed to fetch published papers");
    } finally {
      setLoading(false);
    }
  };

  const filteredPapers = papers.filter(p => 
    p.paperDetails.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.authors.some(a => a.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Published Research</h2>
          <p className="text-sm text-gray-400 font-medium">Archive of all officially published manuscripts</p>
        </div>
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search archive..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-100 focus:ring-2 focus:ring-blue-600/10 rounded-2xl text-sm transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <FaBook className="w-10 h-10" />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No matching publications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper._id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50/50 transition-all group flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                 <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    {paper.paperDetails.type}
                 </div>
                 <div className="text-[10px] font-bold text-gray-300 flex items-center gap-1.5 uppercase tracking-widest">
                    <FaCalendarAlt /> {new Date(paper.updatedAt).toLocaleDateString()}
                 </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors mb-4 line-clamp-3">
                {paper.paperDetails.title}
              </h3>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 text-gray-400 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <FaUserFriends />
                  </div>
                  <p className="text-xs font-bold text-gray-500 line-clamp-2">
                    {paper.authors.map(a => a.fullName).join(", ")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 text-gray-400 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                    <FaTag />
                  </div>
                  <p className="text-xs font-bold text-gray-500">
                    {paper.paperDetails.subject}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <a 
                  href={paper.paperFiles.paper.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-600 transition-all uppercase tracking-widest"
                >
                  <FaFilePdf className="text-rose-500" /> View PDF
                </a>
                <button className="w-8 h-8 rounded-full bg-gray-50 text-gray-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublishedPapers;
