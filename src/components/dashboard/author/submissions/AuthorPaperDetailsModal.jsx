import {
  FaTimes,
  FaFilePdf,
  FaImage,
  FaFileArchive,
  FaDownload,
} from "react-icons/fa";

const AuthorPaperDetailsModal = ({ paper, onClose }) => {
  if (!paper) return null;

  const {
    paperDetails,
    authors,
    paperFiles,
    status,
    createdAt,
    updatedAt,
    areaOfResearch,
    conflictOfInterest,
    conflictDescription,
    dataAvailability,
  } = paper;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl ring-1 ring-slate-200 animate-fade-in-up">
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-20">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Paper Details
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Full submission overview for this paper.
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[1px] text-blue-700 mt-3 sm:mt-0">
                {status || "Submitted"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2">
                <span className="font-semibold text-slate-700">Submitted</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2">
                <span className="font-semibold text-slate-700">Updated</span>
                <span>
                  {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-700"
          >
            <FaTimes /> Close
          </button>
        </div>

        <div className="p-6 space-y-8">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                General Information
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">Title</p>
                  <p className="mt-1 text-slate-600">{paperDetails.title}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-slate-100 p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900">
                      Research Area
                    </p>
                    <p className="mt-2 text-slate-600">
                      {areaOfResearch || "N/A"}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900">
                      Subject / Field
                    </p>
                    <p className="mt-2 text-slate-600">
                      {paperDetails.subject}
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-slate-100 p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900">Paper Type</p>
                    <p className="mt-2 text-slate-600">{paperDetails.type}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900">
                      Corresponding Author
                    </p>
                    <p className="mt-2 text-slate-600">
                      {paperDetails.correspondingName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {paperDetails.correspondingEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Abstract</p>
                  <p className="mt-3 text-slate-600 leading-relaxed whitespace-pre-line">
                    {paperDetails.abstract}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Keywords</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {paperDetails.keywords?.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
              <div>
                <span className="text-xs uppercase tracking-[2px] text-slate-400 font-bold">
                  Submission Status
                </span>
                <p className="mt-3 text-lg font-bold text-gray-900">
                  {status || "Submitted"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold">Submitted</p>
                  <p className="mt-1">
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Last Updated</p>
                  <p className="mt-1">
                    {updatedAt
                      ? new Date(updatedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold">Data Availability</p>
                <p className="mt-1 text-gray-600">
                  {dataAvailability || "Not provided"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Conflict of Interest</p>
                <p className="mt-1 text-gray-600">
                  {conflictOfInterest ? "Yes" : "No"}
                </p>
                {conflictOfInterest && (
                  <p className="mt-2 text-sm text-gray-600">
                    {conflictDescription || "No additional details provided."}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800">Authors</h3>
              <span className="text-xs uppercase tracking-[1.5px] text-slate-400 font-bold">
                {authors?.length || 0} total
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authors?.map((author, index) => (
                <div
                  key={index}
                  className="p-4 rounded-3xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-black">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {author.fullName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {author.affiliation}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {author.email}
                    </p>
                    <p>
                      <span className="font-semibold">Country:</span>{" "}
                      {author.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Files</h3>
                <p className="text-sm text-slate-500">
                  Download the manuscript and supporting documents.
                </p>
              </div>
              <span className="text-xs uppercase tracking-[1.5px] text-slate-400 font-bold">
                Download
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <FaFilePdf />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Main Manuscript
                    </p>
                    <p className="text-sm text-slate-500">
                      {paperFiles?.paper?.name || "No file uploaded"}
                    </p>
                  </div>
                </div>
                {paperFiles?.paper?.url && (
                  <a
                    href={paperFiles.paper.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
                  >
                    <FaDownload /> Download
                  </a>
                )}
              </div>

              {paperFiles?.figuresDetails?.length > 0 && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900">Figures</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paperFiles.figuresDetails.map((file, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-3xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                            <FaImage className="text-lg" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {file.name}
                            </p>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                        >
                          Open
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {paperFiles?.supplementaryDetails?.length > 0 && (
                <div className="space-y-3">
                  <p className="font-semibold text-slate-900">
                    Supplementary Files
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paperFiles.supplementaryDetails.map((file, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-3xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                            <FaFileArchive className="text-lg" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {file.name}
                            </p>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                        >
                          Open
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuthorPaperDetailsModal;
