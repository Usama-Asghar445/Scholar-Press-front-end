// ============================================
// 📁 services/api/profile/api.js
// ============================================

import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../../config";

/**
 * Complete user profile (first time)
 * @param {FormData} formData - Profile data including image
 * @returns {Promise} API response
 */
export const completeProfile = async (formData) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.patch(
    `${BASE_URL}${API_ENDPOINTS.profile.completeProfile}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * Update user profile (after completion)
 * @param {FormData} formData - Updated profile data
 * @returns {Promise} API response
 */
export const updateProfile = async (formData) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.patch(
    `${BASE_URL}${API_ENDPOINTS.profile.updateProfile}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};