
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaBuilding,
  FaBriefcase,
  FaGlobe,
  FaCity,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTags,
  FaCamera,
  FaTimes,
  FaSpinner,
  FaSave,
  FaPlus,
} from "react-icons/fa";
import {
  useUpdateProfile,
  FIELD_OF_STUDY_OPTIONS,
} from "../../hooks/auth/useUpdateProfile";

const EditProfileForm = ({ user, onSuccess, onCancel }) => {
  const {
    formData,
    imagePreview,
    existingImage,
    loading,
    errors,
    specializationInput,
    setSpecializationInput,
    handleChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    addSpecialization,
    removeSpecialization,
    handleSpecializationKeyPress,
  } = useUpdateProfile(user, onSuccess);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="text-blue-100 mt-2">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : existingImage ? (
                  <img
                    src={existingImage}
                    alt="Current Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                    {getInitials(formData.firstName, formData.lastName)}
                  </div>
                )}
              </div>

              {/* Image Upload Button */}
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-md">
                <FaCamera className="text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Remove Image Button */}
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition shadow-md"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email - Read Only */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                  <span className="ml-2 text-xs text-gray-500">
                    (Cannot be changed)
                  </span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.institution ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.institution && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.institution}
                  </p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.department ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.designation ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>

              {/* Field of Study - READ ONLY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                  <span className="ml-2 text-xs text-gray-500">
                    (Cannot be changed)
                  </span>
                </label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fieldOfStudy}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Location Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Additional Details
            </h2>

            {/* Specializations */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specializations <span className="text-red-500">*</span>
                <span className="text-gray-500 text-xs ml-2">
                  (Press Enter or click Add)
                </span>
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FaTags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={specializationInput}
                    onChange={(e) => setSpecializationInput(e.target.value)}
                    onKeyPress={handleSpecializationKeyPress}
                    placeholder="e.g., Machine Learning"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.specializations
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={addSpecialization}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FaPlus className="text-sm" />
                  Add
                </button>
              </div>

              {formData.specializations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {spec}
                      <button
                        type="button"
                        onClick={() => removeSpecialization(index)}
                        className="text-blue-500 hover:text-red-500 transition"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.specializations && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.specializations}
                </p>
              )}
            </div>

            {/* Biography */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography <span className="text-red-500">*</span>
                <span className="text-gray-500 text-xs ml-2">
                  (Minimum 50 characters)
                </span>
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleChange}
                rows={5}
                placeholder="Write a brief biography about yourself..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.biography ? "border-red-500" : "border-gray-300"
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.biography && (
                  <p className="text-red-500 text-sm">{errors.biography}</p>
                )}
                <p className="text-gray-400 text-sm ml-auto">
                  {formData.biography.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
