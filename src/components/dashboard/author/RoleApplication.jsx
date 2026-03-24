import React, { useState } from "react";
import { FaGraduationCap, FaCloudUploadAlt, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { applyForRole } from "../../../services/api/profile/api";

const ApplyForRole = ({ user, onRoleApplied }) => {
  const [formData, setFormData] = useState({
    appliedRole: "Reviewer",
    degree: "",
    institution: "",
    passingYear: "",
    major: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const roles = ["Reviewer", "Editor", "Associate Editor"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const data = new FormData();
      data.append("appliedRole", formData.appliedRole);
      data.append("degree", formData.degree);
      data.append("institution", formData.institution);
      data.append("passingYear", formData.passingYear);
      data.append("major", formData.major);
      if (file) {
        data.append("document", file);
      }

      const response = await applyForRole(data);
      if (response.success) {
        setMessage(response.message);
        if (onRoleApplied) onRoleApplied();
        // Reset form
        setFormData({
            appliedRole: "Reviewer",
            degree: "",
            institution: "",
            passingYear: "",
            major: "",
        });
        setFile(null);
      }
    } catch (err) {
      console.error("Application Error:", err);
      setError(err.response?.data?.message || "Something went wrong while submitting your application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <FaGraduationCap className="text-3xl" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Apply for Elevated Role</h2>
          </div>
          <p className="text-blue-100 text-lg opacity-90 max-w-2xl">
            Advance your academic career by applying for Reviewer or Editor roles. Please provide your academic credentials for verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Messages */}
          {message && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl animate-in fade-in slide-in-from-top-4">
              <FaCheckCircle className="text-xl shrink-0" />
              <p className="font-medium">{message}</p>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-in fade-in slide-in-from-top-4">
              <FaExclamationTriangle className="text-xl shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Desired Role</label>
              <select
                name="appliedRole"
                value={formData.appliedRole}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 ml-1 italic">Select the role that matches your expertise.</p>
            </div>

            {/* Degree */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Highest Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="e.g. PhD in Computer Science"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            {/* Institution */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="University Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            {/* Major */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Major / Subject</label>
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="Field of specialization"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            {/* Passing Year */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Passing Year</label>
              <input
                type="text"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                placeholder="YYYY"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Verification Document (PDF/Image)</label>
              <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="education-doc"
                  accept=".pdf,image/*"
                />
                <label
                  htmlFor="education-doc"
                  className="flex flex-col items-center justify-center w-full h-32 px-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 group-hover:bg-blue-50 group-hover:border-blue-400 transition-all"
                >
                  <FaCloudUploadAlt className="text-3xl text-gray-400 group-hover:text-blue-500 mb-2" />
                  <span className="text-sm text-gray-500 group-hover:text-blue-600 font-medium">
                    {file ? file.name : "Click to upload credential document"}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">PDF or image, max 5MB</p>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-300 transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Submitting Application...
                </>
              ) : (
                "Submit Application for Review"
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start gap-4">
            <FaExclamationTriangle className="text-yellow-500 mt-1 shrink-0" />
            <div className="text-sm text-gray-500">
              <span className="font-bold text-gray-700">Important:</span> Your application will be reviewed by the Editor-in-Chief. This process typically takes 3-5 business days. Please note that rejected applications have a mandatory <span className="text-blue-600 font-bold">6-month cooldown period</span> before you can re-apply for the same role.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForRole;
