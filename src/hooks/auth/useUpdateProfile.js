// ============================================
// 📁 hooks/profile/useUpdateProfile.js
// ============================================

import { useState, useEffect } from "react";
import { updateProfile } from "../../services/api/profile/api";
import { showSuccess, showError, showWarning } from "../../utils/swal";

// Valid field of study options from backend
export const FIELD_OF_STUDY_OPTIONS = [
  { value: "", label: "Select Field of Study" },
  { value: "Biology", label: "Biology" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Physics", label: "Physics" },
];

export const useUpdateProfile = (user, onSuccess) => {
  // Form state - pre-filled with existing user data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    institution: "",
    department: "",
    designation: "",
    country: "",
    city: "",
    address: "",
    specializations: [],
    biography: "",
    fieldOfStudy: "",
  });

  // For specialization input
  const [specializationInput, setSpecializationInput] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        institution: user.institution || "",
        department: user.department || "",
        designation: user.designation || "",
        country: user.country || "",
        city: user.city || "",
        address: user.address || "",
        specializations: Array.isArray(user.specializations)
          ? user.specializations
          : [],
        biography: user.biography || "",
        fieldOfStudy: user.fieldOfStudy || "",
      });

      if (user.profileImage) {
        setExistingImage(user.profileImage);
      }
    }
  }, [user]);

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

  // Handle specialization input keypress
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
      if (!file.type.startsWith("image/")) {
        showError("Please select a valid image file");
        return;
      }
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
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

      const submitData = new FormData();

      // Append all form fields except email, specializations, and fieldOfStudy
      Object.keys(formData).forEach((key) => {
        if (
          key !== "email" &&
          key !== "specializations" &&
          key !== "fieldOfStudy" &&
          formData[key]
        ) {
          submitData.append(key, formData[key]);
        }
      });

      // Append specializations as array
      formData.specializations.forEach((spec) => {
        submitData.append("specializations", spec);
      });

      // Append profile image if new one selected
      if (profileImage) {
        submitData.append("profileImage", profileImage);
      }

      const response = await updateProfile(submitData);

      showSuccess(response.message || "Profile updated successfully!");
      setIsEditing(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    // Reset form to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        institution: user.institution || "",
        department: user.department || "",
        designation: user.designation || "",
        country: user.country || "",
        city: user.city || "",
        address: user.address || "",
        specializations: Array.isArray(user.specializations)
          ? user.specializations
          : [],
        biography: user.biography || "",
        fieldOfStudy: user.fieldOfStudy || "",
      });
    }
    setProfileImage(null);
    setImagePreview(null);
    setSpecializationInput("");
    setErrors({});
  };

  return {
    formData,
    profileImage,
    imagePreview,
    existingImage,
    loading,
    errors,
    isEditing,
    specializationInput,
    setSpecializationInput,
    setIsEditing,
    handleChange,
    handleImageChange,
    removeImage,
    handleSubmit,
    cancelEdit,
    addSpecialization,
    removeSpecialization,
    handleSpecializationKeyPress,
  };
};