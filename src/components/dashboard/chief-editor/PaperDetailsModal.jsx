import React from "react";
import { 
  FaTimes, 
  FaFilePdf, 
  FaImage, 
  FaFileArchive, 
  FaDownload, 
  FaUser, 
  FaGlobe, 
  FaBuilding, 
  FaEnvelope,
  FaHistory,
  FaCheckCircle,
  FaUpload
} from "react-icons/fa";

const PaperDetailsModal = ({ paper, onClose, isAuthor = false, onSubmitRevision }) => {
  if (!paper) return null;

  const { paperDetails, authors, paperFiles, status, createdAt } = paper;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Paper Details</h2>
            <p className="text-xs text-gray-500 mt-1">Submitted on {new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Section 1: Paper Information */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">General Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="md:col-span-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Title</span>
                <p className="text-lg font-bold text-gray-800 leading-tight">{paperDetails.title}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Running Title</span>
                <p className="text-sm font-medium text-gray-700 italic">{paperDetails.runningTitle}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Type</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {paperDetails.type}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Subject / Field</span>
                <p className="text-sm font-medium text-gray-700">{paperDetails.subject}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Keywords</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {paperDetails.keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 rounded text-[11px] font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Abstract</span>
                <p className="text-sm text-gray-600 leading-relaxed text-justify bg-white p-4 rounded-xl border border-gray-100">
                  {paperDetails.abstract}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Corresponding Author */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">Corresponding Author</h3>
            </div>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <FaUser className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-emerald-900">{paperDetails.correspondingName}</p>
                <p className="text-sm text-emerald-600 flex items-center gap-2">
                  <FaEnvelope className="w-3 h-3" /> {paperDetails.correspondingEmail}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: All Authors */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">Authors List ({authors.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authors.map((author, index) => (
                <div key={index} className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{author.fullName}</p>
                      <p className="text-xs text-gray-500 mb-2 truncate">{author.email}</p>
                      <div className="space-y-1">
                        <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                          <FaGlobe className="w-2.5 h-2.5" /> {author.country}
                        </p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1.5 truncate">
                          <FaBuilding className="w-2.5 h-2.5" /> {author.affiliation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Files */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">Files & Documents</h3>
            </div>
            <div className="space-y-4">
              {/* Main Paper */}
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl text-orange-600 shadow-sm border border-orange-100">
                    <FaFilePdf className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Main Manuscript</span>
                    <p className="text-sm font-bold text-orange-900 group-hover:underline cursor-pointer">
                      {paperFiles.paper.name}
                    </p>
                  </div>
                </div>
                <a 
                  href={paperFiles.paper.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white text-orange-600 rounded-xl hover:bg-orange-600 hover:text-white transition-all shadow-sm border border-orange-200"
                >
                  <FaDownload />
                </a>
              </div>

              {/* Figures */}
              {paperFiles.figuresDetails.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Figures ({paperFiles.figuresDetails.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {paperFiles.figuresDetails.map((file, i) => (
                      <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between hover:border-blue-200 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <FaImage className="text-blue-400 flex-shrink-0" />
                          <p className="text-[13px] font-medium text-gray-700 truncate">{file.name}</p>
                        </div>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                          <FaDownload className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supplementary */}
              {paperFiles.supplementaryDetails.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mt-4 mb-3 ml-1">Supplementary Materials ({paperFiles.supplementaryDetails.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {paperFiles.supplementaryDetails.map((file, i) => (
                      <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between hover:border-purple-200 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <FaFileArchive className="text-purple-400 flex-shrink-0" />
                          <p className="text-[13px] font-medium text-gray-700 truncate">{file.name}</p>
                        </div>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors">
                          <FaDownload className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 5: Workflow History (Timeline) */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h3 className="text-lg font-bold text-gray-800">Workflow History</h3>
            </div>
            
            <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
               {(paper.workflowHistory || []).length === 0 ? (
                  <p className="text-gray-400 text-sm italic">No history available yet.</p>
               ) : (
                  paper.workflowHistory.slice().reverse().map((step, i) => (
                    <div key={i} className="relative">
                       <div className={`absolute -left-8 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                          i === 0 ? 'bg-indigo-600 text-white scale-125' : 'bg-gray-200 text-gray-500'
                       }`}>
                          <FaCheckCircle className="w-2.5 h-2.5" />
                       </div>
                       <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-1">
                             <p className="font-black text-gray-800 text-[10px] uppercase tracking-widest">{step.action}</p>
                             <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded uppercase">{new Date(step.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                             {step.comments || `Action performed by ${step.actorId?.role || 'System'}`}
                          </p>
                          {step.actorId && (
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">
                              Actor: {step.actorId.firstName} {step.actorId.lastName} ({step.actorId.role})
                            </p>
                          )}
                       </div>
                    </div>
                  ))
               )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-2xl flex justify-between items-center">
          {isAuthor && ["Minor Revision", "Major Revision"].includes(status) && (
            <button 
              onClick={() => onSubmitRevision(paper._id)}
              className="px-6 py-2.5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
            >
              <FaUpload className="w-3.5 h-3.5" />
              Submit Revision
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsModal;
