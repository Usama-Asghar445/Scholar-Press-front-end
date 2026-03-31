// ============================================
// 📁 services/api/author/api.js
// ============================================

import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "../../config";

/**
 * Submit a new research paper
 * @param {FormData} formData - Paper details including PDF file
 * @returns {Promise} API response
 */
export const submitPaper = async (formData) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.post(
    `${BASE_URL}${API_ENDPOINTS.paper.submit}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/**
 * Get papers submitted by the current author
 * @param {string} status - Filter by status (optional)
 * @returns {Promise} API response
 */
export const getMyPapers = async (status = "") => {
  const token = localStorage.getItem("authToken");
  const url = status
    ? `${BASE_URL}${API_ENDPOINTS.paper.getMyPapers}?status=${status}`
    : `${BASE_URL}${API_ENDPOINTS.paper.getMyPapers}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Get status counts for author's papers
 * @returns {Promise} API response
 */
export const getPaperStatusCounts = async () => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(
    `${BASE_URL}${API_ENDPOINTS.paper.getPaperStatusCounts}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

/**
 * Get details of a specific paper
 * @param {string} id - Paper ID
 * @returns {Promise} API response
 */
export const getPaperDetails = async (id) => {
  const token = localStorage.getItem("authToken");

  const response = await axios.get(
    `${BASE_URL}${API_ENDPOINTS.paper.getPaperDetails(id)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const resubmitPaper = async (id, formData) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.patch(
    `${BASE_URL}${API_ENDPOINTS.paper.resubmit(id)}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
