import React, { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaFileUpload,
  FaTimes,
  FaSpinner,
  FaPlus,
  FaTrash,
  FaUserPlus,
  FaFileAlt,
  FaInfoCircle,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";
import { submitPaper } from "../../../../services/api/author/api";
import {
  showSuccess,
  showError,
  showWarning,
  showConfirm,
} from "../../../../utils/swal";
import SubmissionInstructions from "./SubmissionInstructions";

const PAPER_TYPES = [
  "Original Research",
  "Review Article",
  "Case Study",
  "Short Communication",
  "Technical Note",
  "Letter to Editor",
];

const SUBJECT_AREAS = [
  "Biology & Life Sciences",
  "Computer Science & IT",
  "Physics & Astronomy",
  "Chemistry & Material Science",
  "Mathematics",
  "Engineering",
  "Medicine & Health",
  "Social Sciences & Humanities",
  "Environmental Science",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "China",
  "India",
  "Japan",
  "Brazil",
  "Pakistan",
  "Bangladesh",
  "Other",
];

const AddPaperForm = ({ user, onCancel, onSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form Data State
  const [formData, setFormData] = useState({
    paperDetails: {
      title: "",
      type: "",
      runningTitle: "",
      subject: "",
      abstract: "",
      correspondingName: user?.firstName
        ? `${user.firstName} ${user.lastName}`
        : "",
      correspondingEmail: user?.email || "",
      keywords: [""], // Array of strings
    },
    areaOfResearch: "",
    authors: [{ fullName: "", email: "", country: "", affiliation: "" }],
    conflictOfInterest: false,
    conflictDescription: "",
    dataAvailability: "",
  });

  // File State
  const [paperFile, setPaperFile] = useState(null);
  const [figFiles, setFigFiles] = useState([]);
  const [suppFiles, setSuppFiles] = useState([]);

  // Handle Tab Navigation
  const handleNext = () => setActiveTab((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  // Handle Paper Details Change
  const handlePaperDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      paperDetails: { ...prev.paperDetails, [name]: value },
    }));
    if (errors[`paperDetails.${name}`]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[`paperDetails.${name}`];
        return newErrs;
      });
    }
  };

  const handleAreaOfResearchChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, areaOfResearch: value }));
    if (errors.areaOfResearch) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs.areaOfResearch;
        return newErrs;
      });
    }
  };

  // Handle Keywords
  const handleKeywordChange = (index, value) => {
    const newKeywords = [...formData.paperDetails.keywords];
    newKeywords[index] = value;
    setFormData((prev) => ({
      ...prev,
      paperDetails: { ...prev.paperDetails, keywords: newKeywords },
    }));
  };

  const addKeyword = () => {
    setFormData((prev) => ({
      ...prev,
      paperDetails: {
        ...prev.paperDetails,
        keywords: [...prev.paperDetails.keywords, ""],
      },
    }));
  };

  const removeKeyword = (index) => {
    if (formData.paperDetails.keywords.length > 1) {
      const newKeywords = formData.paperDetails.keywords.filter(
        (_, i) => i !== index,
      );
      setFormData((prev) => ({
        ...prev,
        paperDetails: { ...prev.paperDetails, keywords: newKeywords },
      }));
    }
  };

  // Handle Authors
  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setFormData((prev) => ({ ...prev, authors: newAuthors }));
  };

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [
        ...prev.authors,
        { fullName: "", email: "", country: "", affiliation: "" },
      ],
    }));
  };

  const removeAuthor = (index) => {
    if (formData.authors.length > 1) {
      const newAuthors = formData.authors.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, authors: newAuthors }));
    }
  };

  // Handle Files
  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (type === "paper") {
      const file = files[0];
      if (file.type !== "application/pdf") {
        showError("Paper must be a PDF file");
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        showError("File exceeds 20MB limit");
        return;
      }
      setPaperFile(file);
    } else if (type === "figure") {
      setFigFiles((prev) => [...prev, ...files]);
    } else if (type === "supplementary") {
      setSuppFiles((prev) => [...prev, ...files]);
    }

    // Clear error for that type
    if (errors[type]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[type];
        return newErrs;
      });
    }
  };

  const removeFile = (index, type) => {
    if (type === "figure") {
      setFigFiles((prev) => prev.filter((_, i) => i !== index));
    } else if (type === "supplementary") {
      setSuppFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Validation Logic
  const validate = () => {
    const newErrors = {};

    // Paper Details
    const { paperDetails } = formData;
    if (!paperDetails.title || paperDetails.title.length < 3)
      newErrors["paperDetails.title"] = "Title must be at least 3 characters";
    if (!paperDetails.type)
      newErrors["paperDetails.type"] = "Paper type is required";
    if (!paperDetails.runningTitle)
      newErrors["paperDetails.runningTitle"] = "Running title is required";
    if (!formData.areaOfResearch)
      newErrors.areaOfResearch = "Area of research is required";
    if (!paperDetails.subject)
      newErrors["paperDetails.subject"] = "Subject area is required";
    if (!paperDetails.abstract)
      newErrors["paperDetails.abstract"] = "Abstract is required";
    if (!paperDetails.correspondingName)
      newErrors["paperDetails.correspondingName"] =
        "Corresponding author name is required";
    if (
      !paperDetails.correspondingEmail ||
      !/^\S+@\S+\.\S+$/.test(paperDetails.correspondingEmail)
    )
      newErrors["paperDetails.correspondingEmail"] = "Valid email is required";

    const validKeywords = paperDetails.keywords.filter(
      (k) => k.trim().length > 0,
    );
    if (validKeywords.length === 0)
      newErrors["paperDetails.keywords"] = "At least one keyword is required";

    // Authors
    formData.authors.forEach((author, index) => {
      if (!author.fullName || author.fullName.length < 2)
        newErrors[`authors.${index}.fullName`] =
          "Full name required (min 2 chars)";
      if (!author.email || !/^\S+@\S+\.\S+$/.test(author.email))
        newErrors[`authors.${index}.email`] = "Valid email required";
      if (!author.country)
        newErrors[`authors.${index}.country`] = "Country required";
      if (!author.affiliation)
        newErrors[`authors.${index}.affiliation`] = "Affiliation required";
    });

    // Conflict & Data
    if (
      formData.conflictOfInterest &&
      (!formData.conflictDescription || formData.conflictDescription.length < 5)
    )
      newErrors.conflictDescription = "Description required (min 5 chars)";
    if (!formData.dataAvailability)
      newErrors.dataAvailability = "Data availability statement is required";

    // Files
    if (!paperFile) newErrors.paper = "Research paper file (PDF) is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showWarning("Please correct the validation errors in all tabs");
      return;
    }

    const { isConfirmed } = await showConfirm(
      "Ready to Submit?",
      "Please ensure all information is accurate. You can still modify it after submission if needed.",
    );

    if (!isConfirmed) return;

    try {
      setLoading(true);
      const submitData = new FormData();

      // Append complex objects and arrays as JSON strings
      // Backend expects: req.validatedBody which is handled by a middleware (likely converting field names)
      // Actually, standard practice for multi-part is either direct fields or JSON field
      // Let's follow the structure in backend Joi: paperDetails, authors, etc.

      // We must be careful how we send nested structures in FormData
      // Option 1: Flattened keys like 'paperDetails[title]'
      // Option 2: JSON strings for objects (if backend uses JSON.parse)
      // Given the backend code uses `const paperDetail = req.validatedBody;`,
      // and it likely uses a middleware that handles both.

      // We'll append simple fields and use standard naming for arrays/objects
      submitData.append("paperDetails", JSON.stringify(formData.paperDetails));
      submitData.append("authors", JSON.stringify(formData.authors));
      submitData.append("conflictOfInterest", formData.conflictOfInterest);
      submitData.append("conflictDescription", formData.conflictDescription);
      submitData.append("dataAvailability", formData.dataAvailability);

      // Append files
      // Key 'paper' is required as per schema
      submitData.append("paper", paperFile);

      // Figures and Supplementary (handled as arrays)
      figFiles.forEach((file) => submitData.append("figuresDetails", file));
      suppFiles.forEach((file) =>
        submitData.append("supplementaryDetails", file),
      );

      // Note: If backend middleware doesn't parse JSON strings automatically,
      // we might need to send them as individual fields.
      // However, most modern apps using Joi for nested objects expect the body to be structured.
      // Since we are sending FormData, let's verify if we should use flat keys.
      // Re-reviewing backend: `const paperDetail = req.validatedBody;`
      // Usually, `validatedBody` comes from a validation middleware that runs ON the parsed body.
      // If the body is from `multer`, it might need manual parsing if sent as JSON string.
      // BUT, many setups handle `paperDetails[title]` correctly.

      // Let's go with a safer approach for multipart: flattened or structured fields
      // Actually, I'll send it as separate fields to be safe if I'm not sure of the middleware.
      // Wait, let's just use the object approach but check if backend handles it.
      // If I don't know the exact middleware, standard FormData behavior is key: string/file.

      // Re-constructing FormData to be as standard as possible:
      const finalData = new FormData();

      // Paper Details
      Object.keys(formData.paperDetails).forEach((key) => {
        if (key === "keywords") {
          formData.paperDetails.keywords.forEach((kw) =>
            finalData.append("paperDetails[keywords][]", kw),
          );
        } else {
          finalData.append(`paperDetails[${key}]`, formData.paperDetails[key]);
        }
      });

      // Authors
      formData.authors.forEach((author, index) => {
        Object.keys(author).forEach((key) => {
          finalData.append(`authors[${index}][${key}]`, author[key]);
        });
      });

      // Simple fields
      finalData.append("conflictOfInterest", formData.conflictOfInterest);
      finalData.append("conflictDescription", formData.conflictDescription);
      finalData.append("dataAvailability", formData.dataAvailability);

      // Files
      finalData.append("paper", paperFile);
      finalData.append("areaOfResearch", formData.areaOfResearch);
      figFiles.forEach((file) => finalData.append("figuresDetails", file));
      suppFiles.forEach((file) =>
        finalData.append("supplementaryDetails", file),
      );

      await submitPaper(finalData);

      showSuccess("Paper submitted successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || "Failed to submit paper");
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return <SubmissionInstructions onConfirm={() => setShowForm(true)} />;
  }

  const TabButton = ({ index, label, icon: Icon }) => (
    <button
      type="button"
      onClick={() => setActiveTab(index)}
      className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
        activeTab === index
          ? "border-blue-600 text-blue-600 bg-blue-50/50"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Icon
        className={activeTab === index ? "text-blue-600" : "text-gray-400"}
      />
      {label}
      {/* Checkmark indicator for valid tabs */}
      {/* (Simplified validation check for tab icon) */}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">
            Paper Submission
          </h2>
          <p className="text-gray-500 text-sm italic">
            Ensure all fields marked with * are completed
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2.5 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 transition-all font-bold flex items-center gap-2 text-sm"
        >
          <FaTimes /> Cancel
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b overflow-x-auto bg-gray-50/50 no-scrollbar">
          <TabButton index={0} label="1. Paper Details" icon={FaFileAlt} />
          <TabButton index={1} label="2. Authors" icon={FaUserPlus} />
          <TabButton index={2} label="3. Conflict & Data" icon={FaInfoCircle} />
          <TabButton index={3} label="4. File Upload" icon={FaFileUpload} />
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* TAB 0: PAPER DETAILS */}
          {activeTab === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Paper Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.paperDetails.title}
                    onChange={handlePaperDetailsChange}
                    className={`w-full p-3.5 rounded-xl border transition-all ${errors["paperDetails.title"] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                    placeholder="Enter the full title of your research paper"
                  />
                  {errors["paperDetails.title"] && (
                    <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                      <FaInfoCircle /> {errors["paperDetails.title"]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Paper Type *
                  </label>
                  <select
                    name="type"
                    value={formData.paperDetails.type}
                    onChange={handlePaperDetailsChange}
                    className={`w-full p-3.5 rounded-xl border transition-all ${errors["paperDetails.type"] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                  >
                    <option value="">Select paper type</option>
                    {PAPER_TYPES.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors["paperDetails.type"] && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors["paperDetails.type"]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Running Title *
                  </label>
                  <input
                    type="text"
                    name="runningTitle"
                    value={formData.paperDetails.runningTitle}
                    onChange={handlePaperDetailsChange}
                    className={`w-full p-3.5 rounded-xl border transition-all ${errors["paperDetails.runningTitle"] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                    placeholder="Short title for header (Max 50 chars)"
                  />
                  {errors["paperDetails.runningTitle"] && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors["paperDetails.runningTitle"]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Area of Research *
                  </label>
                  <select
                    name="areaOfResearch"
                    value={formData.areaOfResearch}
                    onChange={handleAreaOfResearchChange}
                    className={`w-full p-3.5 rounded-xl border transition-all ${errors.areaOfResearch ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                  >
                    <option value="">Select research area</option>
                    {["Computer Science", "Physics", "Biology"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.areaOfResearch && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.areaOfResearch}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject Area *
                  </label>
                  <select
                    name="subject"
                    value={formData.paperDetails.subject}
                    onChange={handlePaperDetailsChange}
                    className={`w-full p-3.5 rounded-xl border transition-all ${errors["paperDetails.subject"] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                  >
                    <option value="">Select subject area</option>
                    {SUBJECT_AREAS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors["paperDetails.subject"] && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors["paperDetails.subject"]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Corresponding Author Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="correspondingEmail"
                      value={formData.paperDetails.correspondingEmail}
                      onChange={handlePaperDetailsChange}
                      className={`w-full p-3.5 pl-10 rounded-xl border transition-all ${errors["paperDetails.correspondingEmail"] ? "border-red-300 bg-red-50" : "border-gray-50 bg-gray-50 text-gray-500 cursor-not-allowed"}`}
                      readOnly
                    />
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">
                    Pre-filled from your profile
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Abstract *
                  </label>
                  <textarea
                    name="abstract"
                    rows="6"
                    value={formData.paperDetails.abstract}
                    onChange={handlePaperDetailsChange}
                    className={`w-full p-4 rounded-xl border transition-all ${errors["paperDetails.abstract"] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                    placeholder="Provide a concise summary of your research..."
                  ></textarea>
                  {errors["paperDetails.abstract"] && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors["paperDetails.abstract"]}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">
                      Keywords *
                    </label>
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                    >
                      <FaPlus /> Add Keyword
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {formData.paperDetails.keywords.map((kw, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={kw}
                          onChange={(e) =>
                            handleKeywordChange(idx, e.target.value)
                          }
                          className="p-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-w-[150px]"
                          placeholder="Keyword"
                        />
                        <button
                          type="button"
                          onClick={() => removeKeyword(idx)}
                          className="text-gray-300 hover:text-red-500 p-1"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                  {errors["paperDetails.keywords"] && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors["paperDetails.keywords"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: AUTHORS */}
          {activeTab === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">
                  Add Co-Authors
                </h3>
                <button
                  type="button"
                  onClick={addAuthor}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <FaUserPlus /> Add Author
                </button>
              </div>

              {formData.authors.map((author, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={author.fullName}
                        onChange={(e) =>
                          handleAuthorChange(idx, "fullName", e.target.value)
                        }
                        className={`w-full p-3 rounded-xl border text-sm ${errors[`authors.${idx}.fullName`] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                        placeholder="e.g. Dr. Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={author.email}
                        onChange={(e) =>
                          handleAuthorChange(idx, "email", e.target.value)
                        }
                        className={`w-full p-3 rounded-xl border text-sm ${errors[`authors.${idx}.email`] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                        placeholder="email@institution.edu"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                        Country *
                      </label>
                      <select
                        value={author.country}
                        onChange={(e) =>
                          handleAuthorChange(idx, "country", e.target.value)
                        }
                        className={`w-full p-3 rounded-xl border text-sm ${errors[`authors.${idx}.country`] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block uppercase">
                        Affiliation *
                      </label>
                      <input
                        type="text"
                        value={author.affiliation}
                        onChange={(e) =>
                          handleAuthorChange(idx, "affiliation", e.target.value)
                        }
                        className={`w-full p-3 rounded-xl border text-sm ${errors[`authors.${idx}.affiliation`] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                        placeholder="University or Research Lab"
                      />
                    </div>
                  </div>
                  {formData.authors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAuthor(idx)}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Author"
                    >
                      <FaTrash size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CONFLICT & DATA */}
          {activeTab === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      id="conflict"
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={formData.conflictOfInterest}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          conflictOfInterest: e.target.checked,
                        }))
                      }
                    />
                  </div>
                  <label htmlFor="conflict" className="cursor-pointer">
                    <span className="block font-bold text-gray-800">
                      Conflict of Interest Disclosure
                    </span>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      Check this box if authors have any financial or personal
                      relationships that could inappropriately influence (bias)
                      their actions or research findings.
                    </span>
                  </label>
                </div>

                {formData.conflictOfInterest && (
                  <div className="mt-4 animate-slideDown">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Please describe the conflict *
                    </label>
                    <textarea
                      rows="4"
                      className={`w-full p-4 rounded-xl border transition-all ${errors.conflictDescription ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                      placeholder="Detail any institutional or individual conflicts..."
                      value={formData.conflictDescription}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          conflictDescription: e.target.value,
                        }))
                      }
                    ></textarea>
                    {errors.conflictDescription && (
                      <p className="mt-1.5 text-xs font-medium text-red-500">
                        {errors.conflictDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Data Availability Statement *
                </label>
                <textarea
                  rows="4"
                  className={`w-full p-4 rounded-xl border transition-all ${errors.dataAvailability ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"}`}
                  placeholder="e.g. The data supporting the findings of this study are available from the corresponding author upon reasonable request."
                  value={formData.dataAvailability}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      dataAvailability: e.target.value,
                    }))
                  }
                ></textarea>
                {errors.dataAvailability && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.dataAvailability}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: FILES */}
          {activeTab === 3 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Paper File Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Main Research Paper (PDF) *
                </label>
                <div
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${paperFile ? "border-green-300 bg-green-50" : errors.paper ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-blue-400 group"}`}
                >
                  {paperFile ? (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <FaCheck size={30} />
                      </div>
                      <p className="font-bold text-green-900">
                        {paperFile.name}
                      </p>
                      <p className="text-xs text-green-600/70">
                        {(paperFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={() => setPaperFile(null)}
                        className="mt-6 text-sm text-red-600 hover:text-red-800 font-bold bg-white px-4 py-2 rounded-lg shadow-sm"
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        document.getElementById("paperFile").click()
                      }
                    >
                      <div className="w-16 h-16 bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 rounded-full flex items-center justify-center mb-4 transition-all">
                        <FaFileUpload size={30} />
                      </div>
                      <p className="font-bold text-gray-700">
                        Click to upload paper
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF format only (Max 20MB)
                      </p>
                      <input
                        type="file"
                        id="paperFile"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, "paper")}
                      />
                    </div>
                  )}
                </div>
                {errors.paper && (
                  <p className="mt-2 text-center text-xs font-medium text-red-500">
                    {errors.paper}
                  </p>
                )}
              </div>

              {/* Multiple Sections for Figures and Supp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Figures & Illustrations (Optional)
                  </label>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("figFiles").click()
                      }
                      className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all text-sm font-bold"
                    >
                      + Add Figures
                    </button>
                    <input
                      type="file"
                      id="figFiles"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e, "figure")}
                    />

                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {figFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs truncate"
                        >
                          <span className="font-medium text-gray-700 flex items-center gap-2 max-w-[80%] overflow-hidden">
                            <FaFileAlt className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </span>
                          <button
                            onClick={() => removeFile(idx, "figure")}
                            className="text-gray-300 hover:text-red-500"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Supplementary Materials (Optional)
                  </label>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("suppFiles").click()
                      }
                      className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all text-sm font-bold"
                    >
                      + Add Supplementary
                    </button>
                    <input
                      type="file"
                      id="suppFiles"
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileChange(e, "supplementary")}
                    />

                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {suppFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs truncate"
                        >
                          <span className="font-medium text-gray-700 flex items-center gap-2 max-w-[80%] overflow-hidden">
                            <FaFileAlt className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </span>
                          <button
                            onClick={() => removeFile(idx, "supplementary")}
                            className="text-gray-300 hover:text-red-500"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-10 mt-10 border-t border-gray-100">
            <div>
              {activeTab > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm flex items-center gap-2"
                >
                  <FaArrowLeft /> Previous Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors font-bold text-sm"
                >
                  Discard Submission
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {activeTab < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-gray-800 hover:bg-black text-white rounded-xl shadow-lg transition-all font-bold text-sm flex items-center gap-2"
                >
                  Save & Continue <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-3 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl shadow-xl shadow-blue-200 transition-all font-black text-sm uppercase tracking-wider"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-lg" />
                  ) : (
                    <FaPaperPlane className="text-base" />
                  )}
                  Submit Manuscript
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaperForm;
