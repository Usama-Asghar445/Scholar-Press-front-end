import React, { useState } from 'react';
import { FaPaperPlane, FaFileUpload, FaTimes, FaSpinner } from 'react-icons/fa';
import { submitPaper } from '../../../../services/api/author/api';
import { showSuccess, showError, showWarning } from '../../../../utils/swal';
import SubmissionGuidelines from './SubmissionGuidelines';
import AuthorInfoSection from './AuthorInfoSection';

const FIELD_OF_STUDY_OPTIONS = [
  "Biology", "Computer Science", "Physics", "Chemistry", 
  "Mathematics", "Engineering", "Medicine", "Social Sciences"
];

const AddPaperForm = ({ user, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    fieldOfStudy: '',
    authors: '', // Additional authors (optional)
  });

  const [paperFile, setPaperFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        showError('Only PDF files are allowed');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        showError('File size exceeds 20MB');
        return;
      }
      setPaperFile(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.abstract.trim()) newErrors.abstract = 'Abstract is required';
    if (formData.abstract.trim() && formData.abstract.trim().split(/\s+/).length < 50) {
        newErrors.abstract = 'Abstract should be at least 50 words';
    }
    if (!formData.keywords.trim()) newErrors.keywords = 'Keywords are required';
    if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
    if (!paperFile) newErrors.file = 'Research paper file (PDF) is required';

    // Author info check (if not pre-filled by user profile)
    if (!user?.firstName && !formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!user?.lastName && !formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!user?.institution && !formData.institution?.trim()) newErrors.institution = 'Institution is required';
    if (!user?.department && !formData.department?.trim()) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showWarning('Please correct the errors before submitting');
      return;
    }

    try {
      setLoading(true);
      const submitData = new FormData();
      
      // Append paper metadata
      Object.keys(formData).forEach(key => {
        if (formData[key]) submitData.append(key, formData[key]);
      });

      // Append paper file
      submitData.append('paper', paperFile);

      // Append author fallback info if profile is incomplete
      if (!user?.firstName) submitData.append('firstName', formData.firstName);
      if (!user?.lastName) submitData.append('lastName', formData.lastName);
      if (!user?.institution) submitData.append('institution', formData.institution);
      if (!user?.department) submitData.append('department', formData.department);

      await submitPaper(submitData);
      
      showSuccess('Paper submitted successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.message || 'Failed to submit paper');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Submit New Paper</h2>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      <SubmissionGuidelines />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Author Information */}
        <AuthorInfoSection 
          user={user} 
          formData={formData} 
          handleChange={handleChange} 
          errors={errors} 
        />

        {/* Paper Details Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Paper Details</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paper Title *</label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border transition-all ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'}`}
                placeholder="Enter the full title of your research paper"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Abstract * (Min 50 words)</label>
              <textarea 
                name="abstract"
                rows="6"
                value={formData.abstract}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border transition-all ${errors.abstract ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'}`}
                placeholder="Paste your paper abstract here..."
              ></textarea>
              {errors.abstract && <p className="mt-1 text-xs text-red-500">{errors.abstract}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords *</label>
                <input 
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border transition-all ${errors.keywords ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'}`}
                  placeholder="e.g. Machine Learning, Healthcare, AI"
                />
                <p className="mt-1 text-xs text-gray-400 italic">Separate with commas</p>
                {errors.keywords && <p className="mt-1 text-xs text-red-500">{errors.keywords}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                <select 
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border transition-all ${errors.fieldOfStudy ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'}`}
                >
                  <option value="">Select a field</option>
                  {FIELD_OF_STUDY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.fieldOfStudy && <p className="mt-1 text-xs text-red-500">{errors.fieldOfStudy}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Authors (Optional)</label>
              <input 
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe (MIT), Jane Smith (Oxford)"
              />
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">File Upload</h3>
          
          <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${paperFile ? 'border-green-300 bg-green-50' : errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}>
            {paperFile ? (
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-4xl text-green-500 mb-3" />
                <p className="font-medium text-green-800">{paperFile.name}</p>
                <p className="text-xs text-green-600">{(paperFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                <button 
                  type="button"
                  onClick={() => setPaperFile(null)}
                  className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('paperFile').click()}>
                <FaFileUpload className="text-4xl text-gray-400 mb-3" />
                <p className="font-medium text-gray-700">Click to upload your research paper</p>
                <p className="text-xs text-gray-500 mt-1">PDF file format only (Max 20MB)</p>
                <input 
                  type="file" 
                  id="paperFile" 
                  className="hidden" 
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          {errors.file && <p className="mt-2 text-center text-xs text-red-500">{errors.file}</p>}
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg shadow-lg shadow-blue-200 transition-all font-bold text-sm"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            Submit Paper
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaperForm;
