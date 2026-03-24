import React from 'react';
import { FaInbox } from 'react-icons/fa';
import PaperCard from './PaperCard';

const PaperList = ({ papers, loading, onViewDetails }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 text-sm">Fetching papers...</p>
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <FaInbox className="text-4xl text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-600">No papers found</h3>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Try another category or submit a new paper</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {papers.map((paper) => (
        <PaperCard 
          key={paper.id || paper._id} 
          paper={paper} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};

export default PaperList;
