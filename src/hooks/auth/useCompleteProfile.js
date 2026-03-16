// ============================================
// 📁 hooks/profile/useCompleteProfile.js
// ============================================

import { useState } from "react";
import { completeProfile } from "../../services/api/profile/api";
import { showSuccess, showError, showWarning } from "../../utils/swal";

// Valid field of study options from backend
export const FIELD_OF_STUDY_OPTIONS = [
  { value: "", label: "Select Field of Study" },
  { value: "Biology", label: "Biology" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Physics", label: "Physics" },
];

export const useCompleteProfile = (user, onSuccess) => {
  // Form state - pre-filled with registration data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    institution: "",
    department: "",
    designation: "",
    country: "",
    city: "",
    address: "",
    specializations: [], // Changed to array
    biography: "",
    fieldOfStudy: "",
  });

  // For specialization input
  const [specializationInput, setSpecializationInput] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Update form data when user data changes
  const updateFormWithUser = (userData) => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        firstName: userData.firstName || prev.firstName,
        lastName: userData.lastName || prev.lastName,
        phone: userData.phone || prev.phone,
        email: userData.email || prev.email,
      }));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle adding specialization
  const addSpecialization = () => {
    const trimmedValue = specializationInput.trim();
    if (trimmedValue && !formData.specializations.includes(trimmedValue)) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, trimmedValue],
      }));
      setSpecializationInput("");

      // Clear specialization error
      if (errors.specializations) {
        setErrors((prev) => ({
          ...prev,
          specializations: "",
        }));
      }
    }
  };

  // Handle removing specialization
  const removeSpecialization = (index) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }));
  };

  // Handle specialization input keypress (Enter to add)
  const handleSpecializationKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSpecialization();
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showError("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError("Image size should be less than 5MB");
        return;
      }

      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields for profile completion
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
    }
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.fieldOfStudy) {
      newErrors.fieldOfStudy = "Field of Study is required";
    }
    if (!formData.biography.trim()) {
      newErrors.biography = "Biography is required";
    }
    if (formData.biography.trim() && formData.biography.trim().length < 50) {
      newErrors.biography = "Biography should be at least 50 characters";
    }
    // Validate specializations (must be array with at least 1 item)
    if (!formData.specializations || formData.specializations.length === 0) {
      newErrors.specializations = "Please add at least one specialization";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showWarning("Please fill all required fields correctly");
      return;
    }

    try {
      setLoading(true);

      // Create FormData for multipart upload
      const submitData = new FormData();

      // Append all form fields except email and specializations
      Object.keys(formData).forEach((key) => {
        if (key !== "email" && key !== "specializations" && formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Append specializations as array - each item separately
      // This is how FormData handles arrays
      formData.specializations.forEach((spec) => {
        submitData.append("specializations", spec);
      });

      // Append profile image if selected
      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      const response = await completeProfile(submitData);

      showSuccess(response.message || "Profile completed successfully!");

      // Call success callback to refresh user data
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to complete profile";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    profileImage,
    imagePreview,
    loading,
    errors,
    specializationInput,
    setSpecializationInput,
    handleChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    updateFormWithUser,
    addSpecialization,
    removeSpecialization,
    handleSpecializationKeyPress,
  };
};
