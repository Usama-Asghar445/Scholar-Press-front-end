import React from 'react';
import { FaInfoCircle, FaFilePdf, FaCheckCircle, FaListAlt } from 'react-icons/fa';

const SubmissionGuidelines = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <FaInfoCircle className="text-blue-600 text-xl" />
        <h3 className="text-lg font-bold text-blue-900">Submission Guidelines</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
            <FaListAlt className="text-sm" /> General Criteria
          </h4>
          <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
            <li>Original work that has not been published elsewhere.</li>
            <li>Relevance to the journal's scope and fields of study.</li>
            <li>Clear methodology and well-supported conclusions.</li>
            <li>Adherence to ethical standards in research.</li>
          </ul>
        </div>
        
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
            <FaFilePdf className="text-sm" /> File Requirements
          </h4>
          <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
            <li>Must be in PDF format only.</li>
            <li>Maximum file size: 20MB.</li>
            <li>Ensure all fonts are embedded and images are high resolution.</li>
            <li>Anonymize the paper for double-blind peer review.</li>
          </ul>
        </div>

        <div>
           <h4 className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
            <FaCheckCircle className="text-sm" /> Basic Formatting
          </h4>
          <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
            <li>A4 page size with standard margins.</li>
            <li>Font: Times New Roman, 12pt for body text.</li>
            <li>Single or double column as per template.</li>
            <li>Numbered references in APA or IEEE style.</li>
          </ul>
        </div>

        <div>
          <h4 className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
            <FaInfoCircle className="text-sm" /> Required Sections
          </h4>
          <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
            <li>Title and Abstract (max 300 words).</li>
            <li>Introduction and Related Work.</li>
            <li>Methodology, Results, and Discussion.</li>
            <li>Conclusion and References.</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white bg-opacity-50 rounded-lg border border-blue-200 text-sm text-blue-800">
        <p><strong>Note:</strong> By submitting your paper, you agree to the journal's terms of service and copyright policies. You can track the status of your submission in the "My Submissions" tab.</p>
      </div>
    </div>
  );
};

export default SubmissionGuidelines;
