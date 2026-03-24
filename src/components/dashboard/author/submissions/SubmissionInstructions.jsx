import React from 'react';
import { FaInfoCircle, FaFilePdf, FaCheckCircle, FaListAlt, FaArrowRight } from 'react-icons/fa';

const SubmissionInstructions = ({ onConfirm }) => {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex items-center gap-4 mb-2">
            <FaInfoCircle className="text-3xl opacity-90" />
            <h2 className="text-3xl font-extrabold tracking-tight">Submission Instructions</h2>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Please review the following criteria and guidelines carefully before submitting your research paper.
          </p>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 font-bold text-gray-800 text-lg">
                <FaListAlt className="text-blue-500" /> General Criteria
              </h4>
              <ul className="text-gray-600 space-y-3 list-none pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Original work that has not been published elsewhere.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Relevance to the journal's scope and fields of study.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Clear methodology and well-supported conclusions.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Adherence to ethical standards in research.
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="flex items-center gap-3 font-bold text-gray-800 text-lg">
                <FaFilePdf className="text-blue-500" /> File Requirements
              </h4>
              <ul className="text-gray-600 space-y-3 list-none pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>Main Paper:</strong> Must be in PDF format only (Max 20MB).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>Figures:</strong> Multiple high-resolution images/PDFs allowed.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>Supplementary:</strong> Supporting data or materials (PDF/Docx).
                </li>
              </ul>
            </div>

            <div className="space-y-4">
               <h4 className="flex items-center gap-3 font-bold text-gray-800 text-lg">
                <FaCheckCircle className="text-blue-500" /> Basic Formatting
              </h4>
              <ul className="text-gray-600 space-y-3 list-none pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  A4 page size with standard margins.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Font: Times New Roman, 12pt for body text.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  APA or IEEE style for references.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-3 font-bold text-gray-800 text-lg">
                <FaInfoCircle className="text-blue-500" /> Required Information
              </h4>
              <ul className="text-gray-600 space-y-3 list-none pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Complete corresponding author details.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Conflict of interest disclosure.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Data availability statement.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>Notice:</strong> By proceeding, you acknowledge that you have read and understood these guidelines. 
              The submission process involves multiple steps where you will need to provide detailed information about your paper, 
              co-authors, and any financial or professional conflicts of interest.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={onConfirm}
              className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-200 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              I Have Read the Instructions
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionInstructions;
