import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaPlus } from 'react-icons/fa';
import { getMyPapers } from '../../../../services/api/author/api';
import PaperList from './PaperList';

const STATUS_TABS = [
  { id: 'all', label: 'All Papers' },
  { id: 'Submitted', label: 'Submitted' },
  { id: 'Accepted', label: 'Accepted' },
  { id: 'Rejected', label: 'Rejected' },
  { id: 'Under Review', label: 'Under Review' },
  { id: 'Minor Revision', label: 'Minor Revision' },
  { id: 'Major Revision', label: 'Major Revision' },
];

const SubmissionsDashboard = ({ onAddPaper, onViewDetails }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const status = activeTab === 'all' ? '' : activeTab;
      const res = await getMyPapers(status);
      setPapers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch papers:", error);
      // Fallback to empty list or handle error
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [activeTab]);

  const filteredPapers = (papers || []).filter(paper => 
    paper?.paperDetails?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase() || "")
  );

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 group">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search papers by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
        
        <button 
          onClick={onAddPaper}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all font-bold text-sm transform active:scale-95"
        >
          <FaPlus className="text-xs" />
          Add New Paper
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-100 scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FaFilter className="text-blue-600 text-sm" />
            {STATUS_TABS.find(t => t.id === activeTab)?.label}
            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[10px] font-bold">
              {filteredPapers.length}
            </span>
          </h3>
          <button 
            onClick={fetchPapers}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
          >
            Refresh List
          </button>
        </div>

        <PaperList 
          papers={filteredPapers} 
          loading={loading} 
          onViewDetails={onViewDetails} 
        />
      </div>
    </div>
  );
};

export default SubmissionsDashboard;
