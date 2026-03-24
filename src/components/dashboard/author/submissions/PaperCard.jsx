import React from 'react';
import { FaFileAlt, FaCalendarAlt, FaChevronRight, FaCircle } from 'react-icons/fa';

const statusConfig = {
  'Accepted': { color: 'text-green-600', bg: 'bg-green-50', dot: 'bg-green-500' },
  'Rejected': { color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' },
  'Under Review': { color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  'Minor Revision': { color: 'text-yellow-600', bg: 'bg-yellow-50', dot: 'bg-yellow-500' },
  'Major Revision': { color: 'text-orange-600', bg: 'bg-orange-50', dot: 'bg-orange-500' },
  'Submitted': { color: 'text-gray-600', bg: 'bg-gray-50', dot: 'bg-gray-500' },
};

const PaperCard = ({ paper, onViewDetails }) => {
  const { title, submissionDate, status } = paper;
  const config = statusConfig[status] || statusConfig['Submitted'];

  return (
    <div className="group bg-white hover:bg-blue-50/30 border border-gray-100 hover:border-blue-200 rounded-xl p-4 transition-all duration-300 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 transition-colors group-hover:scale-105 transform`}>
        <FaFileAlt className={`text-xl ${config.color}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-blue-700 transition-colors" title={title}>
          {title}
        </h4>
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FaCalendarAlt className="text-[10px]" />
            <span>{new Date(submissionDate).toLocaleDateString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${config.bg} ${config.color} text-[10px] font-bold uppercase tracking-wider`}>
            <FaCircle className={`text-[6px] ${config.dot}`} />
            {status}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onViewDetails(paper)}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all border border-blue-100"
      >
        View Details
        <FaChevronRight className="text-[8px]" />
      </button>
    </div>
  );
};

export default PaperCard;
